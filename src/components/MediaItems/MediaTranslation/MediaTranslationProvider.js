import React, {Component, useEffect, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router';

import {getMediaItemsData, getMovieTranslations, getMovieData, getMediaItems} from "../../../lib/media_quaries";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";

import useSWR from 'swr';

import MediaTranslationItem from './MediaTranslationItem';

export default class MediaTranslationProvider extends Component{
    constructor(props){
        super(props);

        this.state = {
            itemData: this.props.data,
            selectedTranslation: this.props.selectedTranslation,
        }
    }

    MediaTranslationCallback = (action, data) => {
        if(action === 'translation.select'){
            this.setState({
                selectedTranslation: data
            });
            this.props.callback('translations.select', data);
        }else if(action === 'translation.data'){
            let mediaData = {
                ...this.state.itemData,
            }
            mediaData.data.translations[data.index] = data.translationData
            this.props.callback('translations.update_data', mediaData);
        }
    }


    handleTranslationsDisplay = () => {
        if(this.state.itemData.data){
            return this.state.itemData.data.translations.map((item, index) => {
                return (
                    <MediaTranslationItem key={index} index={index} selectedTranslation={this.state.selectedTranslation} item={item} callback={this.MediaTranslationCallback}/>
                )
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.props.selectedTranslation !== nextProps.selectedTranslation){
            return true;
        }else{
            return false;
        }
    }

    render(){
        return(
            <div style={{display: 'flex', flexDirection: 'column',  marginTop: 10, paddingLeft: 10, marginBottom: 10}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <i
                        className='ci-list_minus'
                        style={{color: 'black', fontSize: '1.2em', fontWeight: 'bold', marginRight: 5}}
                        onClick={() => {

                        }}
                    />
                    <span style={{fontWeight: 'bold', fontSize: '1em', color: 'black'}}>Select Translation</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div
                        style={{
                            display: 'flex',
                            width: 2,
                            height: '100%',
                            backgroundColor: 'black',
                            //boxShadow: '5px 5px 5px gray',
                            borderRadius: 10,
                        }}
                    />
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {this.handleTranslationsDisplay()}
                    </div>
                </div>
            </div>
        )
    }
}