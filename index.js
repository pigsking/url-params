const iterable = !!Symbol

function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

function getParamsObj(params) {
    let paramsObj = {}
    let paramsArr = []

    if (getType(params) === 'Object') {
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                paramsObj[key] = [params[key]]
            }
        }
    }

    if (getType(params) === 'Array') {
        for (let i = 0; i < params.length; i++) {
            paramsObj[params[i][0]] = [params[i][1]]
        }
    }

    if (getType(params) === 'String') {
        if (params.indexOf('=') === -1) return false

        if (params.indexOf('?') !== -1) {
            const paramsStr = params.split('?')[1]
            paramsArr = paramsStr.split('&')
        } else {
            paramsArr = params.split('&')
        }

        for (let i = 0; i < paramsArr.length; i++) {
            const item = paramsArr[i].split('=')
            const key = item[0]
            const value = item[1]

            if (key in paramsObj) {
                paramsObj[key].push(value)
            } else {
                paramsObj[key] = [value]
            }
        }
    }
    return paramsObj
}

function makeIterator(arr) {
    const iterator = {
        next() {
            const value = arr.shift();
            return { done: value === undefined, value: value };
        }
    };

    if (iterable) {
        iterator[Symbol.iterator] = () => iterator
    }

    return iterator;
}

export default class SearchParams {
    constructor(paramsStr) {
        this.paramsStr = paramsStr || {}
        this.paramsObj = getParamsObj(this.paramsStr)
    }
    has(key) {
        return key in this.paramsObj
    }
    get(key) {
        return key in this.paramsObj ? this.paramsObj[key][0] : null
    }
    getAll(key) {
        return key in this.paramsObj ? this.paramsObj[key] : []
    }
    append(key, value) {
        this.paramsObj[key] = [value]
    }
    delete(key) {
        delete this.paramsObj[key]
    }
    set(key, value) {
        this.paramsObj[key] = [value]
        return this.paramsObj
    }
    keys() {
        let keys = []
        this.forEach((value, key) => {
            keys.push(key)
        })
        return makeIterator(keys)
    }
    values() {
        let values = []
        this.forEach(value => {
            values.push(value)
        })
        return makeIterator(values)
    }
    entries() {
        let keysAndValsArr = []
        this.forEach((value, key) => {
            keysAndValsArr.push([key, value])
        })
        return keysAndValsArr
    }
    sort() {
        let keys = []
        let sortObj = {}
        const obj = this.paramsObj

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key)
            }
        }
        keys.sort()
        for (let i = 0; i < keys.length; i++) {
            sortObj[keys[i]] = obj[keys[i]]
        }
        this.paramsObj = sortObj
    }
    forEach(fn) {
        const obj = this.paramsObj
        Object.getOwnPropertyNames(obj).forEach(key => {
            obj[key].forEach(value => {
                fn(value, key)
            })
        })
    }
    toString() {
        let paramsArr = []
        this.forEach((value, key) => {
            paramsArr.push(`${key}=${value}`)
        })
        return paramsArr.join('&')
    }
}
