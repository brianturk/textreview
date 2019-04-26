// Location List component shows all location for a given user
// in a list and shows edit and delete buttons for each one

import React, {Component} from 'react';
import API from '../../utils/API';

class LocationList extends Component {


  state = {
    //locationList: [],
    locationList: [{ locationName : "Store #1",
                     street : "University Ave.",
                     city   : " San Diego"},
                  {  locationName : "Store #2",
                     street : "Lombard St.",
                     city   : " San Francisco"},
                  {  locationName : "Store #3",
                     street : "Denny Way",
                     city   : " Seattle"} 
                ]
  }
                  

  // TODO need to get user ID into the API.getLocations(userid) call
  // How to derive that from inside LocationList?
  // componentDidMount() {
  //   console.log(this.state.user);
  //   API.getLocations()
  //       .then(response => {
  //         console.log(response.data);
  //         this.setState({ locationList: response.data })
  //       })
  //       .catch(err => console.log(err));
  //   }


    render() {
        return (

          <div className="jumbotron">

             <table className="table">
                    <thead>
                        <tr>
                            <th>Location name</th>
                            <th>Street</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.locationList.map(loc => (
                            <tr key={loc.name}>
                                <td>{loc.locationName}</td>
                                <td>{loc.street}</td>
                                <td>{loc.city}</td>
                            </tr>
                        ))}
                    </tbody>
              </table>

          </div>
        );
      }
}

export default LocationList;
