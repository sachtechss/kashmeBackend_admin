
import React, { Component } from 'react';
import { Statistic, Card, Col, Row, DatePicker } from "antd";
import tradeDown from '../../../img/trending-down.png';
import tradeUp from '../../../img/trending-up.png';
import { connect } from 'react-redux';
import { getAdminDashboardCounts, getGraphByMonth } from '../actions/adminActions';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import moment from 'moment';
const { MonthPicker } = DatePicker;

const data = [
  {Day: 'Day 1', User: 2, Sale: 1, Product: 2},
  {Day: 'Day 2', User: 1, Sale: 10, Product: 2},
  {Day: 'Day 3', User: 2, Sale: 0, Product: 13},
  {Day: 'Day 4', User: 12, Sale: 5, Product: 2},
  {Day: 'Day 5', User: 2, Sale: 1, Product: 2},
  {Day: 'Day 6', User: 15, Sale: 20, Product: 2},
  {Day: 'Day 7', User: 2, Sale: 0, Product: 1},
  {Day: 'Day 8', User: 12, Sale: 0, Product: 12},
  {Day: 'Day 9', User: 2, Sale: 1, Product: 2},
  {Day: 'Day 10', User: 1, Sale: 40, Product: 2},
  {Day: 'Day 11', User: 2, Sale: 1, Product: 2},
  {Day: 'Day 12', User: 1, Sale: 10, Product: 2},
  {Day: 'Day 13', User: 2, Sale: 0, Product: 13},
  {Day: 'Day 14', User: 12, Sale: 5, Product: 2},
  {Day: 'Day 15', User: 2, Sale: 1, Product: 2},
  {Day: 'Day 16', User: 15, Sale: 20, Product: 2},
  {Day: 'Day 17', User: 2, Sale: 0, Product: 1},
 

];
class Dashboard extends Component {

  componentDidMount() {

    this.props.getAdminDashboardCounts();
    this.props.getGraphByMonth(new Date());
  }

  changeDate = (date) => {
    
    this.props.getGraphByMonth(date._d);
  }

  render() {

    let props = this.props;
    let counts = props.dashboardCounts ? props.dashboardCounts : '';

    
    let data = this.props.graphStats;
   
    
    if(data.length > 0){
      var newArray = []  
      for(var x = 0; x < data.length; x++){
        
        console.log('day',data[x].day)
        newArray[x] = {

          Day : 'Day ' + data[x].day,
          User: data[x].User,
          Sale: data[x].Sale,
          Product: data[x].Product
         
        }

      }
      data = newArray;
    }
    
    return (<><Row>
      {/* <PageHeader
        title="Dashboard"
        subTitle=""
      /> */}
      <Row gutter={16}>
        <Col className="gutter-row" span={8}>
          <div className="gutter-box">
            <Card hoverable className="mb-4" 
             //onClick={() => this.props.history.push('/users')}
            >
              <Statistic
                title="Total Users"
                value={counts ? counts.user : 0}
                precision={0}
                valueStyle={{ color: '#F9897F' }}
                prefix={<img alt="trade" src={tradeUp} />}
              // suffix="%"
              />
            </Card>
          </div>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className="gutter-box">
            <Card hoverable className="mb-4" 
            // onClick={() => this.props.history.push('/users')}
            >
              <Statistic
                title="Total Transactions"
                value={counts ? counts.product : 0}
                precision={0}
                valueStyle={{ color: '#8884d8' }}
                prefix={<img alt="trade" src={tradeUp} />}
              // suffix="%"
              />
            </Card>
          </div>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className="gutter-box">
            <Card hoverable className="mb-4" 
            // onClick={() => this.props.history.push('/users')}
            >
              <Statistic
                title="Total Loans"
                value={counts ? counts.product_sold : 0}
                precision={0}
                valueStyle={{ color: '#82ca9d' }}
                prefix={<img alt="trade" src={tradeUp} />}
              // suffix="%"
              />
            </Card>
          </div>
        </Col>
      </Row>
      {/* <Col xl={8} lg={8} md={8} sm={24} xs={24}>
        <Card title="TOTOAL USER" className={`gx-card-metrics gx-card-eq-height`}>
          <h2>{'12'}</h2>
          <p className="gx-text-light">{'title'}</p> 
          <img alt="trade" src={tradeDown} />
        </Card>
        
      </Col>
      <Col xl={8} lg={8} md={8} sm={24} xs={24}>
        <Card title={"TOTOAL SALES"} className={`gx-card-metrics gx-card-eq-height`}>
          <h2>{'12'}</h2>
           <p className="gx-text-light">{'title'}</p> 
          <img alt="trade" src={tradeUp} />
        </Card>
      </Col>
      <Col xl={8} lg={8} md={8} sm={24} xs={24}>
        <Card title={"TOTOAL PRODUCTS"} className={`gx-card-metrics gx-card-eq-height`}>
          <h2>{'15'}</h2>
           <p className="gx-text-light">{'title'}</p> 
          <img alt="trade" src={tradeUp} />
        </Card>
      </Col> */}
    </Row>
      {/* <Row>
        <Col lg={24} md={24} xs={24}>
          <Card extra={<MonthPicker defaultValue={moment(new Date(), 'YYYY-MM')} allowClear={false} onChange={(date) => this.changeDate(date)} placeholder="Select month"/>}>
            
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer>
                <BarChart
                  width={800}
                  height={400}
                  data={data}
                  margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                  }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Day" />
                  <YAxis domain={[0, 'dataMax + 5']} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="User" fill="#F9897F" />
                  <Bar dataKey="Product"fill="#8884d8" />
                  <Bar dataKey="Sale" fill="#82ca9d" />
                  
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row> */}
      </>
    );
  }
}


function mapStateToProps(state) {
  return {
    dashboardCounts: state.admin.dashboardCounts,
    graphStats: state.admin.graphStats
  };
}
export default connect(mapStateToProps, { getAdminDashboardCounts, getGraphByMonth })(Dashboard);
