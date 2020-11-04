import React, {Component, useEffect, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router';

import {getMediaItemsData, getMovieTranslations, getMovieData, getMediaItems} from "../../lib/media_quaries";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";

import useSWR from 'swr';

export default function MediaImage(props){
    let posterData = {
        poster: props.posterDefault
    }

    let posterResponse = useSWR(`/api/get_poster_hd/?url=${props.url}`);
    console.log('POSTER RESPONSE: ' + JSON.stringify(posterResponse));
    posterResponse.data?posterData.poster = posterResponse.data.posterHD:null;

    return(
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                flex: 1,
                height: '25em',
                minWidth: 360,
                justifyContent: 'flex-end',
                alignItems: 'center',
                boxShadow: '0px 0px 5px gray inset'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    width: '98%',
                    height: '95%',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    backgroundImage: `url(${posterData.poster})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                    <div style={{display: 'flex', flexDirection: 'row', width: '100%', height: 'auto', alignItems: 'center', cursor: 'pointer',}}>
                        <i
                            className='ci-play_circle_outline'
                            style={{color: 'white', fontSize: '2.5em', fontWeight: 'normal', margin: 5, mixBlendMode: 'difference'}}
                            onClick={() => {

                            }}
                        />
                        <span style={{fontWeight: 'bold', fontSize: '1em', mixBlendMode: 'difference', color: "white"}}>Watch Trailer</span>
                    </div>
                </div>
            </div>
        </div>
    )
}