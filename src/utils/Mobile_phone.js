/**
 * Mobile data
 * function that adds mobile database into test data, it's confusing...
 * theres also a render function to see what data was what
 * **/

import React from 'react';
import { FlatList, Text, View } from 'react-native';

import XLSX from 'xlsx'
import * as FileSystem from 'expo-file-system'



export const setXlsx = async (setData) => {
	if (!(FileSystem.cacheDirectory + 'cities.xlsx').exists) {
		var data = [{
			"name": "John",
			"city": "Seattle"
		},
		{
			"name": "Mike",
			"city": "Los Angeles"
		},
		{
			"name": "Zach",
			"city": "New York"
		}
		];
		var ws = XLSX.utils.json_to_sheet(data);
		var wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Cities");
		const wbout = XLSX.write(wb, {
			type: 'base64',
			bookType: "xlsx"
		});
		const uri = FileSystem.cacheDirectory + 'cities.xlsx';
//		console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
		await FileSystem.writeAsStringAsync(uri, wbout, {
			encoding: FileSystem.EncodingType.Base64
		})
	}

	try {
		await FileSystem.downloadAsync(
			'https://www.teoalida.com/database/Mobile-Phones-Database-by-Teoalida-SAMPLE-LITE.xlsx',
			FileSystem.cacheDirectory + 'cities.xlsx'
		)
	
//		const info = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + 'cities.xlsx')
//		console.log(info);

		const uri = await FileSystem.readAsStringAsync(FileSystem.cacheDirectory + 'cities.xlsx',{encoding: FileSystem.EncodingType.Base64})
		const workbook = await XLSX.read(uri)
		const ws = workbook.Sheets['Phones database']
		const halloween = XLSX.utils.sheet_to_json(ws)
		halloween.splice(0,10)
		halloween.sort((a,b) => {return a.LITE - b.LITE})
		setData(halloween)
		//console.log(halloween);
	} catch (e) {
		console.log(e); 
	}
}


// eslint-disable-next-line react/prop-types
export const RenderMobile = ({data}) => {
	// eslint-disable-next-line react/prop-types
	const Item = ({ id, brand, model, notes, image, prop, release, available, os }) => {
		//console.log(description + " "+ title);
		return (
			<View>
				<Text>Id = LITE: {id} </Text>
				<Text>Brand = LITE_1: {brand}</Text>
				<Text>Model = LITE_2: {model}</Text>
				<Text>Notes = LITE_3: {notes}</Text>
				<Text>Image = LITE_4: {image}</Text>
				<Text>??? = LITE_5: {prop}</Text>
				<Text>Release date = LITE_6: {release}</Text>
				<Text>Availability = LITE_7: {available}</Text>
				<Text>OS = LITE_8: {os}</Text>
				<Text/>
			</View>
		);
	}

	const renderItem = ( {item} ) => (
		<Item 
			id={item.LITE} 
			brand={item.LITE_1}
			model={item.LITE_2}
			notes={item.LITE_3}
			image={item.LITE_4}
			prop={item.LITE_5}
			release={item.LITE_6}
			available={item.LITE_7}
			os={item.LITE_8} 
		/>
	);

	return (
		<View style={{flex:1}}>
			{data && (
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={(item) => item.LITE.toString()}
				/>
			)}
		</View>
	)
}

/*
	const selectFile = async () => {
		try {
			const file = await DocumentPicker.getDocumentAsync({type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
			if (file.type === 'success'){
//				readExcel(file)
				console.log(file);
				readExcel(file)
			}
		} catch (error) {
			console.log('File error: ' + error)
		}
	}

	const readExcel = (file) => {
		const promise = new Promise((resolve,reject)=>{
		const fileReader= new FileReader()
			fileReader.onload = (e) => {
				const bufferArray = e.target.result
				const wb = XLSX.read(bufferArray, {type: 'binary'})
				const wsname = wb.SheetNames[0]
				const ws = wb.Sheets[wsname]
				setData(XLSX.utils.sheet_to_json(ws))
				resolve(data)
			}
			fileReader.onerror = (error) => {
				reject(error)
			}
			fileReader.readAsBinaryString(file)
		})
		promise.then((d) => {
			console.log(d);
		})
	}
*/