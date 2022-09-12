import { Builder, Capabilities, By } from 'selenium-webdriver'

afterAll(async () => {
  driver.quit()
})

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

describe('Bot should...', () => {
  test('grab all button text', async () => {
    await driver.get('https://linkedin.com')
    const arrayOfPromises = await driver.findElements(By.xpath("//button")) // array of promises that need to be resolved
// resolve all the promises using Promise.all and .map()
    const arrayOfButtonText = await Promise.all(
      arrayOfPromises.map(async (promise) => {
return promise.getAttribute('textContent') // return the 'textContent' of each resolved promise as an array of strings
      })
    )
    expect(arrayOfButtonText).toEqual("")
  })
})
