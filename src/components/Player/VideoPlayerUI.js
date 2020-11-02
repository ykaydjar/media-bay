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

export default class VideoPlayerUI extends Component{
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.props.playerData.uiShown === true){
            return true;
        }else{
            return false;
        }
    }

    render() {
        return(
            <div
                style={{position: 'absolute', display: this.props.playerData.uiShown?'flex':'none', padding: 10, flexDirection: 'column', width: this.props.playerDimensions.width, height: this.props.playerDimensions.height}}
            >
                <div style={{display: 'flex', flex: 1, width: '100%', alignItems: 'flex-start', flexDirection: 'column'}}>
                    <span style={{color: 'red', fontWeight: 'bold', fontSize: '1em'}}>{this.props.itemData.description.name}</span>
                    <span style={{color: 'red', fontWeight: 'bold', fontSize: '.8em'}}>{this.props.itemData.description.nameOriginal}</span>
                </div>

                <div style={{display: this.props.playerData.loadedURL === null?'flex':'none', flex: 4, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    {this.props.playerData.isLoading?
                        <Spinner
                            animation='border'
                            role='status'
                            variant='danger'
                        />
                        :
                        <FontAwesomeIcon
                            icon={['fas' , this.props.playerData.isPlaying?'pause':'play']}
                            style={{color: 'red', fontSize: '2em', margin: 50, cursor: 'pointer'}}
                            onClick={() => {
                                this.props.callback('ui.update_player_state', {isLoading: true});
                                this.props.callback('ui.load_media_files');
                            }}
                        />
                    }
                </div>

                <div style={{display: this.props.playerData.loadedURL === null?'none':'flex', flex: 4, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <FontAwesomeIcon
                        icon={['fas' , 'backward']}
                        style={{color: 'red', fontSize: '2em', margin: 50, cursor: 'pointer'}}
                        onClick={() => {

                        }}
                    />

                    {this.props.playerData.isLoading?
                        <Spinner animation='border' role='status'/>
                        :
                        <FontAwesomeIcon
                            icon={['fas' , this.props.playerData.isPlaying?'pause':'play']}
                            style={{color: 'red', fontSize: '2em', margin: 50, cursor: 'pointer'}}
                            onClick={() => {
                                this.props.callback('ui.update_player_state', {isPlaying: !this.props.playerData.isPlaying});
                            }}
                        />
                    }

                    <FontAwesomeIcon
                        icon={['fas' , 'forward']}
                        style={{color: 'red', fontSize: '2em', margin: 50, cursor: 'pointer'}}
                        onClick={() => {

                        }}
                    />
                </div>

                <div style={{display: 'flex', flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <ProgressBar
                        variant='danger'
                        now={this.props.playerData.playbackPosition}
                        max={this.props.playerData.playbackDuration}
                        style={{display: 'flex', flex: 1}}
                    />
                    <FontAwesomeIcon
                        icon={['fas' , this.props.playerData.inFullscreen?'compress':'expand']}
                        style={{color: 'red', fontSize: '1em', margin: 10, cursor: 'pointer'}}
                        onClick={() => {
                            if(this.props.playerData.inFullscreen){
                                return this.props.callback('ui.fullscreen_exit');
                            }else{
                                return this.props.callback('ui.fullscreen_enter');
                            }
                        }}
                    />
                </div>
            </div>
        )
    }

}