import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  // CardFooter,
  CardTitle,
  Row,
  Col,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // Table
} from "reactstrap";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import APIDash from './../../utils/APIDash';
import API from './../../utils/API';

//import { PanelHeader, Stats, CardCategory, Tasks } from "react";
import PanelHeader from './../../components/PanelHeader/PanelHeader.jsx';
// import Stats from './../../components/Stats/Stats.jsx';
import CardCategory from './../../components/CardElements/CardCategory.jsx';
// import Tasks from './../../components/Tasks/Tasks.jsx';

import {
  dashboardPanelChart,
  // dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart
} from "../../variables/charts.jsx";
import Header from './../../components/Header/Header.jsx';
// import { tasks } from "../../variables/general.jsx";
import moment from "moment";

// const labels = 
// ["MON",
// "TUE",
// "WED",
// "THU",
// "FRI",
// "SAT",
// "SUN"];

// // const dataArr = [50, 150, 100, 190, 130, 90, 150];
// const dataArr = [1, 2, 3, 4, 5, 6, 107];
// const locations = [{id:1,name:"One"}, {id:2,name:"Two"}, {id:3,name:"Three"}];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      dataArr: [],
      labels: [],
      dataArrMonthly: [],
      labelsMonthly: [],
      dataArrInvalid: [],
      labelsInvalid: [],
      locationPhone: 0,
      locations: [],
      dropDownValue: "All"
    };
  }

  toggle(val) {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  changeValue(value,phone) {
    this.setState({dropDownValue: value, locationPhone:phone});
    this.getDataCharts(phone);
  }
  // state = {
  //   dataArr: [],
  //   labels: [],
  //   dataArrWeekly: [],
  //   labelsWeekly: [],
  //   dataArrInvalid: [],
  //   labelsInvalid: [],
  //   locationPhone: 0
  // }
  componentDidMount() {
    this.getDataCharts(0);
  }

  getDataCharts(phone){
    APIDash.getUserDashData(this.props.user.id, phone).then(res => {
      //console.log(res.data);
      let newData = [];
      let newLabel = [];
      res.data.forEach(item => {
        newData.push(item.aveRating);
        newLabel.push(moment(new Date(`${item._id.month}/${item._id.day}/${item._id.year}`)).format("ddd"));
      });
      this.setState({
        dataArr: newData,
        labels: newLabel
      })
    }).catch(error => {
      console.log(error);
    });

    API.getLocations(this.props.user.id).then(res => {
      console.log(res.data.locations)
      this.setState({
        locations: res.data.locations
      })
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Header {...this.props} content={
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            {this.state.dropDownValue}
          </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem key={0} onClick={()=>this.changeValue("All",0)}>All</DropdownItem>
              {this.state.locations.map((prop, key) => {
                return <DropdownItem key={key} onClick={()=>this.changeValue(prop.locationName,prop.phonenumber)}>{prop.locationName}</DropdownItem>;
              })}
            </DropdownMenu>
          </Dropdown>
        } />
        <PanelHeader
          size="lg"
          content={
            <Line
              data={dashboardPanelChart.data(this.state.labels, this.state.dataArr)}
              options={dashboardPanelChart.options}
            />
          }
        />
        <div className="content">
          <Row>
            {/* <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardCategory>Global Sales</CardCategory>
                  <CardTitle tag="h4">Shipped Products</CardTitle>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-round btn-simple btn-icon"
                      color="default"
                    >
                      <i className="now-ui-icons loader_gear" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                      <DropdownItem className="text-danger">
                        Remove data
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={dashboardShippedProductsChart.data}
                      options={dashboardShippedProductsChart.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <Stats>
                    {[
                      {
                        i: "now-ui-icons arrows-1_refresh-69",
                        t: "Just Updated"
                      }
                    ]}
                  </Stats>
                </CardFooter>
              </Card>
            </Col> */}
            <Col xs={12} md={6}>
              <Card className="card-chart">
                <CardHeader>
                  <CardCategory>Weekly</CardCategory>
                  <CardTitle tag="h4">Summary</CardTitle>
                  {/* <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-round btn-simple btn-icon"
                      color="default"
                    >
                      <i className="now-ui-icons loader_gear" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                      <DropdownItem className="text-danger">
                        Remove data
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown> */}
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={dashboardAllProductsChart.data(this.state.labelsWeekly, this.state.dataArrWeekly)}
                      options={dashboardAllProductsChart.options}
                    />
                  </div>
                </CardBody>
                {/* <CardFooter>
                  <Stats>
                    {[
                      {
                        i: "now-ui-icons arrows-1_refresh-69",
                        t: "Just Updated"
                      }
                    ]}
                  </Stats>
                </CardFooter> */}
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card className="card-chart">
                <CardHeader>
                  <CardCategory>Incomplete/Invalid</CardCategory>
                  <CardTitle tag="h4">7 Days Summary</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={dashboard24HoursPerformanceChart.data(this.state.labelsInvalid, this.state.dataArrInvalid)}
                      options={dashboard24HoursPerformanceChart.options}
                    />
                  </div>
                </CardBody>
                {/* <CardFooter>
                  <Stats>
                    {[{ i: "now-ui-icons ui-2_time-alarm", t: "Last 7 days" }]}
                  </Stats>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Dashboard;
