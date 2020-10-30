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

import VideoPlayer from "../../src/components/Player/VideoPlayer";

import MediaTranslationProvider from '../../src/components/MediaItems/MediaTranslation/MediaTranslationProvider';
import VideoPlayerProvider from "../../src/components/Player/VideoPlayerProvider";



export default class MediaItem extends Component{
    constructor(props) {
        super(props);

        this.state = {
            itemData: this.props.itemData,
            playerData: {
                inFullscreen: false,
                isPlaying: false,
                uiShown: false,
                loadedURL: null,
                isLoading: false,
                selectedTranslation: 0,

                playbackPosition: 0,
                playbackDuration:  0,
            }
        }
    }






    loadMediaFiles = () => {
        while(this.state.itemData.data.translations[this.state.playerData.selectedTranslation].mediaFiles === null){
            return this.loadMediaFiles();
        }

        let newPlayerData = {
            ...this.state.playerData,
            loadedURL: this.state.itemData.data.translations[this.state.playerData.selectedTranslation].mediaFiles.data[2].mediaUrl,
            isLoading: false,
            isPlaying: true,
        };

        return this.setState({
            playerData: newPlayerData
        });
    }

    mediaTranslationsProviderCallback = (action, data) => {
        if(action === 'translations.update_data'){
            this.setState({
                itemData: data
            })
        }else if(action === 'translations.select'){
            this.setState({
                selectedTranslation: data
            })
        }
    }

    playerCallback = (action, data) => {
        if(action === 'player.load'){
            return this.loadMediaFiles();
        }
    }





    render() {
        return(
            <Layout style={{display: 'flex', flexDirection: 'column'}} main={false}>
                <div style={{display: 'flex', flexDirection: 'row', width: '100vw', paddingTop: 50}}>
                    <div style={{display: 'flex', flexDirection: 'column', flex: 1, minHeight: '3em', justifyContent: 'center', alignItems: 'center'}}>
                        <h1 style={{color: 'black', fontSize: '2em', fontWeight: 'bold'}}>{this.state.itemData.description?this.state.itemData.description.nameOriginal:null}</h1>
                        <span style={{color: 'black', fontSize: '.8em', fontWeight: 'bold'}}>{this.state.itemData.description?this.state.itemData.description.subtext:null}</span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', flex: 1, minHeight: '3em', justifyContent: 'center', alignItems: 'center'}}>
                        <span style={{color: 'black', fontSize: '.8em', fontWeight: 'bold'}}>{this.state.itemData.description?this.state.itemData.description.about:null}</span>
                    </div>
                </div>

                <VideoPlayer itemData={this.state.itemData} playerData={this.state.playerData} callback={this.playerCallback}/>

                <MediaTranslationProvider callback={this.mediaTranslationsProviderCallback} data={this.state.itemData} selectedTranslation={this.state.playerData.selectedTranslation} />
            </Layout>
        )
    }
}

export async function getStaticPaths(){

    let items = await getMediaItems('rezka.ag', 'films', '1', 'last', 'max');

    const paths = items.map((item) => {
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