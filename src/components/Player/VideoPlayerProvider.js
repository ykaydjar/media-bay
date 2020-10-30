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


export default class VideoPlayerProvider extends Component{
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

    }

    render() {
        return(
            <div>
                <VideoPlayer/>
            </div>
        )
    }
}