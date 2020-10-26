import React, {Component, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router';
import Link from 'next/link';

export default class MediaFeedItem extends Component{
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
            link: this.props.link
        }
    }

    render() {
        return(
            <div style={{display: 'flex', width: '8em', height: '12em', borderRadius: 5, margin: 10, overflow: 'hidden', boxShadow: '5px 5px 5px #09161c', cursor: 'pointer'}}>
                <Link href={this.state.link}>
                    <a>
                        <img src={this.props.data.poster} style={{width: '100%', height: '100%', overflow: 'hidden'}}/>
                    </a>
                </Link>
            </div>
        )
    }

}