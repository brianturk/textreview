// Location List component shows all location for a given user
// in a list and shows edit and delete buttons for each one


import React, { Component } from "react";
// import CustomButton from '../CustomButton/CustomButton.jsx';
// Load ReactTable
import ReactTable from 'react-table';

import 'react-table/react-table.css';
import { checkPropTypes } from 'prop-types';


    
class LocationList extends Component {
    
      state = {
        columns: [{
          Header: 'Location Name',
          accessor: 'locationName',
          maxWidth: 250,
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' }
    
        },
        {
          Header: 'Phone Number',
          accessor: 'phonenumber',
          Cell: row => <span>{this.formatPhoneNumber(row.value)}</span>,
          maxWidth: 120,
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' }
    
        },
        {
          Header: 'Street',
          accessor: 'street',
          maxWidth: 360,
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' },
        },
        {
          Header: 'City',
          accessor: 'city',
          maxWidth: 300,
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' }
        },
        {
          Header: 'State',
          accessor: 'state',
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' },
          maxWidth: 60,
        },
        {
          Header: 'Zip',
          accessor: 'zip',
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' },
          maxWidth: 120,
        }
    
        ]
        ,
        data: [],
        loadingText: false
      }
    


      formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
          var intlCode = (match[1] ? '+1 ' : '')
          return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }
        return null
      }
    
    
/*         ${JSON.stringify(this.state.data)}`); */
    
    
      render() {

        return (
          <ReactTable
            data={this.props.locations}
            columns={this.state.columns}
            sortable={true}
            multiSort={true}
            resizable={true}

            loading={this.state.loading}
            loadingText={'Loading...'}
            noDataText={'No rows found'}
            defaultSorted={[
              {
                id: "locationName",
                desc: true
              }]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        )
      }
    }
    
    export default LocationList;
    