import React, {Component, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router';
import ReactPlayer from "react-player";
import {FullScreen, useFullScreenHandle} from "react-full-screen";

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


export default function MediaItem(){
    const playerFullscreen = useFullScreenHandle();
    const [inFullscreen, setFullScreen] = useState(false);
    const [isPlaying, setPlaying] = useState(true);

    const [playerDimensions, setPlayerDimensions] = useState({width: '56em', height: '31.5em'});

    const [uiShown, showUI] = useState(false);

    return(
        <div style={{display: 'flex', flexDirection: 'column', width: '100vw'}}>

            <div
                style={{display: 'flex', flexShrink: 1, borderWidth: 1, borderStyle: 'solid', borderColor: 'red', width: playerDimensions.width, height: playerDimensions.height}}
            >
                <FullScreen
                    handle={playerFullscreen}
                    onChange={(inFullscreen) => {
                        if(inFullscreen){
                            setFullScreen(true);
                            setPlayerDimensions({width: '100%', height: '100%'});
                        }else{
                            setFullScreen(false);
                            setPlayerDimensions({width: '56em', height: '31.5em'});
                        }
                    }}
                >
                    <ReactPlayer
                        url={'https://stream.voidboost.cc/9/5/4/4/0/c888427009c4c8dcaa20a3d160f13a77:2020102819/ns015.mp4:hls:manifest.m3u8'}
                        playing={isPlaying}
                        width={playerDimensions.width}
                        height={playerDimensions.height}
                        style={{position: 'absolute'}}
                        onMouseEnter={() => {
                            console.log('Mouse Entered');
                            showUI(true);
                            setTimeout(() => {
                                showUI(false);
                            }, 3000);
                        }}
                    />
                    <div style={{position: 'absolute', display: uiShown?'flex':'none', flexDirection: 'column', width: playerDimensions.width, height: playerDimensions.height}}>
                        <div style={{display: 'flex', flex: 1, width: '100%', alignItems: 'flex-start'}}>
                            <span style={{color: 'red', fontWeight: 'bold'}}>Media Title</span>
                        </div>

                        <div style={{display: 'flex', flex: 4, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <FontAwesomeIcon
                                icon={['fas' , 'backward']}
                                style={{color: 'red', fontSize: '2em', margin: 30, cursor: 'pointer'}}
                                onClick={() => {

                                }}
                            />

                            <FontAwesomeIcon
                                icon={['fas' , isPlaying?'pause':'play']}
                                style={{color: 'red', fontSize: '2em', margin: 30, cursor: 'pointer'}}
                                onClick={() => {
                                    setPlaying(!isPlaying);
                                }}
                            />

                            <FontAwesomeIcon
                                icon={['fas' , 'forward']}
                                style={{color: 'red', fontSize: '2em', margin: 30, cursor: 'pointer'}}
                                onClick={() => {

                                }}
                            />
                        </div>

                        <div style={{display: 'flex', flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <FontAwesomeIcon
                                icon={['fas' , inFullscreen?'compress':'expand']}
                                style={{color: 'red', fontSize: '1em', margin: 10, cursor: 'pointer'}}
                                onClick={() => {
                                    if(inFullscreen){
                                        playerFullscreen.exit();
                                    }else{
                                        playerFullscreen.enter();
                                    }

                                    setFullScreen(!inFullscreen);
                                }}
                            />
                        </div>
                    </div>
                </FullScreen>
            </div>
        </div>
    )

}