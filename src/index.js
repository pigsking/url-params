
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
    let obj = {}
    const paramsArr = searchParamsArr(str)

    for (let i = 0; i < paramsArr.length; i++) {
        const paramArr = paramsArr[i].split('=')
        obj[paramArr[0]] = paramsArr[1]
    }

    return obj
}

class SearchParams {
    constructor(str) {
        this.str = str || ""
    }
    has(key) {
        const obj = searchParamsObj(this.str)
        return obj[key] != null
    }
    get(key) {
        let value = ''
        const arr = searchParamsArr(this.str)

        for (let i = 0; i < arr.length; i++) {
            const k = `${key}=`
            if (arr[i].indexOf(k) !== -1) {
                value = arr[i].split(k)[1] || ''
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
                const value = arr[i].split(k)[1] || ''
                values.push(value)
            }
        }
        return values
    }
    append(key, value) {
        this.str += `&${key}=${value}`

    }
    delete(key) {
        // this.str.replace(new RegExp(key, 'g'), '');
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
            const key = arr[i].split('=')[0] || ''
            keys.push(key)

        }
        return keys
    }
    set() {

    }
    sort() {

    }
    toString() {
        return this.str
    }
    values() {

    }
}

module.exports = SearchParams

// const url = 'https://www.toyou.xyz?age=allen&age=18'
// const params = new SearchParams(url)
// // console.log('has:' + params.has('age'))
// // console.log('get:' + params.get('age'))
// // console.log('getAll:' + params.getAll('age'))
// // console.log('append:' + params.append('name', 'allen'))
// // console.log('toString:' + params.toString())
// // console.log('keys:' + params.keys())
// // console.log('entries:' + params.entries())
// console.log('delete:' + params.delete('age'))
// console.log('toString:' + params.toString())





