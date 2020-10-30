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

    console.log('Translation Object: ' + JSON.stringify(currentItemTranslationObject));

    return(
        <div
            style={{display: 'flex', width: '8em', height: '2em', margin: 5, boxShadow: props.selectedTranslation === props.index?'0px 0px 5px gray inset':'5px 5px 5px gray', backgroundColor: props.selectedTranslation === props.index?'white':'black', borderRadius: 10, justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}
            onClick={() => {
                props.callback('translation.select', props.index);
            }}
        >
            <span style={{fontWeight: 'bold', fontSize: '1em', color: props.selectedTranslation === props.index?'black':'white'}}>{props.item.translationTitle}</span>
        </div>
    )
}