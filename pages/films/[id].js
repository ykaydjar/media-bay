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


import MediaTranslationProvider from '../../src/components/MediaItems/MediaTranslation/MediaTranslationProvider';
import VideoPlayerProvider from "../../src/components/Player/VideoPlayerProvider";
import MediaImage from "../../src/components/MediaPageComponents/MediaImage";




export default class MediaItem extends Component{
    constructor(props) {
        super(props);

        this.state = {
            itemData: this.props.itemData,
            selectedTranslation: 0,

            isLoading: false,
        }
    }





/*
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

 */

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
            //return this.loadMediaFiles();
        }
    }





    render() {
        return(
            <Layout style={{display: 'flex', flexDirection: 'column', flex: 1}} main={false}>
                <div style={{display: 'flex', flexDirection: 'row-reverse', flex: 1, height: 'auto', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: 80, marginBottom: 20}}>
                    <MediaImage url={this.state.itemData.url} posterDefault={this.state.itemData.poster}/>
                    <div style={{display: 'flex', flexDirection: 'column', flex: 1, height: '25em', minWidth: 360, justifyContent: 'center', alignItems: 'center'}}>
                        <div style={{display: 'flex', flexDirection: 'column', width: '50%', height: 'auto', justifyContent: 'center', alignItems: 'center'}}>
                            <h1 style={{color: 'black', fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center', textShadow: '5px 5px 5px gray'}}>{this.state.itemData.description?this.state.itemData.description.name:null}</h1>
                            <span style={{color: 'black', fontSize: '1em', fontWeight: 'bold', textAlign: 'center'}}>{this.state.itemData.description?this.state.itemData.description.nameOriginal:null}</span>
                            <span style={{color: 'black', fontSize: '.8em', fontWeight: 'bold', textAlign: 'center'}}>{this.state.itemData.description?this.state.itemData.description.subtext:null}</span>
                        </div>
                        <span style={{color: 'black', marginTop: 20, fontSize: '.9em', fontWeight: 'bold', textAlign: 'center'}}>{this.state.itemData.description?this.state.itemData.description.about:null}</span>
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        marginTop: 20,
                        marginBottom: 20
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flex: 1.3,
                            height: '30em',
                            minWidth: 360,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            flexGrow: 1,
                            width: '98%',
                            height: '95%',
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                            boxShadow: '0px 0px 5px gray inset',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}>
                            <VideoPlayerProvider itemData={this.state.itemData} selectedTranslation={this.state.selectedTranslation} callback={this.playerCallback}/>
                        </div>
                        <MediaTranslationProvider callback={this.mediaTranslationsProviderCallback} data={this.state.itemData} selectedTranslation={this.state.selectedTranslation} />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', flex: .7, height: '30em', minWidth: 360, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <div style={{display: 'flex', width: '80%', height: '10em',  borderRadius: 10, boxShadow: '0px 0px 2px 0px black inset', margin: 5}}/>
                        <div style={{display: 'flex', width: '80%', height: '10em', borderRadius: 10, boxShadow: '0px 0px 2px 0px black inset', margin: 5}}/>
                        <div style={{display: 'flex', width: '80%', height: '10em', borderRadius: 10, boxShadow: '0px 0px 2px 0px black inset', margin: 5}}/>
                    </div>
                </div>
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