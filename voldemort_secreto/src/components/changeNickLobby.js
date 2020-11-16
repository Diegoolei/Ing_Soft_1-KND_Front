import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dobby from './../dobby.svg';
import { changeScreen } from '../redux/reduxIndex'
import { MAIN_MENU_COMPONENT } from '../redux/componentController/componentControllerTypes'
import axios from 'axios' // For use change_nick POST Endpoint

function ChangeNickOnLobby(){
    const dispatch = useDispatch()
    const lobby_id = useSelector(state => state.game.lobby_id)
    const token = useSelector(state => state.session.authToken)
    const [playerNick, setPlayer_nick] = useState('')
    const [validityMsg, setValidityMsg] = useState('')

    function ChangeNick(){
        //console.log("Sending ChangeUsername request with usern_id:", userId)
        console.log("Sending ChangeUsername request to lobby", lobby_id)
        console.log("ChangeNick")
        const uri = "http://127.0.0.1:8000/lobby/"+String(lobby_id)+"/change_nick"
        const body = { "nick": playerNick }
        axios.post(
            uri, body,{ headers: {'Authorization' : token.token_type + " " + token.access_token}}
        ).then(response => {
            console.log("-Response :" + JSON.stringify(response.data))
            setValidityMsg("Your nickname was changed correctly")
        }).catch(error => {
            let errorMsg
            try {
                errorMsg = error.response.data.detail
                } catch (er) {
                errorMsg = "The nick is already selected by another player"
                }
                console.log("-Response :" + JSON.stringify(errorMsg))
                setValidityMsg(errorMsg)
        })
    }

    function takeInput(inp){
        const {name, value} = inp.target;
        switch(name){
            case "setNewPlayerNick":
                setPlayer_nick(String(value))
                break;
            default:
                break;
        }
    }

    function BackToMenu() {
        dispatch(changeScreen(MAIN_MENU_COMPONENT))
    }

    function ShowMyButtons(){
        return(
            <div>
                <input placeholder='New player nick' name='setNewPlayerNick' type='text' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input><br/>
                <br/><button className="button" onClick={ChangeNick}>Change Nick</button>
                <br/><label>{validityMsg}</label><br/>
                <br/>
            </div>
        )
    }

    function TestMyDiv(){
        return(
            <div className="App-div">
                <h1 className="brown">Change your nickname on Lobby</h1>
                {ShowMyButtons()}
            </div>
        )
    }

    return(
        <header className="App-header_Hufflepuff">
        <img src={dobby} className="App-logo-without-animation" alt="logo" />
        <div>
            <br/>{TestMyDiv()}<br/>
        </div>
        <button className="button" onClick={BackToMenu}>Back to Main Menu</button>
        </header>
    )
}
export default ChangeNickOnLobby