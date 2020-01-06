const expect = require('chai').expect;
const URLSearchParams = require('../dist/index.js')

const URLSearch = new URLSearchParams('?name=Allen&age=18')

describe("has", function () {
    it('has', function () {
        expect(URLSearch.has('name')).to.be.equal(true)
    });

});

describe("get", function () {
    it('get', function () {
        expect(URLSearch.get('age')).to.be.equal('18')
    });
});
