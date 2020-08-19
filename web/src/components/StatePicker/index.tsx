import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchDataUFs } from '../../services/api';

import styles from './styles.module.css';

interface UF {
	id: number;
	sigla: string;
	nome: string;
}

const Cities = (props: any) => {
	const {handleSelectUf} = props;
	const [ufs, setUfs] = useState<UF[]>([]);	

	useEffect(() => {
		const fetchAPI = async () => {
			setUfs(await fetchDataUFs());
		};
		fetchAPI();		
	}, []);


	
	return (
		<FormControl className={styles.formControl}>
			<NativeSelect defaultValue="" onChange={(event) => handleSelectUf(event)}>
				<option value="0">Selecione o Estado</option>
				{ufs.map((uf) => 
					<option key={uf.id} value={`${uf.sigla}-${uf.nome}`}>{uf.nome} ({uf.sigla})</option>
				)}
			</NativeSelect>
		</FormControl>
	);
};

export default Cities;