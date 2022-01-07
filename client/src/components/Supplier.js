import React, { Component } from "react";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../getWeb3";
import { FormGroup, FormControl,Button } from 'react-bootstrap';
import '../index.css';


class Supplier extends Component {
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
        farmerId:0,
        priceSup:0
      
    }
  }
  updateprice = event => {
    this.setState({ priceSup: event.target.value});
  }

  updatelotno = event => {
    this.setState({ lotno: event.target.value});
  }
  buy = async () => {
    let lot = await this.state.MasoomInstance.methods.lotDetails(this.state.lotno).call();
    await this.state.MasoomInstance.methods.addFarmerLot(lot.famerId, this.state.lotno,this.state.priceSup).send({from : this.state.account , gas: 3000000});
 
  }
  getLot = async () => {
    //let farmerList = [];
    let lotList = [];
      let lot = await this.state.MasoomInstance.methods.lotDetails(this.state.lotno).call();
      lotList.push(lot);
      this.setState({lotList : lotList});

     let farmerList = [];
    
       let farmer = await this.state.MasoomInstance.methods.farmerDetails(lot.famerId).call();
     
         farmerList.push(farmer);
  
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

      // this.setState({ web3, accounts, contrayct: instance }, this.runExample);
      this.setState({ MasoomInstance: instance, web3: web3, account: accounts[0] });
 

    
  };
  handleClick = e => {
   
    this.props.history.push("/SupplierDetails");
 
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
          <div className="candidateName">{lot.famerId}</div>
          <div className="candidateDetails">
          <div>Farmer Id : {lot.famerId}</div>
            <div>Lot Number : {lot.lotno}</div>
            <div>Grade : {lot.grade}</div>
            <div> MRP : {lot.mrp}</div>
            <div>Test Date : {lot.testdate}</div>
            <div>Eexpire Date : {lot.expdate}</div>
          </div>
        </div>
        );
      });
    }
    
    
    return (
      <div className="CandidateDetails">
        <div className="CandidateDetails-title">
          <h1>
            Lot List
          </h1>
        </div>
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
        </div>
        <div>
          {lotList}
        </div>
        <Button onClick={this.getLot} className="button-vote">
          Get Value
        </Button>
        <FormGroup>
          <div className="form-label">Enter your price - </div>
          <div className="form-input">
            <FormControl
              input = 'text'
              value = {this.state.priceSup}
              onChange={this.updateprice}
            />
          </div>
        </FormGroup>
        <Button onClick={this.buy} className="button-vote">
          Buy
        </Button>
        <Button onClick={this.handleClick} className="button-vote">
          Details
        </Button>
      </div>
    );
  }
}

export default Supplier;