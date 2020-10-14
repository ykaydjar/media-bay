import React, {Component, useState, useCallback} from "react";
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

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {auth} from "../../../config/fire-config";


export default function Menu(props){
    
   const user = auth.currentUser;
    
    auth.onAuthStateChanged((user) => {
        if(user){
            setAuth(true);
        }else{
            setAuth(false);
        }
    })
    
    const [isAuth, setAuth] = useState(false);


    const signUp = ({name, email, password}) => {
        console.log('Signing up new user');
        return auth.createUserWithEmailAndPassword(email, password).then(((response) => {
            console.log(response);
        })).catch((error) => {
            return {error};
        });
    }
    
    const signIn = ({email, password}) => {
        console.log('Signning in user');
        return auth.signInWithEmailAndPassword(email, password).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }


    const signInForm = {
        email: '',
        password: '',
    }

    const signUpForm = {
        email: '',
        password: '',
        rePassword: '',
    }

    const menuInAnim = {
        width: '100vw',
        duration: 500
    }
    const menuOutAnim = {
        width: '0vw',
        duration: 500
    }

    const [currentAnim, setAnim] = useState(menuInAnim);
    const [animPaused, setAnimPause] = useState(false);

    const [menuPage, setMenuPage] = useState(props.menuPage);

    return(
        <TweenOne
            style={{display: 'flex', overflow: 'hidden', zIndex: 1, position: 'absolute', width: '0vw', height: '100vh', backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}
            animation={currentAnim}
            paused={animPaused}
        >
            {menuPage === 'main'?
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
        
                  
                    
                    <a
                        style={{fontWeight: 'bold', color: 'white', fontSize: '.8em', cursor: 'pointer'}}
                        onClick={() => {
                            setAnim(menuOutAnim);
                            setTimeout(() => {
                                props.callback('menu.close');
                            }, 1000)
                        }}
                    >ЗАКРЫТЬ</a>

                    <div style={{display: 'flex', width: '25%', borderWidth: 1, borderColor: 'white', borderStyle: 'solid', margin: 10}}/>

                    {user?<a
                        style={{fontWeight: 'bold', color: 'white', fontSize: '.8em', cursor: 'pointer'}}
                        onClick={() => {
                            auth.signOut().then((response) => {
                                    console.log(response);
                                 setAnim(menuOutAnim);
                            setTimeout(() => {
                                props.callback('menu.close');
                            }, 1000);
                                });
                            
                        }}
                    >ВЫЙТИ</a>
                    :
                    <a
                        style={{fontWeight: 'bold', color: 'white', fontSize: '.8em', cursor: 'pointer'}}
                        onClick={() => {
                            setMenuPage('auth');
                             
                        }}
                    >ВОЙТИ</a>
                    }
                </div>
                :null
            }

            {menuPage === 'auth'?
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    
                    <FontAwesomeIcon
                                            icon={['fas' , 'times-circle']}
                                            style={{color: 'white', fontSize: '.85em', margin: 5, cursor: 'pointer'}}
                                            onClick={() => {
                                                setAnim(menuOutAnim);
                            setTimeout(() => {
                                props.callback('menu.close');
                            }, 1000)
                                            }}
                                            onMouseEnter={() => {

                                            }}
                                            onMouseLeave={() => {

                                            }}
                    />

                    <div style={{display: 'flex', width: '20em', margin: 10, flexDirection: 'column', borderRadius: 10, borderColor: 'white', borderStyle: 'solid', borderWidth: 1}}>
                        <div style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', height: '3em', marginBottom: 5, borderBottomWidth: 1, borderBottomColor: 'white', borderBottomStyle: 'solid'}}>
                            <h1 style={{fontWeight: 'bold', color: 'white', fontSize: '2em'}}>AUTH</h1>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', width: '100%', margin: 5}}>
                            <InputGroup
                                className="mb-3" style={{display: 'flex', width: '97%'}}
                            >
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">
                                        <FontAwesomeIcon
                                            icon={['fas' , 'at']}
                                            style={{color: '#8ab312', fontSize: '.85em', margin: 5}}
                                            onClick={() => {

                                            }}
                                            onMouseEnter={() => {

                                            }}
                                            onMouseLeave={() => {

                                            }}
                                        />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    type='email'
                                    placeholder="E-Mail"
                                    aria-label="E-Mail"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3" style={{display: 'flex', width: '97%'}}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">
                                        <FontAwesomeIcon
                                            icon={['fas' , 'lock']}
                                            style={{color: '#8ab312', fontSize: '.85em', margin: 5}}
                                            onClick={() => {

                                            }}
                                            onMouseEnter={() => {

                                            }}
                                            onMouseLeave={() => {

                                            }}
                                        />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    type='password'
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>

                            <a style={{fontStyle: 'italic', color: 'white'}}>Забыли пароль?</a>
                            <a
                                style={{fontStyle: 'italic', color: 'white', cursor: 'pointer'}}
                                onClick={() => {
                                    setMenuPage('reg');
                                }}
                            >Еще не зарегистрированы?</a>

                            <Button 
                                variant='success' 
                                style={{display: 'flex', width: '97%', justifyContent: 'center', alignItems: 'center'}}
                                onClick={() => {
                                    return signIn({
                                      
                                        email: 'test@gmail.com',
                                        password: 'TestTest'
                                    }).then((user) => {
                                        console.log(user);
                                        setAnim(menuOutAnim);
                            setTimeout(() => {
                                props.callback('menu.close');
                            }, 1000);
                                    });
                                }}
                                >ВОЙТИ</Button>
                        </div>
                    </div>

                    <a
                        style={{fontWeight: 'bold', color: 'white', fontSize: '.8em', cursor: 'pointer'}}
                        onClick={() => {
                            setMenuPage('main');
                        }}
                    >НАЗАД</a>
                </div>
                :null
            }

            {menuPage === 'reg' ?
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    
                    <FontAwesomeIcon
                                            icon={['fas' , 'times-circle']}
                                            style={{color: 'white', fontSize: '.85em', margin: 5, cursor: 'pointer'}}
                                            onClick={() => {
                                                setAnim(menuOutAnim);
                            setTimeout(() => {
                                props.callback('menu.close');
                            }, 1000)
                                            }}
                                            onMouseEnter={() => {

                                            }}
                                            onMouseLeave={() => {

                                            }}
                    />

                    <div style={{display: 'flex', width: '20em', margin: 10, flexDirection: 'column', borderRadius: 10, borderColor: 'white', borderStyle: 'solid', borderWidth: 1}}>
                        <div style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', height: '3em', marginBottom: 5, borderBottomWidth: 1, borderBottomColor: 'white', borderBottomStyle: 'solid'}}>
                            <h1 style={{fontWeight: 'bold', color: 'white', fontSize: '2em'}}>AUTH</h1>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', width: '100%', margin: 5}}>
                            <InputGroup className="mb-3" style={{display: 'flex', width: '97%'}}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">
                                        <FontAwesomeIcon
                                            icon={['fas' , 'at']}
                                            style={{color: '#8ab312', fontSize: '.85em', margin: 5}}
                                            onClick={() => {

                                            }}
                                            onMouseEnter={() => {

                                            }}
                                            onMouseLeave={() => {

                                            }}
                                        />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    type='email'
                                    placeholder="E-Mail"
                                    aria-label="E-Mail"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3" style={{display: 'flex', width: '97%'}}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">
                                        <FontAwesomeIcon
                                            icon={['fas' , 'lock']}
                                            style={{color: '#8ab312', fontSize: '.85em', margin: 5}}
                                            onClick={() => {

                                            }}
                                            onMouseEnter={() => {

                                            }}
                                            onMouseLeave={() => {

                                            }}
                                        />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    onChange={(e) => {
                                        console.log('rePassword field changed: ' + e.target.value);
                                    }}
                                    type='password'
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3" style={{display: 'flex', width: '97%'}}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">
                                        <FontAwesomeIcon
                                            icon={['fas' , 'lock']}
                                            style={{color: '#8ab312', fontSize: '.85em', margin: 5}}
                                            onClick={() => {

                                            }}
                                            onMouseEnter={() => {

                                            }}
                                            onMouseLeave={() => {

                                            }}
                                        />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    type='password'
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>

                            <Button
                                variant='success'
                                style={{display: 'flex', width: '97%', justifyContent: 'center', alignItems: 'center'}}
                                onClick={() => {
                                    return signUp({
                                            name: 'test',
                                            email: 'test@gmail.com',
                                            password: 'TestTest'
                                        }).then((user) => {
                                        signIn({
                                      
                                            email: 'test@gmail.com',
                                            password: 'TestTest'
                                        }).then((user) => {
                                            console.log(user);
                                            setAnim(menuOutAnim);
                                            setTimeout(() => {
                                                props.callback('menu.close');
                                            }, 1000);
                                                console.log(user);
                                        });
                                    });
                            >ЗАРЕГИСТРИРОВАТЬСЯ</Button>
                        </div>
                    </div>

                    <a
                        style={{fontWeight: 'bold', color: 'white', fontSize: '.8em', cursor: 'pointer'}}
                        onClick={() => {
                            setMenuPage('auth');
                        }}
                    >НАЗАД</a>
                </div>
                :null
            }
        </TweenOne>
    )
}
