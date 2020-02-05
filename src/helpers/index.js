import axios from 'axios';

export const fetchData = async (params) => {
	try {

		const prefix = 'https://jlrc.dev.perx.ru/carstock/api/v1/';
		const resp = await axios.get(
			`${prefix}${params.url}`, 
			{ 
				params: params.body, 
				headers: {'X-CS-Dealer-Id-Only': 1} 
			},
		);
		const action = {
			data: resp.data,
			xTotalCount: resp.headers['x-total-count'],
		};
		if (params.callback) params.callback(action);
		return resp;
	} catch (err) {
		throw new Error(`Something went wrong in cars fetching! ${err}`);
	}
}

export const getCarsJoinedDealers = (cars, dealers) => {
	return cars.reduce((joinedList, item) => {
		const dealer = dealers[item.dealer];
		if (dealer) {
			const dealerName = dealer.name || dealer.title;
			const dealerOffices = dealer.offices
				.filter(office => {
					return office.location.coordinates[0] === item.locations.coordinates[0][0] &&
					office.location.coordinates[1] === item.locations.coordinates[0][1];
				})
				.map(office => office.address);
			const dealerAddress = [...new Set(dealerOffices)];
			const newJoin = {
				vin: item.vin,
				brand: item.brand,
				model: item.model,
				grade: item.grade,
				dealerName,
				dealerAddress,
			}
			joinedList.push(newJoin);
		}
		return joinedList;
	}, []);
}

export const getNewDealers = (dealers, stateDealers = {}) => {
	return dealers.filter((dealer) => {
		const isPresent = dealer in stateDealers;
		return !isPresent;
	});
}

export const getStyles = () => {
	return {
        tHeadRow: {
            background: '#444',
        },
        headCell: {
            color: 'white',
            fontWidth: 'bold',
        },
        cellBrand: {
            width: '10%',
        },
        cellModel: {
            width: '15%',
        },
        cellGrade: {
            width: '10%',
        },
        cellVin: {
            width: '15%',
        },
        cellDealerName: {
            width: '15%',
        },
        cellDealerAddress: {
            width: '35%',
        },
        spinner: {
            color: 'black',
            position: 'fixed',
            top: '50%',
            left: '50%',
        },
        overlay: {
            position: 'fixed',
            width: '100%',
            height: '100vh',
            background: 'white',
            opacity: '0.4',
        }
    };
}

