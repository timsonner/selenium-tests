import { Builder, By, Capabilities, until, } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'

afterAll(async () => {
  driver.quit()
})

jest.setTimeout(999999)

const capabilities = new Capabilities({
  map_: {
    acceptInsecureCerts: false,
    browserName: 'chrome',
    browserVersion: '105.0.5195.102',
    chrome: {
      chromedriverVersion:
        '105.0.5195.52 (412c95e518836d8a7d97250d62b29c2ae6a26a85-refs/branch-heads/5195@{#853})',
      userDataDir:
        '/var/folders/pq/lwr0__9d4h507q486_lscnhh0000gn/T/.com.google.Chrome.foo',
    },
    'goog:chromeOptions': {
      debuggerAddress: 'localhost:53146',
    },
    networkConnectionEnabled: false,
    pageLoadStrategy: 'normal',
    platformName: 'mac os x',
    proxy: {},
    setWindowRect: true,
    strictFileInteractability: false,
    timeouts: { implicit: 0, pageLoad: 300000, script: 30000 },
    unhandledPromptBehavior: 'dismiss and notify',
    'webauthn:extension:credBlob': true,
    'webauthn:extension:largeBlob': true,
    'webauthn:virtualAuthenticators': true,
  },
})

// construct driver with custom capabilities
// const driver = new Builder()
//   .withCapabilities(capabilities)
//   .forBrowser('chrome')
//   .build()

// construct builder with custom user-agent
const driver = new Builder()
     .setChromeOptions(new chrome.Options().addArguments('user-agent="Fozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"')) // 
     .forBrowser('chrome')   
    .build();

//construct driver with default capabilities
// const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

describe('Selenium should...', () => {
  test('check the user agent', async () => {
    const driverCapabilities = await driver.getCapabilities()
    expect(driverCapabilities).toEqual('')
  })
  test('have a different user agent', async () => {
    driver.get('https://www.google.com/search?q=my+user+agent')
    let foo = await driver.wait(until.elementLocated(By.id('foo')), 30000, 'Timed out after 30 seconds', 5000);
    expect("").toEqual("")
  })
})

