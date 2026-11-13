# selenium-tests

Reference stash of Selenium WebDriver examples, written as Jest tests in TypeScript. The files show Chrome driver setup, collecting button text with `findElements`, and waiting on a temporary inbox page. Each test ends with `expect(...).toEqual` against an empty string, so the files record the WebDriver calls rather than a finished check against the live page.

## Prerequisites

- Node.js and npm. The `selenium-webdriver` release resolved by the install command below is 4.52.0, and that package requires Node.js `^22.23.4 || ^24.22.1 || >= 26.12.1`.
- Google Chrome, discoverable by ChromeDriver. Selenium Manager downloads a matching ChromeDriver on the first launch. This repository does not include ChromeDriver.

## Install, build, and test

The repository contains the test files and this README. Installing the runner writes `package.json`, `package-lock.json`, and `node_modules` into the working tree. There is no build script and no compiled output.

```bash
npm install selenium-webdriver jest ts-jest typescript
```

That command resolved `selenium-webdriver@4.52.0`, `jest@30.5.2`, `ts-jest@29.4.15`, and `typescript@6.0.3`.

`selenium-webdriver` 4.52.0 ships without TypeScript declaration files, and the repo has no `tsconfig.json`, so `npx jest --preset ts-jest` stops on type errors before a test runs. The config below turns those diagnostics off and sets `esModuleInterop`, which `driver-builds.test.ts` needs for `import chrome from 'selenium-webdriver/chrome'`.

```bash
cat > jest.config.cjs << 'EOF'
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      diagnostics: false,
      tsconfig: {
        esModuleInterop: true,
        strict: false,
      },
    }],
  },
}
EOF
```

Run one file:

```bash
npx jest --config jest.config.cjs --runInBand --forceExit all-button-text.test.ts
npx jest --config jest.config.cjs --runInBand --forceExit get-email-address.test.ts
npx jest --config jest.config.cjs --runInBand --forceExit driver-builds.test.ts
npx jest --config jest.config.cjs --runInBand --forceExit check-email.test.ts
```

Or every `*.test.ts` file:

```bash
npx jest --config jest.config.cjs --runInBand --forceExit
```

`check-email.test.ts` calls `jest.setTimeout(99999999)` and waits up to `99999999` and `999999999` milliseconds inside WebDriver, so that process can stay open for a long time. `get-email-address.test.ts` sets the Jest timeout to `130000` milliseconds. `driver-builds.test.ts` sets it to `999999` milliseconds. `--forceExit` ends Jest after the suite when the Chrome driver is still open.

## Usage

All four files construct the driver at load time and call `driver.quit()` in `afterAll`.

### all-button-text.test.ts

Builds Chrome with `new Builder().withCapabilities(Capabilities.chrome()).build()`. The test opens `https://linkedin.com`, calls `findElements(By.xpath("//button"))`, and maps each element through `getAttribute('textContent')` with `Promise.all`. It expects that array to equal `""`.

### get-email-address.test.ts

Uses the same Chrome builder. `jest.setTimeout(130000)`. The test opens `https://temp-mail.org`, then waits twice, up to `130000` ms each time, for `By.xpath("//input[@id='mail']")`. The comment in the file says an early `getAttribute('value')` returns the loading text. The test reads `value` from the second wait and expects `''`.

### check-email.test.ts

Uses the same Chrome builder. `jest.setTimeout(99999999)`. The test opens `https://temp-mail.org` and waits twice for `//input[@id='mail']` with a timeout of `99999999`. It then waits up to `999999999` ms for `//div[@class='col-box']//a[contains(., 'Verify your email')]`, calls `click()` on that element, waits the same amount of time for `//main//div[@class='inbox-data-content-intro']//a`, reads `href`, and expects `""`. A comment in the file says one lookup was blocked by Cloudflare.

### driver-builds.test.ts

`jest.setTimeout(999999)`. The file builds a `Capabilities` object whose `map_` holds a sample Chrome session: browser version `105.0.5195.102`, a ChromeDriver version string, timeouts, and other capability fields, including a local user-data directory and a debugger address. The `Builder` that passes that object to `.withCapabilities()` is commented out. A `Capabilities.chrome()` builder is commented out as well.

The driver that runs is:

```ts
new Builder()
  .setChromeOptions(new chrome.Options().addArguments('user-agent="Fozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"'))
  .forBrowser('chrome')
  .build()
```

`check the user agent` calls `driver.getCapabilities()` and expects `''`.

`have a different user agent` calls `driver.get('https://www.google.com/search?q=my+user+agent')`, then `driver.wait(until.elementLocated(By.id('foo')), 30000, 'Timed out after 30 seconds', 5000)`. The assertion is `expect("").toEqual("")`.

## Layout

```
all-button-text.test.ts
check-email.test.ts
driver-builds.test.ts
get-email-address.test.ts
README.md
```

## License

This repository has no `LICENSE` file.
