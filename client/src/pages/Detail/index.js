import React, { Component } from "react";
import API from "../../utils/API";
// import "./index.css";
import ReactTable from 'react-table'
import "react-table/react-table.css";
import Moment from 'moment'
import withAuth from '../../components/withAuth';
// import DateRangePicker from "react-daterange-picker";
// import "react-daterange-picker/dist/css/react-calendar.css";
// import { extendMoment } from "moment-range";
// const moment = extendMoment(Moment);


class Detail extends Component {

  state = {
    columns: [{
      Header: 'Customer #',
      accessor: 'customerPhonenumber',
      Cell: row => <span>{this.formatPhoneNumber(row.value)}</span>,
      maxWidth: 130,
      style: { textAlign: 'right' },
      headerStyle: { textAlign: 'right' }

    },
    {
      Header: 'Rating',
      accessor: 'rating',
      maxWidth: 60,
      style: { textAlign: 'center' },
      headerStyle: { textAlign: 'center' },
      Cell: row => <span style={{ color: row.value < 5 ? 'red' : row.value > 5 ? 'green' : '' }}>{row.value}</span>
    },
    {
      Header: 'Comment',
      accessor: 'userComment',
      style: { textAlign: 'left' },
      headerStyle: { textAlign: 'left' }
    },
    {
      Header: 'Date/Time',
      accessor: 'createdAt',
      style: { textAlign: 'right' },
      headerStyle: { textAlign: 'right' },
      maxWidth: 130,
      Cell: row => <span>{Moment(row.value).format('M/D/YY h:mma')}</span>
    //   ,
    //   Filter: ({ filter, onChange }) =>
    //   <div>
    //   <DateRangeExample />
    //  </div>
    },
    {
      Header: 'Location #',
      accessor: 'locationPhonenumber',
      Cell: row => <span>{this.formatPhoneNumber(row.value)}</span>,
      maxWidth: 130,
      style: { textAlign: 'right' },
      headerStyle: { textAlign: 'right' }
    },
    {
      Header: "",
      expander: true,
      Cell: () => <strong>+</strong>,
      width: 35,
      Expander: ({ isExpanded, ...rest }) =>
        <div>
          {isExpanded
            ? <span>&#x2299;</span>
            : <span>&#x2295;</span>}
        </div>,
      style: {
        cursor: "pointer",
        fontSize: 25,
        padding: "0",
        textAlign: "center",
        userSelect: "none"
      }
    },
    {
      show: false,
      accessor: 'messages'
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


  componentDidMount() {
    console.log('here')
    this.setState({
      loading: true
    })
    API
      .getDetail()
      .then(res => {
        this.setState({
          data: res.data,
          loading: false
        })

        console.log(res.data)
        // if (res.data.length > 0) {
        //   //get list of location for filter dropdown
        //   var userid = res.data[0].userid
        //   API
        //     .getLocations(userid)
        //     .then(res => {
        //       console.log(res.data)
        //     })
        // }

      })

  }

  //   componentDidUpdate(prevProps) {


  //   }


  render() {
    return (
      <ReactTable
        data={this.state.data}
        columns={this.state.columns}
        sortable={true}
        multiSort={true}
        resizable={true}
        filterable={true}
        loading={this.state.loading}
        loadingText={'Loading...'}
        noDataText={'No rows found'}
        defaultSorted={[
          {
            id: "createdAt",
            desc: true
          }]}
        defaultPageSize={10}
        className="-striped -highlight"
        SubComponent={row =>
          <div style={{ padding: '10px' }}>
            Comment: <b>{row.row.userComment} </b><br />
            Comment Time: <b>{Moment(row.row.messages[1].timeStamp).format('M/D/YY h:mma')}</b>

          </div>}
      />
    )
  }
}

export default withAuth(Detail);
