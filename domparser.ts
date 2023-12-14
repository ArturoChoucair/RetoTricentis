const fs = require('fs');
const cssAnalyzer = require('./cssAnalysis');
const xpathAnalyzer = require('./xpathAnalysis');

const CLASSIC_SELECTOR    = 0
const DYMANIC_SELECTOR    = 1
const CUSTOM_CSS_SELECTOR = 2
const XPATH_SELECTOR      = 3

const SELECTORS_ARRAY =  [CLASSIC_SELECTOR, DYMANIC_SELECTOR, CUSTOM_CSS_SELECTOR, XPATH_SELECTOR ]

// Description:
//   This method will be call to start the DOM analysis for each of the steps on the Muuk Report. 
//
// Returns:
//   jsonObject with the number of selector information. 
async function generateMuukInsigths(classname: string){
	let steps: any = [];

  if(classname){
    try{
      // 1) Read the json file generated during the test execution
      const filePath = "test/" + classname + ".json";
      if (fs.existsSync(filePath)) {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        steps = JSON.parse(jsonData);
        if(steps.length > 0){
          for (const step of steps){         
            if(step.type === "step"){
              const feedback: any = [];
              const selectors = JSON.parse(step.selectors);
              const selectorToUse = step.selectorToUse;
              const value =  JSON.parse(step.value) || '{"value":"undef","searchType":"undef","text":"undef"}';
              const attributes = JSON.parse(step.attributes) || JSON.parse('{id":"false","name":"undef","text":"","type":"undef"}');

              //attributes.value = valueInfo['value']

              for (const i of SELECTORS_ARRAY) {
                let domInfo: any = {};
                let selector: string | null;
                let index: number | null;
              
                if (i < selectors.length) {
                  selector = selectors[i].selector || null;
                  index = selectors[i].index || 0;
                } 
                else {
                  selector = null;
                  index = null;
                }
              
                if (i < 3) {
    
                  domInfo = await cssAnalyzer.analyzeCSSSelector(classname,
                            step.id,
                            selector,
                            index,
                            step.tag,
                            step.objType,
                            step.action,
                            value,
                            attributes,
                            SELECTORS_ARRAY[i]);
                  
                } 
                else {
                  if (selector !== null) {
                    // XPATH library is case-sensitive and MuukTest creates the tag as uppercase, we need to fix this.
                    selector = selector.replace(step.tag.toUpperCase(), step.tag);
                  }
              
                  domInfo = await xpathAnalyzer.obtainXPATHFeedbackFromDOM(classname,
                            step.id,
                            selector,
                            index,
                            step.tag,
                            step.objType,
                            step.action,
                            value,
                            attributes,
                            SELECTORS_ARRAY[i]
                  );

                }
                feedback.push(domInfo);
              }

              step.feedback = feedback;
              step.feebackSelectorToUse = findBetterSelectorToUse(step.feedback, attributes );
            }
          }
        }
      }
      else{
        console.log("muukAnalysis, json file was not found, ", filePath);
      } 
    }
    catch (err) {
      console.log("muukAnalysis, error while generating muuk analysis.", err);
    }
  }

	
	return steps;
}


function findBetterSelectorToUse(selectors: any[], attributes: any): number {
  let selectorToUse = -1;
  const classic = selectors.length > 0 ? selectors[0] : null;
  const dynamic = selectors.length > 1 ? selectors[1] : null;
  const customeCSS = selectors.length > 2 ? selectors[2] : null;
  const xpath = selectors.length > 3 ? selectors[3] : null;

  if (xpath &&xpath.numberOfElementsFoundWithSelectorAndValue > 0 && attributes.text !== 'undef' && (xpath.selectors.selector.includes('contains') ||
      xpath.selectors.selector.includes('normalize-space'))
  ) {
    selectorToUse = 3;
  } 
  else if ( customeCSS && (attributes.id !== 'undef' || attributes.name !== 'undef' || attributes.type !== 'undef') &&
           customeCSS.numberOfElementsFoundWithSelectorAndValue > 0) {
    selectorToUse = 2;
  } 
  else if (classic && classic.numberOfElementsFoundWithSelectorAndValue > 0) {
    selectorToUse = 0;
  } 
  else if (dynamic && dynamic.numberOfElementsFoundWithSelectorAndValue > 0) {
    selectorToUse = 1;
  }

  // If we were not able to choose a selector with values, check if we have one that returns any element at least.
  if (selectorToUse === -1) {
    if (classic && classic.numberOfElementsFoundWithSelector > 0) {
      selectorToUse = 0;
    } 
    else if (dynamic && dynamic.numberOfElementsFoundWithSelector > 0) {
      selectorToUse = 1;
    }
  }

  return selectorToUse;
}

export {
	generateMuukInsigths
}
