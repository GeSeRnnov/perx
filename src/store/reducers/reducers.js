const initialState = { 
	hasSpinner: false,
	vehicles: [],
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
		case 'toggle-spinner':
			const hasSpinner = clone.hasSpinner;
			clone.hasSpinner = !hasSpinner;
			return clone;
		default:
			return state;
	}
}