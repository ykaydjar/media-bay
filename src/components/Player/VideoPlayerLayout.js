import React, {Component, useEffect, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router';

import {getMediaItemsData, getMovieTranslations, getMovieData, getMediaItems} from "../../lib/media_quaries";

import {FullScreen, useFullScreenHandle} from "react-full-screen";
import ReactPlayer from "react-player";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";

import useSWR from 'swr';

import VideoPlayer from "./VideoPlayer";
import VideoPlayerUI from "./VideoPlayerUI";

export default function VideoPlayerLayout(props){
    const playerFullscreen = useFullScreenHandle();

    const playerData = props.playerData;

    const handlePlayerActions = (action, data) => {
        if(action === 'ui.show'){
            return props.callback('ui.show');
        }else if(action === 'ui.hide'){
            return props.callback('ui.hide');
        }else if(action === 'player.update_player_state'){
            return props.callback('player.update_player_state', data);
        }else if(action === 'player.update_progress'){
            return props.callback('player.update_progress', data);
        }
    }

    const handlePlayerUICallback = (action, data) => {
        if(action === 'ui.update_player_state'){
            return props.callback('ui.update_player_state', data);
        }else if(action === 'ui.fullscreen_exit'){
            props.callback('ui.fullscreen_exit');
            return playerFullscreen.exit();
        }else if(action === 'ui.fullscreen_enter'){
            props.callback('ui.fullscreen_enter');
            return playerFullscreen.enter();
        }else if(action === 'ui.load_media_files'){
            return props.callback('ui.load_media_files')
        }else if(action === 'ui.hide'){
            return props.callback('ui.hide');
        }
    }

    return(
        <div style={{position: 'relative', paddingTop: '56.25%'}}>
            <FullScreen
                handle={playerFullscreen}
                onChange={(inFullscreen) => {
                    if(inFullscreen){
                        props.callback('player.update_player_state', {inFullscreen: true});
                        //props.callback('player.update_player_dimensions', {width: '100%', height: '100%'});
                    }else{
                        props.callback('player.update_player_state', {inFullscreen: false});
                        //props.callback('player.update_player_dimensions', {width: '60vw', height: '55vh'});
                    }
                }}
            >
                <VideoPlayer playerData={props.playerData} callback={handlePlayerActions}/>

                {playerData.uiShown?
                    <VideoPlayerUI playerData={props.playerData} itemData={props.itemData} callback={handlePlayerUICallback}/>
                    :
                    null
                }

            </FullScreen>
        </div>
    )
}