// Location List component shows all location for a given user
// in a list and shows edit and delete buttons for each one


// Load React and ReactTable
import React, { Component } from "react";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { checkPropTypes } from 'prop-types';

import API from './../../utils/API';

// Load the cut symbol from react-icons
import { MdDeleteForever, MdClear, MdCreate } from 'react-icons/md';
import { set } from "mongoose";
 


    
class LocationList extends Component {
    

  // constructor() {
  //   super();

  //   this.renderEditable = this.renderEditable.bind(this);
  // }

      state = {
        columns: [{
          Header: 'Location Name',
          accessor: 'locationName',
          maxWidth: 250,
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' },
          // Cell: this.renderEditable
    
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
        },
        {
          Header: '',
          maxWidth: 60,
          Cell: row => (
              <div>

                 <span onClick={() => this.handleEdit(row.original)}><MdCreate /></span>    
                 &nbsp;   &nbsp;&nbsp;&nbsp;
                 <span onClick={() => this.handleDelete(row.original)}><MdClear /></span>            
              </div>
          )
       }
    
        ]
        ,
        data: [],
        loadingText: false
      }
    
    
          
      // EDIT A LOCATION 
      // ------------------------------------------------------------------------------------
      handleEdit = (row) => {

      }

          
      // DELETE A LOCATION 
      // ------------------------------------------------------------------------------------
      handleDelete = (row) => {

        API.deleteLocation(row._id)
        .then(res => {
          // once the user has added a location send them to the profile page
          // this.props.history.replace('/profile');
          // this.props.history isn't in this this, but in the parent this.
          // is there another way to redirect to reload the profile page?

          // find the index in this.state.data that has the id we are deleting
          // and remove it
          //
          var tempArray = this.state.data;
          var index = tempArray.find("id", row._id);
          console.log(`handleDelete index = ${index}`);
          if (index != -1) {
            tempArray.splice(index, 1);  // remove the element at index
            this.setState(this.state.data, this.tempArray);
          }
        })
        .catch(err => alert(err));
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
    