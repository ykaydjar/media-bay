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

import VideoPlayerUI from "./VideoPlayerUI";

export default function VideoPlayer(props){
    //console.log('Video Player Init');

    const playerFullscreen = useFullScreenHandle();

    const playerData = props.playerData;

    
    //make ReactPlayer to be a class component so we can use refs, and wrap it width VideoPlayer Component and Fullscreen Component so we can use fullscreen


    return(
        <div
            style={{display: 'flex', width: props.playerDimensions.width, height: props.playerDimensions.height}}
        >
            <FullScreen
                handle={playerFullscreen}
                onChange={(inFullscreen) => {
                    if(inFullscreen){
                        props.callback('player.update_player_state', {inFullscreen: true});
                        props.callback('player.update_player_dimensions', {width: '100%', height: '100%'});
                    }else{
                        props.callback('player.update_player_state', {inFullscreen: false});
                        props.callback('player.update_player_dimensions', {width: '60vw', height: '55vh'});
                    }
                }}
            >
                <ReactPlayer
                    url={playerData.loadedURL}
                    playing={playerData.isPlaying}
                    width={props.playerDimensions.width}
                    height={props.playerDimensions.height}
                    style={{position: 'absolute', backgroundColor: 'black'}}
                    onProgress={(progress) => {
                        props.callback('player.update_progress', {playbackPosition: progress.playedSeconds});
                    }}
                    onDuration={(duration) => {
                        props.callback('player.update_progress', {playbackDuration: duration});
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}

                    onMouseEnter={() => {
                        console.log('Mouse is over...');

                        props.callback('ui.show');

                        let uiTimeout = setTimeout(() => {
                            props.callback('ui.hide');
                        }, 5000);
                    }}
                    onTouchEnd={() => {
                        console.log('Oh, you touch my tralala...');

                        props.callback('ui.show');

                        let uiTimeout = setTimeout(() => {
                            props.callback('ui.hide');
                        }, 5000);
                    }}
                />
            </FullScreen>
        </div>
    )
}