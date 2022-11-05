import { createSlice, createSelector } from "@reduxjs/toolkit";

function getRandomColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

  
const slice = createSlice({
    name: 'greet',
    initialState: {
        say : "hello",
        rows : {},
        names : [],
        orders : {},
        assignOrders : {"Hold":[]},
        rowColors : {Hold : "#fffff"},
        fileName : 'Not Selected',
        banks : [],
        fill : {}
    },
    reducers: {
        sayGreet: (greet, action) => {
            greet.say = "hello selam" + action.payload.name
        },
        setRows : (greet , action) => {

            greet.rows = action.payload.rows
            greet.fill = action.payload.rows
            greet.assignOrders = {"Hold":[]}
            Object.entries(greet.rows).forEach(([key, _]) => {
                greet.assignOrders.Hold.push(key)
            })
            greet.names.forEach(name => {
                greet.assignOrders[name] = []
            })
        },
        addName : (greet , action) => {
            greet.names.push(action.payload.name)
            greet.rowColors[action.payload.name] = getRandomColor()
            greet.assignOrders[action.payload.name] = []
        },
        removeName : (greet , action) => {
            greet.names = greet.names.filter(name => name !== action.payload.name)
            greet.assignOrders[action.payload.name].forEach(id =>{
                 if (greet.rows[id]){greet.rows[id].Assign = "Hold"}})
            delete greet.assignOrders[action.payload.name]
        },
        setAssign : (greet, action) => {
            const {id, name} = action.payload
            
            greet.assignOrders[greet.rows[id].Assign] = greet.assignOrders[greet.rows[id].Assign].filter(ord => ord !== id)
            greet.rows[id].Assign = name
            greet.assignOrders[name].push(id)
        },
        setFileName : (greet, action) => {
            greet.fileName = action.payload.fileName
        },
        setBanks: (greet, action) => {
            greet.banks = action.payload.banks
        },
        filter : (greet, action) => {
            let res = {}
            const {min, max, bank, banks, phone} = action.payload
            for (const [key, value] of Object.entries(greet.rows) ){
                
                if (min && value['Total Pay Receiver'] < min) {
                    continue
                } 
                if (max && value['Total Pay Receiver'] > max) {
                    continue
                }
                if (bank !== 0 && value['Bank'] !== banks[bank]){
                    continue
                }
                if (phone && ""+value['Sender Phone'] !== ""+phone){
                    continue
                }
                res[key] = value
            }
            greet.fill = res
        },
        editFilds: (greet, action) => {
            console.log(action.payload)
            const {id, name, value} = action.payload
            console.log(typeof(id))
            console.log(greet.rows[1]===undefined)
            // for (const [key , _] of Object.entries(greet.rows)){
            //     console.log(key)
            //     if (key === id)console.log(id, key)
            // }
            greet.rows[id][name] = value
            console.log(greet.rows[id][name])
        },
        setUrgency : (greet, action) => {
            const {id, value} = action.payload
            greet.rows[id]["Speed"] = value
        },
        deleteRow : (greet, action) => {
            delete greet.rows[action.payload.id]
            if (greet.fill[action.payload.id]) {
                delete greet.fill[action.payload.id]
            }
        }
    }
})

export default slice.reducer
export const {sayGreet, setRows, addName, deleteRow, removeName, setAssign, setFileName, setBanks, editFilds, filter, setUrgency} = slice.actions
export const getGreet = createSelector(
    state => state.entities.greet,
    greet => greet.say
)
export const getRows = createSelector(
    state => state.entities.greet,
    greet => greet.rows
)
export const getNames = createSelector(
    state => state.entities.greet,
    greet => greet.names
)
export const getAssign = createSelector(
    state => state.entities.greet.rows,
    (_, key) => key,
    (rows, key) => {
        if (rows[key]){return rows[key]["Assign"]}
    }
)
export const getRow = createSelector(
    state => state.entities.greet.rows,
    (_, id) => id,
    (rows, id) => {
        return rows[id]
    }
)

export const getAssignOrders = createSelector(
    state => state.entities.greet.assignOrders,
    assignOrders => assignOrders
)
export const getColors = createSelector(
    state => state.entities.greet.rowColors,
    color => color 
)
export const getFileName = createSelector(
    state => state.entities.greet.fileName,
    file => file
)
export const getBanks = createSelector(
    state => state.entities.greet.banks,
    banks => banks
)
export const getFill = createSelector(
    state => state.entities.greet.fill,
    fill => fill
)
