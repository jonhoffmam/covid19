import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';


import { StateCards, CityCards, Chart, CityPicker } from '../../components'


const Home = () => {
	// const [data, setData] = useState();

	// useEffect(() => {
	// 	api.get('data/ES/Vitória').then(response => 
	// 			setData(response.data[0].confirmed)
	// 		).catch(err => console.log('Erro:', err))
	// },[]);

	return (
		<>
		<h1>{moment('2020-08-13').format('LL')}</h1>
		<StateCards />
		<CityCards />
		<CityPicker />
		<Chart />
		</>
	)
}

export default Home;




