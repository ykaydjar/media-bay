import React, {Component, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router';

import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button'
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/DropdownItem";
import Nav from "react-bootstrap/Nav";
import Toast from 'react-bootstrap/Toast';

import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../src/components/Header/Header';
import Footer from '../src/components/Footer/Footer';
import Menu from '../src/components/Menu/Menu';
import AuthMenu from "../src/components/AuthMenu/AuthMenu";
import {auth} from "../config/fire-config";


export default function Home(){

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

    const [currentTopBlockAnim, setTopBlockAnim] = useState(topBlockInAnim);
    const [currentLeftBlockAnim, setLeftBlockAnim] = useState(leftBlockInAnim);
    const [currentBottomBlockAnim, setBottomBlockAnim] = useState(bottomBlockInAnim);

    const [zkBoxShadow, setZkBoxShadow] = useState(null);
    const [hdBoxShadow, setHdBoxShadow] = useState(null);

    const [menuShown, showMenu] = useState(false);
    const [currentMenuPage, setMenuPage] = useState('main');
    const [authShown, showAuth] = useState(false);

    const [animPaused, setAnimPause] = useState(false);

    const router = useRouter();
    console.log(JSON.stringify(router));

    const menuCallback = (action, data) => {
        console.log('Menu Callback: ' + action);
        if(action === 'menu.close'){
            showMenu(false);
        }else if(action === 'menu.goAuth'){
            setMenuPage('auth');
        }
    }

    const headerCallback = (action, data) => {
        console.log('Header Callback: ' + action);

        if(action === 'menu.open'){
            setMenuPage('main');
            showMenu(true);
        }else if(action === 'auth.open'){
            setMenuPage('auth');
            showMenu(true);
        }
    }

    const authMenuCallback = (action, data) => {

    }

    const handleMenuDisplay = () => {
        if(menuShown){
            return <Menu menuPage={currentMenuPage} callback={menuCallback}/>
        }else{
            return null;
        }
    }



    return(
        <div style={{display: 'flex', flexDirection: 'column', width: '100vw',}}>

            <Header callback={headerCallback}/>

            <div style={{width: '100%', height: '85%', minWidth: 360, display: menuShown?'none':'flex',  flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'column',  marginBottom: 30, overflowX: 'hidden'}}>
                <TweenOne
                    key='left-block'
                    style={{display: menuShown?'none':'flex', paddingTop: 10, paddingBottom: 10, transform: 'translateX(-100vw)', boxShadow: zkBoxShadow, minWidth: 360, opacity: 0, width: '80em',  height: '38em', flexDirection: 'column', overflowX: 'hidden', justifyContent: 'center', alignItems: 'center'}}
                    animation={currentLeftBlockAnim}
                    paused={animPaused}
                    onMouseEnter={() => {

                    }}
                    onMouseLeave={() => {
                        setZkBoxShadow(null);
                    }}
                >
                    <img src={'/mediaPosters/bigboard.jpg'} style={{width: '100%', height: '100%', overflow: 'hidden'}}/>

                </TweenOne>

                <div
                    style={{display: 'flex', width: '100%', height: '8em', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}
                >
                    <img src={'hdrezka_logo.png'} style={{display: 'flex', width: '5em', height: '5em', borderRadius: 100, boxShadow: '0px 0px 5px grey inset', filter: 'drop-shadow(0px 0px 5px #4444dd)'}}/>

                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 10, padding: 5,}}>
                        <a style={{fontWeight: 'bold', color: 'black', fontSize: '.9em', textAlign: 'center'}}>REZKA MOBILE</a>
                    </div>
                </div>

                <div style={{display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'column', width: '65%', justifyContent: 'center', alignItems: 'center'}}>
                        <span style={{textAlign: 'center', color: '#221f1f', fontSize: '.8em', fontStyle: 'italic'}}>Чем себя занять после тяжелых трудовых будней? Повседневная жизнь предлагает массу вариантов, но практически каждый человек на нашей планете любит просматривать любимые кинокартины. Теперь удобный и уникальный в своем роде кинотеатр для просмотра видео в комфортных для тебя условиях доступен и на телефоне!</span>

                        <div style={{display: 'flex', width: '50%', margin: 10, justifyContent: 'center', alignItems: 'center', borderTopWidth: '.15em', borderTopColor: '#b81d24', borderTopStyle: 'solid'}}/>

                        <span style={{textAlign: 'center', color: '#b81d24', fontSize: '.9em', fontWeight: 'bold'}}>Предлагаем тебе прямо сейчас погрузиться в удивительно увлекательный мир - новинки кинопроката доступны всем пользователям круглосуточно!</span>
                    </div>
                </div>


                <TweenOne
                    style={{display: menuShown ?'none':'flex', transform: 'translateX(100vw)', boxShadow: hdBoxShadow, minWidth: 360, opacity: 0, flexDirection: 'column', width: '100%', height: 'auto', alignItems: 'center', justifyContent: 'center', overflowX: 'hidden'}}
                    animation={currentTopBlockAnim}
                    paused={animPaused}
                    onMouseEnter={() => {

                    }}
                    onMouseLeave={() => {
                        setHdBoxShadow(null);
                    }}
                >
                    <div style={{display: 'flex', flex: 1, flexWrap: 'wrap', flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <div style={{display: 'flex', width: '50%', padding: 5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>

                            <div style={{display: 'flex', width: '85%', margin: 10, justifyContent: 'center', alignItems: 'center', borderTopWidth: '.1em', borderTopColor: '#b81d24', borderTopStyle: 'solid'}}/>

                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <div style={{display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                    <FontAwesomeIcon
                                        icon={['fas' , 'exclamation-triangle']}
                                        style={{color: '#b81d24', fontSize: '.8em', margin: 5}}
                                        onClick={() => {

                                        }}
                                        onMouseEnter={() => {

                                        }}
                                        onMouseLeave={() => {

                                        }}
                                    />

                                    <span style={{color: '#b81d24', fontSize: '.65em' , textAlign: 'left', fontStyle: 'italic'}}>Данное програмное обеспечение создано для ознакомительных целей. Автор не поддерживает пиратство.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{display: 'flex', flex: 1, flexDirection: 'column', width: '100%', marginTop: 10, justifyContent: 'flex-start', alignItems: 'flex-start', overflowX: 'hidden'}}>

                    </div>
                </TweenOne>

                <TweenOne
                    style={{display: menuShown ?'none':'flex', paddingTop: 10, paddingBottom: 10, transform: 'translateX(100vw)', boxShadow: hdBoxShadow, minWidth: 360, opacity: 0, flexDirection: 'column', width: '100%', height: 'auto', alignItems: 'center', justifyContent: 'center', overflowX: 'hidden'}}
                    animation={currentTopBlockAnim}
                    paused={animPaused}
                    onMouseEnter={() => {

                    }}
                    onMouseLeave={() => {
                        setHdBoxShadow(null);
                    }}
                >
                    <div style={{display: 'flex', width: '50%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                        <div style={{display: 'flex', width: '100%', flexShrink: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 5}}>
                            <div style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <span style={{color: '#8ab312', fontSize: '.65em' , textAlign: 'left', fontStyle: 'italic'}}>Уже доступно</span>

                                <FontAwesomeIcon
                                    icon={['fas' , 'check']}
                                    style={{color: '#8ab312', fontSize: '.5em', margin: 5}}
                                    onClick={() => {

                                    }}
                                    onMouseEnter={() => {

                                    }}
                                    onMouseLeave={() => {

                                    }}
                                />
                            </div>

                            <div style={{display: 'flex', width: '15em', flexDirection: 'row', cursor: 'pointer', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 0px 5px 2px grey', borderRadius: 10}}>
                                <FontAwesomeIcon
                                    icon={['fab' , 'android']}
                                    style={{color: '#8ab312', fontSize: '1.5em', margin: 5}}
                                    onClick={() => {

                                    }}
                                    onMouseEnter={() => {

                                    }}
                                    onMouseLeave={() => {

                                    }}
                                />

                                <span style={{color: '#8ab312', fontSize: '.8em', fontWeight: 'bold', textAlign: 'right', fontStyle: 'italic'}}>Скачать на ANDROID</span>
                            </div>
                        </div>
                        <div style={{display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 5}}>
                            <div style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <span style={{color: '#3c3b3d', fontSize: '.65em' , textAlign: 'right', fontStyle: 'italic'}}>В разработке</span>

                                <FontAwesomeIcon
                                    icon={['fas' , 'star']}
                                    style={{color: '#3c3b3d', fontSize: '.5em', margin: 5}}
                                    onClick={() => {

                                    }}
                                    onMouseEnter={() => {

                                    }}
                                    onMouseLeave={() => {

                                    }}
                                />
                            </div>

                            <div style={{display: 'flex', width: '15em', flexDirection: 'row', cursor: 'pointer', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 0px 5px 2px grey', borderRadius: 10}}>
                                <FontAwesomeIcon
                                    icon={['fab' , 'apple']}
                                    style={{color: '#3c3b3d', fontSize: '1.5em', margin: 5}}
                                    onClick={() => {

                                    }}
                                    onMouseEnter={() => {

                                    }}
                                    onMouseLeave={() => {

                                    }}
                                />

                                <span style={{color: '#3c3b3d', fontSize: '1em' , fontWeight: 'bold', textAlign: 'left', fontStyle: 'italic'}}>Скачать на iOS</span>
                            </div>
                        </div>
                    </div>
                </TweenOne>
            </div>

            {handleMenuDisplay()}

        </div>
    )
}

Home.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    paused: PropTypes.bool
};

export async function getStaticProps(){
   
    return {
        props: {
            message: 'Hello World'
        }
    }
}
