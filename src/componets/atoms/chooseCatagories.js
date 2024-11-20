/**
 * choose catagories
 * screen where you choose which type of catagory you want to register
 * **/

import React, { useState, useEffect } from 'react';

// sqlite database
import { database } from '../../../src/utils/Database'

// import from files
import { RegRender } from '../../../src/utils/RenderData'


export const ChooseCatagories = ({navigation}) => {
	const [data, setData] = useState(null)	
	useEffect(()=>{
		console.log('choose catagories useeffect start')
		database.getData(setData,'Catagories')
	},[])

	return (
		<>
			<RegRender data = {data} navigation = {navigation} db = 'Catagories' rid={1}/>
		</>
	)
}