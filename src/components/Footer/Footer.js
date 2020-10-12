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

export default function Footer(){

    const footerInAnim = {
        y: '0vh',
        opacity: 1,
        duration: 1000
    }

    const [currentAnim, setAnim] = useState(footerInAnim);
    const [animPaused, setAnimPause] = useState(false);

    return(
        <TweenOne
            key='footer'
            style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', transform: 'translateY(100vh)', opacity: 0, overflow: 'hidden'}}
            animation={currentAnim}
            paused={animPaused}
        >
            <Container style={{display: 'flex', width: '100%',  borderTopWidth: 1, borderTopColor: 'black', borderTopStyle: 'solid', justifyContent: 'center', alignItems: 'center'}}>
                <a style={{width: '100%', fontWeight: 'bold', fontSize: '1.8vh', textAlign: 'center'}}>yk / ykDev / build.dev.a1</a>
            </Container>
        </TweenOne>
    )
}