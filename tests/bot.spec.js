const { test, expect } = require('@playwright/test');
const URL = 'https://www.powerlanguage.co.uk/wordle/';

test('cheat and solve puzzle', async ({ browser }) => {
  // opens in incognito mode, so puzzle will always be unsolved
  const context = await browser.newContext(); 
const page = await context.newPage(); 

  await page.goto(URL);
  page.clea
  const title = page.locator('.title');
  await expect(title).toHaveText('WORDLE');

  const localStorage = await page.evaluate(() =>
      window.localStorage
    );
  const strGameState = localStorage.gameState;
  const gameState = JSON.parse(strGameState);
  const solution = gameState.solution;
  await expect(solution).toHaveLength(5);
  console.log('Solution is: ', solution);

  // close overlay
  const btnClose = await page.waitForSelector('.close-icon');
  btnClose.click();
  for (let c of solution){
    const key = await page.waitForSelector(`[data-key=${c}]`);
	  await key.click();
  }
  const btnEnter = await page.waitForSelector('[data-key=↵]');
  await btnEnter.click();
  function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }
await page.waitForTimeout(4000);
// copy credential to clipboard
const btnShare = await page.waitForSelector('#share-button');
await btnShare.click();
console.log('puzzle solved.  badge is copied into clipboard')
});  