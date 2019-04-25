// Location List component shows all location for a given user
// in a list and shows edit and delete buttons for each one

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../AuthService';
import API from '../../utils/API';


// function LList(props) {

//   return(
//     <div className="jumbotron">
//       <h1>List of locations  </h1>   
//     </div>   
//   )
// }))

// export default LList

class LocationList extends Component {


  state = {
    locationList: [{locationName : "San Diego"},{locationName : "San Francisco"},{locationName : "Seattle"} ]
  };

  // componentDidMount() {
  //   API
  //       .getAllLocations()
  //       .then(response => this.setState({ locationList: response.data }))
  //       .catch(err => console.log(err));
  //   }


    render() {
        return (

          <div className="jumbotron">
             <h6>LocationList component loaded for </h6>   

            {this.locationList.map( locationname => (
              <div>
                <p> location name: {locationname} </p>
              </div> 
            ))};

          </div>
        );
      }
}

export default LocationList;
