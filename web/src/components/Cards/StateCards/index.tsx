import React from 'react';
import { Grid } from '@material-ui/core';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import CardComponent from '../Card';

import styles from './styles.module.css';

const Info = (props: any) => {
	const {dataUf: data} = props;	
	const dateFormat = format(new Date(data.date), `dd 'de' MMMM 'de' yyyy`, {locale: ptBR});
	
	return (
		<div className={styles.container}>
			<Grid container spacing={3} justify="center">
				<CardComponent
					className={styles.infected}
					cardTitle="Confirmados"
					value={data.confirmed}
					lastUpdate={dateFormat}
					cardSubtitle="Número de casos confirmados de COVID-19."
					spacing={3}
				/>
				<CardComponent
					className={styles.recovered}
					cardTitle="Recuperados"
					value={data.recovered}
					lastUpdate={dateFormat}
					cardSubtitle="Número de recuperados do COVID-19."
					spacing={3}
				/>
				<CardComponent
					className={styles.deaths}
					cardTitle="Mortes"
					value={data.deaths}
					lastUpdate={dateFormat}
					cardSubtitle="Número de mortes causadas pelo COVID-19."
					spacing={3}
				/>
			</Grid>
		</div>
	);
};
export default Info;