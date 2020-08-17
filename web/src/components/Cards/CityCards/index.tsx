import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import CardComponent from '../Card';
import { fetchDataCity } from '../../../services/api';

import styles from './styles.module.css';

const Info = () => {
	const [data, setData]	= useState({confirmed: 0, deaths: 0, date: '2000-01-01'});	
	const dateFormat = format(parse(data.date, 'yyyy-MM-dd', new Date()), `dd 'de' MMMM 'de' yyyy`, {locale: ptBR});

	useEffect(() => {		
		fetchData();
	},[]);

	async function fetchData() {
		setData(await fetchDataCity('ES', 'Domingos Martins'));
	}

	return (
		<div className={styles.container}>
			<Grid container spacing={3} justify="center">
				<CardComponent
					className={styles.infected}
					cardTitle="Confirmados"
					value={data.confirmed}
					lastUpdate={dateFormat}
					cardSubtitle="Número de casos ativos de COVID-19."
				/>			
				<CardComponent
					className={styles.deaths}
					cardTitle="Óbitos"
					value={data.deaths}
					lastUpdate={dateFormat}
					cardSubtitle="Número de mortes causadas por COVID-19."
				/>
			</Grid>
		</div>
	);
};
export default Info;