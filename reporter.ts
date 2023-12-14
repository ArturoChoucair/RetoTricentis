import { Reporter, TestCase, TestResult, TestStep } from '@playwright/test/reporter';
import { exec } from 'child_process';
const utils = require('./utils');
const fs = require('fs');
const insigths = require('./domparser');

class MyReporter implements Reporter {

  feedbackData: any[] = [];
  videos: any[] = [];
  authInfo: any;
  executionNumber: number = 0;
  classNames: any[] = [];
  startExecutionTime: number = 0;
  browser: String = 'chromeTest';
  compilationError: boolean = false;
  filesWithCompilationError: any[] = [];
  url: any;

  async onBegin(config, suite) {

    console.log(`Starting the run with ${suite.allTests().length} tests`);
    this.startExecutionTime = Date.now();
    //validate suites, if it is not set, proably there was a compilation error. In that case, let's continue to get the proper error further...
    if(suite.suites && suite.suites.length > 0){
      //We only support execution a single browser per time (for now) so only need to get the first project
      this.browser = projectBrowsers[suite.suites[0].project().name];
    }
    const tests = suite.allTests();
    tests.forEach((test) => {
      this.classNames.push(test.title);
    });

    if(this.classNames.length > 0){
      this.getExecutioNumber();
    }
  }

  async onTestBegin(test) {
    console.log(`Starting test ${test.title}`);
   
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
    //console.log('Starting step: ', step)
  }

  onStepEnd(test: TestCase, result: TestResult, step: TestStep): void {
    //console.log('Ending step: ', step)
  }

  async onError(error){
    console.log("Tests generated an error during execution. Error = ", error);
    this.compilationError = true;
    if(error?.location?.file){
      this.filesWithCompilationError.push(error.location.file);
    }
  }

  async onTestEnd(test, result) {
    let steps = [];
    if(result.status === "passed"){
      console.log(`Test case ${test.title} execution was sucessfully`);
    }
    else{
      console.log(`Test case ${test.title} execution was NOT sucessfully`);
      // start muuk test insights
      steps =  await insigths.generateMuukInsigths(test.title);
    }

    const duration = parseInt(result.duration) / 1000;
    const testResult = {
      "className": test.title, // Get this from test name when generator code is done
      "success": result.status === "passed" ? true : false,
      "executionAt": result.startTime,
      "hostname": "",
      "executionTime": duration,
      "error":  (result.error) ? result.error.message : '',
      "systemoutput": (result.stdout) ? result.stdout.join(' ') : '',
      "systemerror":  (result.stderr) ? result.stderr.join(' ') : '',
      "failureMessage":  "",
      "muukReport":  {steps} || {},
    }
    
    this.feedbackData.push(testResult);

    // In case we have multiple videos for this test wich the test uses tabs, we need to merge 
    // all this videos into a single file. If a single video was created, upload that file.
    if(result && result.attachments && result.attachments.length > 1){
      console.log("Merging video files into a single file");     
      let files: string[] = [];    
      let videoPath = "";
      result.attachments.reverse().forEach(element => {
         if (fs.existsSync(element.path)) {
            const regexResults = element.path.match(/.*\/test-results\/(.*)\/(.*).webm/);
            if(regexResults && regexResults.length > 1){
              videoPath = "test-results/" + regexResults[1];
              files.push("file " + regexResults[2] + ".webm");
            }
         }
      });

      fs.writeFileSync(videoPath + "/" + "list.txt",  files.join('\n'));
      const finalVideoName = this.authInfo.organizationId + "_" + this.executionNumber + "_" + test.title + ".webm"
      
      exec('cd ' + videoPath + '; ffmpeg -f concat -i list.txt -c copy -avoid_negative_ts 1 ' + finalVideoName, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error}`);
          return;
        }
        console.log("Saving video path = ", videoPath + "/" + finalVideoName);
        this.videos.push(videoPath + "/" + finalVideoName);
      });
    }else{
      // we have a single file
      const videoPath = (result.attachments) ? result.attachments[0]?.path : '';
      // Rename the video file to link it the test executed
      if (fs.existsSync(videoPath)) {
        const regExpPath = /.*\/test-results\/(.*)\/(.*).webm/; 
        const result = videoPath.match(regExpPath);
        if(result && result.length > 1){
          const videoFolder = "./test-results/" + result[1] + "/";
          const currentVideoPath = videoFolder +  result[2] +  ".webm";
          
          const newVideoPath = videoFolder + this.authInfo.organizationId + "_" + this.executionNumber + "_" + test.title + ".webm"
          fs.renameSync(currentVideoPath, newVideoPath);
          
          console.log("Saving video path = ", newVideoPath);
          this.videos.push(newVideoPath);
        }
        else{
          console.log("No video found");
        }
      }
    }
  }

  async onEnd(result) {

    // If we have a compilation error, there won't be any execution information. We need to 
    // report the compilation error and get the execution number we need to use to report it.
    if(this.compilationError){
      this.filesWithCompilationError.forEach(async (file) => {
        let classNameOnFile = await utils.extractClassNameFromTestFile(file);
        if(classNameOnFile){
          const testResult = {
            "muukReport": {},
            "success" : false,
            "error" : "Test failed before execution. This could be compilation error",
            "compilationError" : true
          }
          this.feedbackData.push(testResult);
          this.classNames.push(classNameOnFile);
        }
      });

      // We need to get the execution number and report the compilation error. 
      await this.getExecutioNumber();
      console.log("compilation error, report to execution number ", this.executionNumber);
    }
    else{
      let totalDuration = Date.now() - this.startExecutionTime;
      let durationAppend = this.feedbackData.reduce((sum, testResult) => sum + testResult.executionTime, 0);
      let average = durationAppend / (this.feedbackData.length || 1);
      console.log(`Test execution average duration ${average}s`);
      console.log(`Total execution duration ${totalDuration/1000}s`);
    }
    // Send execution result, video, screenshots back to Muuktest
    return utils.sendExecutionResults(this.feedbackData, this.videos, this.executionNumber, this.url, this.authInfo, this.browser, this.compilationError);
  }


  async getExecutioNumber(){
    // First thing to do is to read the host file to get the server we need the feedback to
    const host = await utils.readHostFile();
    this.url = "https://" + host + "/";
    console.log("Connecting to = ", this.url );

    this.authInfo = await utils.getToken(this.url);
    if(this.authInfo.success){
      const response = await utils.getNextExecutionNumber(this.url, this.classNames, this.authInfo.userId, this.authInfo.token);
      this.executionNumber = response;
      console.log("executionNumber = ", this.executionNumber);
    }
  }
  
}
export default MyReporter;
const validatedExecutionStatus = 0;
const test = {lastExecution:{userstatus: 1}};
enum projectBrowsers {
	chromium = 'chromeTest',
	firefox = 'firefoxTest'
}

// const executionStatus = validatedExecutionStatus !== -1? test.lastExecution?.userstatus === validatedExecutionStatus: true;

