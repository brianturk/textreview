import React, { Component } from "react";
import API from "../utils/API";


class Detail extends Component {
  
  state = {
    data: [],
    columns: []
  }

 
  componentDidMount() {
    API
    .getDetail()
    .then(res => {
        this.setState({
            data: res.data
        })
        console.log(res.data)
    })

  }

//   componentDidUpdate(prevProps) {

    
//   }



  render() {
    return (
        <div className="card">
        
      </div>
    );
  }

}


export default Detail;
