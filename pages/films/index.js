import React, {Component, useEffect, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router';
import Layout from "../../src/components/layout";
import {getMediaItems} from "../../src/lib/media_quaries";
import TweenOne from "rc-tween-one";
import MediaFeedItem from "../../src/components/MediaItems/MediaFeedItem";

export default class Films extends Component{
    constructor(props) {
        super(props);

        const topBlockInAnim = {
            x: '0vw',
            opacity: 1,
            duration: 1000
        }

        const leftBlockInAnim = {
            x: '0vw',
            opacity: 1,
            duration: 1000
        }

        const bottomBlockInAnim = {
            y: '0vh',
            opacity: 1,
            duration: 1000
        }

        this.state = {
            mediaItems: this.props.mediaItems,

            currentTopBlockAnim: topBlockInAnim,
            currentLeftBlockAnim: leftBlockInAnim,
            currentBottomBlockAnim: bottomBlockInAnim,

            animPaused: false,

            zkBoxShadow: null,
            hdBoxShadow: null,
        }
    }

    render() {
        return(
            <Layout style={{display: 'flex', flexDirection: 'column', width: '100vw'}} main={true}>
                <Head>
                    <meta name="bm-site-verification" content="5jEbluSa1C5uta6aF_Bi3vjhrFRaAtBYZ7w9E6yD" />
                    <title>MediaBay / FILMS</title>
                    <link rel='icon' href='/hdrezka_logo.png'/>
                </Head>

                <div style={{display: this.state.menuShown?'none':'flex', zIndex: 0, flexDirection: 'row', width: '80vw', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', minWidth: 360, marginLeft: '20vw', paddingTop: 50, paddingBottom: 10,}}>
                    {this.props.mediaItems?this.props.mediaItems.map((item, index) =>
                        <MediaFeedItem key={index} data={item} link={`/films/${item.id}`}/>
                    ):null}
                </div>
            </Layout>
        )
    }

}

export async function getServerSideProps(context){
    const data = await getMediaItems('rezka.ag', 'films', '1', 'last', 'max');

    return {
        props: {
            mediaItems: data,
        }
    }
}