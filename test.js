require("mocha");
var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

test.describe('Basic Test Suite', function () {
    test.before(function() {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
    });
    test.after(function() {
        driver.quit();
    });
    test.it('Basic Test Case', function() {
        driver.get('http://www.google.com');
        
        driver.executeScript('return document.getElementById("hplogo").alt').then(function(return_value) {
          assert.equal(return_value, 'Google')
		});
		
		driver.executeScript('return document.querySelector("div.FPdoLc.VlcLAe input[name=btnK]").value').then(function(return_value) {
          assert.equal(return_value, 'Google Search')
		});
		
		driver.executeScript('return document.querySelector("div.FPdoLc.VlcLAe input[name=btnI]").value').then(function(return_value) {
          assert.equal(return_value, "I'm Feeling Lucky")
		});
		
		driver.executeScript('return document.domain').then(function(return_value) {
          assert.equal(return_value, "www.google.com")
		});
		
		driver.findElement(webdriver.By.name('q')).sendKeys('PayPal')		
		
		element = driver.findElement(webdriver.By.xpath('/html/body/div[1]/div[3]/form/div[2]/div/div[3]/center/input[2]'))
		driver.actions().mouseMove(element).click().perform()	
		driver.get('http://www.paypal.com');
		driver.findElement(webdriver.By.css('a[data-pa-click="Footer-Link-Sitemap"]')).click()
		driver.executeScript('return document.URL').then(function(return_value) {
          assert.equal(return_value, "https://www.paypal.com/in/webapps/mpp/full-sitemap")
		});
		var allLinks=[]
		driver.findElements(webdriver.By.tagName("a")).then(function(elems){
			elems.forEach(function (elem) {
				elem.getAttribute('href').then(function(textValue){
					if(typeof textValue !== undefined){					
						allLinks.push(textValue);	
						console.log(textValue);											
					}
				}).then(function(){
					console.log(allLinks);
				});
			});
		});
    });
});
