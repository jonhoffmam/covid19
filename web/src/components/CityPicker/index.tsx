import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchDataCities } from '../../services/api';

import styles from './styles.module.css';

interface city {
	id: number;	
	nome: string;
}

const Cities = (props: any) => {
	const {handleSelectCity, initialsState} = props;
	const [cities, setCities] = useState<city[]>([]);	

	useEffect(() => {
		if (!initialsState) {
			return;
		}
		const fetchAPI = async () => {
			setCities(await fetchDataCities(initialsState));
		};
		fetchAPI();		
	}, [initialsState]);


	
	return (
		<FormControl className={styles.formControl}>
			<NativeSelect defaultValue="0" onChange={(event) => handleSelectCity(event)}>
				<option value="0">Selecione o Município</option>
				{cities.map((city) => 
					<option key={city.id} value={city.nome}>{city.nome}</option>
				)}
			</NativeSelect>
		</FormControl>
	);
};

export default Cities;