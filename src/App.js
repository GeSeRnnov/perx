import { connect } from 'react-redux';
import CarsView from './components/CarsView';
import { fetchData } from './helpers/index';
import { fetchCars, toggleSpinner } from './store/actions/actions';
const mapStateToProps = (store) => ({
    carsApp: store,
});

const mapDispatchToProps = dispatch => ({
    fetchData: (params, dealers)  => {
        const dispatcher = (action) => {
        dispatch(fetchCars(action, dealers));
      }
      fetchData({ ...params, callback: dispatcher });
    },
    toggleSpinner: () => dispatch(toggleSpinner()),
})

const carsApp = connect(mapStateToProps, mapDispatchToProps)(CarsView);
export default carsApp;
