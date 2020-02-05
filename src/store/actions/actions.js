import { fetchData, getCarsJoinedDealers, getNewDealers } from '../../helpers/index'

export const fetchCarsAsync = (data) => {
	return { type: 'fetch-cars', data };
}
export const fetchDealersAsync = (data) => {
	return { type: 'fetch-dealers', data };
}
export const toggleSpinner = (action) => {
	return { type: 'toggle-spinner', action };
}
export const fetchCars = (action, stateDealers) => {
	return dispatch => {
		const { data: carsList, xTotalCount } = action;
		const dealerList = [...new Set(carsList.map(item => item.dealer))];
		const newDealersOnly = getNewDealers(dealerList, stateDealers);
		const url = `dealers/`;

		const dealersReques = [];
		const newDealersList = {};
		newDealersOnly.forEach((item) => {
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
						newDealersList[item.data[0].id] = item.data[0];
					}
				});
				dispatch(fetchDealersAsync(vals));
				const fullDealersList = Object.assign({}, stateDealers, newDealersList);
				const result = {
					list: getCarsJoinedDealers(carsList, fullDealersList),
					xTotalCount,
				};
				dispatch(fetchCarsAsync({ ...result }));
			})
	}
}

