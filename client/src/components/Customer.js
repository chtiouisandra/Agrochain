import React, { Component } from "react";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../getWeb3";
import { FormGroup, FormControl,Button } from 'react-bootstrap';
import '../index.css';


class Customer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      MasoomInstance: undefined,
      account: null,
      web3: null,
      farmerCount: 0,
      lotCount:0,
      farmerList: null,
      lotList:null,
      loaded:false,
      isOwner:false,
      lotno:0,
      farmerId:0
    }
  }
  updatefarmerId = event => {
    this.setState({ farmerId: event.target.value});
  }
  updatelotno = event => {
    this.setState({ lotno: event.target.value});
  }
  getFarmer = async () => {
    //let farmerList = [];
    let lotList = [];
      //let farmer = await this.state.MasoomInstance.methods.farmerDetails(this.state.farmerId).call();
      let lot = await this.state.MasoomInstance.methods.lotDetails(this.state.lotno).call();
    
//      farmerList.push(farmer);
      lotList.push(lot);
      this.setState({lotList : lotList});
  //  this.setState({farmerList : farmerList}); 
     //window.location.reload(false);
   
     let farmerCount = await this.state.MasoomInstance.methods.getFarmerNumber().call();

     let farmerList = [];
     for(let i=0;i<farmerCount;i++){
       let farmer = await this.state.MasoomInstance.methods.farmerDetails(i).call();
       if(lot.famerId === farmer.farmerId){
         farmerList.push(farmer);
       }
     }
     this.setState({farmerList : farmerList});

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
          
   

    
  };
  

  render() {
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
    let lotList;
    if(this.state.lotList){
      lotList = this.state.lotList.map((lot) => {
        return (
            
        <div className="candidate">
            
         
          <div className="candidateDetails">
              <div>Lot Number :{lot.lotno}</div>
            <div>Grade : {lot.grade}</div>
            <div>MRP : {lot.mrp}</div>
            <div>Test date  : {lot.testdate}</div>
            <div>Expire Date : {lot.expdate}</div>
           
            
          </div>
        </div>
        );
      });
    }
    
    
    return (
      <div className="CandidateDetails">
        <div className="CandidateDetails-title">
          <h1>
           Customer
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
        <FormGroup>
          <div className="form-label">Enter Lot Number - </div>
          <div className="form-input">
            <FormControl
              input = 'text'
              value = {this.state.lotno}
              onChange={this.updatelotno}
            />
          </div>
        </FormGroup>
       
        <div>
          {farmerList}
          {lotList}
        </div>
        <Button onClick={this.getFarmer} className="button-vote">
          Get Value
        </Button>
        
      </div>
      
    );
  }
}

export default Customer;