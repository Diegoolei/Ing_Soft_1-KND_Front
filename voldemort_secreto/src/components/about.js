import React from 'react'
import { useDispatch } from 'react-redux'
import { FIRST_SCREEN_PAGE_COMPONENT, LOGIN_COMPONENT, REGISTER_COMPONENT } from '../redux/componentController/componentControllerTypes'
import { changeScreen } from '../redux/reduxIndex'
import css from '../metaMedia/interface/css.svg'
import js from '../metaMedia/interface/javascript.svg'
import github from '../metaMedia/interface/github.svg'
import react from '../metaMedia/interface/react.svg'
import python from '../metaMedia/interface/python.svg'
import mysql from '../metaMedia/interface/mysql.svg'

function About(){
    const dispatch = useDispatch()

    const switchToHome = () => {
        dispatch(changeScreen(FIRST_SCREEN_PAGE_COMPONENT))
    }

    const switchLoginForm = () => {
        dispatch(changeScreen(LOGIN_COMPONENT))
    }

    const switchToRegister = () => {
        dispatch(changeScreen(REGISTER_COMPONENT))
    }

    const redirectAgustin = () => {
        return(
            <div className="App-div-inline">
                <a href="https://github.com/AgustinMDom" target="_blank">
                    <button className="button_about">&nbsp;&nbsp;&nbsp;&nbsp;AgustinMDom</button>
                </a>
            </div>
        )
    }

    const redirectCande = () => {
        return(
            <div className="App-div-inline">
                <a href="https://github.com/Knd9" target="_blank">
                    <button className="button_about">&nbsp;&nbsp;&nbsp;&nbsp;Knd9</button>
                </a>
            </div>
        )
    }

    const redirectDiego = () => {
        return(
            <div className="App-div-inline">
                <a href="https://github.com/Diegoolei" target="_blank">
                    <button className="button_about">&nbsp;&nbsp;&nbsp;&nbsp;Diegoolei</button>
                </a>
            </div>
        )
    }

    const redirectValentina = () => {
        return(
            // <a href="https://github.com/shirosweets" target="_blank">&nbsp; &nbsp; &nbsp; &nbsp; shirosweets</a>
            <div className="App-div-inline">
                <a href="https://github.com/shirosweets" target="_blank">
                    <button className="button_about">&nbsp;&nbsp;&nbsp;&nbsp;shirosweets</button>
                </a>
            </div>
        )
    }

    return(
        <header className="header-about">
        <div className="App-div-about">
            <h1 className="title-first-screen">About</h1>
            <p>Languages used</p>
            <div className="div-inline-about">
                <img src={react} className="icon-react" alt="logo"></img>
                <img src={css} className="icon-css" alt="logo"></img>
                <img src={js} className="icon-js" alt="logo"></img>
                <img src={python} className="icon-python" alt="logo"></img>
                <img src={mysql} className="icon-mysql" alt="logo"></img>
                <p>Developers</p>
                <img src={github} className="icon-github1" alt="logo"></img>
                {redirectAgustin()}
                <img src={github} className="icon-github2" alt="logo"></img>
                {redirectDiego()}
                <img src={github} className="icon-github3" alt="logo"></img>
                {redirectCande()}
                <img src={github} className="icon-github4" alt="logo"></img>
                {redirectValentina()}
                <h4>Source</h4>
                <p> Author from music used: - Iago Roberts | Low Fideos - #RetoLofi (https://youtu.be/zWdpeaTcoy0) </p>
                <p> Sounds: Original music and sounds from Harry Potter saga</p>
                <p> Authors from icon used: - Freepik, Prosymbols, Pixel perfect, Flat Icons, photo3idea_studio</p>
            </div>
            <br/><button className="button-shadow-red" onClick={() => dispatch(switchToHome)}>Home</button>
            <button className="button" onClick={switchToRegister}>Register</button>
            <button className="button" onClick={switchLoginForm}>Login</button>
        </div>
        <footer>
        <div className="App-div-footer">
          <h6 className="footer-font-white" >2020 Secret Voldemort | Creative Commons Attribution – No Comercial- ShareAlike 4.0 International</h6>
        </div>
        </footer>
        </header>
    )
}

export default About