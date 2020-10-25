import React, {Component, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router';
import Link from 'next/link';

import {getMediaItems} from "./api/get_media_items";

import MediaFeedItem from "../src/components/MediaItems/MediaFeedItem";

import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button'
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/DropdownItem";
import Nav from "react-bootstrap/Nav";
import Toast from 'react-bootstrap/Toast';

import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../src/components/Header/Header';
import Footer from '../src/components/Footer/Footer';
import Menu from '../src/components/Menu/Menu';
import AuthMenu from "../src/components/AuthMenu/AuthMenu";
import {auth} from "../config/fire-config";




export default class Home extends Component{
    constructor(props) {
        super(props);


        const topBlockInAnim = {
            x: '0vw',
            opacity: 1,
            duration: 1000
        }

        const leftBlockInAnim = {
            x: '0vw',
            opacity: 1,
            duration: 1000
        }

        const bottomBlockInAnim = {
            y: '0vh',
            opacity: 1,
            duration: 1000
        }


        this.state = {
            mediaItems: this.props.mediaItems,

            currentTopBlockAnim: topBlockInAnim,
            currentLeftBlockAnim: leftBlockInAnim,
            currentBottomBlockAnim: bottomBlockInAnim,

            animPaused: false,

            zkBoxShadow: null,
            hdBoxShadow: null,

            menuShown: false,
            currentMenuPage: 'main',
            authShown: false,

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



    render() {
        return(
            <div style={{display: 'flex', flexDirection: 'column', width: '100vw'}}>
                <Head>
                    <meta name="bm-site-verification" content="5jEbluSa1C5uta6aF_Bi3vjhrFRaAtBYZ7w9E6yD" />
                    <title>MediaBay</title>
                    <link rel='icon' href='/hdrezka_logo.png'/>
                </Head>

                <Header callback={this.headerCallback}/>

                <TweenOne
                    key='left-block'
                    style={{display: this.state.menuShown?'none':'flex', paddingTop: 10, paddingBottom: 10, transform: 'translateX(-100vw)', boxShadow: this.state.zkBoxShadow, minWidth: 360, opacity: 0, width: '100vw',  height: '45vw', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}
                    animation={this.state.currentLeftBlockAnim}
                    paused={this.state.animPaused}
                    onMouseEnter={() => {

                    }}
                    onMouseLeave={() => {
                        this.setState({
                            zkBoxShadow: null,
                        })
                    }}
                >
                    {this.props.mediaItems?this.props.mediaItems.map((item, index) =>
                        <MediaFeedItem key={index} data={item}/>
                    ):null}
                </TweenOne>



                {this.handleMenuDisplay()}

            </div>
        )
    }
}

Home.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    paused: PropTypes.bool
};

export async function getStaticProps(){
    /*
    await fetch('https://www.dropbox.com/oauth2/authorize?client_id=gvzcavclr5e7wf9&response_type=code').then(async(response) => {
        console.log(response);
        await fetch('https://api.dropboxapi.com/oauth2/token').then((token) => {
            console.log('Token: ' + JSON.stringify(token));
        })
    })

     */

    let mediaItems = await getMediaItems();
   
    return {
        props: {
            message: 'Hello World',
            mediaItems: mediaItems,
        }
    }
}
