const chai = require('chai')
const expect = chai.expect;
const assertArrays = require('chai-arrays');

const SearchParams = require('../build/index.js')

chai.use(assertArrays);

function getSimpleParams() {
    return new SearchParams('name=allen&gender=boy')
}
function getKeyRepeatParams() {
    return new SearchParams('name=allen&gender=boy&gender=man')
}

describe("has", function () {
    it('存在', function () {
        const s = getSimpleParams()
        expect(s.has('name')).to.be.equal(true)
    });
    it('不存在', function () {
        const s = getSimpleParams()
        expect(s.has('age')).to.be.equal(false)
    });
});

describe("get", function () {
    it('存在', function () {
        const s = getSimpleParams()
        expect(s.get('name')).to.be.equal('allen')
    });
    it('不存在', function () {
        const s = getSimpleParams()
        expect(s.get('age')).to.be.equal(null)
    });
});

describe("getAll", function () {
    it('返回值为数组', function () {
        const s = new SearchParams()
        expect(s.getAll('')).to.be.equalTo([])
    });
    it('URL 不存在同名参数', function () {
        const s = getSimpleParams()
        expect(s.getAll('name')).to.be.equalTo(['allen'])
    });
    it('URL 存在同名参数', function () {
        const s = getKeyRepeatParams()
        expect(s.getAll('gender')).to.be.equalTo(['boy', 'man'])
    });

});

describe("append", function () {
    it('正常添加', function () {
        const s = getSimpleParams()
        s.append('age', '18')
        expect(s.toString()).to.be.equal('name=allen&gender=boy&age=18')
    });
    it('键为空字符串', function () {
        const s = getSimpleParams()
        s.append('', '18')
        expect(s.toString()).to.be.equal('name=allen&gender=boy&=18')
    });
    it('值为空字符串', function () {
        const s = getSimpleParams()
        s.append('age', '')
        expect(s.toString()).to.be.equal('name=allen&gender=boy&age=')
    });
});

describe("delete", function () {
    it('删除不同名参数', function () {
        const s = getSimpleParams()
        s.delete('name')
        expect(s.toString()).to.be.equal('gender=boy')
    });
    it('删除同名参数', function () {
        const s = getKeyRepeatParams()
        s.delete('gender')
        expect(s.toString()).to.be.equal('name=allen')
    });
    it('删除不存在的参数', function () {
        const s = getSimpleParams()
        s.delete('age')
        expect(s.toString()).to.be.equal('name=allen&gender=boy')
    });
});

describe("keys", function () {
    it('获取所有参数名', function () {
        const s = getSimpleParams()
        expect(s.keys()).to.be.equalTo(['name', 'gender'])
        s.append('age', 18)
        expect(s.keys()).to.be.equalTo(['name', 'gender', 'age'])
    });
});

describe("set", function () {
    it('设置已有的参数值', function () {
        const s = getSimpleParams()
        s.set('gender', 'man')
        expect(s.toString()).to.be.equal('name=allen&gender=man')
    });
    it('设置没有的参数值', function () {
        const s = getSimpleParams()
        s.set('age', '18')
        expect(s.toString()).to.be.equal('name=allen&gender=boy&age=18')
    });
});

describe("sort", function () {
    it('无重名参数排序', function () {
        const s = getSimpleParams()
        s.sort()
        expect(s.toString()).to.be.equal('gender=boy&name=allen')
    });
    it('有重名参数排序', function () {
        const s = getKeyRepeatParams()
        s.sort()
        expect(s.toString()).to.be.equal('gender=boy&gender=man&name=allen')
    });
});

describe("values", function () {
    it('获取所有参数值', function () {
        const s = getSimpleParams()
        expect(s.values()).to.be.equalTo(['allen', 'boy'])
        s.append('age', 18)
        expect(s.values()).to.be.equalTo(['allen', 'boy', '18'])
    });
});

describe("forEach", function () {
    it('forEach 循环', function () {
        let obj = {}
        const s = getSimpleParams()
        s.forEach((value, key) => {
            obj[key] = value
        })
        expect(obj).to.be.deep.equal({
            name: 'allen',
            gender: 'boy'
        })
    });
});
