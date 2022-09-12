import { Builder, Capabilities, By, until } from 'selenium-webdriver'
jest.setTimeout(130000)

afterAll(async () => {
  driver.quit()
})

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

describe('Bot should...', () => {
  test('grab an email address from temp-mail.org', async () => {
    await driver.get('https://temp-mail.org')
    // await throwAway.getAttribute('value') will result in "Loading" -- not what we want, toss it
    const throwAway = await driver.wait(
      until.elementLocated(By.xpath("//input[@id='mail']")),
      130000
    )
    // now that our throw away did it's job, charge in for the kill
    const promise = await driver.wait(
      until.elementLocated(By.xpath("//input[@id='mail']")),
      130000
    )
    const email = await promise.getAttribute('value')
    expect(email).toEqual('')
  })
})
