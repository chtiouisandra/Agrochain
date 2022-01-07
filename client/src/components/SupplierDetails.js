import React, { Component, useEffect, useState } from "react";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../getWeb3";
import QRcode  from 'qrcode.react';
import { FormGroup, FormControl,Button } from 'react-bootstrap';
import '../index.css';
import QrReader from 'react-qr-reader';

import { useRef} from 'react';
import {Container, Card, CardContent, makeStyles, Grid, TextField} from '@material-ui/core';
import QRCode from 'qrcode';




class SupplierDetails extends Component {
   
  constructor(props) {
    super(props)
    
    this.state = {
      MasoomInstance: undefined,
      account: null,
      web3: null,
      farmerlotCount: 0,
      farmerlotList: null,
      loaded:false,
      isOwner:false,
      src:null
      
    }
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
          
      let farmerlotCount = await this.state.MasoomInstance.methods.getFarmerLotNumber().call();
      this.setState({ farmerlotCount : farmerlotCount });

      let farmerlotList = [];
      for(let i=0;i<farmerlotCount;i++){
        let farmerlot = await this.state.MasoomInstance.methods.farmerlotDetails(i).call();

        farmerlotList.push(farmerlot);
      }

      this.setState({farmerlotList : farmerlotList});

  };


  

  
  render() {
    
    let farmerlotList;
    if(this.state.farmerlotList){
      farmerlotList = this.state.farmerlotList.map((farmerlot) => {
        return (
        <div className="candidate">
          <div className="candidateName">{farmerlot.farmerlotId}</div>
          <div className="candidateDetails">
            <div>Farmer id : {farmerlot.farmerId}</div>
            <div>Lot Number : {farmerlot.lotId}</div>
            <div> Supplier price : {farmerlot.priceSup}</div>
            <QRcode id='abc' value={farmerlot}/>
           
          </div>
        </div>
        );
      });
    }
  
    
    return (
      <div className="CandidateDetails">
        <div className="CandidateDetails-title">
          <h1>
            Stock
          </h1>
        </div>
    
        
        
        <div className="CandidateDetails-sub-title">
            {this.state.farmerlotCount}
        </div>
        <div>
           
          {farmerlotList}
           
        </div>
      </div>
    );
  }
  
}

export default SupplierDetails;