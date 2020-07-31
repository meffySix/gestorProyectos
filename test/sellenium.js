const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require("assert");

describe("Formulario de login", function() {

    it("Iniciar sesión con éxito", async function() {
        this.timeout(10000);

        let driver = await new Builder().forBrowser('chrome').build();
        try {
            // Navigate to our site.
            await driver.get('http://localhost:3000/login');
            // Enter the form and perform keyboard action "Enter"
            await driver.findElement(By.name('email')).sendKeys('daniel@gmail.com');
            await driver.findElement(By.name('password')).sendKeys('606404', Key.ENTER);

            let firstResult = await driver.wait(until.elementLocated(By.css('h2')), 10000);
            assert.equal("Bienvenido, Daniel", await firstResult.getAttribute("textContent"));
        }
        finally{
            driver.quit();
        }
    })
})