/**
 * @type {function (number, number): boolean} 
 */
const outTime = (time, min) => {
    let now = Date.now();
    return now - time > min * 60 * 1000
}

/**
 * @type {function ({id:number,time:number,msgs:{role:string,content:string}[]}[], number): {id:number,msgs:{role:string,content:string}[]}} 
 */
const addWithId = (list, id) => {
    let item = { id: id, msgs: [] }
    console.log("create id: " + id)
    list.push(item)
    return item
}

/**
 * @type {function ({id:number,time:number,msgs:{role:string,content:string}[]}[], number): {id:number,msgs:{role:string,content:string}[]}} 
 */
const findById = (list, id) => {
    for (let i = 0; i < list.length; i++) {
        if (outTime(list[i].time, 10)) {
            console.log("delete id:" + list[i].id)
            deleteById(list, list[i].id)
            i -= 1
            continue
        }
        if (list[i].id == id) {
            list[i].time = Date.now()
            return list[i];
        }
    }
    return addWithId(list, id)
}

/**
 * @type {function ({id:number,time:number,msgs:{role:string,content:string}[]}[], number)} 
 */
const deleteById = (list, id) => {
    for (let i in list) {
        if (list[i].id == id) {
            list.splice(Number.parseInt(i), 1)
        }
    }
}

/**
 * @type {function ([])} 
 */
const randomArray = (array) => array[Math.floor(Math.random() * array.length)]

module.exports = { outTime, findById, addWithId, deleteById,randomArray }