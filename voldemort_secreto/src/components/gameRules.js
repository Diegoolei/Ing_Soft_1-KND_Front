import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FIRST_SCREEN_PAGE_COMPONENT, LOGIN_COMPONENT, REGISTER_COMPONENT } from '../redux/componentController/componentControllerTypes'
import { resetResponse, changeScreen } from '../redux/reduxIndex'
import internet from '../metaMedia/interface/internet.svg'

function Rules(){
    const sessionState = useSelector(state => state.session)
    const dispatch = useDispatch()

    const switchToHome = () => {
        dispatch(changeScreen(FIRST_SCREEN_PAGE_COMPONENT))
    }
    
    return(
        <header className="App-header">
            <div className="App-div">
                <div className="icon-bar-first">
                    <button className="button_nav_bar" onClick={switchToHome}>
                        <img src={internet} className="icon-2" alt="logo" /><br/>
                        <h7 className="white">Home</h7>
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