import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
const fs = require('fs');
import { 
   demowebshopTricentis8x9swbssoj6j,  demowebshopTricentisu61xzggn50tl,  demowebshopTricentis7a6fzvyz8dh,  demowebshopTricentis67xvtmxyvj0j,  demowebshopTricentis5djy5rproqfhc,  demowebshopTricentisccqzok8169g,  demowebshopTricentiskoaxtdq7by1f,  demowebshopTricentisti467r4jxxtm,  demowebshopTricentis3p7bflo1255,  demowebshopTricentisjwuxqr2kua,  
} from './PageDetails';
import Muuk from './Muuk';
import MuukReport from './MuukReport';
const consoleLogs: any = []; 
const logFile = 'browser-demowebshopTricentisCom8192b133.log';
const muukReport = new MuukReport('demowebshopTricentisCom8192b133');

test('demowebshopTricentisCom8192b133',  async ({ page, context }) => {
  let pages;
  let numberPages = 1;
  let pageUpdated = false;
  let maxRetries = 0;
  const MK = new Muuk(page, 'demowebshopTricentisCom8192b133', muukReport);
	const pageDetails1 = new demowebshopTricentis8x9swbssoj6j();
	const pageDetails2 = new demowebshopTricentisu61xzggn50tl();
	const pageDetails3 = new demowebshopTricentis7a6fzvyz8dh();
	const pageDetails4 = new demowebshopTricentis67xvtmxyvj0j();
	const pageDetails5 = new demowebshopTricentis5djy5rproqfhc();
	const pageDetails6 = new demowebshopTricentisccqzok8169g();
	const pageDetails7 = new demowebshopTricentiskoaxtdq7by1f();
	const pageDetails8 = new demowebshopTricentisti467r4jxxtm();
	const pageDetails9 = new demowebshopTricentis3p7bflo1255();
	const pageDetails10 = new demowebshopTricentisjwuxqr2kua();
  //globalVariables
  let firstName = `Jose Elver`;
  let lastName = `Arturo`;
  let companyName = `Choucair Testing`;
  let email = `joseElverA@gmail.com`;
  let password = `Jose@123`;
  let defaultText = `Texto de prueba`;
  let address = `Carrera 15 # 3-86`;
  let barrio = `Carlos Martinez`;
  let tipoVivienda = `Apartamento`;
  let city = `Medellin`;
  let country = `Colombia`;
  let telefono = `3156248965`;
  let randomEmail = `email@email.com`;
  let userNameOrange = `Admin`;
  let passwordOrange = `admin123`;
  let codigoPostal = `123456`;
  let passwordUtest = `Nemesis@123.`;
  let creditCardName = `Barbara Gordon`;
  let creditCardNumber = `4485564059489345`;
  let creditCardCCV = `123`;
  let expireYear = `2024`;
  let expireMonth = `4`;
  let correoTricentis = `josearturo` + Date.now().toString() + `@hotmail.com`;

  // Monitor for new pages
  context.on('page', async (eventPage) => {
    page = eventPage;
    MK.updatePage(page);
    numberPages++;
    pageUpdated = true;
  });


  await page.goto('https://demowebshop.tricentis.com');
  await muukReport.addStepInfo('step', 1, page.url(), '[{\"selector\":\"li>a.ico-register\",\"index\":0},{\"selector\":\"li>a\",\"index\":0},{\"selector\":\"A\",\"index\":1},{\"selector\":\"//A[contains(text(),\\"Register\\")]\",\"index\":0}]', 3, 'a', '', 'click', '{"value":"/register","searchType":"href","text":"Register"}', '{"id":"undef","name":"undef","text":"Register","type":"undef"}');
  await MK.onClick(pageDetails1.aezycz4RHdWgField, 1, 'before', '', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 2, page.url(), '[{\"selector\":\"div.gender>input\",\"index\":0},{\"selector\":\"div>input\",\"index\":2},{\"selector\":\"INPUT[id=\'gender-male\'][name=\'Gender\'][type=\'radio\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'gender-male\'][@name=\'Gender\'][@type=\'radio\']\",\"index\":0}]', 2, 'input', 'radio', 'click', '{"value":"M","searchType":"value","text":"undef"}', '{"id":"gender-male","name":"Gender","text":"undef","type":"radio"}');
  await MK.onClick(pageDetails2.input7qVfzyzTDrLField, 2, 'before', 'M', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 3, page.url(), '[{\"selector\":\"div.inputs>input.text-box.single-line\",\"index\":0},{\"selector\":\"div>input\",\"index\":4},{\"selector\":\"INPUT[id=\'FirstName\'][name=\'FirstName\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'FirstName\'][@name=\'FirstName\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'assignment', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"FirstName","name":"FirstName","text":"undef","type":"text"}');
  
  await MK.onAssignment(pageDetails2.input225h5lGh3XdField, 3, 'after', `` + firstName + ``, 'text');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 4, page.url(), '[{\"selector\":\"div.inputs>input.text-box.single-line\",\"index\":1},{\"selector\":\"div>input\",\"index\":5},{\"selector\":\"INPUT[id=\'LastName\'][name=\'LastName\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'LastName\'][@name=\'LastName\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'assignment', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"LastName","name":"LastName","text":"undef","type":"text"}');
  
  await MK.onAssignment(pageDetails2.inputgE2INqLsRgField, 4, 'after', `` + lastName + ``, 'text');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 5, page.url(), '[{\"selector\":\"div.inputs>input.text-box.single-line\",\"index\":2},{\"selector\":\"div>input\",\"index\":6},{\"selector\":\"INPUT[id=\'Email\'][name=\'Email\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'Email\'][@name=\'Email\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'mouseover', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"Email","name":"Email","text":"undef","type":"text"}');
  
  
  await MK.onMouseover(pageDetails2.inputXJPiKoBSNy2Field, 5, 'after', '', 'none'); 
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 6, page.url(), '[{\"selector\":\"div.inputs>input.text-box.single-line\",\"index\":2},{\"selector\":\"div>input\",\"index\":6},{\"selector\":\"INPUT[id=\'Email\'][name=\'Email\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'Email\'][@name=\'Email\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'assignment', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"Email","name":"Email","text":"undef","type":"text"}');
  
  await MK.onAssignment(pageDetails2.inputXJPiKoBSNy2Field, 6, 'after', `` + correoTricentis + ``, 'text');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 7, page.url(), '[{\"selector\":\"div.inputs>input.text-box.single-line.password\",\"index\":0},{\"selector\":\"div>input\",\"index\":7},{\"selector\":\"INPUT[id=\'Password\'][name=\'Password\'][type=\'password\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'Password\'][@name=\'Password\'][@type=\'password\']\",\"index\":0}]', 2, 'input', 'password', 'assignment', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"Password","name":"Password","text":"undef","type":"password"}');
  
  await MK.onAssignment(pageDetails2.input226i5rYu46Field, 7, 'after', `` + password + ``, 'password');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 8, page.url(), '[{\"selector\":\"div.inputs>input.text-box.single-line.password\",\"index\":1},{\"selector\":\"div>input\",\"index\":8},{\"selector\":\"INPUT[id=\'ConfirmPassword\'][name=\'ConfirmPassword\'][type=\'password\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'ConfirmPassword\'][@name=\'ConfirmPassword\'][@type=\'password\']\",\"index\":0}]', 2, 'input', 'password', 'assignment', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"ConfirmPassword","name":"ConfirmPassword","text":"undef","type":"password"}');
  
  await MK.onAssignment(pageDetails2.inputlZ4cKZEHGZ0Field, 8, 'after', `` + password + ``, 'password');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 9, page.url(), '[{\"selector\":\"div.buttons>input.button-1.register-next-step-button\",\"index\":0},{\"selector\":\"div>input\",\"index\":9},{\"selector\":\"INPUT[type=\'submit\'][id=\'register-button\'][name=\'register-button\']\",\"index\":0},{\"selector\":\"//INPUT[@type=\'submit\'][@id=\'register-button\'][@name=\'register-button\']\",\"index\":0}]', 2, 'input', 'submit', 'click', '{"value":"","searchType":"text","text":"undef"}', '{"id":"register-button","name":"register-button","text":"undef","type":"submit"}');
  await MK.onClick(pageDetails2.inputkYYHVRhon3Field, 9, 'before', 'Register', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 10, page.url(), '[{\"selector\":\"div.page-body>div.result\",\"index\":0},{\"selector\":\"div>div\",\"index\":36},{\"selector\":\"DIV\",\"index\":54},{\"selector\":\"//DIV[contains(text(),\\"Your registration completed\\")]\",\"index\":0}]', 3, 'div', '', 'click', '{"value":"\\n            Your registration completed\\n        ","searchType":"text","text":"undef"}', '{"id":"undef","name":"undef","text":"\\n            Your registration completed\\n        ","type":"undef"}');
  await MK.onClick(pageDetails3.divYyhBacXLmField, 10, 'before', '            Your registration completed        ', 'equal');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 11, page.url(), '[{\"selector\":\"div.buttons>input.button-1.register-continue-button\",\"index\":0},{\"selector\":\"div>input\",\"index\":2},{\"selector\":\"INPUT[value=\'Continue\']\",\"index\":0},{\"selector\":\"//INPUT[@type=\'button\']\",\"index\":0}]', 2, 'input', 'button', 'click', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"undef","name":"undef","text":"undef","type":"button"}');
  await MK.onClick(pageDetails3.inputkYmtyD5coqgField, 11, 'before', 'Continue', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 12, page.url(), '[{\"selector\":\"li>a.ico-logout\",\"index\":0},{\"selector\":\"li>a\",\"index\":1},{\"selector\":\"A\",\"index\":2},{\"selector\":\"//A[contains(text(),\\"Log out\\")]\",\"index\":0}]', 3, 'a', '', 'click', '{"value":"/logout","searchType":"href","text":"Log out"}', '{"id":"undef","name":"undef","text":"Log out","type":"undef"}');
  await MK.onClick(pageDetails1.aLNu5GLummField, 12, 'before', '', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 13, page.url(), '[{\"selector\":\"li>a.ico-login\",\"index\":0},{\"selector\":\"li>a\",\"index\":1},{\"selector\":\"A\",\"index\":2},{\"selector\":\"//A[contains(text(),\\"Log in\\")]\",\"index\":0}]', 3, 'a', '', 'click', '{"value":"/login","searchType":"href","text":"Log in"}', '{"id":"undef","name":"undef","text":"Log in","type":"undef"}');
  await MK.onClick(pageDetails1.ab6hKeLFW8kField, 13, 'before', '', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 14, page.url(), '[{\"selector\":\"div.inputs>input.email\",\"index\":0},{\"selector\":\"div>input\",\"index\":3},{\"selector\":\"INPUT[id=\'Email\'][name=\'Email\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'Email\'][@name=\'Email\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'mouseover', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"Email","name":"Email","text":"undef","type":"text"}');
  
  
  await MK.onMouseover(pageDetails6.input2QsVNjIwyxField, 14, 'after', '', 'none'); 
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 15, page.url(), '[{\"selector\":\"div.inputs>input.email\",\"index\":0},{\"selector\":\"div>input\",\"index\":3},{\"selector\":\"INPUT[id=\'Email\'][name=\'Email\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'Email\'][@name=\'Email\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'assignment', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"Email","name":"Email","text":"undef","type":"text"}');
  
  await MK.onAssignment(pageDetails6.input2QsVNjIwyxField, 15, 'after', `` + email + ``, 'text');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 16, page.url(), '[{\"selector\":\"div.inputs>input.password\",\"index\":0},{\"selector\":\"div>input\",\"index\":4},{\"selector\":\"INPUT[id=\'Password\'][name=\'Password\'][type=\'password\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'Password\'][@name=\'Password\'][@type=\'password\']\",\"index\":0}]', 2, 'input', 'password', 'assignment', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"Password","name":"Password","text":"undef","type":"password"}');
  
  await MK.onAssignment(pageDetails6.inputg2txWeiLJ4Field, 16, 'after', `` + password + ``, 'password');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 17, page.url(), '[{\"selector\":\"div.buttons>input.button-1.login-button\",\"index\":0},{\"selector\":\"div>input\",\"index\":7},{\"selector\":\"INPUT[type=\'submit\']\",\"index\":1},{\"selector\":\"//INPUT[@type=\'submit\']\",\"index\":1}]', 2, 'input', 'submit', 'click', '{"value":"","searchType":"text","text":"undef"}', '{"id":"undef","name":"undef","text":"undef","type":"submit"}');
  await MK.onClick(pageDetails6.input9DiNqViNX7Field, 17, 'before', 'Log in', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 18, page.url(), '[{\"selector\":\"li.inactive>a\",\"index\":3},{\"selector\":\"li>a\",\"index\":31},{\"selector\":\"A\",\"index\":38},{\"selector\":\"//A[normalize-space() = \\"Apparel & Shoes\\"]\",\"index\":2}]', 3, 'a', '', 'click', '{"value":"/apparel-shoes","searchType":"href","text":"Apparel & Shoes\n        "}', '{"id":"undef","name":"undef","text":"Apparel & Shoes\\n        ","type":"undef"}');
  await MK.onClick(pageDetails1.a3EIjg8uKbXField, 18, 'before', '', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 19, page.url(), '[{\"selector\":\"div.buttons>input.button-2.product-box-add-to-cart-button\",\"index\":0},{\"selector\":\"div>input\",\"index\":2},{\"selector\":\"INPUT[type=\'button\']\",\"index\":1},{\"selector\":\"INPUT[value=\'Add to cart\']\",\"index\":0}]', 0, 'input', 'button', 'click', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"undef","name":"undef","text":"undef","type":"button"}');
  await MK.onClick(pageDetails8.inputb9Qtpgc3abField, 19, 'before', '', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 20, page.url(), '[{\"selector\":\"div.product-name>h1\",\"index\":0},{\"selector\":\"div>h1\",\"index\":0},{\"selector\":\"H1\",\"index\":0},{\"selector\":\"//H1[contains(text(),\\"50\'s Ro\\")]\",\"index\":0}]', 3, 'h1', '', 'click', '{"value":"\\n                                50s Rockabilly Polka Dot Top JR Plus Size\\n                            ","searchType":"text","text":"undef"}', '{"id":"undef","name":"undef","text":"\\n                                50\'s Rockabilly Polka Dot Top JR Plus Size\\n                            ","type":"undef"}');
  await MK.onClick(pageDetails9.h1XldcbVkFw1Field, 20, 'before', '                                50\'s Rockabilly Polka Dot Top JR Plus Size                            ', 'equal');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 21, page.url(), '[{\"selector\":\"div.add-to-cart-panel>input.button-1.add-to-cart-button\",\"index\":0},{\"selector\":\"div>input\",\"index\":3},{\"selector\":\"INPUT[type=\'button\'][id=\'add-to-cart-button-5\']\",\"index\":0},{\"selector\":\"//INPUT[@type=\'button\'][@id=\'add-to-cart-button-5\']\",\"index\":0}]', 2, 'input', 'button', 'click', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"add-to-cart-button-5","name":"undef","text":"undef","type":"button"}');
  await MK.onClick(pageDetails9.inputpEAS0W1sqWXField, 21, 'before', 'Add to cart', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 22, page.url(), '[{\"selector\":\"li.active>a\",\"index\":0},{\"selector\":\"li>a\",\"index\":31},{\"selector\":\"A\",\"index\":37},{\"selector\":\"//A[normalize-space() = \\"Apparel & Shoes\\"]\",\"index\":2}]', 3, 'a', '', 'click', '{"value":"/apparel-shoes","searchType":"href","text":"Apparel & Shoes\n        "}', '{"id":"undef","name":"undef","text":"Apparel & Shoes\\n        ","type":"undef"}');
  await MK.onClick(pageDetails9.alW4imlgTwjMField, 22, 'before', '', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 23, page.url(), '[{\"selector\":\"div.buttons>input.button-2.product-box-add-to-cart-button\",\"index\":1},{\"selector\":\"div>input\",\"index\":4},{\"selector\":\"INPUT[type=\'button\']\",\"index\":3},{\"selector\":\"//INPUT[@type=\'button\']\",\"index\":3}]', 2, 'input', 'button', 'click', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"undef","name":"undef","text":"undef","type":"button"}');
  await MK.onClick(pageDetails8.input91KhKD6s4qlField, 23, 'before', 'Add to cart', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 24, page.url(), '[{\"selector\":\"div.product-name>h1\",\"index\":0},{\"selector\":\"div>h1\",\"index\":0},{\"selector\":\"H1\",\"index\":0},{\"selector\":\"//H1[contains(text(),\\"Blue an\\")]\",\"index\":0}]', 3, 'h1', '', 'click', '{"value":"\\n                                Blue and green Sneaker\\n                            ","searchType":"text","text":"undef"}', '{"id":"undef","name":"undef","text":"\\n                                Blue and green Sneaker\\n                            ","type":"undef"}');
  await MK.onClick(pageDetails7.h15GFVgVHyAField, 24, 'before', '                                Blue and green Sneaker                            ', 'equal');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 25, page.url(), '[{\"selector\":\"div.add-to-cart-panel>input.button-1.add-to-cart-button\",\"index\":0},{\"selector\":\"div>input\",\"index\":4},{\"selector\":\"INPUT[type=\'button\'][id=\'add-to-cart-button-28\']\",\"index\":0},{\"selector\":\"//INPUT[@type=\'button\'][@id=\'add-to-cart-button-28\']\",\"index\":0}]', 2, 'input', 'button', 'click', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"add-to-cart-button-28","name":"undef","text":"undef","type":"button"}');
  await MK.onClick(pageDetails7.input1qHjYWS2MPField, 25, 'before', 'Add to cart', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 26, page.url(), '[{\"selector\":\"li>a.ico-cart\",\"index\":1},{\"selector\":\"li>a\",\"index\":54},{\"selector\":\"A\",\"index\":78},{\"selector\":\"//A[contains(text(),\\"Shopping cart\\")]\",\"index\":0}]', 3, 'a', '', 'click', '{"value":"/cart","searchType":"href","text":"Shopping cart"}', '{"id":"undef","name":"undef","text":"Shopping cart","type":"undef"}');
  await MK.onClick(pageDetails7.aB0YiMBzUV9Field, 26, 'before', '', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('snippet', 27, page.url());
  
  
  
  
  await MK.onJSSnippet(27, 'after', () => { var windowHeight = window.innerHeight; var middleOfWindow = windowHeight / 2;  window.scrollTo(0, middleOfWindow); }, 'execution', null, null); 
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 28, page.url(), '[{\"selector\":\"div.terms-of-service>input\",\"index\":0},{\"selector\":\"div>input\",\"index\":9},{\"selector\":\"INPUT[id=\'termsofservice\'][type=\'checkbox\'][name=\'termsofservice\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'termsofservice\'][@type=\'checkbox\'][@name=\'termsofservice\']\",\"index\":0}]', 2, 'input', 'checkbox', 'click', '{"value":"on","searchType":"value","text":"undef"}', '{"id":"termsofservice","name":"termsofservice","text":"undef","type":"checkbox"}');
  await MK.onClick(pageDetails4.inputaZWFWgQcAaBField, 28, 'before', 'on', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 29, page.url(), '[{\"selector\":\"div.checkout-buttons>button.button-1.checkout-button\",\"index\":0},{\"selector\":\"div>button\",\"index\":0},{\"selector\":\"BUTTON[type=\'submit\'][id=\'checkout\'][name=\'checkout\']\",\"index\":0},{\"selector\":\"//BUTTON[@type=\'submit\'][@id=\'checkout\'][@name=\'checkout\'][contains(text(),\\"Checkou\\")]\",\"index\":0}]', 3, 'button', 'submit', 'click', '{"value":"\\n                                Checkout\\n                            ","searchType":"text","text":"undef"}', '{"id":"checkout","name":"checkout","text":"\\n                                Checkout\\n                            ","type":"submit"}');
  await MK.onClick(pageDetails4.buttongZdTNbs7XlField, 29, 'before', 'checkout', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 30, page.url(), '[{\"selector\":\"div.inputs>input.text-box.single-line\",\"index\":3},{\"selector\":\"div>input\",\"index\":5},{\"selector\":\"INPUT[id=\'BillingNewAddress_Company\'][name=\'BillingNewAddress.Company\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'BillingNewAddress_Company\'][@name=\'BillingNewAddress.Company\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'assignment', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"BillingNewAddress_Company","name":"BillingNewAddress.Company","text":"undef","type":"text"}');
  
  await MK.onAssignment(pageDetails5.inputaZ3fBA9fByField, 30, 'after', `` + companyName + ``, 'text');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 31, page.url(), '[{\"selector\":\"div.inputs>select\",\"index\":0},{\"selector\":\"div>select\",\"index\":0},{\"selector\":\"SELECT[id=\'BillingNewAddress_CountryId\'][name=\'BillingNewAddress.CountryId\']\",\"index\":0},{\"selector\":\"//SELECT[@id=\'BillingNewAddress_CountryId\'][@name=\'BillingNewAddress.CountryId\']\",\"index\":0}]', 2, 'select', 'select-one', 'assignment', '{"value":"22","searchType":"value","text":"Colombia"}', '{"id":"BillingNewAddress_CountryId","name":"BillingNewAddress.CountryId","text":"Colombia","type":"select-one"}');
  
  await MK.onAssignment(pageDetails5.selectK3bSBpeiL1KField, 31, 'after', `22`, 'select');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 32, page.url(), '[{\"selector\":\"div.inputs>input.text-box.single-line\",\"index\":4},{\"selector\":\"div>input\",\"index\":6},{\"selector\":\"INPUT[id=\'BillingNewAddress_City\'][name=\'BillingNewAddress.City\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'BillingNewAddress_City\'][@name=\'BillingNewAddress.City\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'assignment', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"BillingNewAddress_City","name":"BillingNewAddress.City","text":"undef","type":"text"}');
  
  await MK.onAssignment(pageDetails5.inputO5qfOmJcor9Field, 32, 'after', `` + city + ``, 'text');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 33, page.url(), '[{\"selector\":\"div.inputs>input.text-box.single-line\",\"index\":5},{\"selector\":\"div>input\",\"index\":7},{\"selector\":\"INPUT[id=\'BillingNewAddress_Address1\'][name=\'BillingNewAddress.Address1\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'BillingNewAddress_Address1\'][@name=\'BillingNewAddress.Address1\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'assignment', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"BillingNewAddress_Address1","name":"BillingNewAddress.Address1","text":"undef","type":"text"}');
  
  await MK.onAssignment(pageDetails5.inputL5ES4dJhWVGField, 33, 'after', `` + address + ``, 'text');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 34, page.url(), '[{\"selector\":\"div.inputs>input.text-box.single-line\",\"index\":6},{\"selector\":\"div>input\",\"index\":8},{\"selector\":\"INPUT[id=\'BillingNewAddress_Address2\'][name=\'BillingNewAddress.Address2\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'BillingNewAddress_Address2\'][@name=\'BillingNewAddress.Address2\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'assignment', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"BillingNewAddress_Address2","name":"BillingNewAddress.Address2","text":"undef","type":"text"}');
  
  await MK.onAssignment(pageDetails5.inputdobsjqrUDeYField, 34, 'after', `` + address + ``, 'text');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 35, page.url(), '[{\"selector\":\"div.inputs>input.text-box.single-line\",\"index\":7},{\"selector\":\"div>input\",\"index\":9},{\"selector\":\"INPUT[id=\'BillingNewAddress_ZipPostalCode\'][name=\'BillingNewAddress.ZipPostalCode\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'BillingNewAddress_ZipPostalCode\'][@name=\'BillingNewAddress.ZipPostalCode\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'assignment', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"BillingNewAddress_ZipPostalCode","name":"BillingNewAddress.ZipPostalCode","text":"undef","type":"text"}');
  
  await MK.onAssignment(pageDetails5.inputNBJI9ZOSNPLField, 35, 'after', `` + codigoPostal + ``, 'text');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 36, page.url(), '[{\"selector\":\"div.inputs>input.text-box.single-line\",\"index\":8},{\"selector\":\"div>input\",\"index\":10},{\"selector\":\"INPUT[id=\'BillingNewAddress_PhoneNumber\'][name=\'BillingNewAddress.PhoneNumber\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'BillingNewAddress_PhoneNumber\'][@name=\'BillingNewAddress.PhoneNumber\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'assignment', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"BillingNewAddress_PhoneNumber","name":"BillingNewAddress.PhoneNumber","text":"undef","type":"text"}');
  
  await MK.onAssignment(pageDetails5.input5JgU3KSyXQField, 36, 'after', `` + telefono + ``, 'text');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 37, page.url(), '[{\"selector\":\"div.inputs>input.text-box.single-line\",\"index\":9},{\"selector\":\"div>input\",\"index\":11},{\"selector\":\"INPUT[id=\'BillingNewAddress_FaxNumber\'][name=\'BillingNewAddress.FaxNumber\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'BillingNewAddress_FaxNumber\'][@name=\'BillingNewAddress.FaxNumber\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'assignment', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"BillingNewAddress_FaxNumber","name":"BillingNewAddress.FaxNumber","text":"undef","type":"text"}');
  
  await MK.onAssignment(pageDetails5.inputrnvFXQi4jJField, 37, 'after', `124563`, 'text');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 38, page.url(), '[{\"selector\":\"div.buttons>input.button-1.new-address-next-step-button\",\"index\":0},{\"selector\":\"div>input\",\"index\":12},{\"selector\":\"INPUT[type=\'button\'][title=\'Continue\']\",\"index\":0},{\"selector\":\"//INPUT[@type=\'button\'][@title=\'Continue\']\",\"index\":0}]', 2, 'input', 'button', 'click', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"undef","name":"undef","text":"undef","type":"button"}');
  await MK.onClick(pageDetails5.inputKqzCB19hN1Field, 38, 'before', 'Continue', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 39, page.url(), '[{\"selector\":\"div.buttons>input.button-1.new-address-next-step-button\",\"index\":1},{\"selector\":\"div>input\",\"index\":24},{\"selector\":\"INPUT[type=\'button\'][title=\'Continue\']\",\"index\":1},{\"selector\":\"//INPUT[@type=\'button\'][@title=\'Continue\']\",\"index\":1}]', 2, 'input', 'button', 'click', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"undef","name":"undef","text":"undef","type":"button"}');
  await MK.onClick(pageDetails5.inputpWyhVyRu63Field, 39, 'before', 'Continue', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 40, page.url(), '[{\"selector\":\"div.method-name>input\",\"index\":1},{\"selector\":\"div>input\",\"index\":26},{\"selector\":\"INPUT[id=\'shippingoption_1\'][type=\'radio\'][name=\'shippingoption\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'shippingoption_1\'][@type=\'radio\'][@name=\'shippingoption\']\",\"index\":0}]', 2, 'input', 'radio', 'click', '{"value":"Next Day Air___Shipping.FixedRate","searchType":"value","text":"undef"}', '{"id":"shippingoption_1","name":"shippingoption","text":"undef","type":"radio"}');
  await MK.onClick(pageDetails5.input08LCKYUXgEField, 40, 'before', 'Next Day Air___Shipping.FixedRate', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 41, page.url(), '[{\"selector\":\"div.buttons>input.button-1.shipping-method-next-step-button\",\"index\":0},{\"selector\":\"div>input\",\"index\":28},{\"selector\":\"INPUT[type=\'button\']\",\"index\":3},{\"selector\":\"//INPUT[@type=\'button\']\",\"index\":3}]', 2, 'input', 'button', 'click', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"undef","name":"undef","text":"undef","type":"button"}');
  await MK.onClick(pageDetails5.inputgZVHPJqsR7Field, 41, 'before', 'Continue', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 42, page.url(), '[{\"selector\":\"div.payment-details>input\",\"index\":2},{\"selector\":\"div>input\",\"index\":31},{\"selector\":\"INPUT[id=\'paymentmethod_2\'][type=\'radio\'][name=\'paymentmethod\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'paymentmethod_2\'][@type=\'radio\'][@name=\'paymentmethod\']\",\"index\":0}]', 2, 'input', 'radio', 'click', '{"value":"Payments.Manual","searchType":"value","text":"undef"}', '{"id":"paymentmethod_2","name":"paymentmethod","text":"undef","type":"radio"}');
  await MK.onClick(pageDetails5.inputev0se62hvdGField, 42, 'before', 'Payments.Manual', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 43, page.url(), '[{\"selector\":\"div.buttons>input.button-1.payment-method-next-step-button\",\"index\":0},{\"selector\":\"div>input\",\"index\":33},{\"selector\":\"INPUT[type=\'button\']\",\"index\":4},{\"selector\":\"//INPUT[@type=\'button\']\",\"index\":4}]', 2, 'input', 'button', 'click', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"undef","name":"undef","text":"undef","type":"button"}');
  await MK.onClick(pageDetails5.inputG3KuAmosjKyField, 43, 'before', 'Continue', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 44, page.url(), '[{\"selector\":\"td>input\",\"index\":0},{\"selector\":\"td>input\",\"index\":0},{\"selector\":\"INPUT[id=\'CardholderName\'][name=\'CardholderName\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'CardholderName\'][@name=\'CardholderName\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'click', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"CardholderName","name":"CardholderName","text":"undef","type":"text"}');
  await MK.onClick(pageDetails5.inputoq7HOmmS2jQField, 44, 'before', '', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 45, page.url(), '[{\"selector\":\"td>input\",\"index\":0},{\"selector\":\"td>input\",\"index\":0},{\"selector\":\"INPUT[id=\'CardholderName\'][name=\'CardholderName\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'CardholderName\'][@name=\'CardholderName\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'mouseover', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"CardholderName","name":"CardholderName","text":"undef","type":"text"}');
  
  
  await MK.onMouseover(pageDetails5.inputoq7HOmmS2jQField, 45, 'after', '', 'none'); 
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 46, page.url(), '[{\"selector\":\"td>input\",\"index\":0},{\"selector\":\"td>input\",\"index\":0},{\"selector\":\"INPUT[id=\'CardholderName\'][name=\'CardholderName\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'CardholderName\'][@name=\'CardholderName\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'assignment', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"CardholderName","name":"CardholderName","text":"undef","type":"text"}');
  
  await MK.onAssignment(pageDetails5.inputoq7HOmmS2jQField, 46, 'after', `` + creditCardName + ``, 'text');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 47, page.url(), '[{\"selector\":\"td>input\",\"index\":1},{\"selector\":\"td>input\",\"index\":1},{\"selector\":\"INPUT[id=\'CardNumber\'][name=\'CardNumber\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'CardNumber\'][@name=\'CardNumber\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'mouseover', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"CardNumber","name":"CardNumber","text":"undef","type":"text"}');
  
  
  await MK.onMouseover(pageDetails5.inputALbu22gu3V1Field, 47, 'after', '', 'none'); 
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 48, page.url(), '[{\"selector\":\"td>input\",\"index\":1},{\"selector\":\"td>input\",\"index\":1},{\"selector\":\"INPUT[id=\'CardNumber\'][name=\'CardNumber\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'CardNumber\'][@name=\'CardNumber\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'assignment', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"CardNumber","name":"CardNumber","text":"undef","type":"text"}');
  
  await MK.onAssignment(pageDetails5.inputALbu22gu3V1Field, 48, 'after', `` + creditCardNumber + ``, 'text');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 49, page.url(), '[{\"selector\":\"td>select\",\"index\":1},{\"selector\":\"td>select\",\"index\":1},{\"selector\":\"SELECT[id=\'ExpireMonth\'][name=\'ExpireMonth\']\",\"index\":0},{\"selector\":\"//SELECT[@id=\'ExpireMonth\'][@name=\'ExpireMonth\']\",\"index\":0}]', 2, 'select', 'select-one', 'assignment', '{"value":"{{expireMonth}}","searchType":"value","text":"04"}', '{"id":"ExpireMonth","name":"ExpireMonth","text":"04","type":"select-one"}');
  
  await MK.onAssignment(pageDetails5.selectoq1U5S2KaField, 49, 'after', `` + expireMonth + ``, 'select');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 50, page.url(), '[{\"selector\":\"td>select\",\"index\":2},{\"selector\":\"td>select\",\"index\":2},{\"selector\":\"SELECT[id=\'ExpireYear\'][name=\'ExpireYear\']\",\"index\":0},{\"selector\":\"//SELECT[@id=\'ExpireYear\'][@name=\'ExpireYear\']\",\"index\":0}]', 2, 'select', 'select-one', 'assignment', '{"value":"{{expireYear}}","searchType":"value","text":"2024"}', '{"id":"ExpireYear","name":"ExpireYear","text":"2024","type":"select-one"}');
  
  await MK.onAssignment(pageDetails5.selectgZziNkQH7rqField, 50, 'after', `` + expireYear + ``, 'select');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 51, page.url(), '[{\"selector\":\"td>input\",\"index\":2},{\"selector\":\"td>input\",\"index\":2},{\"selector\":\"INPUT[id=\'CardCode\'][name=\'CardCode\'][type=\'text\']\",\"index\":0},{\"selector\":\"//INPUT[@id=\'CardCode\'][@name=\'CardCode\'][@type=\'text\']\",\"index\":0}]', 2, 'input', 'text', 'assignment', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"CardCode","name":"CardCode","text":"undef","type":"text"}');
  
  await MK.onAssignment(pageDetails5.inputLrgu4mRSWoyField, 51, 'after', `` + creditCardCCV + ``, 'text');  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 52, page.url(), '[{\"selector\":\"div.buttons>input.button-1.payment-info-next-step-button\",\"index\":0},{\"selector\":\"div>input\",\"index\":34},{\"selector\":\"INPUT[type=\'button\']\",\"index\":5},{\"selector\":\"//INPUT[@type=\'button\']\",\"index\":5}]', 2, 'input', 'button', 'click', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"undef","name":"undef","text":"undef","type":"button"}');
  await MK.onClick(pageDetails5.inputEY5S3rjcqB9Field, 52, 'before', 'Continue', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('snippet', 53, page.url());
  
  
  
  
  await MK.onJSSnippet(53, 'after', () => { var windowHeight = window.innerHeight; var middleOfWindow = windowHeight / 2;  window.scrollTo(0, middleOfWindow); }, 'execution', null, null); 
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 54, page.url(), '[{\"selector\":\"div.buttons>input.button-1.confirm-order-next-step-button\",\"index\":0},{\"selector\":\"div>input\",\"index\":35},{\"selector\":\"INPUT[type=\'button\']\",\"index\":6},{\"selector\":\"//INPUT[@type=\'button\']\",\"index\":6}]', 2, 'input', 'button', 'click', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"undef","name":"undef","text":"undef","type":"button"}');
  await MK.onClick(pageDetails5.inputrzkHKJlu21jField, 54, 'before', 'Confirm', 'none');  
  
  
  
  
  
  
  
  
  
  
  
  
  await muukReport.addStepInfo('step', 55, page.url(), '[{\"selector\":\"div.title>strong\",\"index\":0},{\"selector\":\"div>strong\",\"index\":0},{\"selector\":\"STRONG\",\"index\":0},{\"selector\":\"//STRONG[contains(text(),\\"Your order has been successfully process\\")]\",\"index\":0}]', 3, 'strong', '', 'click', '{"value":"undef","searchType":"undef","text":"undef"}', '{"id":"undef","name":"undef","text":"Your order has been successfully processed!","type":"undef"}');
  await MK.onClick(pageDetails10.strongZAZu4lxUA0YField, 55, 'before', 'Your order has been successfully processed!', 'equal');  
  
  
  
  
  
  
  
  
  
  
  
  
});



test.afterAll(async () => {
  await muukReport.createReportFile();
})


// This function allows user to send logs to the broweser logs.
// This can be called from playwright code snippets.
function browserLog(text: string){
  const timestamp = new Date().toLocaleString();
  consoleLogs.push(timestamp + " " +  text );
}
