/**
 * choose products
 * screen where you choose which type of product you want to register
 * **/

import React, { useState, useEffect, useMemo } from 'react';

// sqlite database
import { getDataGroup } from '../../../src/utils/Database'

// import from files
import { RegRender } from '../../../src/utils/RenderData'


export const ChooseProducts = ({route,navigation}) => {
	const [data, setData] = useState(null)	
	const { reg } = route.params
	const getId = useMemo(() => setId(reg),[reg])
	
	useEffect(()=>{
		console.log('choose products useeffect start')
		getDataGroup(getId,setData,'Products')
	},[getId])

	return (
		<>
			<RegRender data = {data} navigation = {navigation} db='Products' rid={2}/>
		</>
	)
}

function setId (id) {
	return 'catId = '+id
}