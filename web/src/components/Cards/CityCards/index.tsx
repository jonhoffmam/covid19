import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import CardComponent from '../Card';
import { fetchDataCity } from '../../../services/api';

import styles from './styles.module.css';

const Info = (props: any) => {
	const {initialsState, city} = props;
	const [data, setData]	= useState({confirmed: 0, deaths: 0, date: '2000-01-01'});
	const dateFormat = format(parse(!data.date ? '2000-01-01' : data.date, 'yyyy-MM-dd', new Date()), `dd 'de' MMMM 'de' yyyy`, {locale: ptBR});

	useEffect(() => {
		if (!city) {
			setData({confirmed: 0, deaths: 0, date: '2000-01-01'});
			return;
		}
		async function fetchAPI() {
			setData(await fetchDataCity(initialsState, city));
		}
		fetchAPI();
	},[city, initialsState]);


	return (
		<div className={styles.container}>
			<Grid container spacing={2} justify="center">
				<CardComponent
					className={styles.infected}
					cardTitle="Confirmados"
					value={data.confirmed}
					lastUpdate={dateFormat}
					cardSubtitle="Número de casos ativos de COVID-19."
					spacing={5}
				/>			
				<CardComponent
					className={styles.deaths}
					cardTitle="Mortes"
					value={data.deaths}
					lastUpdate={dateFormat}
					cardSubtitle="Número de mortes causadas pelo COVID-19."
					spacing={5}
				/>
			</Grid>
		</div>
	);
};
export default Info;