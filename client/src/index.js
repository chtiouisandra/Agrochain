import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Farmer from './components/Farmer'
import FarmerDetails from './components/FarmerDetails';
import Login  from './components/Login';


import * as serviceWorker from './serviceWorker';
import { Router, Switch, Route } from "react-router-dom";
import history from'./history';
import QualityTest from './components/QualityTest';

import Customer from './components/Customer';
import Supplier from './components/Supplier';
import SupplierDetails from './components/SupplierDetails';


ReactDOM.render(<Router history={history}>
    <Switch>
        
       
        <Route exact path='/' component={Login} />
        <Route exact path='/Farmer' component={Farmer} />
        <Route exact path='/QualityTest' component={QualityTest} />
        <Route exact path='/Customer' component={Customer} />
        <Route exact path='/Supplier' component={Supplier} />
        <Route exact path='/SupplierDetails' component={SupplierDetails} />
        <Route path='/App' component={App} />
        <Route path='/FarmerDetails' component={FarmerDetails} />
        
    </Switch>
    
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
