import React, { useState, useEffect } from 'react';

import { StateCards, CityCards, Chart, CityPicker, StatePicker, PageDefault } from '../../components'
import { fetchDataCity, fetchDataCountry, fetchDataState } from '../../services/api';

import styles from './styles.module.css';
import logo from '../../assets/logo.svg';


const Home = () => {
	const [selectedInitUfs, setSelecetedInitUfs] = useState('');	
	const [selectedNameUfs, setSelecetedNameUfs] = useState('');	
	const [selectedCity, setSelecetedCity] = useState('');
	const [selectedUfTemp, setSelecetedUfTemp] = useState('');
	const [dataCity, setDataCity]	= useState({data: [], confirmed: 0, deaths: 0, date: '2000-01-01'});
	const [dataUf, setDataUf] = useState({confirmed: 0, recovered: 0, deaths: 0, date: 0});

	function handleSelectUf(event: any) {		
		const initialsUf = event.target.value.substr(0,2);
		const nameUf = event.target.value.substr(3);
		
		if (initialsUf === '0') {
			setSelecetedInitUfs('');
			setSelecetedCity('');
		}
		
		setSelecetedInitUfs(initialsUf);
		setSelecetedNameUfs(nameUf);
	}

	function handleSelectCity(event: any) {
		const city = event.target.value;
		
		setSelecetedCity(city);
		setSelecetedUfTemp(selectedInitUfs);
	}

	useEffect(() => {
		if (!selectedCity || selectedInitUfs === '0' || selectedUfTemp !== selectedInitUfs) {
			setDataCity({data: [], confirmed: 0, deaths: 0, date: '2000-01-01'});
			return;
		}
		
		async function fetchAPI() {			
			setDataCity(await fetchDataCity(selectedInitUfs, selectedCity));
		}
		
		fetchAPI();
	},[selectedCity, selectedInitUfs, selectedUfTemp]);

	useEffect(() => {
		if (!selectedNameUfs || selectedNameUfs === '0') {
			const fetchAPI = async () => {
				const data = await fetchDataCountry();
				const {confirmed, recovered, deaths, lastUpdate: date} = data;
				
				setDataUf({
					confirmed: confirmed.value,
					recovered: recovered.value,
					deaths: deaths.value,
					date
				});
			}
			fetchAPI();
			return;
		}
		const fetchAPI = async () => {
			const data = await fetchDataState(selectedNameUfs);
			const {confirmed, recovered, deaths, lastUpdate: date} = data[0];
					
			setDataUf({confirmed, recovered, deaths, date});
		}
		fetchAPI();
	},[selectedNameUfs]);
	

	return (
		<PageDefault>
			<div className={styles.container}>
				<img className={styles.logo} src={logo} alt="COVID-19 Logo"/>
				{selectedInitUfs === '' || selectedInitUfs === '0' ?
				<h1>Brasil</h1>
				:
				<h1>{selectedNameUfs} ({selectedInitUfs})</h1>
				}
				<StateCards dataUf={dataUf}/>

				{selectedInitUfs === '' || selectedInitUfs === '0' || selectedCity === '' || selectedUfTemp !== selectedInitUfs?
				<h1>-</h1>
				:
				<h1>{selectedCity} - {selectedUfTemp !== selectedInitUfs ? selectedUfTemp : selectedInitUfs}</h1>
				}			
				{/* <CityCards initialsState={selectedInitUfs} city={selectedUfTemp !== selectedInitUfs ? undefined : selectedCity}/> */}
				<CityCards dataCity={dataCity} />

				<div className={styles.containerCards}>
					<StatePicker handleSelectUf={handleSelectUf}/>
					<CityPicker handleSelectCity={handleSelectCity} initialsState={selectedInitUfs}/>
				</div>
				<Chart dataCity={dataCity} dataUf={dataUf} nameUf={selectedNameUfs}/>

				<div className={styles.containerSource}>
					<h5>Fonte de dados:</h5>
					<ol>
						<li>Nacional e Estadual: Coletado de <a href="https://covid19.mathdro.id/api" target="_blank" rel="noopener noreferrer">covid19.mathdro.id</a></li>
						<li>Municipal: Coletado de <a href="https://brasil.io/covid19/ES/" target="_blank" rel="noopener noreferrer">brasil.io</a></li>
						<li>Obs.: Os dados coletados de <a href="https://brasil.io/covid19/ES/" target="_blank" rel="noopener noreferrer">brasil.io</a> são fornecidos pelas
								Secretarias Estaduais de Saúde através dos boletins diários, sendo feito a análise e compilação desses dados através de voluntários!</li>
					</ol>
				</div>
			</div>
		</PageDefault>
	)
}

export default Home;




