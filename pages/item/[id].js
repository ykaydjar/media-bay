import React, {Component, useEffect, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router';

import {getAllItemsIds, getItemsData, getMovieTranslations, getMovieData} from "../../src/lib/items";
import {getMediaItemsData} from "../api/get_media_items_data";
import {FullScreen, useFullScreenHandle} from "react-full-screen";
import ReactPlayer from "react-player";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default function Item(props){
    const [itemData, setItemData] = useState(props.itemData)

    const playerFullscreen = useFullScreenHandle();
    const [inFullscreen, setFullScreen] = useState(false);
    const [isPlaying, setPlaying] = useState(true);

    const [playerDimensions, setPlayerDimensions] = useState({width: '56em', height: '31.5em'});

    const [uiShown, showUI] = useState(false);

    const [loadedURL, setURL] = useState(null);





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
                        url={itemData.data.translations[0].mediaFiles[3].mediaUrl}
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
                    <div style={{position: 'absolute', display: uiShown?'flex':'none', flexDirection: 'column', width: playerDimensions.width, height: playerDimensions.height}}>
                        <div style={{display: 'flex', flex: 1, width: '100%', alignItems: 'flex-start'}}>
                            <span style={{color: 'red', fontWeight: 'bold'}}>Media Title</span>
                        </div>

                        <div style={{display: 'flex', flex: 4, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <FontAwesomeIcon
                                icon={['fas' , 'backward']}
                                style={{color: 'red', fontSize: '2em', margin: 30, cursor: 'pointer'}}
                                onClick={() => {

                                }}
                            />

                            <FontAwesomeIcon
                                icon={['fas' , isPlaying?'pause':'play']}
                                style={{color: 'red', fontSize: '2em', margin: 30, cursor: 'pointer'}}
                                onClick={() => {
                                    setPlaying(!isPlaying);
                                }}
                            />

                            <FontAwesomeIcon
                                icon={['fas' , 'forward']}
                                style={{color: 'red', fontSize: '2em', margin: 30, cursor: 'pointer'}}
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
    const paths = await getAllItemsIds();
    console.log('Paths: ' + JSON.stringify(paths));
    return{
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps({params}){

    console.log('Get Static Props.params: ' + JSON.stringify(params));

    const itemData = await getItemsData(params.id);
    console.log('Get Static Props: ' + JSON.stringify(itemData));
    return {
        props: {
            itemData: itemData
        }
    }
}