import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3333'
});

export const fetchDataCity = async (uf: string, city: string) => {
	try {
		const response = await api.get(`data/${uf}/${city}`);
		const {confirmed, deaths, date} = response.data[0];
		
		return {confirmed, deaths, date};
	} catch (err) {
		return err;
	}
}

export const fetchDataState = async (UF: string) => {
	const url = 'https://covid19.mathdro.id/api/countries/BR/confirmed';	
	const uf = UF.normalize('NFD').replace(/[\u0300-\u036f]/g, '');	
console.log(uf)
	try {
		const response = await axios.get(url);
		
		return response.data.filter((item: any) => item.provinceState === uf);	

	} catch (err) {
		return err;
	}
}

