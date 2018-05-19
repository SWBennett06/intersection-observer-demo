import { Page, Browser, launch } from 'puppeteer';

const APP = 'http://localhost:8081/';

let page: Page;
let browser: Browser;

const width = 1920;
const height = 1080;

beforeAll(async () => {
  browser = await launch({
    headless: true,
    // slowMo: 160,
    args: [`--window-size=${width},${height}`],

  });

  page = await browser.newPage();
  await page.setViewport({ width, height});
});

beforeEach(async () => {
  await page.goto(APP);
  // Resets window position to top (goto same page retains scroll position, otherwise)
  page.evaluate(_ => {
    window.scrollTo(0, 0);
  });
});

afterAll(() => {
  browser.close();
});

/** Tests that each image element has a src set on it. (not a srcset set!) */
const testSrcSet = async (page: Page): Promise<boolean> => {
  return await page.$$eval('img', els => {
    let _isSrcSet = true;
    els.forEach(el => {
      _isSrcSet = _isSrcSet && (<HTMLImageElement>el).src.length > 0;
    });
    return _isSrcSet;
  });
};

/** Scrolls to bottom with sufficient wait for animation */
const scrollToBottom = async (page: Page): Promise<void> => {
  page.evaluate(_ => {
    document.getElementById('10').scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    })
  })
  // Magic number to allow scroll animation    
  await page.waitFor(2000);
};

describe('Page Functional', () => {
  test('Scroll listener works', async () => {
    await page.waitForSelector('#triggerScrollDemo');    
    await page.click('#triggerScrollDemo');
    
    await scrollToBottom(page);    

    const isSrcSet = await testSrcSet(page);
    expect(isSrcSet).toBe(true);
  }, 10000)

  test('Intersection observer works', async () => {
    await page.waitForSelector('#triggerIODemo');    
    await page.click('#triggerIODemo');
    
    await scrollToBottom(page);

    const isSrcSet = await testSrcSet(page);
    expect(isSrcSet).toBe(true);
  }, 10000)
});
