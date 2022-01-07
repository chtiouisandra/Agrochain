
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import React, { Component } from "react";

import getWeb3 from "../getWeb3";
import Farmer from '../components/Farmer'
import { FormGroup, FormControl,Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router'
class Login extends Component {
  state = { storageValue: "",
  web3: null,
   accounts: null,
    contract: null,
    name:'',
    farmerId:0,
   
    isOwner:false
    };
    
  
    updateName = event => {
      this.setState({ name : event.target.value});
    }


  
    componentDidMount = async () => {
  
      // FOR REFRESHING PAGE ONLY ONCE -
      if(!window.location.hash){
        window.location = window.location + '#loaded';
        window.location.reload();
      }
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
  
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
  
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork =SimpleStorageContract.networks[networkId];
        const instance = new web3.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
  
        this.setState({ storageValue: instance, web3: web3, accounts: accounts[0] });
        
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    
  
    };

    handleClick = e => {
      if(this.state.accounts==="0x2eed1b0751fCB34BC31f58C802Aa4311b8AA20B9")
      this.props.history.push("/Farmer");
      else if(this.state.accounts==="0xe3D8C6b1269e4Aa57B9ac3757526d519a5E42Ce0")
      this.props.history.push("/QualityTest");
     
      else if(this.state.accounts==="0x8F37DC3624f91B9C3C40b180B4B00f57afBa42A3")
      this.props.history.push("/Customer");
    };
     
  
    render() {
      if (!this.state.web3) {
        return (
          <div className="UserDetails">
            <div className="UserDetails-title">
              <h1>
              Loading Web3, accounts, and contract..
              </h1>
            </div>
          </div>
        );
      }
  

      return (
        <div className="Login">
  
          <div className="UserDetails">
            <div className="UserDetails-title">
              <h1>
                Login  {this.state.accounts}
              </h1>
            </div>
          </div>
          
  
          <div className="form">
            <FormGroup>
              <div className="form-label">Enter Name - </div>
              <div className="form-input">
                <FormControl
                  input = 'text'
                  value = {this.state.name}
                  onChange={this.updateName}
                />
              </div>
            </FormGroup>
           

            <Button onClick={this.handleClick} className="button-vote">
              Login
            </Button>
          </div>
  
        </div>
      );
    }
  }
 
  export default Login;