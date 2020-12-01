import React from 'react'
import { useDispatch } from 'react-redux'
import { FIRST_SCREEN_PAGE_COMPONENT, LOGIN_COMPONENT, REGISTER_COMPONENT } from '../redux/componentController/componentControllerTypes'
import { changeScreen } from '../redux/reduxIndex'
import internet from '../metaMedia/interface/internet.svg'
import sing_in from '../metaMedia/interface/sign-in.svg'
import log_in from '../metaMedia/interface/log-in.svg'

function Rules(){
    const dispatch = useDispatch()

    const switchToHome = () => {
        dispatch(changeScreen(FIRST_SCREEN_PAGE_COMPONENT))
    }

    const switchToRegister = () => {
        dispatch(changeScreen(REGISTER_COMPONENT))
    }

    const switchLoginForm = () => {
        dispatch(changeScreen(LOGIN_COMPONENT))
    }
     
    
    return(
        <header className="App-header">
            <div className="App-div">
                <div className="icon-bar-first">
                    <button className="button_nav_bar" onClick={switchToHome}>
                        <img src={internet} className="icon-2" alt="logo" /><br/>
                        <h5 className="white">Home</h5>
                    </button>
                    <button className="button_nav_bar" onClick={switchToRegister}>
                        <img src={sing_in} className="icon-2" alt="logo" /><br/>
                        <h5 className="white">Register</h5>
                    </button>
                    <button className="button_nav_bar" onClick={switchLoginForm}>
                        <img src={log_in} className="icon-2" alt="logo" /><br/>
                        <h5 className="white">Login</h5>
                    </button>
                </div>
                <h1 className="title-first-screen">Rules game</h1>
                <a href="https://drive.google.com/file/d/1znOZB_k_damSaulhg5KeVMe_PdyXmyu1/view?usp=sharing">Read and download rules [ES]</a>
                {/* <button className="button" onClick="location.href='https://drive.google.com/file/d/1znOZB_k_damSaulhg5KeVMe_PdyXmyu1/view?usp=sharing'"></button> */}
            </div>
        </header>
    )
}

export default Rules