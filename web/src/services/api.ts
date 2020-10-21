import axios from 'axios';

export const fetchDataCity = async (uf: string, city: string) => {
	try {
		const response = await axios.get(`https://brasil.io/api/v1/dataset/covid19/caso/data/?format=json&state=${uf}&city=${city}`);
		const {confirmed, deaths, date} = response.data.results[0];
		const data = response.data.results;
		
		return {data, confirmed, deaths, date};
	} catch (err) {
		return err;
	}
}

export const fetchDataState = async (UF: string) => {
	const url = 'https://covid19.mathdro.id/api/countries/BR/confirmed';
	const uf = UF.normalize('NFD').replace(/[\u0300-\u036f]/g, '');	

	try {
		const response = await axios.get(url);
		
		return response.data.filter((item: any) => item.provinceState === uf);	

	} catch (err) {
		return err;
	}
}

export const fetchDataUFs = async () => {
	try {
		const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');

		return response.data;
	} catch (err) {
		return err;
	}
}

export const fetchDataCities = async (uf: string) => {
	try {
		const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);

		return response.data;
	} catch (err) {
		return err;
	}
}

export const fetchDataCountry = async () => {
	try {
		const response = await axios.get ('https://covid19.mathdro.id/api/countries/BR');

		return response.data;
	} catch (err) {
		return err;
	}
}

