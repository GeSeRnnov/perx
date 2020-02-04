import { fetchData, getCarsJoinedDealers } from '../../helpers/index'

export const fetchCarsAsync = (data) => {
	return { type: 'fetch-cars', data };
}
export const toggleSpinner = (action) => {
	return { type: 'toggle-spinner', action };
}
export const fetchCars = (action) => {
	return dispatch => {
		const { data: carsList, xTotalCount } = action;
		const dealerList = [...new Set(carsList.map(item => item.dealer))];
		const url = `dealers/`;

		const dealersReques = [];
		const dealersList = {};
		dealerList.forEach((item) => {
			const body = { id: item };
			const params = {
				url,
				body,
			}
			const dealers = new Promise((resolve, reject) => {
				const dealerResult = fetchData(params);
				resolve(dealerResult);
			});
			dealersReques.push(dealers)

		})
		Promise.all(dealersReques)
			.then(async vals => {
				vals.forEach(item => {
					if (item.data.length) {
						dealersList[item.data[0].id] = item.data[0];
					}
				});
				const result = {
					list: getCarsJoinedDealers(carsList, dealersList),
					xTotalCount,
				};
				dispatch(fetchCarsAsync({ ...result }));
			})
	}
}

