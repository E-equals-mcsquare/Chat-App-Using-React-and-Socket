import React, { Component } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Interface from '../botinterface/Interface'
import LoginScreen from '../login/LoginScreen'

const Router = () => (
    <HashRouter>
        <Switch>
            <Route path="/" component={LoginScreen} exact />
            <Route path="/chat/:id" component={Interface} exact />
        </Switch>
    </HashRouter>
)

export default Router
