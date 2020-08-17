import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import CardComponent from '../Card';
import { fetchDataState } from '../../../services/api';

import styles from './styles.module.css';

const Info = (props: any) => {
	const [data, setData] = useState({confirmed: 0, recovered: 0, deaths: 0, date: 0});		
	const dateFormat = format(new Date(data.date), `dd 'de' MMMM 'de' yyyy`, {locale: ptBR});

	useEffect(() => {
		fetchAPI();
	},[]);

	const fetchAPI = async () => {
		const data = await fetchDataState('Espírito Santo');
		const {confirmed, recovered, deaths, lastUpdate: date} = data[0];
				
		setData({confirmed, recovered, deaths, date});
	}
	
	return (
		<div className={styles.container}>
			<Grid container spacing={3} justify="center">
				<CardComponent
					className={styles.infected}
					cardTitle="Confirmados"
					value={data.confirmed}
					lastUpdate={dateFormat}
					cardSubtitle="Número de casos confirmados de COVID-19."
				/>
				<CardComponent
					className={styles.recovered}
					cardTitle="Recuperados"
					value={data.recovered}
					lastUpdate={dateFormat}
					cardSubtitle="Número de recuperados do COVID-19."
				/>
				<CardComponent
					className={styles.deaths}
					cardTitle="Óbitos"
					value={data.deaths}
					lastUpdate={dateFormat}
					cardSubtitle="Número de mortes causadas pelo COVID-19."
				/>
			</Grid>
		</div>
	);
};
export default Info;