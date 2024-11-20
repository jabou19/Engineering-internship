import * as SQLite from 'expo-sqlite';
export const db = SQLite.openDatabase('sqlite.db')

import { setXlsx } from './Mobile_phone'
import { Catagories, Products, Models, Brands, EStations, Items } from './Testdata'

// for 'table' in the functions
const tableList = [ 'EStations', 'Catagories', 'Products', 'Models', 'Brands', 'Items' ]

var table = null


//############  IMPORTANT ###############
// MUST be used when starting app
const setTable = (temp) => table = temp;


// standard CRUD for database
const insertData = async (item, tempTable = table) => {
	await db.transaction(tx => {
		tx.executeSql(
			createInsertSql([item],tempTable),null,
			(txObj, results) => {console.log("db insert success: good job :thumbs_up: "+results)},
			(txObj,error) => {console.log("db insert error: " + error)}
			)
		}
	)
}

const getData = async (setDataFunc, tempTable = table) => {
	await db.transaction(tx => {
		tx.executeSql(
			'SELECT * FROM '+tempTable+' ORDER BY id ASC', null,
			(_, { rows: { _array } }) => {
				setDataFunc(_array)
			})
		},
		//(txObj, error) => {console.log('DB Select All Error: ', error)},
		//(_txObj, success) => {console.log('data gotten', success)}
	)
}

const getSpecificData = async (id,setDataFunc, tempTable = table) => {
	await db.transaction(tx => {
		tx.executeSql(
				"SELECT * FROM "+tempTable+" WHERE id = ?",
				[id],
				(_, { rows: { _array } }) => {
					setDataFunc(_array)
				})
			}
		),
	(txObj, error) => {console.log('DB Select Specific Error: ', error)},
	(txObj, success) => {console.log('specific data gotten', success)}
}

const updateData = async (item, tempTable = table) => {
	await db.transaction(tx => {
		tx.executeSql(
			createUpdateSql(item,tempTable),null,
			(txObj, results) => {console.log("db update success: huzzah for you! "+results)},
			(txObj,error) => {console.log("db update error: " + error)}
		)
	})
}

const deleteData = async (id, tempTable = table) => {
	await db.transaction(tx => {
		tx.executeSql(
			'DELETE FROM '+tempTable+ ' WHERE id = ?', id,
			(txObj, results) => {console.log("db data deleted success: haleluja! ", results)},
			(txObj,error) => {console.log("db data delete error: ", error)}
		)
	})
}

// other utility functions
const getTable = async (tempTable = table) => {
	await db.transaction(tx => {
		tx.executeSql(
				createTableSql(tempTable)
			)
		},
		(_, error) => {console.log('db error creating tables: ', error)},
		(_, success) => {console.log('table gotten', success)}
	)
}

const dropData = async (tempTable = table) => {
	var tempStr = 'DROP TABLE ' +tempTable 
	await db.transaction(tx => {
		tx.executeSql(
			tempStr,null,
			(txObj, results) => {console.log("db drop success: it worked! ",results)},
			(txObj,error) => {console.log("db drop error: " + error)}
		)
	})
}

export const dropAll = async () => {
	for (let i = 0; i < tableList.length; i++) {
		let tempStr = 'DROP TABLE ' +tableList[i]
		await db.transaction(tx => {
			tx.executeSql(
				tempStr,null,
				(txObj, results) => {console.log("db drop success: it worked! ",results)},
				(txObj,error) => {console.log("db drop error: " + error)}
			)
		})
	}
}

const vacuums = async () => {
	await db.exec([{sql:'VACUUM;', args: []}], false, 
		//() => console.log('got here'),
		(txObj, results) => console.log("db truncation success: haleluja! " + results),
		(txObj,error) => console.log("db truncation error: " + error))
}

export const getCountryEst = async (country,getTest) => {
	await db.transaction(tx => {
			tx.executeSql(
				'SELECT * FROM EStations WHERE country = ?',
				[country],
				(_, { rows: { _array } }) => {
				getTest(_array)
			})},
		(txObj,error) => {console.log("db country est error: " + error)},
		(txObj, results) => {console.log("db country est success: "+results)},
	)
}

export const getDataGroup = async (theid,setData,tempTable = table) => {
	await db.transaction(tx => {
		tx.executeSql(
				"SELECT * FROM "+tempTable+" WHERE "+theid,
				null,
				(_, { rows: { _array } }) => {
					setData(_array)
				})
			}
		),
	(txObj, error) => {console.log('DB group Specific Error: ', error)},
	(txObj, success) => {console.log('group data gotten', success)}
}

export const getSpecificItem = async (tempTable = table, setData,id) => {
	await db.transaction(tx => {
		tx.executeSql(
				specificItemSql(tempTable,id),
				null,
				(_, { rows: { _array } }) => {
				setData(_array)
			})
		},
		(txObj, error) => {console.log('DB Specific Item Error: ', error)},
		(_txObj, success) => {console.log('specific item gotten', success)}
	)
}


// main object that'll be used
export const database = {
	getTable,
	getData,
	getSpecificData,
	dropData,
	deleteData,
	vacuums,
	insertData,
	updateData,
	setTable,
	dropAll
}




// implement testdata into database
// ##########   WARNING ###########
// ######### only run once ########
export const createTestData = async () => {
	setXlsx(applyExtraData)
}
 
async function applyExtraData (data) {
	let mobileBrands = Array.from(new Set(data.map(item => item.LITE_1)))

	for (let i = 0; i < mobileBrands.length; i++) {
		//products: smartphone 18
		Brands.push({id: Brands.length+1, proId: 18, name: mobileBrands[i]})
	}

	for (let i = 0; i < data.length; i++) {
		let knowBrand = Brands.findIndex(prop => prop.name ===data[i].LITE_1 && prop.proId === 18)
		Models.push({id: Models.length+1, bndId: knowBrand+1, name: data[i].LITE_2})
	}

	const testdata = [createInsertSql(EStations,tableList[0]),createInsertSql(Catagories,tableList[1]),createInsertSql(Products,tableList[2]),createInsertSql(Models,tableList[3]),createInsertSql(Brands,tableList[4]),createInsertSql(Items,tableList[5])]

	testdata.forEach(prop => console.log(prop))

	for (let i = 0; i < tableList.length; i++) {
		getTable(tableList[i])
	}

	for (let i = 0; i < testdata.length; i++) {
		await db.transaction(tx =>
			tx.executeSql(
				testdata[i],
				null,
				(txObj, results) => {console.log("db test data insert success: good job :thumbs_up: "+results)},
				(txObj,error) => {console.log("db test data insert error: " + error)}
			)
		)
	}
}



//#############			For creating sql strings 		#################
const createInsertSql = (props, tab) => {
	var tempStr = 'INSERT INTO ' 
	switch (tab){
		case 'Products':
			tempStr += tab + ' (id, catId, name) VALUES '
			props.forEach(prop =>
				tempStr += '('+prop.id+','+prop.catId+',"'+prop.name+'"),'
			)
			return tempStr.slice(0,-1)
		case 'Catagories':
			tempStr += tab + ' (id, name) VALUES '
			props.forEach(prop =>
				tempStr += '('+prop.id+', "'+prop.name+'"),'	
			)
			return tempStr.slice(0,-1)
		case 'Brands':
			tempStr += tab + ' (id, proId, name) VALUES '
			props.forEach(prop =>
				tempStr += '('+prop.id+','+prop.proId+',"'+prop.name+'"),'	
			)
			return tempStr.slice(0,-1)
		case 'Models':
			tempStr += tab + ' (id, bndId, name) VALUES '
			props.forEach(prop =>
				tempStr += '('+prop.id+','+prop.bndId+',"'+prop.name+'"),'	
			)
			return tempStr.slice(0,-1)
		case 'EStations':
			tempStr += tab + ' (id, name, city, lat, long, country) VALUES '
			props.forEach(prop =>{ 
				tempStr += '('+prop.id+',"'+prop.name+'", "'+prop.city+'",'+prop.lat+','+prop.long+', "'+prop.country+'"),'
				console.log(prop)}
			)
			return tempStr.slice(0,-1)
		case 'Items':
			tempStr += tab + ' (id, aval, estId, catId, proId, bndId, modId) VALUES '
			props.forEach(prop =>{
				tempStr += '('+prop.id+','+prop.aval+','+prop.estId+','+prop.catId+','+prop.proId+','+prop.bndId+','+prop.modId+'),' 
				console.log(prop)}
			)
			return tempStr.slice(0,-1)
	}
}

const createTableSql = (tab) => {
	var tempStr = 'CREATE TABLE IF NOT EXISTS '
	switch (tab){
		case 'Products':
			return tempStr += tab + ' (id INTEGER PRIMARY KEY, catId INTEGER NOT NULL, name TEXT NOT NULL)'
		case 'Catagories':
			return tempStr += tab + ' (id INTEGER PRIMARY KEY, name TEXT NOT NULL)'
		case 'Brands':
			return tempStr += tab + ' (id INTEGER PRIMARY KEY, proId INTEGER NOT NULL, name TEXT NOT NULL)'
		case 'Models':
			return tempStr += tab + ' (id INTEGER PRIMARY KEY, bndId INTEGER NOT NULL, name TEXT NOT NULL)'
		case 'EStations':
			return tempStr += tab + ' (id INTEGER PRIMARY KEY, name TEXT NOT NULL, city TEXT NOT NULL, lat DECIMAL(15,10) NOT NULL, long DECIMAL(15,10) NOT NULL, country TEXT NOT NULL)'
		case 'Items':
			return tempStr += tab + ' (id INTEGER PRIMARY KEY, aval INTEGER NOT NULL, estId INTEGER NOT NULL, catId INTEGER NOT NULL, proId INTEGER NOT NULL, bndId INTEGER, modId INTEGER)'
	}
}

const createUpdateSql = (item, tab) => {
	var tempStr = 'UPDATE '+tab+' SET '
	switch (tab){
		case 'Products':
			return tempStr += 'name = "'+item.name+'", catId = '+item.catId+' WHERE id = '+item.id
		case 'Catagories':
			return tempStr += 'name = "'+item.name+'" WHERE id = '+item.id
		case 'Brands':
			return tempStr += 'name = "'+item.name+'", proId = '+item.proId+' WHERE id = '+item.id
		case 'Models':
			return tempStr += 'name = "'+item.name+'", bndId = '+item.bndId+' WHERE id = '+item.id
		case 'EStations':
			return tempStr += 'name = "'+item.name+'", city = "'+item.city+'", lat = '+item.lat+', long = '+item.long+', country = "'+item.country+'" WHERE id = '+item.id
		case 'Items':
			return tempStr += 'aval = '+item.aval+', estId = '+item.estId+', catId = '+item.catId+', proId = '+item.proId+', bndId = '+item.bndId+', modId = '+item.modId+' WHERE id = '+item.id
	}
}

const specificItemSql = (table,id) => {
	var strItem = "SELECT cat.id AS catId, cat.name AS CatName, pro.id AS proId, pro.name AS ProName"
	switch (table) {
		case 'Products':
			strItem += " FROM Catagories AS cat JOIN Products AS pro ON cat.id = pro.catId WHERE pro.id = "+id
			break
		case 'Brands':
			strItem += ", bnd.id AS bndId, bnd.name AS BndName FROM Catagories AS cat LEFT JOIN Products AS pro ON cat.id = pro.catId LEFT JOIN Brands AS bnd ON pro.id = bnd.proId WHERE bnd.id = "+id
			break
		case 'Models':
			strItem += ", bnd.id AS bndId, bnd.name AS BndName, mod.id AS modId, mod.name AS ModName FROM Catagories AS cat LEFT JOIN Products AS pro ON cat.id = pro.catId LEFT JOIN Brands AS bnd ON pro.id = bnd.proId LEFT JOIN Models AS mod ON bnd.id = mod.bndId WHERE mod.id = "+id
			break
	}
	return strItem
}