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

export default class VideoPlayer extends Component{
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <ReactPlayer
                className='react-player'
                url={this.props.playerData.loadedURL}
                playing={this.props.playerData.isPlaying}
                style={{position: 'absolute', top: 0, left: 0, backgroundColor: 'black'}}
                width='100%'
                height='100%'
                onProgress={(progress) => {
                    this.props.callback('player.update_progress', {playbackPosition: progress.playedSeconds});
                }}
                onDuration={(duration) => {
                    this.props.callback('player.update_progress', {playbackDuration: duration});
                }}
                onError={(error) => {
                    console.log(error);
                }}

                onMouseOver={() => {
                    this.props.callback('ui.show');
                }}
                onTouchEnd={() => {
                    this.props.callback('ui.show');
                }}
            />
        )
    }

}