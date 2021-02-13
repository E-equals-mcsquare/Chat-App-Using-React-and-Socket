import React, { Component } from 'react'
import styles from '../css/LoginScreen.module.css'

export default class LoginScreen extends Component {
    onLogin = () => {
        let id = document.getElementById("userId").value;
        window.location.href = "#/chat/"+id
    }
    render() {
        return (
            <div className={styles.loginScreen}>
                <h1 className={styles.header}>Login Screen</h1>
                <input id="userId" className={styles.loginid} placeholder="Enter User Id..."/>
                <button className={styles.loginbutton} onClick={this.onLogin} >Login</button>
            </div>
        )
    }
}
