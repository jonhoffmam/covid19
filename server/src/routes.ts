import express, {Router} from 'express';
import { writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import axios from 'axios';
import moment from 'moment';

const routes = Router();


routes.get('/data/:uf/:city', (request, response) => {
	const city = request.params.city;
	const uf = request.params.uf;
	const filePathAll = `./src/data/${uf}/${city}-${uf}.json`;


	async function verifyData() {
		const setDate = moment().locale('pt-br').utcOffset('-03:00');
		const dirPath = `./src/data/${uf}`;

		if (!existsSync(dirPath)) {
			mkdirSync(`./src/data/${uf}`);
		}

		if (!existsSync(filePathAll)) {
			await axios.get(`https://brasil.io/api/dataset/covid19/caso/data/?format=json&state=${uf}&city=${city}`)
			.then(response => {					
				
				const data = {timeRequest: setDate.format(), ...response.data};
				const dataAll = JSON.stringify(data, null, 2);
				writeFileSync(filePathAll, dataAll);
				
				console.log('Concluído')
				
			}).catch(err => console.log(err));
		}		
		
		const rawDataAll = require(`../src/data/${uf}/${city}-${uf}.json`);
		
		
		const {date: lastDate, confirmed: lastConfirmed, deaths: lastDeaths, order_for_place: lastOrderPlace} = rawDataAll.results[0];	
		const timeRequest = rawDataAll.timeRequest === undefined ? '2020-01-01T00:00:00-03:00' : rawDataAll.timeRequest;
		const timeNow = setDate.format('LT');
		const dateTimeNow = setDate.format();
		
		const nextTimeReq = moment(timeRequest).add(1, 'hour').locale('pt-br').format();	
		
		
		console.log('Local:', city,'| Time:', timeNow, 'TimeReq:', moment(timeRequest).locale('pt-br').format('LT'), 'NextReq:', moment(nextTimeReq).locale('pt-br').format('LT'));
		
		
		async function fetchData(dateTimeNow: string, nextTimeReq: string, lastDate: string, lastConfirmed: number, lastDeaths: number, lastOrderPlace: number, ) {
			if (dateTimeNow >= nextTimeReq) {
				
				await axios.get(`https://brasil.io/api/dataset/covid19/caso/data/?format=json&state=${uf}&city=${city}&is_last=true`)
				.then(response => {
					const {date, confirmed, deaths, order_for_place: orderPlace} = response.data.results[0];
					if (lastDate !== date || lastConfirmed !== confirmed || lastDeaths !== deaths || lastOrderPlace !== orderPlace) {
						console.log('Passou aqui')
						
						rawDataAll.results.unshift(response.data.results[0]);
						
						const dataAll = JSON.stringify(rawDataAll, null, 2);
						
						writeFileSync(filePathAll, dataAll);
					}
				})
				.catch(err => console.log('Erro:', err));
			}
			
			if (dateTimeNow >= nextTimeReq) {					
				const objAll = () => {
					
					if (!rawDataAll.timeRequest) {
						return {timeRequest: setDate.format(), ...rawDataAll};
					}						
					rawDataAll.timeRequest = setDate.format();
					return rawDataAll
					
				}				

					const dataAll = JSON.stringify(objAll(), null, 2);
				writeFileSync(filePathAll, dataAll);
			}
			
			return response.json(rawDataAll.results);
		}
		await fetchData(dateTimeNow, nextTimeReq, lastDate, lastConfirmed, lastDeaths, lastOrderPlace);
	}

	verifyData();	

});

export default routes;