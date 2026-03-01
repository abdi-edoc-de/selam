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
        fill : {},
        id : 0,
    },
    reducers: {
        sayGreet: (greet, action) => {
            greet.say = "hello selam" + action.payload.name
        },
        setRows : (greet , action) => {
            greet.id = Object.keys(action.payload.rows).length + 1
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
        addRow: (greet, action) => {
            greet.rows[greet.id] = action.payload.row
            greet.id += 1

            if (!greet.banks.includes(action.payload.row.Bank)){
                greet.banks.push(action.payload.row.Bank)
            }
        },
        addName : (greet , action) => {
            greet.names.push(action.payload.name)
            greet.rowColors[action.payload.name] = getRandomColor()
            greet.assignOrders[action.payload.name] = []
        },
removeName: (greet, action) => {
  const name = String(action.payload.name ?? "").trim();
  greet.names = greet.names.filter((n) => n !== name);

  const ids = greet.assignOrders?.[name];
  if (!Array.isArray(ids)) {
    delete greet.assignOrders?.[name];
    delete greet.rowColors?.[name];
    return;
  }

  ids.forEach((id) => {
    if (greet.rows?.[id]) greet.rows[id].Assign = "Hold";
    if (!greet.assignOrders.Hold) greet.assignOrders.Hold = [];
    if (!greet.assignOrders.Hold.includes(id)) greet.assignOrders.Hold.push(id);
  });

  delete greet.assignOrders[name];
  delete greet.rowColors[name];
},
setAssign: (greet, action) => {
  let { id, name } = action.payload;

  // normalize name to avoid "Bob" vs "Bob " bugs
  name = String(name ?? "Hold").trim() || "Hold";

  const row = greet.rows?.[id];
  if (!row) return;

  const prev = String(row.Assign ?? "Hold").trim() || "Hold";

  // Ensure assignOrders exists
  if (!greet.assignOrders) greet.assignOrders = {};

  // Ensure buckets exist
  if (!Array.isArray(greet.assignOrders[prev])) greet.assignOrders[prev] = [];
  if (!Array.isArray(greet.assignOrders[name])) greet.assignOrders[name] = [];
  if (!Array.isArray(greet.assignOrders.Hold)) greet.assignOrders.Hold = [];

  // Remove from previous bucket
  greet.assignOrders[prev] = greet.assignOrders[prev].filter((ord) => ord !== id);

  // Assign and add to new bucket (avoid duplicates)
  row.Assign = name;
  if (!greet.assignOrders[name].includes(id)) {
    greet.assignOrders[name].push(id);
  }
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
            const {id, updates} = action.payload
            updates.forEach(item=>{
                Object.entries(item).forEach(([name, value])=>greet.rows[id][name] = value)
            })
        },
        setUrgency : (greet, action) => {
            const {id, value} = action.payload
            greet.rows[id]["Speed"] = value
        },
        deleteRow: (greet, action) => {
  const id = String(action.payload.id);

  Object.keys(greet.assignOrders ?? {}).forEach((bucket) => {
    greet.assignOrders[bucket] = (greet.assignOrders[bucket] ?? []).filter((x) => x !== id);
  });

  delete greet.rows[id];
  delete greet.fill[id];
}
    }
})

export default slice.reducer
export const {sayGreet, setRows, addName, deleteRow, removeName, setAssign, setFileName, setBanks, editFilds, filter, setUrgency, addRow} = slice.actions
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
