
function searchParamsArr(str) {
    if (str.indexOf('=') === -1) return false

    let paramsArr = []
    if (str.indexOf('?') !== -1) {
        const paramsStr = str.split('?')[1]
        paramsArr = paramsStr.split('&')
    } else {
        paramsArr = str.split('&')
    }

    return paramsArr
}

function searchParamsObj(str) {
    let paramsObj = {}
    const paramsArr = searchParamsArr(str)

    for (let i = 0; i < paramsArr.length; i++) {
        const paramArr = paramsArr[i].split('=')
        paramsObj[paramArr[0]] = paramsArr[1]
    }

    return paramsObj
}

export default class SearchParams {
    constructor(str) {
        this.str = str || ""
    }
    has(key) {
        return key in searchParamsObj(this.str)
    }
    get(key) {
        let value = null
        const arr = searchParamsArr(this.str)

        for (let i = 0; i < arr.length; i++) {
            const k = `${key}=`
            if (arr[i].indexOf(k) !== -1) {
                value = arr[i].split(k)[1]
                break
            }
        }
        return value
    }
    getAll(key) {
        let values = []
        const arr = searchParamsArr(this.str)

        for (let i = 0; i < arr.length; i++) {
            const k = `${key}=`
            if (arr[i].indexOf(k) !== -1) {
                const value = arr[i].split(k)[1]
                values.push(value)
            }
        }
        return values
    }
    append(key, value) {
        this.str += `&${key}=${value}`
    }
    delete(key) {
        const arr = searchParamsArr(this.str)
        let filterArr = []
        for (let i = 0; i < arr.length; i++) {
            const k = `${key}=`
            if (arr[i].indexOf(k) === -1) {
                filterArr.push(arr[i])
            }
        }
    }
    entries() {
        let keysAndValsArr = []
        const arr = searchParamsArr(this.str)

        for (let i = 0; i < arr.length; i++) {
            const itemArr = arr[i].split('=')
            keysAndValsArr.push([itemArr[0], itemArr[1]])
        }
        return keysAndValsArr
    }
    keys() {
        let keys = []
        const arr = searchParamsArr(this.str)

        for (let i = 0; i < arr.length; i++) {
            const key = arr[i].split('=')[0] || null
            keys.push(key)
        }
        return keys
    }
    set(key, value) {
        if (this.has(key)) {
            this.delete(key)
        }
        this.append(key, value)
    }
    sort() {
        this.str = searchParamsArr(this.str).sort().join('&')
    }
    toString() {
        return this.str
    }
    values() {
        let values = []
        const arr = searchParamsArr(this.str)

        for (let i = 0; i < arr.length; i++) {
            const value = arr[i].split('=')[1] || null
            values.push(value)
        }
        return values
    }
    forEach(fn) {
        const arr = searchParamsArr(this.str)
        for (let i = 0; i < arr.length; i++) {
            const itemArr = arr[i].split('=')
            fn(itemArr[1], itemArr[0])
        }
    }
}
