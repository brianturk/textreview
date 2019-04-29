// Location List component shows all location for a given user
// in a list and shows edit and delete buttons for each one

import React from 'react';
import CustomButton from '../CustomButton/CustomButton.jsx';

function LocationList(props) {

        return (

          <div className="jumbotron">

             <table className="table">
                    <thead>
                        <tr>
                            <th className="text-left">Location name</th>
                            <th className="text-left">Phone number</th>
                            <th className="text-left">Street</th>
                            <th className="text-left">City</th>
                            <th className="text-left">State</th>
                            <th className="text-left">Zip</th>
                            <th className="text-right">Actions</th>
                          </tr>
                    </thead>
                    <tbody>
                        {props.locations.map(loc => (
                            <tr key={loc.locationName}>
                                <td>{loc.locationName}</td>
                                <td>{loc.phonenumber}</td>
                                <td>{loc.street}</td>
                                <td>{loc.city}</td>
                                <td>{loc.state}</td>
                                <td>{loc.zip}</td>
                                <td className="text-right">
                                    <CustomButton className="btn-icon" color="info" size="sm">
                                        <i className="fa fa-user"></i>
                                    </CustomButton>{` `}
                                    <CustomButton className="btn-icon" color="success" size="sm">
                                        <i className="fa fa-edit"></i>
                                    </CustomButton>{` `}
                                    <CustomButton className="btn-icon" color="danger" size="sm">
                                        <i className="fa fa-times" />
                                    </CustomButton>
                                </td>


                                {/* <td><button id={loc.userid}>Edit</button></td>
                                <td><button id={loc.userid}>Del</button></td> */}
                            </tr>
                        ))}
                    </tbody>
              </table>
          </div>
        );
}


export default LocationList;


