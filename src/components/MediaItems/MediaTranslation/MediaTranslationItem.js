import React, {Component, useEffect, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router';

import {getMediaItemsData, getMovieTranslations, getMovieData, getMediaItems} from "../../../lib/media_quaries";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";

import useSWR from 'swr';

export default function MediaTranslationItem(props){

    let currentItemTranslationObject = {
        ...props.item,
        mediaFiles: useSWR(`/api/movie_data/?itemID=${props.item.itemID}&translationID=${props.item.translationID}`),
    };
    
    props.callback('translation.data', {
        index: props.index,
        translationData: currentItemTranslationObject
    });

    //console.log('Translation Object: ' + JSON.stringify(currentItemTranslationObject));

    return(
        <div
            style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center", cursor: 'pointer'}}
        >
            <div
                style={{
                    display: 'flex',
                    width: 15,
                    height: 1,
                    backgroundColor: 'black',
                    marginRight: 5
                }}
            />

            <span
                style={{fontWeight: 'bold', fontSize: '1em', color: props.selectedTranslation === props.index?'red':'black'}}
                onClick={() => {
                    props.callback('translation.select', props.index);
                }}
            >
                {props.item.translationTitle}
            </span>

            <a href={currentItemTranslationObject.mediaFiles.data?`${currentItemTranslationObject.mediaFiles.data[currentItemTranslationObject.mediaFiles.data.length-1].mediaUrl}`:null}>
                <i
                    className='ci-download'
                    style={{color: 'black', fontSize: '1.2em', fontWeight: 'bold', margin: 5}}
                />
            </a>
        </div>
    )
}