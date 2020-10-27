import React, {Component, useEffect, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router';

import {getAllItemsIds, getItemsData} from "../../src/lib/items";
import {getMediaItemsData, getMovieTranslations, getMovieData, getMediaItems} from "../../src/lib/media_quaries";

import {FullScreen, useFullScreenHandle} from "react-full-screen";
import ReactPlayer from "react-player";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";
import Layout from "../../src/components/layout";

import useSWR from 'swr';

export default function Item(props){
    const [itemData, setItemData] = useState(props.itemData)

    const playerFullscreen = useFullScreenHandle();
    const [inFullscreen, setFullScreen] = useState(false);
    const [isPlaying, setPlaying] = useState(false);

    const [playerDimensions, setPlayerDimensions] = useState({width: '56em', height: '31.5em'});

    const [uiShown, showUI] = useState(false);

    const [loadedURL, setURL] = useState(null);


    const loadMediaFiles = () => {

    }




    return(
        <div style={{display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh'}}>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%', height: '5em', minHeight: '3em', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 5px 5px #09161c'}}>
                <h1 style={{color: 'black', fontSize: '2em', fontWeight: 'bold'}}>{itemData.description?itemData.description.nameOriginal:null}</h1>
            </div>
            <span style={{color: 'black', fontSize: '.8em', fontWeight: 'bold'}}>{itemData.description?itemData.description.about:null}</span>

            <div
                style={{display: 'flex', flexShrink: 1, width: playerDimensions.width, height: playerDimensions.height}}
            >
                <FullScreen
                    handle={playerFullscreen}
                    onChange={(inFullscreen) => {
                        if(inFullscreen){
                            setFullScreen(true);
                            setPlayerDimensions({width: '100%', height: '100%'});
                        }else{
                            setFullScreen(false);
                            setPlayerDimensions({width: '56em', height: '31.5em'});
                        }
                    }}
                >
                    <ReactPlayer
                        url={loadedURL}
                        playing={isPlaying}
                        width={playerDimensions.width}
                        height={playerDimensions.height}
                        style={{position: 'absolute', backgroundColor: 'black'}}
                        onMouseEnter={() => {
                            console.log('Mouse Entered');
                            showUI(true);
                            setTimeout(() => {
                                showUI(false);
                            }, 3000);
                        }}
                    />
                    <div style={{position: 'absolute', display: uiShown?'flex':'none', padding: 10, flexDirection: 'column', width: playerDimensions.width, height: playerDimensions.height}}>
                        <div style={{display: 'flex', flex: 1, width: '100%', alignItems: 'flex-start'}}>
                            <span style={{color: 'red', fontWeight: 'bold'}}>Media Title</span>
                        </div>

                        <div style={{display: 'flex', flex: 4, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <FontAwesomeIcon
                                icon={['fas' , 'backward']}
                                style={{color: 'red', fontSize: '2em', margin: 50, cursor: 'pointer'}}
                                onClick={() => {

                                }}
                            />

                            <FontAwesomeIcon
                                icon={['fas' , isPlaying?'pause':'play']}
                                style={{color: 'red', fontSize: '2em', margin: 50, cursor: 'pointer'}}
                                onClick={() => {
                                    setPlaying(!isPlaying);
                                }}
                            />

                            <FontAwesomeIcon
                                icon={['fas' , 'forward']}
                                style={{color: 'red', fontSize: '2em', margin: 50, cursor: 'pointer'}}
                                onClick={() => {

                                }}
                            />
                        </div>

                        <div style={{display: 'flex', flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <FontAwesomeIcon
                                icon={['fas' , inFullscreen?'compress':'expand']}
                                style={{color: 'red', fontSize: '1em', margin: 10, cursor: 'pointer'}}
                                onClick={() => {
                                    if(inFullscreen){
                                        playerFullscreen.exit();
                                    }else{
                                        playerFullscreen.enter();
                                    }

                                    setFullScreen(!inFullscreen);
                                }}
                            />
                        </div>
                    </div>
                </FullScreen>
            </div>
        </div>
    )
}

export async function getStaticPaths(){

    let items = await getMediaItems('rezka.ag', 'series', '1', 'last', 'max');

    const paths = items.map((item, index) => {
        //console.log('Item: ' + JSON.stringify(item));
        return {
            params: {
                id: item.id,
            }
        }
    });

    return{
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps({params}){

    let items = await getMediaItems('rezka.ag', 'series', '1', 'last', 'max');
    let currentItem = items.find(x => x.id === params.id);

    await getMediaItemsData(currentItem.url).then(async (itemData) => {
        currentItem.description = {
            ...currentItem.description,
            ...itemData.description,
        };
    });

    return {
        props: {
            itemData: currentItem
        }
    }
}