import SimpleStorageContract from "../contracts/SimpleStorage.json";
import React, { Component } from "react";
import Login from '../components/Login'
import getWeb3 from "../getWeb3";

import { FormGroup, FormControl,Button } from 'react-bootstrap';

class Farmer extends Component {
constructor(props) {
  super(props)

  this.state = {
    MasoomInstance: undefined,
    account: null,
    web3: null,
    fname:"",
    loc:"",
    crop:"",
    contact:"",
    quantity:0,
    exprice:0,
    isOwner:false
  }
}

updateName = event => {
  this.setState({ fname : event.target.value});
}

updateLoc = event => {
  this.setState({loc : event.target.value});
}
updatecrop= event => {
  this.setState({ crop : event.target.value});
}

updatecontact = event => {
  this.setState({contact : event.target.value});
}
updatequantity= event => {
  this.setState({ quantity : event.target.value});
}

updateexprice = event => {
  this.setState({exprice : event.target.value});
}


addFarmer = async () => {
  await this.state.MasoomInstance.methods.addFarmer(this.state.fname, this.state.loc,this.state.crop,this.state.contact,this.state.quantity,this.state.exprice).send({from : this.state.account , gas: 3000000});
  console.log(await this.state.MasoomInstance.methods.getFarmerNumber.call());
 // window.location.reload(false);
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
    const deployedNetwork = SimpleStorageContract.networks[networkId];
    const instance = new web3.eth.Contract(
      SimpleStorageContract.abi,
      deployedNetwork && deployedNetwork.address,
    );
    // Set web3, accounts, and contract to the state, and then proceed with an
    // example of interacting with the contract's methods.

    this.setState({ MasoomInstance: instance, web3: web3, account: accounts[0] });
    
    const owner = "0x2eed1b0751fCB34BC31f58C802Aa4311b8AA20B9";
    if(this.state.account === owner){
      this.setState({isOwner : true});
    }
    
  } catch (error) {
    // Catch any errors for any of the above operations.
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`,
    );
    console.error(error);
  }
};


render() {
  if (!this.state.web3) {
    return (
      <div className="CandidateDetails">
        <div className="CandidateDetails-title">
          <h1>
          Loading Web3, accounts, and contract..
          </h1>
        </div>
      
      </div>
    );
  }
  if(!this.state.isOwner){
    return(
      <div className="CandidateDetails">
        <div className="CandidateDetails-title">
          <h1>
            ONLY FARMER CAN ACCESS
          </h1>
        </div>
      {this.state.isOwner ? <Farmer /> : <Login />}
      </div>
    );
  }

 
  return (
    <div className="App">

      <div className="CandidateDetails">
        <div className="CandidateDetails-title">
          <h1>
            Add Farmer
          </h1>
        </div>
      </div>
     

      <div className="form">
        <FormGroup>
          <div className="form-label">Enter Name - </div>
          <div className="form-input">
            <FormControl
              input = 'text'
              value = {this.state.fname}
              onChange={this.updateName}
            />
          </div>
        </FormGroup>

        <FormGroup>
            <div className="form-label">Enter Location - </div>
            <div className="form-input">
              <FormControl
                  input = 'textArea'
                  value = {this.state.loc}
                  onChange={this.updateLoc}
              />
            </div>
        </FormGroup>
        <FormGroup>
            <div className="form-label">Enter crop Name - </div>
            <div className="form-input">
              <FormControl
                  input = 'textArea'
                  value = {this.state.crop}
                  onChange={this.updatecrop}
              />
            </div>
        </FormGroup>
        <FormGroup>
            <div className="form-label">Enter phone - </div>
            <div className="form-input">
              <FormControl
                  input = 'textArea'
                  value = {this.state.contact}
                  onChange={this.updatecontact}
              />
            </div>
        </FormGroup>
        <FormGroup>
            <div className="form-label">Enter quantity - </div>
            <div className="form-input">
              <FormControl
                  input = 'textArea'
                  value = {this.state.quantity}
                  onChange={this.updatequantity}
              />
            </div>
        </FormGroup>
        <FormGroup>
            <div className="form-label">Enter Expected price - </div>
            <div className="form-input">
              <FormControl
                  input = 'textArea'
                  value = {this.state.exprice}
                  onChange={this.updateexprice}
              />
            </div>
        </FormGroup>


        <Button onClick={this.addFarmer} className="button-vote">
          Add
        </Button>
      </div>

    </div>
  );
}
}

export default Farmer;