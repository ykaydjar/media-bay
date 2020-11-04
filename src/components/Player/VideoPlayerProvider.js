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

import VideoPlayerLayout from "./VideoPlayerLayout";




export default class VideoPlayerProvider extends Component{
    constructor(props) {
        super(props);

        this.state = {
            itemData: this.props.itemData,
            playerData: {
                inFullscreen: false,
                isPlaying: false,
                uiShown: false,
                loadedURL: null,
                isLoading: false,

                playbackPosition: 0,
                playbackDuration:  0,
            },

            playerDimensions: {
                width: '60vw',
                height: '55vh'
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.props.itemData !== nextProps.itemData){
            return true;
        }else if(this.state.playerData !== nextState.playerData){
            return true
        }else{
            return false;
        }
    }

    handlePlayerLayoutActions = (action, data) => {
        if(action === 'ui.show'){
            let newPlayerData = {
                ...this.state.playerData,
                uiShown: true,
            };
            this.setState({
                playerData: newPlayerData
            })
        }else if(action === 'ui.hide'){
            let newPlayerData = {
                ...this.state.playerData,
                uiShown: false,
            };
            this.setState({
                playerData: newPlayerData
            })
        }else if(action === 'player.update_player_state'){
            let newPlayerData = {
                ...this.state.playerData,
                ...data
            };
            this.setState({
                playerData: newPlayerData
            })
        }else if(action === 'player.update_progress'){
            let newPlayerData = {
                ...this.state.playerData,
                ...data
            };
            this.setState({
                playerData: newPlayerData
            })
        }else if(action === 'ui.update_player_state'){
            let newPlayerData = {
                ...this.state.playerData,
                ...data
            };
            this.setState({
                playerData: newPlayerData
            })
        }else if(action === 'ui.fullscreen_exit'){
            let newPlayerData = {
                ...this.state.playerData,
                inFullscreen: false,
            };
            this.setState({
                playerData: newPlayerData
            })
        }else if(action === 'ui.fullscreen_enter'){
            let newPlayerData = {
                ...this.state.playerData,
                inFullscreen: true
            };
            this.setState({
                playerData: newPlayerData
            });
        }else if(action === 'ui.load_media_files'){
            let newPlayerData = {
                ...this.state.playerData,
                loadedURL: this.state.itemData.data.translations[this.props.selectedTranslation].mediaFiles.data[2].mediaUrl,
                isPlaying: true,
                isLoading: false,
            }
            this.setState({
                playerData: newPlayerData
            })
        }
    }


    render() {
        return(
            <div
                style={{
                    width: '98%',
                    height: '95%',
                    //backgroundColor: 'black',
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    overflow: 'hidden'
                }}
            >
                <VideoPlayerLayout itemData={this.state.itemData} playerData={this.state.playerData} callback={this.handlePlayerLayoutActions}/>
            </div>
        )
    }
}