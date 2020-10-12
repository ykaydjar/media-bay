import React, {Component, useState, useCallback} from "react";
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

export default function AuthMenu(props){
    const router = useRouter();

    return(
        <div style={{zIndex: 1, position: 'absolute', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}>

            <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', width: '100%', height: '100%', transform: 'rotate(45deg)',}}>
                <div style={{width: '100%', height: '50%', backgroundColor: 'black', borderBottomWidth: 1, borderBottomStyle: 'solid', borderColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                    <a style={{fontWeight: 'bold', fontSize: '2.5vh', color: 'white'}}>SignIn</a>
                </div>
                <div style={{width: '100%', height: '50%', backgroundColor: 'black', borderTopWidth: 1, borderTopStyle: 'solid', borderColor: 'white'}}>

                </div>
            </div>

            <FontAwesomeIcon
                icon={['fas' , 'times']}
                style={{color: 'white', fontSize: '3vh', margin: 5, display: 'flex', flexDirection: 'column', position: 'absolute', top: '45vh'}}
                onClick={() => {
                    router.push('/');
                }}
                onMouseEnter={() => {

                }}
                onMouseLeave={() => {

                }}
            />

        </div>
    )
}