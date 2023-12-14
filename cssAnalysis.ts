const fs = require('fs');
import * as cheerio from 'cheerio';
const DOM_PATH = "test-results/";   

const UNKNOWN_ERROR = 1 
const NO_TAG_PROVIDED_BY_BE = 2
const NO_VALUE_PROVIDED_BY_BE = 3
const NO_SEARCH_TYPE_PROVIDED_BY_BE = 4
const ACTION_NOT_VALID_FOR_ANALYSIS = 5
const STEP_INDEX_GREATER_THAN_NUMBER_OF_SELECTORS_FOUND = 6
const ONE_SELECTOR_FOUND_FOR_NTAGSELECTOR = 7
const NO_SELECTOR_FOUND_WITH_SPECIFIC_VALUE = 8  
const SELECTOR_FOUND_WITH_CORRECT_INDEX = 9
const SELECTOR_FOUND_WITH_INCORRECT_INDEX = 10  
const MULTIPLE_SELECTORS_FOUND_WITH_EXPECTED_VALUE_CORRECT_INDEX = 11 
const MULTIPLE_SELECTORS_FOUND_WITH_EXPECTED_VALUE_INCORRECT_INDEX = 12
const NO_SELECTOR_FOUND_WITH_NTAGSELECTOR = 13
const SELECT_ELEMENT_INCORRECT_VALUE = 14
const SELECTOR_BUILD_FROM_ATTRIBUTES = 15

const CLASSIC_SELECTOR    = 0
const DYMANIC_SELECTOR    = 1
const CUSTOM_CSS_SELECTOR = 2
const XPATH_SELECTOR      = 3

const SELECTORS_ARRAY =  [CLASSIC_SELECTOR, DYMANIC_SELECTOR, CUSTOM_CSS_SELECTOR ]
const SELECTORS_ARRAY_NAMES =  ["CLASSIC_SELECTOR", "DYMANIC_SELECTOR", "CUSTOM_CSS_SELECTOR" ]

async function analyzeCSSSelector(
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
    const filename = `${DOM_PATH}${classname}_${stepId}.html`;
    if (fs.existsSync(filename)) {
      try {
        const searchType = searchInfo.searchType;
        const value = searchInfo.value;
        const html = fs.readFileSync(filename, 'utf8');
        const $ = cheerio.load(html);
  
        if (selector === null) {
          if (selector_type === CUSTOM_CSS_SELECTOR) {
            console.log('NO CSS Selector, need to build it');
            return await buildCSSSelector(tag, attributes, searchInfo, 0, $);
          }
        } else {
         
          const selectorsFound: any = $(selector);
          const numberSelectorsFound = selectorsFound.length;
  
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
              console.log("No elements were found");
              if (attributes && selector_type === CUSTOM_CSS_SELECTOR) {
                return await buildSelectorFromAttributes(tag, attributes, $);
              } 
              else {
                const element: any = {};
                element.selector = selector;
                element.index = index;
                jsonObject.selectors = element;
                jsonObject.numberOfElementsFoundWithSelectorAndValue = 0;
                jsonObject.rc = NO_SELECTOR_FOUND_WITH_NTAGSELECTOR;
              }
            } 
            else if (numberSelectorsFound === 1) {
              const element: any = {};
              element.selector = selector;

              if (searchType === 'value' && $(selectorsFound[0]).val()) {
                element.value = $(selectorsFound[0]).val();
              } 
              else if (searchType === 'href' && $(selectorsFound[0]).attr("href")) {
                element.value = $(selectorsFound[0]).attr("href");
              } 
              else if (searchType === 'text') {
                element.value = $(selectorsFound[0]).text();
              } 
              else if (searchType === 'imgsrc' && $(selectorsFound[0]).attr("src")) {
                element.value = $(selectorsFound[0]).attr("src");
              } 
              else {
                element.value = value;
              }
  
              if (index > 0) {
                element.index = 0;
  
                if (searchType === 'value' && selectorsFound[0].attribs.value) {
                  element.value = $(selectorsFound[0]).attr("value");
                } 
                else if (searchType === 'href' && selectorsFound[0].attribs.href) {
                  element.value = $(selectorsFound[0]).attr("href");
                } 
                else if (searchType === 'text') {
                  element.value = $(selectorsFound[0]).text();
                } 
                else if (searchType === 'imgsrc' && selectorsFound[0].attribs.src) {
                  element.value = $(selectorsFound[0]).attr("src");
                } 
                else {
                  element.value = value;
                }
  
                const returnCode = SELECTOR_FOUND_WITH_INCORRECT_INDEX;
                jsonObject.selectors = element;
                jsonObject.numberOfElementsFoundWithSelectorAndValue = numberSelectorsFound;
                jsonObject.rc = returnCode;
              } 
              else {
                element.index = index;
                const returnCode = ONE_SELECTOR_FOUND_FOR_NTAGSELECTOR;
                jsonObject.selectors = element;
                jsonObject.numberOfElementsFoundWithSelectorAndValue = numberSelectorsFound;
                jsonObject.rc = returnCode;
              }
            } else if (numberSelectorsFound > 1) {

              console.log("Found more than one result");
              if (value !== 'undef') {
                if (searchType === 'value') {
                  jsonObject = parseValueSelector(selector, selectorsFound, searchInfo, index, tag, $);
                } 
                else if (searchType === 'href') {
                  jsonObject =  parseHypertextSelector(selector, selectorsFound, searchInfo, index, tag, $);
                } 
                else if (searchType === 'text') {
                  jsonObject =  parseTextSelector(selector, selectorsFound, searchInfo, index, tag, $);
                } 
                else if (searchType === 'imgsrc') {
                  jsonObject =  parseImageSelector(selector, selectorsFound, searchInfo, index, tag, $);
                }
                else {
                  const element: any = {};
                  element.selector = selector;
                  element.index = index;
                  jsonObject.selectors = element;
                  jsonObject.rc = NO_SEARCH_TYPE_PROVIDED_BY_BE;
                  jsonObject.numberOfElementsFoundWithSelectorAndValue = 0;
                }
              } 
              else {
                if (attributes.length > 0 && selector_type === CUSTOM_CSS_SELECTOR) {
                  console.log(`Found ${numberSelectorsFound} selectors and no value to filter, let's build from attributes`);
                  //return findIndexFromAttributes(selector, tag, attributes, $);
                } else {
                  const element: any = {};
                  element.selector = selector;
                  element.index = index;
                  jsonObject.selectors = element;
                  jsonObject.rc = NO_SEARCH_TYPE_PROVIDED_BY_BE;
                  jsonObject.numberOfElementsFoundWithSelectorAndValue = 0;
                }
              }
            }
            jsonObject.numberOfElementsFoundWithSelector = numberSelectorsFound;
          }
        }
      } catch (ex) {
        console.error(ex);
      }
    }

    return jsonObject;
  
}


// Description:
//   This function will be called when the selector string returns 0 elements. It means the selector that we have is not working and we need to 
//   build a new one. This function will will verify the object's attributes and validate an HTML element
//   exists using this attribute before adding it to the selector string.
//
// Parameters: 
//    tag: HTML tag of the element 
//    attributes: Object's attributes (name, id, type, etc)
//    soup: (BeautifulSoup object to query HTML DOM)
// Returns:
//    CSS selector
//
async function buildSelectorFromAttributes(tag: string, attributes: any, cheerio: any) {
  const jsonObject: any = {};

  // Start building the CSS selector
  let selector = tag;

  if (attributes.id !== 'false' && attributes.id !== 'undef') {
    if (cheerio(tag + `[id='${attributes.id}']`).length > 0) {
      selector = selector + `[id='${attributes.id}']`;
    }
  }

  if (attributes.name !== 'undef') {
    if (cheerio(tag + `[name='${attributes.name}']`).length > 0) {
      selector = selector + `[name='${attributes.name}']`;
    }
  }

  if (attributes.type !== 'undef') {
    if (cheerio(tag + `[type='${attributes.type}']`).length > 0) {
      selector = selector + `[type='${attributes.type}']`;
    }
  }

  const selectorsFound = cheerio(selector);
  const numberSelectorsFound = selectorsFound.length;
  let index = 0;
  let selectorsWithTextIndex = 0;

  let bFoundWithText = false;

  if (numberSelectorsFound > 1 && attributes.text !== 'undef') {
    for (let i = 0; i < selectorsFound.length; i++) {
      if (selectorsFound.eq(i).text() === attributes.text) {
        selectorsWithTextIndex = index;
        bFoundWithText = true;
        break;
      }
      index++;
    }
  }

  if (numberSelectorsFound === 0) {
    const element: any = {};
    element.selector = selector;
    element.index = index;
    jsonObject.selectors = element;
    jsonObject.numberOfElementsFoundWithSelector = 0;
    jsonObject.numberOfElementsFoundWithSelectorAndValue = 0;
    jsonObject.rc = NO_SELECTOR_FOUND_WITH_NTAGSELECTOR;
  } 
  else if (numberSelectorsFound === 1 || bFoundWithText) {
    const element: any = {};
    element.selector = selector;
    element.index = selectorsWithTextIndex;
    jsonObject.selectors = element;
    jsonObject.rc = SELECTOR_BUILD_FROM_ATTRIBUTES;
    jsonObject.numberOfElementsFoundWithSelector = 0;
    jsonObject.numberOfElementsFoundWithSelectorAndValue = 1;
  }

  return jsonObject;
}

// Description:
//   This function will be called when the object DOES NOT HAVE a selector string, so we need to build it from scratch. 
//   This function will verify the object's attributes and validate an HTML element
//   exists using this attribute before adding it to the selector string.
//
// Parameters: 
//    tag: HTML tag of the element 
//    attributes: Object's attributes (name, id, type, etc)
//    soup: (BeautifulSoup object to query HTML DOM)
// Returns:
//    CSS selector
//
async function buildCSSSelector(tag: string, attributes: any, searchInfo: any, index: number, cheerio: any) {
  let jsonObject: any = {};
  let cssSelector = tag;
  const searchType = searchInfo.searchType;
  const value = searchInfo.value;

  if (attributes.id !== 'false' && attributes.id !== 'undef') {
    if (cheerio(tag + `[id='${attributes.id}']`).length > 0) {
      cssSelector = `${cssSelector}[id = '${attributes.id}']`;
    }
  }
  if (attributes.name !== 'undef') {
    if (cheerio(tag + `[name='${attributes.name}']`).length > 0) {
      cssSelector = `${cssSelector}[name = '${attributes.name}']`;
    }
  }
  if (attributes.type !== 'undef') {
    if (cheerio(tag + `[type='${attributes.type}']`).length > 0) {
      cssSelector = `${cssSelector}[type = '${attributes.type}']`;
    }
  }

  const htmlElementsFound = cheerio(cssSelector);
  const numberElementsFound = htmlElementsFound.length;
  console.log(`buildCSSSelector - Found ${numberElementsFound} with selector ${cssSelector}`);

  if (numberElementsFound === 1) {
    const element: any = {};
    element.selector = cssSelector;
    element.index = 0;
    jsonObject.selectors = element;
    jsonObject.rc = SELECTOR_BUILD_FROM_ATTRIBUTES;
    jsonObject.numberOfElementsFoundWithSelector = 1;
    jsonObject.numberOfElementsFoundWithSelectorAndValue = 1;
  } 
  else if (numberElementsFound > 1) {
    if (searchType === 'value') {
      jsonObject = parseValueSelector(cssSelector, htmlElementsFound, searchInfo, index, tag, cheerio);
    } 
    else if (searchType === 'href') {
      jsonObject = parseHypertextSelector(cssSelector, htmlElementsFound, searchInfo, index, tag, cheerio);
    } 
    else if (searchType === 'text') {
      jsonObject = parseTextSelector(cssSelector, htmlElementsFound, searchInfo, index, tag, cheerio);
    } 
    else if (searchType === 'imgsrc') {
      jsonObject = parseImageSelector(cssSelector, htmlElementsFound, searchInfo, index, tag, cheerio);
    } 
    else {
      const element: any = {};
      element.selector = cssSelector;
      element.index = index;
      jsonObject.selectors = element;
      jsonObject.rc = NO_SEARCH_TYPE_PROVIDED_BY_BE;
      jsonObject.numberOfElementsFoundWithSelectorAndValue = 0;
    }
  } else {
    const element: any = {};
    element.selector = '';
    element.index = 0;
    jsonObject.selectors = element;
    jsonObject.rc = SELECTOR_BUILD_FROM_ATTRIBUTES;
    jsonObject.numberOfElementsFoundWithSelector = 0;
    jsonObject.numberOfElementsFoundWithSelectorAndValue = 0;
  }

  return jsonObject;
}

// Description:
//   This method will be called when two or more selectors were found with
//   the same ntagselector value. This method will use the href value attribute  
//   to filter the selctors and try to find the one that was used by the test.
//
// Parameters:
//    selector: selector string 
//    htmlElements: Array of htmlElements found with the same selector.
//    searchInfo: Object containing infromation related to the DOM analysis (value to find, element type, etc.).
//    expectedIndex: The index that is expected to contain the expected value. 
// 
// Returns:
//    jsonObject with the number of selectors found, the selctors and the return code. 
function parseHypertextSelector(selector: string, elementsFound: any, searchInfo: any, expectedIndex: number, tag: string, che: any) {
  const jsonObject: any = {};
  const indexesFound: number[] = [];
  const filteredIndexes: number[] = [];
 
  let numberElementsFoundWithValue = 0;
  const expectedValue = searchInfo.value;
  const expectedText = searchInfo.text || '';

  if (expectedValue === '') {
    const element: any = {
      index: expectedIndex,
      selector,
    };
    jsonObject.numberOfElementsFoundWithSelectorAndValue = 0;
    jsonObject.selectors = element;
    jsonObject.rc = NO_VALUE_PROVIDED_BY_BE;
    return jsonObject;
  }

  for (let i = 0; i < elementsFound.length; i++) {
    const element = elementsFound[i];
    const href = che(element).attr("href") || null;
    if(href){
      if ( href === expectedValue) {
        numberElementsFoundWithValue += 1;
        indexesFound.push(i);
      }
    }
  }

  // If more than 1 element was found using the same value, let's filter now by text and update
  // the indexesFound with the new indexes (hopefully only one!).
  if (numberElementsFoundWithValue > 1 && expectedText !== '') {
    indexesFound.forEach((i) => {
      if (elementsFound.eq(i).text() === expectedText) {
        filteredIndexes.push(i);
      }
    });

    if (filteredIndexes.length > 0) {
      indexesFound.length = 0;
      numberElementsFoundWithValue = filteredIndexes.length;
      filteredIndexes.forEach((index) => {
        indexesFound.push(index);
      });
    }
  }

  return processResults(selector, elementsFound, expectedIndex, expectedValue, numberElementsFoundWithValue, indexesFound, 'href');
}

// Description:
//   This method will be called when two or more selectors were found with
//   the same ntagselector value. This method will use the src value attribute  
//   to filter the selctors and try to find the one that was used by the test.
//
// Parameters: 
//    selector: selector string
//    htmlElements: Array of htmlElements found with the same selector.
//    searchInfo: Object containing infromation related to the DOM analysis (value to find, element type, etc.).
//    expectedIndex: The index that is expected to contain the expected value. 
// 
// Returns:
//    jsonObject with the number of selectors found, the selctors and the return code. 
async function parseImageSelector(selector: string, elementsFound: any, searchInfo: any, expectedIndex: number, tag: string, che: any) {
  const indexesFound: number[] = [];
  let index = 0;
  let numberElementsFoundWithValue = 0;
  const expectedValue = searchInfo.value;

  for (let i = 0; i < elementsFound.length; i++) {
    const element = elementsFound[i];
    if (che(element).attr('src') === expectedValue) {
      numberElementsFoundWithValue += 1;
      indexesFound.push(index);
    }
    index += 1;
  }

  return processResults(selector, elementsFound, expectedIndex, expectedValue, numberElementsFoundWithValue, indexesFound, 'src');
}



// Description:
//   This method will be called when two or more selectors were found with
//   the same ntagselector value. This method will use the text value attribute  
//   to filter the selctors and try to find the one that was used by the test.
//
// Parameters: 
//    selector: selector string
//    htmlElements: Array of htmlElements found with the same selector.
//    searchInfo: Object containing infromation related to the DOM analysis (value to find, element type, etc.).
//    expectedIndex: The index that is expected to contain the expected value. 
// 
// Returns:
//    jsonObject with the number of selectors found, the selctors and the return code. 
async function parseTextSelector(selector: string, elementsFound: any, searchInfo: any, expectedIndex: number, tag: string, cheerio: any ){
  console.log("parseTextSelector");
  const jsonObject: any = {};
  const indexesFound: number[] = [];
  let index = 0;
  let numberElementsFoundWithValue = 0;
  const expectedValue = searchInfo.value;

  if (expectedValue === '') {
    const element: any = {
      index: expectedIndex,
      selector,
    };
    jsonObject.numberOfElementsFoundWithSelectorAndValue = 0;
    jsonObject.selectors = element;
    jsonObject.rc = NO_VALUE_PROVIDED_BY_BE;
    return jsonObject;
  }

  for (let i = 0; i < elementsFound.length; i++) {
    const element = elementsFound[i];
    const selectorText = cheerio(element).text().replace("'", '');
    if (selectorText.trim() === expectedValue.trim()) {
      numberElementsFoundWithValue += 1;
      indexesFound.push(index);
    }
    index += 1;
  }

  return processResults(selector, elementsFound, expectedIndex, expectedValue, numberElementsFoundWithValue, indexesFound, 'text');
}

// Description:
//   This method will be called when two or more elemnts were found with
//   the same selector. This method will use the value attribute  
//   to filter the selectors and try to find the one that was used by the test.
//
// Parameters: 
//    selector: selector string
//    htmlElements: Array of htmlElements found with the selector.
//    searchInfo: Object containing infromation related to the DOM analysis (value to find, element type, etc.).
//    expectedIndex: The index that is expected to contain the expected value. 
// 
// Returns:
//    jsonObject with the number of selectors found, the selctors and the return code.
// DONE
async function parseValueSelector(selector: string, elementsFound: any, searchInfo: any, expectedIndex: number, tag: string, cheerio: any){
  const indexesFound: number[] = [];
  let index = 0;
  let numberElementsFoundWithValue = 0;
  const expectedValue = 'value' in searchInfo ? searchInfo.value : '';
  const expectedText = 'text' in searchInfo ? searchInfo.text : '';

  for (let i = 0; i < elementsFound.length; i++) {
    const element = elementsFound[i];
    const elementValue = cheerio(element).val();

    if (elementValue && elementValue === expectedValue) {
      numberElementsFoundWithValue += 1;
      indexesFound.push(index);
    }
    index += 1;
  }

  // TODO later:
  // If we have text information available and this is a select element, let's try to
  // find the correct value using the text
  /*if (numberElementsFoundWithValue === 0 && expectedText !== '' && tag === 'select') {
    return handleSelectElement(selector, htmlElements, expectedText, expectedIndex, indexesFound, tag);
  }*/


  return processResults(selector, elementsFound, expectedIndex, expectedValue, numberElementsFoundWithValue, indexesFound, 'text');
}

// Description:
//   This method will be called to handle the result of filter (by value, text,etc) operation done  
//   on the selectors found.
//   
//   There are 3 options for the result:
//    1) No selectors were found having the value we are expecting. On this case,
//       information returned will be the element with the index that was expected.
//
//    2) We found only one selector, we have two options here:
//       a) Found the correct selector: Return the original element.
//       b) Found the incorrect selector. Return two elements, one with the original index and other with the found index.
// 
//    3) We found two or more selectors with the same src. We have two options here:
//       a) The correct selector was found. Return the original element. 
//       b) The correct selector was not found. Return two elements, one with the original index and other with all the indexes found.
//   
// Returns:
//    jsonObject with the number of selectors found, the selctors and the return code. 
//
function processResults(selector: string, htmlElements: any, expectedIndex: number, expectedValue: string, elementsFoundWithValue: number, indexesFound: number[], attribute: string){
  const jsonObject: any = {};
  const elements: any[] = [];

  if (elementsFoundWithValue === 0) {
    // No selectors were found with the expected value
    if (expectedIndex < htmlElements.length) {
      const element: any = {
        index: expectedIndex,
        selector,
      };
      const returnCode = NO_SELECTOR_FOUND_WITH_SPECIFIC_VALUE;
      element.value = htmlElements.eq(expectedIndex).text();
      jsonObject.numberOfElementsFoundWithSelectorAndValue = 0;
      jsonObject.selectors = element;
      jsonObject.rc = returnCode;
    } else {
      const element: any = {
        index: '-1',
        selector: '',
      };
      const returnCode = STEP_INDEX_GREATER_THAN_NUMBER_OF_SELECTORS_FOUND;
      jsonObject.numberOfElementsFoundWithSelectorAndValue = 0;
      jsonObject.selectors = element;
      jsonObject.rc = returnCode;
    }
  } 
  else if (elementsFoundWithValue === 1) {
    if (indexesFound.includes(expectedIndex)) {
      // The expected selector was found and it is the only selector.
      const element: any = {
        index: expectedIndex,
        selector,
      };
      const returnCode = SELECTOR_FOUND_WITH_CORRECT_INDEX;
      element.value = attribute === 'text' ? htmlElements.eq(expectedIndex).text() : htmlElements.eq(expectedIndex).attr(attribute);
      jsonObject.numberOfElementsFoundWithSelectorAndValue = 1;
      jsonObject.selectors = element;
      jsonObject.rc = returnCode;
    } else {
      // The incorrect selector was found and this is the only selector with the expected value
      const element: any = {
        index: indexesFound[elementsFoundWithValue - 1],
        selector,
      };
      const returnCode = SELECTOR_FOUND_WITH_INCORRECT_INDEX;
      element.value = attribute === 'text' ? htmlElements.eq(indexesFound[elementsFoundWithValue - 1]).text() : htmlElements.eq(indexesFound[elementsFoundWithValue - 1]).attr(attribute);
      jsonObject.numberOfElementsFoundWithSelectorAndValue = 1;
      jsonObject.selectors = element;
      jsonObject.rc = returnCode;
    }
  } else if (elementsFoundWithValue > 1) {
    // Several selectors were found with the same value
    if (indexesFound.includes(expectedIndex)) {
      // The expected element was found in the selectors
      const element: any = {
        index: expectedIndex,
        selector,
      };
      const returnCode = MULTIPLE_SELECTORS_FOUND_WITH_EXPECTED_VALUE_CORRECT_INDEX;
      element.value = attribute === 'text' ? htmlElements.eq(expectedIndex).text() : htmlElements.eq(expectedIndex).attr(attribute);
      elements.push(element);
      jsonObject.numberOfElementsFoundWithSelectorAndValue = elementsFoundWithValue;
      jsonObject.selectors = element;
      jsonObject.rc = returnCode;
    } else {
      // The expected element was NOT found in the selector
      const element: any = {
        index: JSON.stringify(indexesFound),
        selector,
      };
      const returnCode = MULTIPLE_SELECTORS_FOUND_WITH_EXPECTED_VALUE_INCORRECT_INDEX;
      element.value = attribute === 'text' ? expectedValue : expectedValue;
      jsonObject.numberOfElementsFoundWithSelectorAndValue = elementsFoundWithValue;
      jsonObject.selectors = element;
      jsonObject.rc = returnCode;
    }
  }

  return jsonObject;
}

export {
	analyzeCSSSelector
}
