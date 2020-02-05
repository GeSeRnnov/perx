import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getStyles } from '../helpers/index';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

class CarsView extends React.Component{
    state = {
        rowsPerPage: 5,
        page: 0,
    }

    styles = getStyles();

    componentDidMount() {
        this.props.toggleSpinner();
        const page = this.state.page;
        const rowsPerPage = this.state.rowsPerPage;
        const params = this.getBodyRequest(page, rowsPerPage);
        const dealers = this.props.carsApp.dealers;
        this.props.fetchData(params, dealers);
    }

    getBodyRequest = (page, per_page) => {
        return {url: `vehicles/`,
            body: {
                state: 'active',
                hidden: false,
                group: 'new',
                page,
                per_page,
            },
        }
    }

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
        this.props.toggleSpinner();
        const params = this.getBodyRequest(newPage, this.state.rowsPerPage);
        const dealers = this.props.carsApp.dealers;
        this.props.fetchData(params, dealers);
    };


    handleChangeRowsPerPage = event => {
        this.setState({ 
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0,
        });
    };

    render(){
        const {
            hasSpinner = false,
            carList = [],
            xTotalCount = '',
        } = this.props.carsApp;
        const count = Math.floor(xTotalCount / this.state.rowsPerPage);

        return(
            <div className="App">
                { hasSpinner ? 
                  <div style={this.styles.overlay}>
                    <CircularProgress style={this.styles.spinner}/> 
                  </div>
                  : '' }
                { carList.length ? 
                    <div>
                        <TableContainer component={Paper}>
                          <Table size="small" aria-label="a dense table">
                              <TableHead style={this.styles.tHeadRow} >
                                <TableRow>
                                  <TableCell  style={this.styles.headCell}>Brand</TableCell>
                                  <TableCell  style={this.styles.headCell}>Model</TableCell>
                                  <TableCell  style={this.styles.headCell}>Grade</TableCell>
                                  <TableCell  style={this.styles.headCell}>Vin</TableCell>
                                  <TableCell  style={this.styles.headCell}>Dealer name</TableCell>
                                  <TableCell  style={this.styles.headCell}>Dealer address</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {carList.map(row => (
                                  <TableRow key={row.vin}>
                                    <TableCell component="th" scope="row" style={this.styles.cellBrand}>
                                      {row.brand}
                                    </TableCell>
                                    <TableCell style={this.styles.cellModel}>{row.model}</TableCell>
                                    <TableCell style={this.styles.cellGrade}>{row.grade}</TableCell>
                                    <TableCell style={this.styles.cellVin}>{row.vin}</TableCell>
                                    <TableCell style={this.styles.cellDealerName}>{row.dealerName}</TableCell>
                                    <TableCell style={this.styles.cellDealerAddress}>{row.dealerAddress}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={count}
                            rowsPerPage={this.state.rowsPerPage}
                            page={this.state.page}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </div>
                      : ''
                }
            </div>  
        );
    }
};


export default CarsView;

CarsView.propTypes = {
    toggleSpinner: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    carsApp: PropTypes.object.isRequired,
}
