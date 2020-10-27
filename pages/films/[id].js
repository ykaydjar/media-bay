import React, {Component, useEffect, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router';

import {getMediaItemsData, getMovieTranslations, getMovieData, getMediaItems} from "../../src/lib/media_quaries";

import {FullScreen, useFullScreenHandle} from "react-full-screen";
import ReactPlayer from "react-player";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";
import Layout from "../../src/components/layout";

import useSWR from 'swr';



export default function Item(props){

    const [itemData, setItemData] = useState(props.itemData);

    const [playerData, setPlayerData] = useState({
        inFullscreen: false,
        isPlaying: false,
        uiShown: false,
        loadedURL: null,
        isLoading: false,
    })

    const playerFullscreen = useFullScreenHandle();

    const [playerDimensions, setPlayerDimensions] = useState({width: '56em', height: '31.5em'});


    const [playbackPosition, setPosition] = useState(0);
    const [playbackDuration, setDuration] = useState(0);


    const [selectedTranslation, selectTranslation] = useState(0);


    let currentItemTranslationObject = {
        ...itemData.data.translations[selectedTranslation]
    };
    if(playerData.isLoading === false){
        currentItemTranslationObject.mediaFiles = useSWR(`/api/movie_data/?itemID=${itemData.id}&translationID=${currentItemTranslationObject.translationID}`);
    }
    console.log(JSON.stringify(currentItemTranslationObject));

    const loadMediaFiles = () => {
        let newPlayerData = {
            ...playerData,
            loadedURL: currentItemTranslationObject.mediaFiles.data[2].mediaUrl,
            isLoading: false,
            isPlaying: true,
        };

        setPlayerData(newPlayerData);
    }



    const handleTranslationsDisplay = () => {
        if(itemData.data){
            return itemData.data.translations.map((item, index) => {
                return (
                    <div
                        key={index}
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
                            let newPlayerData = {
                                ...playerData,
                                inFullscreen: true
                            };
                            setPlayerData(newPlayerData);
                            setPlayerDimensions({width: '100%', height: '100%'});
                        }else{
                            let newPlayerData = {
                                ...playerData,
                                inFullscreen: false
                            };
                            setPlayerData(newPlayerData);
                            setPlayerDimensions({width: '56em', height: '31.5em'});
                        }
                    }}
                >
                    <ReactPlayer
                        url={playerData.loadedURL}
                        playing={playerData.isPlaying}
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
                            let newPlayerData = {
                                ...playerData,
                                uiShown: true
                            };
                            setPlayerData(newPlayerData);

                            setTimeout(() => {
                                let newPlayerData = {
                                    ...playerData,
                                    uiShown: false
                                };
                                setPlayerData(newPlayerData);
                            }, 3000);
                        }}
                    />
                    <div style={{position: 'absolute', display: playerData.uiShown?'flex':'none', padding: 10, flexDirection: 'column', width: playerDimensions.width, height: playerDimensions.height}}>
                        <div style={{display: 'flex', flex: 1, width: '100%', alignItems: 'flex-start', flexDirection: 'column'}}>
                            <span style={{color: 'red', fontWeight: 'bold', fontSize: '1em'}}>{itemData.description.name}</span>
                            <span style={{color: 'red', fontWeight: 'bold', fontSize: '.8em'}}>{itemData.description.nameOriginal}</span>
                        </div>

                        <div style={{display: playerData.loadedURL === null?'flex':'none', flex: 4, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            {playerData.isLoading?
                                <Spinner
                                    animation='border'
                                    role='status'
                                    variant='danger'
                                />
                                :
                                <FontAwesomeIcon
                                    icon={['fas' , playerData.isPlaying?'pause':'play']}
                                    style={{color: 'red', fontSize: '2em', margin: 50, cursor: 'pointer'}}
                                    onClick={() => {
                                        let newPlayerData = {
                                            ...playerData,
                                            isLoading: true
                                        };
                                        setPlayerData(newPlayerData);

                                        loadMediaFiles();
                                    }}
                                />
                            }
                        </div>

                        <div style={{display: playerData.loadedURL === null?'none':'flex', flex: 4, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <FontAwesomeIcon
                                icon={['fas' , 'backward']}
                                style={{color: 'red', fontSize: '2em', margin: 50, cursor: 'pointer'}}
                                onClick={() => {

                                }}
                            />

                            {playerData.isLoading?
                                <Spinner animation='border' role='status'/>
                                :
                                <FontAwesomeIcon
                                    icon={['fas' , playerData.isPlaying?'pause':'play']}
                                    style={{color: 'red', fontSize: '2em', margin: 50, cursor: 'pointer'}}
                                    onClick={() => {
                                        let newPlayerData = {
                                            ...playerData,
                                            isPlaying: !playerData.isPlaying
                                        };
                                        setPlayerData(newPlayerData);
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
                                icon={['fas' , playerData.inFullscreen?'compress':'expand']}
                                style={{color: 'red', fontSize: '1em', margin: 10, cursor: 'pointer'}}
                                onClick={() => {
                                    if(playerData.inFullscreen){
                                        playerFullscreen.exit();
                                    }else{
                                        playerFullscreen.enter();
                                    }

                                    let newPlayerData = {
                                        ...playerData,
                                        inFullscreen: !playerData.inFullscreen
                                    };
                                    setPlayerData(newPlayerData);
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

export async function getStaticProps({params}){

    let items = await getMediaItems('rezka.ag', 'films', '1', 'last', 'max');
    let currentItem = items.find(x => x.id === params.id);

    await getMediaItemsData(currentItem).then(async (itemData) => {
        await getMovieTranslations(itemData).then(async(itemTranslations) => {
            currentItem = itemTranslations;
            console.log('Current Item after fetch: ' + JSON.stringify(currentItem));
        })
    });


    console.log('Current Item: ' + JSON.stringify(currentItem));

    return {
        props: {
            itemData: currentItem
        }
    }
}