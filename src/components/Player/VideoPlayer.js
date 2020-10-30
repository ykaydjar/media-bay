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

    const [playerData, setPlayerData] = useState(props.playerData);


    const [playerDimensions, setPlayerDimensions] = useState({width: '70vw', height: '55vh'});


    const playerUICallback = (action, data) => {
        if(action === 'ui.update_player_state'){
            let newPlayerData = {
                ...playerData,
                ...data
            };
            setPlayerData(newPlayerData);
        }else if(action === 'ui.load_media_files'){
            props.callback('player.load');
        }else if(action === 'ui.fullscreen_exit'){
            let newPlayerData = {
                ...playerData,
                inFullscreen: false,
            };
            setPlayerData(newPlayerData);
            playerFullscreen.exit();
        }else if(action === 'ui.fullscreen_enter'){
            let newPlayerData = {
                ...playerData,
                inFullscreen: true
            };
            setPlayerData(newPlayerData);

            playerFullscreen.enter();
        }
    }
    



    return(
        <div
            style={{display: 'flex', width: playerDimensions.width, height: playerDimensions.height}}
        >
            <FullScreen
                handle={playerFullscreen}
                onChange={(inFullscreen) => {
                    if(inFullscreen){
                        let newPlayerData = {
                            ...playerData,
                            inFullscreen: true
                        };
                        setPlayerData(newPlayerData);
                        setPlayerDimensions({width: '100%', height: '100%'});
                    }else{
                        let newPlayerData = {
                            ...playerData,
                            inFullscreen: false
                        };
                        setPlayerData(newPlayerData);
                        setPlayerDimensions({width: '70vw', height: '55vh'});
                    }
                }}
            >
                <ReactPlayer
                    url={playerData.loadedURL}
                    playing={playerData.isPlaying}
                    width={playerDimensions.width}
                    height={playerDimensions.height}
                    style={{position: 'absolute', backgroundColor: 'black'}}
                    onProgress={(progress) => {
                        let newPlayerData = {
                            ...playerData,
                            playbackPosition: progress.playedSeconds
                        }
                        setPlayerData(newPlayerData);
                    }}
                    onDuration={(duration) => {
                        let newPlayerData = {
                            ...playerData,
                            playbackDuration: duration
                        }
                        setPlayerData(newPlayerData);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onMouseEnter={() => {
                        console.log('Mouse Entered');
                        let newPlayerData = {
                            ...playerData,
                            uiShown: true
                        };
                        setPlayerData(newPlayerData);

                        setTimeout(() => {
                            let newPlayerData = {
                                ...playerData,
                                uiShown: false
                            };
                            setPlayerData(newPlayerData);
                        }, 3000);
                    }}
                />

                <VideoPlayerUI playerData={playerData} itemData={props.itemData} playerDimensions={playerDimensions} callback={playerUICallback}/>
            </FullScreen>
        </div>
    )
}