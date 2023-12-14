const fs = require('fs');
import xpath from 'xpath';
import { DOMParser } from '@xmldom/xmldom';
const DOM_PATH = "test-results/";  


const UNKNOWN_ERROR = 1;
const NO_TAG_PROVIDED_BY_BE = 2;
const NO_VALUE_PROVIDED_BY_BE = 3;
const NO_SEARCH_TYPE_PROVIDED_BY_BE = 4;
const ACTION_NOT_VALID_FOR_ANALYSIS = 5;
const STEP_INDEX_GREATER_THAN_NUMBER_OF_SELECTORS_FOUND = 6;
const ONE_SELECTOR_FOUND_FOR_NTAGSELECTOR = 7;
const NO_SELECTOR_FOUND_WITH_SPECIFIC_VALUE = 8;
const SELECTOR_FOUND_WITH_CORRECT_INDEX = 9;
const SELECTOR_FOUND_WITH_INCORRECT_INDEX = 10;  
const MULTIPLE_SELECTORS_FOUND_WITH_EXPECTED_VALUE_CORRECT_INDEX = 11;
const MULTIPLE_SELECTORS_FOUND_WITH_EXPECTED_VALUE_INCORRECT_INDEX = 12;
const NO_SELECTOR_FOUND_WITH_NTAGSELECTOR = 13;
const SELECT_ELEMENT_INCORRECT_VALUE = 14;
const SELECTOR_BUILD_FROM_ATTRIBUTES = 15;

async function obtainXPATHFeedbackFromDOM(
  classname: string,
  stepId: number,
  selector: string,
  index: number,
  tag: string,
  type: string, 
  action: string,
  searchInfo: any, 
  attributes: any[], 
  selector_type: number) {
    
    console.log(`\n\n\nStarting CSS analysis for SELECTORS_ARRAY_NAMES[${selector_type}] selector ${selector} with index ${index} on step ${stepId}`);
    let jsonObject: any = {};
    let returnCode = 0;
    const filename = `${DOM_PATH}${classname}_${stepId}.html`;
    if (fs.existsSync(filename)) {
      try {
        const html = fs.readFileSync(filename, 'utf8');
        const doc = new DOMParser({
          errorHandler: {
            warning: function (w) { }, 
            error: function (e) { }, 
            fatalError: function (e) { console.error(e) } 
          }
        }).parseFromString(html);

        if (!selector) {
          console.log('No XPATH selector found, let\'s build from attributes');
          return buildXPATHSelector(tag, attributes, doc);
        } 
        else {
          const htmlElementsFound: any = xpath.select(selector, doc);
          const numberSelectorsFound = htmlElementsFound.length;
    
          if (action === 'mouseover') {
            const element: any = {};
            element.selector = selector;
            element.index = index;

            jsonObject.selectors = element;
            jsonObject.rc = ACTION_NOT_VALID_FOR_ANALYSIS;
            jsonObject.numberOfElementsFoundWithSelectorAndValue = 0;
          } 
          else {
            if (numberSelectorsFound === 0) {
              console.log(`Found ${numberSelectorsFound} selectors and no value to filter, let's build from attributes`);
              return buildXPATHSelector(tag, attributes, doc);
            } 
            else if (numberSelectorsFound === 1) {
              const element: any = {};
              element.selector = selector;
              if (index > 0) {
                element.index = 0;
                returnCode = SELECTOR_FOUND_WITH_INCORRECT_INDEX;
              } 
              else {
                element.index = index;
                returnCode = ONE_SELECTOR_FOUND_FOR_NTAGSELECTOR;
              }
  
              jsonObject.selectors = element;
              jsonObject.numberOfElementsFoundWithSelectorAndValue = numberSelectorsFound;
              jsonObject.rc = returnCode;
            } 
            else if (numberSelectorsFound > 1) {
              const element: any = {};
              element.selector = selector;
              element.index = index;
              returnCode = ONE_SELECTOR_FOUND_FOR_NTAGSELECTOR;
  
              jsonObject.selectors = element;
              jsonObject.numberOfElementsFoundWithSelectorAndValue = numberSelectorsFound;
              jsonObject.rc = returnCode;
            }
          }
  
          jsonObject.numberOfElementsFoundWithSelector = numberSelectorsFound;
        
        }
      } catch (ex) {
        console.error(ex);
      }
    }
    return jsonObject;
  
}

function buildXPATHSelector(tag: string, attributes: any, doc: any): any {
  const jsonObject: any = {};
  let textUsedOnSelector = false;
  let selector = `//${tag}`;

  if (attributes["id"] !== "false" && attributes["id"] !== "undef") {
    const elementsWithId: any = xpath.select(`//${tag}[@id='${attributes["id"]}']`, doc);
    if (elementsWithId.length > 0) {
      selector = `${selector}[@id='${attributes["id"]}']`;
    }
  }

  if (attributes["name"] !== "undef") {
    const elementsWithName: any = xpath.select(`//${tag}[@name='${attributes["name"]}']`, doc);
    if (elementsWithName.length > 0) {
      selector = `${selector}[@name='${attributes["name"]}']`;
    }
  }

  if (attributes["type"] !== "undef") {
    const elementsWithType: any = xpath.select(`//${tag}[@type='${attributes["type"]}']`, doc);
    if (elementsWithType.length > 0) {
      selector = `${selector}[@type='${attributes["type"]}']`;
    }
  }

  if (attributes["text"] && attributes["text"] !== "undef" && attributes["text"].length > 0) {
    textUsedOnSelector = true;
    let text = attributes["text"];
    let innerHTMLText = "";

    // Query all tag elements and get their innerText to compare and then build the xpath
    const elements: any = xpath.select("//" + tag, doc);
    let elementIndex = -1;
    for (const element of elements) {
      if (element.textContent === text) {
        elementIndex++;
        text = element.textContent;
        innerHTMLText = element.innerHTML;
      }
    }

    const splittedText = text.split("\n");
    if (splittedText.length > 1 || (innerHTMLText !== "" && innerHTMLText !== text)) {
      // If we are using normalize-space, we need to use the complete text but we need to escape invalid characters.

      text = text.replace("\n", " ");
      text = text.replace("'", "\'");
      text = text.replace("$", '\\$');
      text = text.trim();

      selector = `${selector}[normalize-space() = "${text}"]`;
      try {
        const htmlElementsFound = xpath.select(selector, doc);
      } catch (ex) {
        // If we failed to obtain selectors, let's use only the tag and the index
        selector = `//${tag}`;
        const element: any = {};
        element.selector = selector;
        element.index = elementIndex;
        jsonObject.selectors = element;
        jsonObject.numberOfElementsFoundWithSelector = 1;
        jsonObject.numberOfElementsFoundWithSelectorAndValue = 1;
        jsonObject.rc = NO_SELECTOR_FOUND_WITH_NTAGSELECTOR;
        return jsonObject;
      }
    } 
    else {
      if (attributes["text"].length > 40) {
        text = attributes["text"].substring(0, 40);
      }

      // Some characters will cause problems on the XPATH expression when using contains, we need to escape the following characters:
      text = text.replace("$", '\\$');
      text = text.replace("'", "\'");
      text = text.trim();

      selector = `${selector}[contains(text(),"${text}")]`;
      try {
        const htmlElementsFound = xpath.select(selector, doc);
      } catch (ex) {
        selector = `//${tag}`;
        const element: any = {};
        element.selector = selector;
        element.index = elementIndex;
        jsonObject.selectors = element;
        jsonObject.numberOfElementsFoundWithSelector = 1;
        jsonObject.numberOfElementsFoundWithSelectorAndValue = 1;
        jsonObject.rc = NO_SELECTOR_FOUND_WITH_NTAGSELECTOR;
        return jsonObject;
      }
    }
  }

  const htmlElementsFound: any = xpath.select(selector, doc);
  const numberHtmlElementsFound = htmlElementsFound.length;

  if (numberHtmlElementsFound === 0) {
    const element: any = {};
    element.selector = selector;
    element.index = 0;
    jsonObject.selectors = element;
    jsonObject.numberOfElementsFoundWithSelector = 0;
    jsonObject.numberOfElementsFoundWithSelectorAndValue = 0;
    jsonObject.rc = NO_SELECTOR_FOUND_WITH_NTAGSELECTOR;
  } 
  else if (numberHtmlElementsFound === 1) {
    const element: any = {};
    element.selector = selector;
    element.index = 0;
    jsonObject.selectors = element;
    jsonObject.rc = SELECTOR_BUILD_FROM_ATTRIBUTES;
    jsonObject.numberOfElementsFoundWithSelector = 1;
    jsonObject.numberOfElementsFoundWithSelectorAndValue = 1;
  } 
  else if (numberHtmlElementsFound > 1 || textUsedOnSelector) {
    const element: any = {};
    element.selector = selector;
    element.index = 0;
    jsonObject.selectors = element;
    jsonObject.rc = SELECTOR_BUILD_FROM_ATTRIBUTES;
    jsonObject.numberOfElementsFoundWithSelector = numberHtmlElementsFound;
    jsonObject.numberOfElementsFoundWithSelectorAndValue = numberHtmlElementsFound;
  }

  return jsonObject;
}



export {
	obtainXPATHFeedbackFromDOM
}
