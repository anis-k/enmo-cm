var fs = require('fs');

function writeScreenShot(data, filename, mode = 'base64') {
    if (mode === 'base64') {
        var stream = fs.createWriteStream(filename+'.png');
        stream.write(new Buffer.from(data, 'base64'));
        stream.end();
    } else if (mode === 'txt') {
        var stream = fs.createWriteStream(filename+'.txt');
        stream.write(data);
        stream.end();
    } else if (mode === 'console') {
        console.log(data);
    }
}

describe('Login to app', function() {
    // it('should add a todo', function() {
    //     browser.waitForAngularEnabled(false);
    //     browser.get('http://127.0.0.1/maarch_trunk/apps/maarch_entreprise/index.php?display=true&page=login');

    //     element(by.id('login')).sendKeys('bbain');
    //     element(by.id('pass')).sendKeys('maarch');
    //     element(by.css('[name="submit"]')).click();

    //     // var todoList = element.all(by.repeater('todo in todoList.todos'));
    //     // expect(todoList.count()).toEqual(3);
    //     // expect(todoList.get(2).getText()).toEqual('write first protractor test');
    //     //
    //     // // You wrote your first test, cross it off the list
    //     // todoList.get(2).element(by.css('input')).click();
    //     // var completedAmount = element.all(by.css('.done-true'));
    //     // expect(completedAmount.count()).toEqual(2);
    // });

    // it('test 2', function() {
    //     var nbHeader = element.all(by.css('[class="bg-head-content"]'));
    //     expect(nbHeader.count()).toEqual(1);

    //     element(by.css('[routerLink="/about-us"]')).click();
    // });

    it('login to app', function () {
        browser.waitForAngularEnabled(true);
        browser.get(browser.baseUrl + '/dist/index.html#/login');
        browser.sleep(500);
        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, 'test/e2e/screenshots/login_to_app_' + browser.browserName);
        });
        element(by.id('login')).sendKeys('bblier');
        browser.sleep(500);
        element(by.id('password')).sendKeys('maarch');
        browser.sleep(500);
        element(by.id('submit')).click();
        browser.sleep(100);
        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, 'test/e2e/screenshots/submitLogin_' + browser.browserName);
        });
    });
});

