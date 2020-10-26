import React, {Component, useEffect, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router';

import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import MediaMenu from "./MediaMenu/MediaMenu";

const Context = React.createContext();

export default class Layout extends Component{
    constructor(props) {
        super(props);

        this.state = {
            menuShown: false,
            currentMenuPage: 'main',
            authShown: false,

            showMediaMenu: true,
            currentMediaMenuPage: 'main',
        }
    }

    menuCallback = (action, data) => {
        console.log('Menu Callback: ' + action);
        if(action === 'menu.close'){
            this.setState({
                menuShown: false,
            })
        }else if(action === 'menu.goAuth'){
            this.setState({
                currentMenuPage: 'main',
            })
        }
    }

    headerCallback = (action, data) => {
        console.log('Header Callback: ' + action);

        if(action === 'menu.open'){
            this.setState({
                currentMenuPage: 'main',
                menuShown: true,
            })
        }else if(action === 'auth.open'){
            this.setState({
                currentMenuPage: 'auth',
                menuShown: true,
            })
        }
    }

    authMenuCallback = (action, data) => {

    }

    handleMenuDisplay = () => {
        if(this.state.menuShown){
            return <Menu menuPage={this.state.currentMenuPage} callback={this.menuCallback}/>
        }else{
            return null;
        }
    }

    mediaMenuCallback = (action, data) => {
        if(action === 'media.set_tab'){
            this.setState({
                currentMediaMenuPage: data
            })
        }
    }

    handleMediaMenuDisplay = () => {
        if(this.state.showMediaMenu){
            if(this.props.main){
                return <MediaMenu mediaMenuPage={this.state.currentMediaMenuPage} callback={this.mediaMenuCallback}/>
            }else{
                return null;
            }
        }else{
            return null;
        }
    }

    render() {
        return(
            <div style={{display: 'flex', width: '100vw', height: '100vh', flexDirection: 'column'}}>
                <Header callback={this.headerCallback}/>

                {this.handleMediaMenuDisplay()}

                {this.props.children}

                {this.handleMenuDisplay()}
            </div>
        )
    }
}


