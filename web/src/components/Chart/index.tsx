import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import styles from './styles.module.css';

const Chart = (props: any) => {
	const {dataCity, dataUf, nameUf} = props;

	const Chart = (
		dataCity.data[0] ? (
			<Line
				data={{
					labels: dataCity.data.map((data: any) => format(parse(data.date, 'yyyy-MM-dd', new Date()), `dd-MM-yyyy`, {locale: ptBR})).reverse(),
					datasets: [{
						data: dataCity.data.map((data: any) => data.confirmed).reverse(),
						label: 'Confirmados',
						borderColor: '#0070FF',
						fill: true,
					}, {
						data: dataCity.data.map((data: any) => data.deaths).reverse(),
						label: 'Mortes',
						borderColor: 'red',
						backgroundColor: 'rgba(195, 0, 0, 0.6)',
						fill: true,
					},
					],
				}}
			/>		
		) : (
			<Bar
				data={{
					labels: ['Confirmados', 'Recuperados', 'Mortes'],
					datasets: [
						{
							label: 'Pessoas',
							backgroundColor: ['rgba(0, 110, 255, 0.6)', 'rgba(0, 195, 25, 0.6)', 'rgba(195, 0, 0, 0.6)'],
							data: [dataUf.confirmed, dataUf.recovered, dataUf.deaths],
						},
					],
				}}
				options={{
					legend: { display: false },
					title: { display: true, text: `${nameUf === '' ? 'Brasil': nameUf}` },
				}}
			/>
		)		
	);

	return (
		<div className={styles.container}>
			{Chart}      
		</div>
	);
}

export default Chart;