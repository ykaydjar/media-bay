import React, {Component, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router';

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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {auth} from "../../../config/fire-config";
import Link from "next/link";


export default function Header(props) {
    const user = auth.currentUser;
    
    const [isAuth, setAuth] = useState(false);
    auth.onAuthStateChanged((user) => {
        if(user){
            setAuth(true);
        }else{
            setAuth(false);
        }
    })
    
    const headerInAnim = {
        y: '0vh',
        opacity: 1,
        duration: 1000,
    }

    const menuButtonInAnim = {
        boxShadow: '0px 0px 5px grey inset',
        duration: 250
    }
    const menuButtonOutAnim = {
        boxShadow: null,
        duration: 250
    }

    const [currentAnim, setAnim] = useState(headerInAnim);
    const [currentMenuButtonAnim, setMenuButtonAnim] = useState(null);
    const [animPaused, setAnimPause] = useState(false);
    const [hoverFilter, setFilter] = useState(null);

    return(
        <TweenOne
            style={{display: 'flex', flexDirection: 'row', position: 'fixed', zIndex: 2, backgroundColor: 'white',  transform: 'translateY(-100vh)', paddingTop: 5, opacity: 0, overflow: 'hidden', paddingLeft: 10, paddingRight: 10, width: '100%', height: '5%', marginBottom: 10, borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}
            animation={currentAnim}
            paused={animPaused}
        >
            <div style={{width: '37%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', cursor: 'pointer'}}>

                <TweenOne
                    key='menu-button'
                    style={{display: 'flex', width: '10%', height: '100%', boxShadow: null, flexDirection: 'row', overflow: 'hidden', justifyContent: 'center', alignItems: 'center'}}
                    animation={currentMenuButtonAnim}
                    paused={animPaused}
                    onMouseEnter={() => {

                    }}
                    onMouseLeave={() => {

                    }}
                >
                    <div
                        className='menu-button_container'
                        style={{display: 'flex', width: '2em', height: '2em', justifyContent: 'center', alignItems: 'center', borderRadius: 100}}
                    >
                        <i
                            className='ci-menu_alt_02'
                            id='menu-button'
                            style={{color: 'black', fontSize: '1.7em', fontWeight: 'bold', margin: 5}}
                            onClick={() => {
                                props.callback('menu.open');
                            }}
                        />
                    </div>
                </TweenOne>
            </div>
            <div className={'header__title'} style={{width: '25%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: 10}}>
                <Link href={'/'}>
                    <a
                        style={{fontWeight: 'bold', fontSize: '1.7vh', color: 'black', filter: hoverFilter, padding: 5}}
                        onMouseEnter={() => {

                        }}
                        onMouseLeave={() => {
                            setFilter(null);
                        }}
                    >
                        MEDIA BAY
                    </a>
                </Link>
            </div>
            <div
                style={{width: '37%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row', cursor: 'pointer'}}
            >
                {user?<a>{user.email}</a>:
                    <div
                        className='menu-button_container'
                        style={{display: 'flex', width: '2em', height: '2em', justifyContent: 'center', alignItems: 'center', borderRadius: 100}}
                    >
                        <i
                            className='ci-user'
                            id='user-button'
                            style={{color: 'black', fontSize: '1.7em', fontWeight: 'bold', margin: 5}}
                            onClick={() => {
                                props.callback('auth.open');
                            }}
                            onMouseEnter={() => {

                            }}
                            onMouseLeave={() => {
                                setFilter(null);
                            }}
                        />
                    </div>
                }
            </div>
        </TweenOne>
    )
}
