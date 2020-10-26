import React, {Component, useEffect, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router';

import {getAllItemsIds, getItemsData} from "../../src/lib/items";
import {getMediaItemsData, getMovieTranslations, getMovieData} from "../../src/lib/media_quaries";
import {FullScreen, useFullScreenHandle} from "react-full-screen";
import ReactPlayer from "react-player";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getMediaItems} from "../api/get_media_items";

import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";
import Layout from "../../src/components/layout";



export default function Item(props){
    const [itemData, setItemData] = useState(props.itemData)

    const playerFullscreen = useFullScreenHandle();
    const [inFullscreen, setFullScreen] = useState(false);
    const [isPlaying, setPlaying] = useState(false);

    const [playerDimensions, setPlayerDimensions] = useState({width: '56em', height: '31.5em'});

    const [uiShown, showUI] = useState(false);

    const [loadedURL, setURL] = useState(null);

    const [playbackPosition, setPosition] = useState(0);
    const [playbackDuration, setDuration] = useState(0);

    const [isLoading, setLoading] = useState(false);

    const [selectedTranslation, selectTranslation] = useState(0);


    const loadMediaFiles = async() => {
        setURL(itemData.data.translations[0].mediaFiles[itemData.data.translations[0].mediaFiles.length-2].mediaUrl);
        setPlaying(true);
        setLoading(false);
    }



    const handleTranslationsDisplay = () => {
        if(itemData.data){
            return itemData.data.translations.map((item, index) => {
                return (
                    <div
                        style={{display: 'flex', width: '8em', height: '2em', margin: 5, boxShadow: selectedTranslation === index?'0px 0px 5px gray inset':'5px 5px 5px gray', backgroundColor: selectedTranslation === index?'white':'black', borderRadius: 10, justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}
                        onClick={() => {
                            selectTranslation(index);
                        }}
                    >
                        <span style={{fontWeight: 'bold', fontSize: '1em', color: selectedTranslation === index?'black':'white'}}>{itemData.data.translations[0].translationTitle}</span>
                    </div>
                )
            })
        }
    }





    return(
        <Layout style={{display: 'flex', flexDirection: 'column'}} main={false}>
            <div style={{display: 'flex', flexDirection: 'row', width: '100vw', paddingTop: 50}}>
                <div style={{display: 'flex', flexDirection: 'column', flex: 1, minHeight: '3em', justifyContent: 'center', alignItems: 'center'}}>
                    <h1 style={{color: 'black', fontSize: '2em', fontWeight: 'bold'}}>{itemData.description?itemData.description.nameOriginal:null}</h1>
                    <span style={{color: 'black', fontSize: '.8em', fontWeight: 'bold'}}>{itemData.description?itemData.description.subtext:null}</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', flex: 1, minHeight: '3em', justifyContent: 'center', alignItems: 'center'}}>
                    <span style={{color: 'black', fontSize: '.8em', fontWeight: 'bold'}}>{itemData.description?itemData.description.about:null}</span>
                </div>
            </div>

            <div
                style={{display: 'flex', width: playerDimensions.width, height: playerDimensions.height}}
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
                        onProgress={(progress) => {
                            setPosition(progress.playedSeconds);
                        }}
                        onDuration={(duration) => {
                            setDuration(duration);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onMouseEnter={() => {
                            console.log('Mouse Entered');
                            showUI(true);
                            setTimeout(() => {
                                showUI(false);
                            }, 3000);
                        }}
                    />
                    <div style={{position: 'absolute', display: uiShown?'flex':'none', padding: 10, flexDirection: 'column', width: playerDimensions.width, height: playerDimensions.height}}>
                        <div style={{display: 'flex', flex: 1, width: '100%', alignItems: 'flex-start', flexDirection: 'column'}}>
                            <span style={{color: 'red', fontWeight: 'bold', fontSize: '1em'}}>{itemData.description.name}</span>
                            <span style={{color: 'red', fontWeight: 'bold', fontSize: '.8em'}}>{itemData.description.nameOriginal}</span>
                        </div>

                        <div style={{display: loadedURL === null?'flex':'none', flex: 4, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            {isLoading?
                                <Spinner
                                    animation='border'
                                    role='status'
                                    variant='danger'
                                />
                                :
                                <FontAwesomeIcon
                                    icon={['fas' , isPlaying?'pause':'play']}
                                    style={{color: 'red', fontSize: '2em', margin: 50, cursor: 'pointer'}}
                                    onClick={() => {
                                        setLoading(true);
                                        loadMediaFiles();
                                    }}
                                />
                            }
                        </div>

                        <div style={{display: loadedURL === null?'none':'flex', flex: 4, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <FontAwesomeIcon
                                icon={['fas' , 'backward']}
                                style={{color: 'red', fontSize: '2em', margin: 50, cursor: 'pointer'}}
                                onClick={() => {

                                }}
                            />

                            {isLoading?
                                <Spinner animation='border' role='status'/>
                                :
                                <FontAwesomeIcon
                                    icon={['fas' , isPlaying?'pause':'play']}
                                    style={{color: 'red', fontSize: '2em', margin: 50, cursor: 'pointer'}}
                                    onClick={() => {
                                        setPlaying(!isPlaying);
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
                                now={playbackPosition}
                                max={playbackDuration}
                                style={{display: 'flex', flex: 1}}
                            />
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

            <div style={{display: 'flex', width: playerDimensions.width, height: playerDimensions.height, marginTop: 10}}>
                {handleTranslationsDisplay()}
            </div>
        </Layout>
    )
}

export async function getStaticPaths(){

    let items = await getMediaItems('rezka.ag', 'films', '1', 'last', 'max');

    const paths = items.map((item, index) => {
        //console.log('Item: ' + JSON.stringify(item));
        return {
            params: {
                id: item.id,
            }
        }
    });

    console.log('Paths: ' + JSON.stringify(paths));

    return{
        paths: paths,
        fallback: false
    }
}

export async function getServerSideProps({params}){

    let items = await getMediaItems('rezka.ag', 'films', '1', 'last', 'max');
    let currentItem = items.find(x => x.id === params.id);

    await getMediaItemsData(currentItem).then(async (itemData) => {
        await getMovieTranslations(itemData).then(async(itemTranslations) => {
            currentItem = itemTranslations;
            console.log('Current Item after fetch: ' + JSON.stringify(currentItem));
            await getMovieData(itemTranslations.data.translations[0]).then((response) => {
                console.log(JSON.stringify(response));
            })
        })
    });


    console.log('Current Item: ' + JSON.stringify(currentItem));

    return {
        props: {
            itemData: currentItem
        }
    }
}