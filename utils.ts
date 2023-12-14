const https = require('https');
const axios = require('axios');
const path = require('path');
const FormData = require('form-data');
const fs = require('fs');
const fsp = fs.promises;
const archiver = require('archiver');
const LOG_FILE = "logs.zip";

// sendExecutionResults
// function to send the execution test results to MuukTest
// params
//     - testResult (Object) - result info to send to MuukTest
//     - videoPaths (array) - list of vides to upload to muuktest
//     - executionNumber (number) - execution number assigned to this test execution
//     - url (string) - URL used to connect to the server
//     - authInfo (Object) - Object wtih auth information (token, user, org)
//     - browser (string) - Execution browser
//     - compilationError (boolean) - Set to true when detecting a compilation error
// returns
//     - result (boolean) true if no error false otherwise
async function sendExecutionResults(testResult, videoPaths, executionNumber, url, authInfo, browser, compilationError = false){
	let result = true;

	// Send feedback if having a valid execution number 
	if(executionNumber > 0){
		if(authInfo.success){
			// No need to send screenshots and videos when having a compilation error.
			if(!compilationError){
				// Send the screenshots
				console.log("Send Screenshots");
				//await sendScreenshots("test-results/", authInfo.token);
				let start = Date.now();
				await sendFiles("upload_cloud_steps_images/", "test-results/", authInfo.token, ".png", url);

				// Send the video
				await sendVideo(videoPaths, authInfo.token, url);

				// Collect browser logs and send them.
				await collectAndSendLogs(authInfo, url, executionNumber);
			}
			
			// Send the feedbackData
			console.log("Sending feedback to execution number = ", executionNumber);
			await sendFeedback(authInfo, testResult, executionNumber, url, browser);
		}
		else{
			result = false;
		}
	}
	else{
		result = false;
		console.log("Do not have a valid execution number, could not send feedback to MuukTest. Number = ", executionNumber);
	}

	
	return result;
}

// collectAndSendLogs
// function to collect log files and zip them
// params
//     - authInfo (object) - authentication information
//     - url (string) - URL used to connect to the server
//     - executionNumber (int) execute number where this logs will be saved
// returns
//     - nothing
async function collectAndSendLogs(authInfo, url, executionNumber){
    const finalContent: any = [];
    const filesReaded: any = [];
	const currentDirectory = __dirname;

	try{
		const files = fs.readdirSync(currentDirectory);
		for (const file of files) {
			const filePath = path.join(currentDirectory, file);
			const fileStat = fs.statSync(filePath);
			// Check if it's a regular file, has a .log extension, and contains "browser" in the filename
			if (fileStat.isFile() && path.extname(file) === '.log' && file.toLowerCase().includes('browser')) {
				const fileContent = fs.readFileSync(filePath, 'utf8');
				finalContent.push(fileContent);
				filesReaded.push(filePath);
			}
		}
	
		if(finalContent.length > 0){
			fs.writeFileSync("browser.log", finalContent.join('\n'), 'utf8');
	
			// Create a writable stream to the zipFile
			const output = fs.createWriteStream(LOG_FILE);
			const archive = archiver('zip', {
			zlib: { level: 9 } // Set compression level to maximum (optional)
			});
		
			// Pipe the archive to the output stream
			archive.pipe(output);
		
			// Append the output file to the archive with a specific name
			archive.file("browser.log", { name: path.basename("browser.log") });
		
			// Finalize the archive and close the output stream
			archive.finalize();
	
			output.on('finish', async () => {
				console.log('ZIP archive is fully written and closed.');
				await sendLogFiles(authInfo, url, executionNumber);
	
				// After we are done, we need to delete log files and the zip
				await deleteFile(LOG_FILE);
				for (const file of filesReaded) {
					await deleteFile(file);
				}
			});
		}
	}
	catch (err) {
		console.log("collectAndSendLogs, error while trying to compress and send log files. Error = ", err);
	}
}

// sendVideo
// function to send execution videos to muuktest
// does not return anything
async function sendVideo(videoPaths, token, url){
	for (const path of videoPaths) {
		await sendFile("upload_video/", path, token, url);
	}
}

// readHostFile
// function to read the host name from file, if not infromation is found use portal as default
// returns
//     - host (string) host name to obtain and send information to.
async function readHostFile(){
	const validHostNames = ["portal.muuktest.com:8081", "staging.muuktest.com:8081", "testing.muuktest.com:8081", "localhost:8081"];
	let host = "portal.muuktest.com:8081";
	const hostFile = "./host.txt";
	try{
		if (fs.existsSync(hostFile)) {
			// Read key file from local directory.
			host = fs.readFileSync(hostFile, 'utf8').trim();
			// validate the information we are reading to avoid problems
			if(!validHostNames.includes(host)){
               console.log("Invalid host name was found!, use default value");
			   host = "portal.muuktest.com:8081";
			}
		}
		else{
			console.log("readHostFile, host file was not found, use default value");
		}
	}
	catch (err) {
		console.log("readHostFile, error while reading the host file, use default value. Error = ", err);
	}

	return host;
}

async function readExecutionNumber(){
	let executioNumber = 0;
	const executioNumberFile = "./test/executionNumber.execution";

	try{
		if (fs.existsSync(executioNumberFile)) {
			// Read key file from local directory.
			executioNumber = fs.readFileSync(executioNumberFile, 'utf8');
		}
		else{
			console.log("sendFeedback, execution file was not found, cannot send feedback without execution number");
		}
	}
	catch (err) {
		console.log("sendFeedback, exception while reading the execution number, cannot continue  = ", err);
	}

	return executioNumber;
}

// sendFeedback
// function to send the feedback information to MuukTest
// params
//     - authInfo (object) - authentication information
//     - testResult (Object) - result info to send to MuukTest
//     - url (string) - URL used to connect to the server
// returns
//     - result (boolean) true if no error false otherwise
async function sendFeedback(authInfo, testResult, executionNumber, url, browser){ 
	let result = false;

	// Send feedback data
	const json = 
	{
		'tests': testResult, 
		'userId': authInfo.userId, 
		'browser': browser,
		'executionNumber': parseInt(executionNumber), // we need to get execution number
		'origin': null,
		'originid': null,
		'scheduleExecutionNumber': null,
		'technology': 1
	}
	const execInformation = await getExecutionInformation();
	if(execInformation.exists){
		json.executionNumber = execInformation.executionNumber;
		json.origin = execInformation.origin;
		json.originid = execInformation.originId;
		json.scheduleExecutionNumber = execInformation.scheduleExecutionNumber;
	}

	const response = await sendPostRequest("feedback", json, authInfo.token, url);
	if(!response){
		console.log("sendFeedback: Error sending data to Muuktest");
		result = false;
	}

	return result;
}

// sendLogFiles
// function to send a a zip file that contains browser logs
// params
//     - authInfo (object) - authentication information
//     - url (string) - URL used to connect to the server
//     - executionNumber (int) execute number where this logs will be saved
async function sendLogFiles(authInfo, url, executionNumber){
	
	const keyFile = "./test/key.pub";
	const key = fs.readFileSync(keyFile, 'utf8');

	const form = new FormData();
	form.append('origin', 'executor');
	form.append('executionNumber', executionNumber);
	form.append('key', key);
	form.append('file', fs.createReadStream(LOG_FILE));

	const response = await sendPostRequest("upload_logs", form, authInfo.token, url );
	if(!response){
		console.log("sendFeedback: Error sending data to Muuktest");
	}
}

// sendFiles
// function to send a file to MuukTest
// params
//     - route (string) - MuukTest route 
//     - directory (string) - folder where we need to search for the files
//     - token (string) - token used to connect to MuukTest
//     - fileType (string) - png for images or webm for videos,
//     - url (string) - URL used to connect to the server
// returns
//     - result (boolean) true if no error false otherwise
async function sendFiles(route, directory, token, fileType, url){ 
	let result = true;
	const form = new FormData();
	const files = await readFiles(directory, fileType);    
	if(files){
		for (const file of files) {
			try {
				form.append('file', fs.createReadStream(directory + file));
			} 
			catch (err) {
				 console.log("sendFile: Error reading file ", file, " exception: ", err);
			}
		}

		try{
			// Send the screenshots to MuukTest
			const response = await sendPostRequest(route, form, token, url);
			if(!response){
				console.log("sendFile: Error sending data to Muuktest");
				result = false;
			}
		} 
		catch (err) {
			//console.log("sendFile: Error sending data to Muuktest but as this is video, this is expected");
		}
	}
}

// sendFile
// function to send a file to MuukTest
// params
//     - route (string) - MuukTest route 
//     - directory (string) - folder where we need to search for the files
//     - token (string) - token used to connect to MuukTest
//     - fileType (string) - png for images or webm for videos,
//     - url (string) - URL used to connect to the server
// returns
//     - result (boolean) true if no error false otherwise
async function sendFile(route, file, token, url){ 
	let result = true;
	const form = new FormData();
	try{
		if (fs.existsSync(file)) {
			form.append('file', fs.createReadStream(file));
			
			// Send the screenshots to MuukTest
			const response = await sendPostRequest(route, form, token, url);
			if(!response){
				console.log("sendFile: Error sending data to Muuktest");
				result = false;
			}
		}
	} 
	catch (err) {
		//console.log("sendFile: Error sending data to Muuktest but as this is video, this is expected");
	}
}

// readFiles
// function to read files from file system
// params
//     - dirname (string) - folder containing the files to read 
//     - fileType (string) - png for images or webm for videos
// returns
//     - result (boolean) true if no error false otherwise
async function readFiles(dirname: string, fileType: string) {
	const fileArray: string[] = [];
	const files = await fsp.readdir(dirname);
	const pngImages = files.filter(file => path.extname(file) === fileType);
	for (const filename of pngImages) {
		fileArray.push(filename);
	}
	return fileArray;
}

// sendPostRequest
// function to send a post request to MuukTest 
// params
//     - request (string) - API name we are calling 
//     - json (object) - data to send to Muuktest
//     - token (string) - token used to connect to MuukTest
//     - url (string) - URL used to connect to the server
// returns
//     - result (boolean) true if no error false otherwise
async function sendPostRequest(request, json, token, url){

	const response:any={
		success: false,
		data: {}
	}

	const localhostOptions = {
		baseURL: url,
		httpsAgent: new https.Agent({
				rejectUnauthorized: false,
		})
	}

	const prductionOptions = {
		baseURL: url
	}

	const axiosInstance = axios.create(url.includes("localhost") ? localhostOptions : prductionOptions);

	// Send this information back to MuukTest to report test execution result.
	const options = {
		headers: {
			'Authorization': 'Bearer ' + token
		}
	};
	
	const { data: responseData } = await axiosInstance.post(
		request, 
		json, 
		options
	);

	if(!responseData){
		console.log("sendPostRequest failed to send data to MuukTest!");
	}
	else{
		response.success = true;
		response.data = responseData;
	}

	return response;
}

// getToken
// function to get Muuktest token 
// params
//     - url (string) - URL used to connect to the server
// returns
//     - response (object) contains MuukTest authentication information
async function getToken(url){

	const keyFile = "./test/key.pub";
	const response = {
		token: '',
		userId: '',
		organizationId: '',
		success: false
	};

	const localhostOptions = {
		baseURL: url,
		httpsAgent: new https.Agent({
				rejectUnauthorized: false,
		})
	}

	const prductionOptions = {
		baseURL: url
	}

	const axiosInstance = axios.create( url.includes("localhost") ? localhostOptions : prductionOptions );
	try{
		if (fs.existsSync(keyFile)) {
			// Read key file from local directory.
			const key = fs.readFileSync(keyFile, 'utf8');
			if(key){
				const json = {'key': key};
				const result = await axiosInstance.post(
					"generate_token_executer", 
					json	
				);
				response.token = result.data.token;
				response.userId = result.data.userId;
				response.organizationId = result.data.organizationId;
				response.success = true;
			}else{
				response.success = false;
				console.log("Failed to send feedback to MuukTest as key was not found!");
			}
		}
		else{
			response.success = false;
			console.log("Failed to send feedback to MuukTest as key was not found!");
		}
	}
	catch (err) {
		console.log("Error = ", err);
	}

	return response;
}

// getNextExecutionNumber
// function to get the next execution number from Muuktest
// params
//     - classNames (array) - array of classnames to be executed
//     - url (string) - URL used to connect to the server
//     - userId (string) - User executing the test
//     - token (string) - token obtained during authentication
// returns
//     - executionNumber (int) execute number to use
async function getNextExecutionNumber(url, classNames, userId, token){ 
	let executionNumber = -1;
	  let response: any={
		  success: false,
		  data: {}
	  }
	const execInformation = await getExecutionInformation();
	if(execInformation.exists){
	  executionNumber = execInformation.executionNumber;
	}
	else{
		const json = 
		{
			'userId': userId, 
			'classNames': classNames
		}
		
		response = await sendPostRequest("get_execution_number", json, token, url);
		if(!response.success){
			console.log("sendFeedback: Error sending data to Muuktest");
		}
		else{
			executionNumber = response.data.executionNumber;
		}
	}
  return executionNumber;
}


//Function used to detect if executionInformation file already exists
//takes no parameters and return an object with the following properties:
// exists: false,
// executionNumber: 0,
// origin: '',
// originId: '',
// scheduleExecutionNumber: 0
async function getExecutionInformation(){
	const result = {
	  exists: false,
	  executionNumber: 0,
	  origin: '',
	  originId: '',
	  scheduleExecutionNumber: 0
	}
  const path = './executionInformation.json';
  try {
    if (fs.existsSync(path)) {
      const rawdata = fs.readFileSync(path);
      const executionData = JSON.parse(rawdata);
      if(executionData){
        result.exists = true;
        result.executionNumber = executionData.executionNumber;
        result.origin = executionData.origin;
        result.originId = executionData.originId;
        result.scheduleExecutionNumber = executionData.scheduleExecutionNumber;
      }
    }
  } 
  catch(err) {
    console.error('An error ocurred while trying to read the executionInformation.json file', err);
  }
  return result;
}

// Function used to extract class names from Test files found under the /test directory. This
// funcion is only called when detecting a compilation error and there is no test information
// so we need to extract class names from files.  
async function extractClassNameFromTestFile(fileName: string){
	let extractedClass = "";
	const regex = /test\('([^']+)'/; 

	// read file until the class name can be extracted
	const fileContent = fs.readFileSync(fileName, 'utf-8');
	for (const line of fileContent.split('\n')) {
		const match = line.match(regex);
		if (match && match[1]) {
			extractedClass = match[1];
			console.log(extractedClass);
			break;
		}
	}

	return extractedClass;
}

// This function deletes a file from the file system.
async function deleteFile(file){
	try {
		// Synchronously delete the file
		fs.unlinkSync(file);
	} catch (err) {
		console.error(`Error deleting the file: ${err.message}`);
	}
}
export {
	sendExecutionResults,
	sendVideo,
	getToken,
	getNextExecutionNumber,
	readHostFile,
	extractClassNameFromTestFile
}
