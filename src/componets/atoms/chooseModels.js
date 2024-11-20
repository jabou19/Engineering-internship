/**
 * choose models
 * screen where you choose which type of model you want to register
 * **/

import React, { useState, useEffect, useMemo } from 'react';

// sqlite database
import { getDataGroup } from '../../../src/utils/Database'

// import from files
import { RegRender } from '../../../src/utils/RenderData'
import { RegisterItem } from './registerItem'


export const ChooseModels = ({navigation,route}) => {
	const [data, setData] = useState(null)	
	const { reg } = route.params
	const getId = useMemo(() => setId(reg),[reg])

	useEffect(()=>{
		console.log('choose models useeffect start')
		getDataGroup(getId,setData,'Models')
	},[getId])

	return (
		<>
			<RegRender data = {data} navigation = {navigation} db = {'Models'} rid={4}/>
			<RegisterItem navigation= {navigation} navplace={'Stations'} id={reg} name={'Brands'} />
		</>
	)
}

function setId (id) {
	return 'bndId = '+id
}