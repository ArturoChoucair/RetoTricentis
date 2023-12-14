import { Locator, Page, test, expect } from '@playwright/test';
import MuukLocator from './MuukLocator';
const fs = require('fs');

export default class MuukReport {
  readonly className: string;
  currentStep: any = {};
  stepsFeedback: any = [];

  constructor(className: string) {
    this.className = className;
  }
  
  async addStepInfo(type:string="", id:number, url:string="", selector:string="", selectorToUse:number=-1, tag:string="", objType:string="", action:string="", value:string="", attributes:string=""){
    this.currentStep =  
      {
        type: type,
        id: id,
        url: url,
        selectors: selector,
        selectorToUse: selectorToUse,
        tag: tag,
        objType: objType,
        action: action,
        value: value.replace(/\n/g, "\\n").replace(/\t/g, "\\t"),
        attributes: attributes,
        jsClick: "false",
        stepCompleted:"false",
        exceptions: []
      };
  }

  async saveStep(completed:boolean = false){
    if(completed){
      this.currentStep.stepCompleted = "true";
    } 
    this.stepsFeedback.push(this.currentStep);
    this.currentStep = {};
  }

  async addSnippetValidationValue(value: any){
    this.currentStep.snippetValidationValue = value;
  }

  async createReportFile(){
    await this.saveStep(false);

    const filePath = "test/" + this.className + ".json";
    const jsonData = JSON.stringify(this.stepsFeedback, null, 2); 
    fs.writeFileSync(filePath, jsonData, 'utf8');
  }

}

