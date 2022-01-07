import React, { Component } from "react";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../getWeb3";
import { FormGroup, FormControl,Button } from 'react-bootstrap';
import '../index.css';


class QualityTest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      MasoomInstance: undefined,
      account: null,
      web3: null,
      farmerCount: 0,
      farmerList: null,
      loaded:false,
      isOwner:false,
      farmerId:0,
      lotno:0,
      grade:"",
      mrp:0,
      testdate:"",
      expdate:"",
    }
  }
  updatelot = event => {
    this.setState({ lotno : event.target.value});
  }
  
  updategrade = event => {
    this.setState({grade : event.target.value});
  }
  updatemrp= event => {
    this.setState({ mrp : event.target.value});
  }
  
  updatetestdate = event => {
    this.setState({testdate : event.target.value});
  }
  updateexpdate= event => {
    this.setState({ expdate : event.target.value});
  }
  
  updatefarmerId = event => {
    this.setState({ farmerId: event.target.value});
  }
 
  getFarmer = async () => {
    let farmerList = [];

      let farmer = await this.state.MasoomInstance.methods.farmerDetails(this.state.farmerId).call();

      farmerList.push(farmer);
    

    this.setState({farmerList : farmerList}); // window.location.reload(false);
  }
  quality = async () => {
    await this.state.MasoomInstance.methods.quality(this.state.farmerId,this.state.lotno,this.state.grade,this.state.mrp,this.state.testdate,this.state.expdate).send({from : this.state.account , gas: 3000000});
    // window.location.reload(false);
  }
  componentDidMount = async () => {

    // FOR REFRESHING PAGE ONLY ONCE -
    if(!window.location.hash){
      window.location = window.location + '#loaded';
      window.location.reload();
    }
    
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

      // this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({ MasoomInstance: instance, web3: web3, account: accounts[0] });
          
      const owner = "0xe3D8C6b1269e4Aa57B9ac3757526d519a5E42Ce0";
      if(this.state.account === owner){
        this.setState({isOwner : true});
      }

    
  };
  

  render() {
    if(!this.state.isOwner){
        return(
          <div className="CandidateDetails">
            <div className="CandidateDetails-title">
              <h1>
                ONLY TESTEUR CAN ACCESS
              </h1>
            </div>
          
          </div>
        );
      }
    let farmerList;
    if(this.state.farmerList){
      farmerList = this.state.farmerList.map((farmer) => {
        return (
            
        <div className="candidate">
            
          <div className="candidateName">Details</div>
          <div className="candidateDetails">
              <div>Farmer Name :{farmer.fname}</div>
            <div>Location : {farmer.loc}</div>
            <div>crop : {farmer.crop}</div>
            <div> Phone : {farmer.contact}</div>
            <div>Quantity : {farmer.quantity}</div>
            <div>Expected price : {farmer.exprice}</div>
            
          </div>
        </div>
        );
      });
    }
    
    
    return (
      <div className="CandidateDetails">
        <div className="CandidateDetails-title">
          <h1>
           Quality Testing
          </h1>
        </div>   
        <FormGroup>
          <div className="form-label">Enter Id Farmer - </div>
          <div className="form-input">
            <FormControl
              input = 'text'
              value = {this.state.farmerId}
              onChange={this.updatefarmerId}
            />
          </div>
        </FormGroup>
       
        <div>
          {farmerList}
        </div>
        <Button onClick={this.getFarmer} className="button-vote">
          Get Value
        </Button>
       
        <div className="CandidateDetails">
        <div className="CandidateDetails-title">
          <h1>
            Confirm test
          </h1>
        </div>
      </div>
     

      <div className="form">
        <FormGroup>
          <div className="form-label">Enter Lot number - </div>
          <div className="form-input">
            <FormControl
              input = 'text'
              value = {this.state.lotno}
              onChange={this.updatelot}
            />
          </div>
        </FormGroup>

        <FormGroup>
            <div className="form-label">Enter grade- </div>
            <div className="form-input">
              <FormControl
                  input = 'textArea'
                  value = {this.state.grade}
                  onChange={this.updategrade}
              />
            </div>
        </FormGroup>
        <FormGroup>
            <div className="form-label">Enter mrp - </div>
            <div className="form-input">
              <FormControl
                  input = 'textArea'
                  value = {this.state.mrp}
                  onChange={this.updatemrp}
              />
            </div>
        </FormGroup>
        <FormGroup>
            <div className="form-label">Enter test date - </div>
            <div className="form-input">
              <FormControl
                  input = 'textArea'
                  value = {this.state.testdate}
                  onChange={this.updatetestdate}
              />
            </div>
        </FormGroup>
        <FormGroup>
            <div className="form-label">Enter Expire date - </div>
            <div className="form-input">
              <FormControl
                  input = 'textArea'
                  value = {this.state.expdate}
                  onChange={this.updateexpdate}
              />
            </div>
        </FormGroup>
   
        <Button onClick={this.quality} className="button-vote">
          Submit 
        </Button>
      </div>
      </div>
      
    );
  }
}

export default QualityTest;