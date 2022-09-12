import { Builder, Capabilities, By, until } from 'selenium-webdriver'
jest.setTimeout(99999999)

afterAll(async () => {
  driver.quit()
})

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

describe('Bot should...', () => {
  test('read an email from temp-mail.org', async () => {
    await driver.get('https://temp-mail.org')
    // xpath for the email link: //span[@class='inboxSenderEmail inboxSenderEllipsis']
    const throwAway = await driver.wait(
      until.elementLocated(By.xpath("//input[@id='mail']")),
      99999999
    ) // wait for a really long time, throw away function whose purpose is to wait
    const throwAway2 = await driver.wait(
      until.elementLocated(By.xpath("//input[@id='mail']")),
      99999999
    )
// this one got me blocked by CloudFlare
    const emailLink = await driver.wait(until.elementLocated(By.xpath("//div[@class='col-box']//a[contains(., 'Verify your email')]")), 999999999)
emailLink.click()
    const verifyEmail = await driver.wait(until.elementLocated(By.xpath("//main//div[@class='inbox-data-content-intro']//a")), 999999999)    
    const verifyLink = await verifyEmail.getAttribute('href')
    expect(verifyLink).toEqual("")
  })
})
