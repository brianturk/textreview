// Location List component shows all location for a given user
// in a list and shows edit and delete buttons for each one

import React from 'react';
// import CustomButton from '../CustomButton/CustomButton.jsx';
// Load ReactTable
import ReactTable from 'react-table';

import 'react-table/react-table.css';
import { checkPropTypes } from 'prop-types';

function LocationList(props) {


    //render() {

       
                const columns = [{
                Header: 'Location Name',
                accessor: 'locationName' // String-based value accessors!
                }, {
                Header: 'Street',
                accessor: 'street',
                Cell: props => <span className='street'>{props.street}</span> // Custom cell components!
                }
                // , {
                // id: 'friendName', // Required because our accessor is not a string
                // Header: 'Friend Name',
                // accessor: d => d.friend.name // Custom value accessors!
                // }, {
                // Header: props => <span>Friend Age</span>, // Custom header components!
                // accessor: 'friend.age'
                // }
            ];

                console.log(props.locations);

                var data = [];
                for (let i = 0; props.locations.length; i++) {
                    console.log(`props.locations[${i}] = ${props.locations[i]}`);
                    data.push(props.locations[i]);
                };

/*                 locationName: {
                    type: String,
                    required: false,
                    trim: true
                  },  
                    street: {
                    type: String,
                    required: false,
                    trim: true
                  },
                  city: {
                    type: String,
                    required: false,
                    trim: true
                  }, 
                  state: {
                    type: String,
                    required: false,
                    trim: true
                  },
                  zip: {
                    type: String,
                    required: false,
                    trim: true
                  },
                  phonenumber: {
                    type: String,
                    required: true,
                    trim: true
                  },
                  userid: {
                    type: ObjectId.ObjectID
                  }
 */
       
        return (<ReactTable
          data={data}
          columns={columns}
        />);
   //   }
    }

    export default LocationList;



        // return (

        //   <div className="jumbotron">

        //      <table className="table">
        //             <thead>
        //                 <tr>
        //                     <th className="text-left">Location name</th>
        //                     <th className="text-left">Phone number</th>
        //                     <th className="text-left">Street</th>
        //                     <th className="text-left">City</th>
        //                     <th className="text-left">State</th>
        //                     <th className="text-left">Zip</th>
        //                     <th className="text-right">Actions</th>
        //                   </tr>
        //             </thead>
        //             <tbody>
        //                 {props.locations.map(loc => (
        //                     <tr key={loc.locationName}>
        //                         <td>{loc.locationName}</td>
        //                         <td>{loc.phonenumber}</td>
        //                         <td>{loc.street}</td>
        //                         <td>{loc.city}</td>
        //                         <td>{loc.state}</td>
        //                         <td>{loc.zip}</td>
        //                         <td className="text-right">

        //                             <CustomButton className="btn-icon" color="success" size="sm">
        //                                 <i className="fa fa-edit"></i>
        //                             </CustomButton>{` `}
        //                             <CustomButton className="btn-icon" color="danger" size="sm">
        //                                 <i className="fa fa-times" />
        //                             </CustomButton>
        //                         </td>


        //                         {/* <td><button id={loc.userid}>Edit</button></td>
        //                         <td><button id={loc.userid}>Del</button></td> */}
        //                     </tr>
        //                 ))}
        //             </tbody>
        //       </table>
        //   </div>
        // );


