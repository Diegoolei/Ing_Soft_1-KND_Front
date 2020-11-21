import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { changeScreen, createLobby } from '../redux/reduxIndex'
import { MAIN_MENU_COMPONENT } from '../redux/componentController/componentControllerTypes'
import {BASE_URL} from '../redux/API_Types'

function NewLobby() {
  const token = useSelector(state => state.session.authToken)
  const dispatch = useDispatch()

  const [privLobbyName, setPrivLobbyName] = useState('')
  const [validityMsg, setValidityMsg] = useState('')
  const [sliderValue, setSliderValue] = useState([5, 10]);

  const renderSlider = () => {
    const box_shadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)'

    const sliderStyle = makeStyles({
      root: {
        width: 200,
        color: '#831111',
      },
      thumb: {
        height: 28,
        width: 28,
        backgroundColor: '#ffff',
        boxShadow: box_shadow,
        marginTop: -14,
        marginLeft: -14,
      },
      valueLabel: {
        left: -2,
        top: 9,
        '& *': {
          background: 'transparent',
          color: '#000',
        },
      },
      track: {
        height: 5,
      },
      rail: {
        height: 3,
        opacity: 0.5,
        backgroundColor: '#831111',
      },
      mark: {
        color: '#831111',
        height: 8,
        width: 1,
        marginTop: -3,
      },
      markActive: {
        opacity: 1,
        backgroundColor: 'currentColor',
      },
    })

    const classes = sliderStyle()

    return (
      <Slider
        classes={classes}
        value={sliderValue}
        onChange={(_, newValue) => setSliderValue(newValue)}
        valueLabelDisplay="on"
        aria-labelledby="discrete-range-slider"
        getAriaValueText={v => v}
        min={5}
        max={10}
        step={1}
        defaultValue={[5,10]}
      />
      )
  }

  function handleButton() {
    setValidityMsg('')
    axios.post(
      BASE_URL + "/lobby/",
      {
        lobbyIn_name: privLobbyName,
        lobbyIn_max_players: sliderValue[1],
        lobbyIn_min_players: sliderValue[0]
      },
      {
        headers: {
          'Authorization': token.token_type + " " + token.access_token
        }
      }
    ).then(response => {
      dispatch(createLobby(response.data))
    }).catch(error => {
      let errorMsg
      try {
        errorMsg = error.response.data.detail
      } catch (er) {
        errorMsg = "Something went wrong"
      }
      setValidityMsg(errorMsg)
    })
  }

  const takeInput = i => setPrivLobbyName(i.target.value)

  return (
    <header className="App-header">
      <div className="App-div">
        <h2 className="brown">Create Lobby</h2>
        <input placeholder='lobby name' name='lobby' type='text' onBlur={takeInput} onChange={takeInput} />
        <br/><br/>{renderSlider()}
        <br/>{validityMsg}
        <br/><button className="button" name="Create Lobby" onClick={handleButton}>Create Lobby</button>
        <button className="button" onClick={() => dispatch(changeScreen(MAIN_MENU_COMPONENT))}>Cancel</button>
      </div>
    </header>
  )
}

export default NewLobby
