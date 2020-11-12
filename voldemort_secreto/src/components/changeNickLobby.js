import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dobby from './../dobby.svg';
import { changeScreen } from '../redux/reduxIndex'
import { MAIN_MENU_COMPONENT } from '../redux/componentController/componentControllerTypes'
// TEST
import ReactDOM from 'react-dom'

function ChangeNickOnLobby(){
    const dispatch = useDispatch()
    //const token = useSelector(state => state.session.authToken)
    //const [userId, setUser_id] = useState('')
    //const [playerId, setPlayer_id] = useState('')
    //const [playerNick, setPlayer_nick] = useState('')
    //const [validityMsg, setValidityMsg] = useState('')

    function ClickMeNick(){
        console.log("Hola")
    }

    function ChangeNick(){
        console.log("ChangeNick")
        //const uri = "http://127.0.0.1:8000/lobby/{lobby_id}/change_nick"
    }

    /* function takeInput(inp){
        const {nick, value} = inp.target;
        setNewPlayerNick(String(value))
        }
    } */

    function BackToMenu() {
        dispatch(changeScreen(MAIN_MENU_COMPONENT))
      }

    function ShowMyButtons(){
        return(
            <div>
                <br/><button className="button" onClick={ClickMeNick}>Test me Nick!</button>
                <br/><button className="button" onClick={BackToMenu}>Back to Main Menu</button>
                <p>This is some text in a div element.</p>
            </div>
        )
    }

    function TestMyDiv(){
        return(
            <div className="App-div">
                <h1 className="brown">Change your nick On Lobby</h1>
            </div>
        )
    }

    return(
        <header className="App-header_Hufflepuff">
        <img src={dobby} className="App-logo-without-animation" alt="logo" />
        <div>
            {TestMyDiv()} 
            {ShowMyButtons()}
        </div>
        </header>
    )
}
export default ChangeNickOnLobby