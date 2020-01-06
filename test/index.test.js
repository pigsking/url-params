const chai = require('chai')
const expect = chai.expect;
const assertArrays = require('chai-arrays');

const SearchParams = require('../build/index.js')

chai.use(assertArrays);

function URL(type) {
    let url = 'https://www.toyou.xyz?name=allen&age=18&gender=boy'
    switch (type) {
        case '1': {
            url = '?name=allen&age=18&gender=boy'
            break;
        }
        case '2': {
            url = '?name=allen&age=18&gender=boy&age=20'
            break;
        }
        case '3': {
            url = '?name=allen&age=18gender=boy'
            break;
        }
    }
    return new SearchParams(url)
}
describe("has", function () {
    it('存在', function () {
        expect(URL().has('name')).to.be.equal(true)
    });
    it('不存在', function () {
        expect(URL().has('&name=')).to.be.equal(false)
    });
});

describe("get", function () {
    it('存在', function () {
        expect(URL().get('age')).to.be.equal('18')
    });
    it('不存在', function () {
        expect(URL().get('age=')).to.be.equal(null)
    });
});

describe("getAll", function () {
    it('返回值为数组', function () {
        expect(URL().getAll('')).to.be.array()
    });
    it('URL 不存在同名参数', function () {
        expect(URL().getAll('name')).to.be.equalTo(['allen'])
    });
    it('URL 存在同名参数', function () {
        expect(URL('2').getAll('age')).to.be.equalTo(['18', '20'])
    });

});

describe("append", function () {
    it('正常添加', function () {
        const searchParams = new SearchParams('?name=allen&age=18&gender=boy')
        searchParams.append('height', '175')
        expect(searchParams.toString()).to.be.equal('?name=allen&age=18&gender=boy&height=175')
    });
    // it('键为空字符串', function () {
    //     expect(URL().append('', '175')).to.be.array()
    // });
    // it('值为空字符串', function () {
    //     expect(URL().append('height', '')).to.be.array()
    // });
});

