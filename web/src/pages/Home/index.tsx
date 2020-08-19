import React, { useState } from 'react';


import { StateCards, CityCards, Chart, CityPicker, StatePicker } from '../../components'

import styles from './styles.module.css';


const Home = () => {
	const [selectedInitUfs, setSelecetedInitUfs] = useState();	
	const [selectedNameUfs, setSelecetedNameUfs] = useState('0');	
	const [selectedCity, setSelecetedCity] = useState();
	const [selectedUfTemp, setSelecetedUfTemp] = useState();

	function handleSelectUf(event: any) {
		const initialsUf = event.target.value.substr(0,2);
		const nameUf = event.target.value.substr(3);
		
		setSelecetedInitUfs(initialsUf);
		setSelecetedNameUfs(nameUf);
	}

	function handleSelectCity(event: any) {
		const city = event.target.value;
		
		setSelecetedCity(city);
		setSelecetedUfTemp(selectedInitUfs);
	}

	return (
		<div className={styles.container}>
			{selectedInitUfs === undefined || selectedInitUfs === '0' ?
			<h1>Brasil</h1>
			:
			<h1>{selectedNameUfs} ({selectedInitUfs})</h1>
			}
			<StateCards nameUfs={selectedNameUfs}/>

			{selectedInitUfs === undefined || selectedInitUfs === '0' ?
			<h1>-</h1>
			:
			<h1>{selectedCity} - {selectedUfTemp !== selectedInitUfs ? selectedUfTemp : selectedInitUfs}</h1>
			}			
			<CityCards initialsState={selectedInitUfs} city={selectedUfTemp !== selectedInitUfs ? undefined : selectedCity}/>

			<div className={styles.containerCards}>
				<StatePicker handleSelectUf={handleSelectUf}/>
				<CityPicker handleSelectCity={handleSelectCity} initialsState={selectedInitUfs}/>
			</div>
			<Chart />
		</div>
	)
}

export default Home;




