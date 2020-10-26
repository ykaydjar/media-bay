import React, {Component, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router';
import Link from 'next/link';

export default class MediaMenu extends Component{
    constructor(props) {
        super(props);

        this.state = {
            currentTab: this.props.currentMediaMenuPage
        }
    }

    render() {
        return(
            <div className='media-menu' style={{display: 'flex', position: 'fixed', flexDirection: 'column', zIndex: 1, backgroundColor: 'white', paddingLeft: 20, width: '20vw', height: '100vh', justifyContent: 'center', alignItems: 'flex-start'}}>
                <div
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', cursor: 'pointer'}}
                    onClick={() => {
                        this.props.callback('media.set_tab', 'films')
                    }}
                >
                    <Link href={`/films/`}>
                        <a style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center',}}>
                            {this.state.currentTab === 'films'?
                                <i className='ci-chevron_duo_right' style={{fontSize: '1.5em', fontWeight: 'bold'}}/>
                                :
                                <i className='ci-chevron_right' style={{fontSize: '1.5em', fontWeight: 'bold'}}/>
                            }
                            <span style={{fontWeight: 'bold', fontSize: '1.2em', color: 'inherit'}}>FILMS</span>
                        </a>
                    </Link>
                </div>
                <div
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', cursor: 'pointer'}}
                    onClick={() => {
                        this.props.callback('media.set_tab', 'series')
                    }}
                >
                    <Link href={`/series/`}>
                        <a style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center',}}>
                            {this.state.currentTab === 'series'?
                                <i className='ci-chevron_duo_right' style={{fontSize: '1.5em', fontWeight: 'bold'}}/>
                                :
                                <i className='ci-chevron_right' style={{fontSize: '1.5em', fontWeight: 'bold'}}/>
                            }
                            <span style={{fontWeight: 'bold', fontSize: '1.2em', color: 'inherit'}}>SERIES</span>
                        </a>
                    </Link>
                </div>
                <div
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', cursor: 'pointer'}}
                    onClick={() => {
                        this.props.callback('media.set_tab', 'cartoons')
                    }}
                >
                    <Link href={`/cartoons/`}>
                        <a style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center',}}>
                            {this.state.currentTab === 'cartoons'?
                                <i className='ci-chevron_duo_right' style={{fontSize: '1.5em', fontWeight: 'bold'}}/>
                                :
                                <i className='ci-chevron_right' style={{fontSize: '1.5em', fontWeight: 'bold'}}/>
                            }
                            <span style={{fontWeight: 'bold', fontSize: '1.2em', color: 'inherit'}}>CARTOONS</span>
                        </a>
                    </Link>
                </div>
                <div
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', cursor: 'pointer'}}
                    onClick={() => {
                        this.props.callback('media.set_tab', 'animation')
                    }}
                >
                    <Link href={`/animation/`}>
                        <a style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center',}}>
                            {this.state.currentTab === 'animation'?
                                <i className='ci-chevron_duo_right' style={{fontSize: '1.5em', fontWeight: 'bold'}}/>
                                :
                                <i className='ci-chevron_right' style={{fontSize: '1.5em', fontWeight: 'bold'}}/>
                            }
                            <span style={{fontWeight: 'bold', fontSize: '1.2em', color: 'inherit'}}>ANIMATION</span>
                        </a>
                    </Link>
                </div>
            </div>
        )
    }

}