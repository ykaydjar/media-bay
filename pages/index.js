import React, {Component, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router';
import Link from 'next/link';

import {getMediaItems} from "../src/lib/media_quaries";

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
import Layout from "../src/components/layout";




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

        }
    }







    render() {
        return(
            <Layout style={{display: 'flex', flexDirection: 'column', width: '100vw'}} main={true}>
                <Head>
                    <meta name="bm-site-verification" content="5jEbluSa1C5uta6aF_Bi3vjhrFRaAtBYZ7w9E6yD" />
                    <title>MediaBay</title>
                    <link rel='icon' href='/hdrezka_logo.png'/>
                </Head>

                <div style={{display: 'flex', flexDirection: 'row', width: '100vw', paddingTop: 50}}>
                    <TweenOne
                        key='left-block'
                        style={{display: this.state.menuShown?'none':'flex', zIndex: 0, paddingBottom: 10, transform: 'translateX(-100vw)', boxShadow: this.state.zkBoxShadow, minWidth: 360, opacity: 0, marginLeft: '20vw', width: '80vw',  height: '45vh', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}
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
                            <MediaFeedItem key={index} data={item} link={`/films/${item.id}`}/>
                        ):null}
                    </TweenOne>
                </div>
            </Layout>
        )
    }
}


export async function getServerSideProps(){
    let mediaItems = await getMediaItems('rezka.ag', 'films', '1', 'last', 'max');

    return {
        props: {
            mediaItems: mediaItems,
        }
    }
}
