const initialState = { 
	hasSpinner: false,
	vehicles: [],
	dealers: {},
};

export default function(state = initialState, action) {
	const clone = Object.assign({}, state);
	switch (action.type) {
		case 'fetch-cars':
			const {list, xTotalCount} = action.data;
			clone.carList = list;
			clone.xTotalCount = xTotalCount;
			clone.hasSpinner = false;
			return clone;
		case 'fetch-dealers':
			const stateDealers = Object.assign({}, clone.dealers);
			const dealers = action.data;
			if (dealers.length) {
				dealers.forEach(dealerData => {
					const dealer = dealerData.data[0];
					if (dealer &&  dealer.id) stateDealers[dealer.id] = dealer;
				});
			}
			clone.dealers = stateDealers;
			return clone;		
		case 'toggle-spinner':
			const hasSpinner = clone.hasSpinner;
			clone.hasSpinner = !hasSpinner;
			return clone;
		default:
			return state;
	}
}