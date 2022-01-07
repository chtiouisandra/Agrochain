import React, { Component } from "react";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../getWeb3";

import '../index.css';


class FarmerDetails extends Component {
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
      
    }
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

      // this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({ MasoomInstance: instance, web3: web3, account: accounts[0] });
          
      let farmerCount = await this.state.MasoomInstance.methods.getFarmerNumber().call();
      this.setState({ farmerCount : farmerCount });

      let farmerList = [];
      for(let i=0;i<farmerCount;i++){
        let farmer = await this.state.MasoomInstance.methods.farmerDetails(i).call();

        farmerList.push(farmer);
      }

      this.setState({farmerList : farmerList});

    } catch (error) {
      let farmerCount = await this.state.MasoomInstance.methods.getFarmerNumber().call();
      this.setState({ farmerCount : farmerCount });

      let farmerList = [];
      for(let i=0;i<farmerCount;i++){
        let farmer = await this.state.MasoomInstance.methods.farmerDetails(i).call();

        farmerList.push(farmer);
      }

      this.setState({farmerList : farmerList});
      // Catch any errors for any of the above operations.
     
    }
  };
  

  render() {
    let farmerList;
    if(this.state.farmerList){
      farmerList = this.state.farmerList.map((farmer) => {
        return (
        <div className="candidate">
          <div className="candidateName">{farmer.fname}</div>
          <div className="candidateDetails">
            <div>Location : {farmer.loc}</div>
            <div>crop : {farmer.crop}</div>
            <div> contact : {farmer.contact}</div>
            <div>quantity : {farmer.quantity}</div>
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
            Farmer List
          </h1>
        </div>

       
        
        <div className="CandidateDetails-sub-title">
          Total Number of Farmers - {this.state.farmerCount}
        </div>
        <div>
          {farmerList}
        </div>
      </div>
    );
  }
}

export default FarmerDetails;