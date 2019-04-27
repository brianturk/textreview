// Location List component shows all location for a given user
// in a list and shows edit and delete buttons for each one

import React from 'react';

function LocationList(props) {

        return (

          <div className="jumbotron">

             <table className="table">
                    <thead>
                        <tr>
                            <th>Location name</th>
                            <th>Phone number</th>
                            <th>Street</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip</th>
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
                            </tr>
                        ))}
                    </tbody>
              </table>
          </div>
        );
}


export default LocationList;
