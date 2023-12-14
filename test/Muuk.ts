import { Locator, Page, test, expect } from '@playwright/test';
import MuukLocator from './MuukLocator';
import MuukReport from './MuukReport';
import * as fs from 'fs';

export default class Muuk {
  page: Page;
  readonly screnshotPath: string = 'test-results/';
  readonly className: string;
  readonly authenticationFile: string = 'auth.json';
  readonly muukReport: MuukReport;

  constructor(page: Page, className: string, muukReport: MuukReport) {
    this.page = page;
    this.className = className;
    this.muukReport = muukReport;
  }

  async updatePage(page: Page){
    this.page = page;
 }

  async onAssignment(locatorData: MuukLocator,  stepNumber: number, screenShotPosition: string, value: string, type: string){
    await test.step(`Step ${stepNumber}`, async () => {
      console.log(`step:${stepNumber}`);
      const locator = this.page.locator(locatorData.selector).nth(locatorData.index);
      await this.takeDOMSnapshot(stepNumber);
      if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
      if(type === "checkbox" || type == "radio"){
        await locator.check(); 
      }
      else if(type === 'select'){
        await locator.selectOption(value);
      }
      else{
        await locator.fill(value);
      }
      if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
      await this.muukReport.saveStep(true);
    });
  }

  async onClick(locatorData: MuukLocator, stepNumber: number, screenShotPosition: string, value: string, assert: string){
    return await test.step(`Step ${stepNumber}`, async () => {
      console.log(`step:${stepNumber}`);
      const locator = this.page.locator(locatorData.selector).nth(locatorData.index);
      await this.takeDOMSnapshot(stepNumber);
      if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
      const textValue = await locator.textContent();
      await this.verification(locator, value, assert);
      await locator.click();
      if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
      await this.muukReport.saveStep(true);
      return textValue;
    });
  }

  async onMouseover(locatorData: MuukLocator, stepNumber: number, screenShotPosition: string, value: string, assert: string){
    return await test.step(`Step ${stepNumber}`, async () => {
      console.log(`step:${stepNumber}`);
      const locator = this.page.locator(locatorData.selector).nth(locatorData.index);
      await this.takeDOMSnapshot(stepNumber);
      if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
      const textValue = await locator.textContent();
      await this.verification(locator, value, assert);
      await locator.hover();
      if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
      await this.muukReport.saveStep(true);
      return textValue;
    });
  }

  async onSleep(stepNumber: number, screenShotPosition: string, value: number){
    await test.step(`Step ${stepNumber}`, async () => {
      console.log(`step:${stepNumber}`);
      await this.takeDOMSnapshot(stepNumber);
      if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
      await this.page.waitForTimeout(value * 1000);
      if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
      await this.muukReport.saveStep(true);
    });
  }

  async onJSSnippet(stepNumber: number, screenShotPosition: string, snippet, type: string, valueToValidate, param: string){
    return await test.step(`Step ${stepNumber}`, async () => {
      console.log(`step:${stepNumber}`);
      let result;
      await this.takeDOMSnapshot(stepNumber);
      if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
      if(type === 'execution'){
        if(param && param.length > 0)
          result = await this.page.evaluate(snippet, param);
        else
          result = await this.page.evaluate(snippet);
      }
      else{
        if(param && param.length > 0)
          result = await this.page.evaluate(snippet, param);
        else
          result = await this.page.evaluate(snippet);
        
        await this.muukReport.addSnippetValidationValue(result.toString())
        expect(result).toEqual(valueToValidate);
      }
      if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
      await this.muukReport.saveStep(true);
      return result;
    });
  }

  async noAction(locatorData: MuukLocator, stepNumber: number, screenShotPosition: string, value: string, assert: string){
    return await test.step(`Step ${stepNumber}`, async () => {
      console.log(`step:${stepNumber}`);
      const locator = this.page.locator(locatorData.selector).nth(locatorData.index);
      await this.takeDOMSnapshot(stepNumber);
      if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
      const textValue = await locator.textContent();
      await this.verification(locator, value, assert);
      if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
      await this.muukReport.saveStep(true);
      return textValue;
    });
  }

  async onSendKeys(locatorData: MuukLocator, stepNumber: number, screenShotPosition: string, value: string){
    return await test.step(`Step ${stepNumber}`, async () => {
      console.log(`step:${stepNumber}`);
      const locator = this.page.locator(locatorData.selector).nth(locatorData.index);
      await this.takeDOMSnapshot(stepNumber);
      if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
      const textValue = await locator.textContent();
      await locator.type(value);
      if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
      await this.muukReport.saveStep(true);
      return textValue;
    });
  }

  async onPressEnter(locatorData: MuukLocator, stepNumber: number, screenShotPosition: string){
    return await test.step(`Step ${stepNumber}`, async () => {
      console.log(`step:${stepNumber}`);
      const locator = this.page.locator(locatorData.selector).nth(locatorData.index);
      await this.takeDOMSnapshot(stepNumber);
      if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
      const textValue = await locator.textContent();
      await locator.press('Enter');
      if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
      await this.muukReport.saveStep(true);
      return textValue;
    });
  }
  
  async takeScreenshot(stepNumber: number){
    await this.page.screenshot({ 
      path: `${this.screnshotPath}${this.className}_${stepNumber}.png`,
      fullPage: false
    });
  }

  async takeDOMSnapshot(stepNumber: number){
    try {
      await this.page.waitForLoadState('domcontentloaded');
      const htmlContent = await this.page.content();
      fs.writeFileSync(`${this.screnshotPath}${this.className}_${stepNumber}.html`, htmlContent, 'utf8');
    } catch (err) {
      console.error("Failed to create DOM snapshot. Error: ", err);
    }
  }

  async verification(locator: Locator, value: string, assert: string){
    if(assert === 'equal'){
      await expect(locator).toHaveText(value);
    }
    else if(assert === 'notequal'){
      await expect(locator).not.toHaveText(value);
    }
  }

  async deleteBrowserStateFile(){
    try {
      fs.unlinkSync(this.authenticationFile);
    } catch (err) {
      console.error(err);
    }
  }

  async onDownloadFile(locatorData: MuukLocator, stepNumber: number, value: string ){
    return await test.step(`Step ${stepNumber}`, async () => {
      console.log(`step:${stepNumber}`);
      await this.takeDOMSnapshot(stepNumber);
      const locator = this.page.locator(locatorData.selector).nth(locatorData.index);
      const textValue = await locator.textContent();
      const downloadPromise =  this.page.waitForEvent('download');
      await locator.click();
      const download = await downloadPromise;
      const fileName = value || download.suggestedFilename();
      await download.saveAs('./downloads/' + fileName);
      return textValue;
    });
  }

  async onRandomValue(locatorData: MuukLocator,  stepNumber: number, screenShotPosition: string, value: string){
    await test.step(`Step ${stepNumber}`, async () => {
      console.log(`step:${stepNumber}`);
      const locator = this.page.locator(locatorData.selector).nth(locatorData.index);
      const textToFill = value;
      await this.takeDOMSnapshot(stepNumber);
      await locator.fill(textToFill);
      if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    });
  }

}

