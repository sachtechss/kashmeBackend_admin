import React, { Component } from 'react';
// import axios from 'axios';
import openSocket from "socket.io-client";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/assets/index.css';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
class Test extends Component {

  constructor(props) {
    super(props);
    this.state = {
      endpoint: "http://172.10.236.59:5000",
      testdata: ''
    };
  }

  componentDidMount() {
    // axios.get("http://172.10.230.27:3000/users/Chatdetail", { // receive two parameter endpoint url ,form data 
    // }).then(res => { // then print response status
    //     console.log("res--------------", res.data)
    //     this.setState({ chatArray: res.data })
    // })
    // // this.connect()
    // const { endpoint } = this.state;

    // //Very simply connect to the socket
    // const socket = openSocket(endpoint);
    // //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
    // socket.on("outgoing dataa", data => this.setState({ response: data.num }));

    // console.log("response------------", this.state.response)
    geocodeByPlaceId('ChIJH_imbZDuDzkR2AjlbPGYKVE')
      .then(results => console.log(results))
      .catch(error => console.error("err == ",error));
  }

  handleSubmit(e) {
    e.preventDefault()
    const socket = openSocket('http://172.10.236.59:5000')
    //we emit the data. No need to JSON serialization!
    socket.emit('incoming data', this.state.inputtext);
    let dt = this.state.testdata;
    debugger
    socket.on("incoming data", data =>
      this.setState({ testdata: dt.concat('\n' + data) })
    );


  };

  Change = event => {
    // console.log("test-----------", event.target.value)
    this.setState({ inputtext: event.target.value })
  }


  render() {

    return (
      <div>
        <div>
          <GooglePlacesAutocomplete
            onSelect={console.log}
          />
        </div>
        {/* <ul id="messages">{this.state.testdata}</ul>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type='text' onChange={this.Change} />
          <button type="submit">Send</button>
        </form> */}
      </div>
    )
  }
}
export default Test
// import React, { Component } from 'react';
// import { loginAction } from './actions/loginActions';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { Link } from "react-router-dom";

// class Login extends Component {

//   componentDidMount() {
//     this.props.loginAction();
//   }

//   render() {
//     return (<>

//       <div className="container">
//         <div className="rowa">
//           <div className="col-md-5a mx-autoa">
//             <div id="first">
//               <div className="myform form ">
//                 <div className="logo mb-3">
//                   <div className="col-md-12 text-center">
//                     <h1>Login</h1>
//                   </div>
//                 </div>
//                 <form action="" method="post" name="login">
//                   <div className="form-group">
//                     <label for="exampleInputEmail1">Email address</label>
//                     <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
//                   </div>
//                   <div className="form-group">
//                     <label for="exampleInputEmail1">Password</label>
//                     <input type="password" name="password" id="password" className="form-control" aria-describedby="emailHelp" placeholder="Enter Password" />
//                   </div>
//                   <div className="form-group">
//                     <p className="text-center">By signing up you accept our <a href="#">Terms Of Use</a></p>
//                   </div>
//                   <div className="col-md-12 text-center ">
//                     <Link to="/dashboard"><button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm"> Login</button></Link>
//                   </div>
//                   <div className="col-md-12 ">
//                     <div className="login-or">
//                       <hr className="hr-or" />
//                       <span className="span-or">OR</span>
//                     </div>
//                   </div>
//                   <div className="col-md-12 mb-3">
//                     <p className="text-center">
//                       <a href="javascript:void();" className="google btn mybtn"><i className="fa fa-google-plus">
//                       </i> Signup using Google
//                                  </a>
//                     </p>
//                   </div>
//                   <div className="form-group">
//                     <p className="text-center">Don't have account? <a href="#" id="signup">Sign up here</a></p>
//                   </div>
//                 </form>

//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//     </>);
//   }
// }

// Login.propTypes = {
//   pageName: PropTypes.string
// };

// function mapStateToProps(state) {
//   return {
//     pageName: state.login.pageName,
//   };
// }

// export default connect(mapStateToProps, { loginAction })(Login);
