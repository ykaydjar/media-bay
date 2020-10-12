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

export default function Header(props) {
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
            style={{display: 'flex', flexDirection: 'row', transform: 'translateY(-100vh)', marginTop: 5, opacity: 0, overflow: 'hidden', paddingLeft: 10, paddingRight: 10, width: '100%', height: '5%', marginBottom: 10, borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}
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
                    <FontAwesomeIcon
                        icon={['fas' , 'align-right']}
                        style={{color: 'black', fontSize: '1.2em', filter: hoverFilter}}
                        onClick={() => {
                            props.callback('menu.open');
                        }}
                    />
                </TweenOne>
            </div>
            <div style={{width: '25%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0px 0px 5px grey inset', borderRadius: 10}}>
                <a
                    style={{fontWeight: 'bold', fontSize: '1.8vh', color: 'black', filter: hoverFilter, padding: 5}}
                    onMouseEnter={() => {

                    }}
                    onMouseLeave={() => {
                        setFilter(null);
                    }}
                >
                    MEDIA BAY
                </a>
            </div>
            <div
                style={{width: '37%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row', cursor: 'pointer'}}
            >
                <FontAwesomeIcon
                    icon={['fas' , 'sign-in-alt']}
                    style={{color: 'black', fontSize: '1.4em', margin: 5, filter: hoverFilter}}
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
        </TweenOne>
    )
}