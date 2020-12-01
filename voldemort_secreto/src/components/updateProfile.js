import React, { useState }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeScreen } from '../redux/reduxIndex'
import { MAIN_MENU_COMPONENT } from '../redux/componentController/componentControllerTypes'
import axios from 'axios'
import {BASE_URL} from '../redux/API_Types'

function UpdateUserProfile() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.session.authToken)
    const [userId, setUser_id] = useState('')
    const [newPhoto, setUserPhoto] = useState('')
    const [newUsername, setUserame] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
    const [validityMsg, setValidityMsg] = useState('')

    function ChangeUsername() {
        const uri = BASE_URL + "/users/change_profile/"
        console.log("Sending ChangeUsername request with usern_id:", userId)
        const body = {"user_id": userId, "username": newUsername, "photo": newPhoto}
        axios.patch(
        uri, body,
        { headers: {
            'Authorization' : token.token_type + " " + token.access_token
            }
        }
        ).then(response => {
        console.log("-Response :" + JSON.stringify(response.data))
        setValidityMsg("Your changes was changed correctly")
        }).catch(error => {
        let errorMsg
        try {
            errorMsg = error.response.data.detail
            } catch (er) {
                errorMsg = "Something went wrong:: " + er
            }
            console.log("-Response :" + JSON.stringify(errorMsg))
            setValidityMsg(errorMsg)
        })
    }

    
    function ChangePassword() {
        if (newPassword2 !== newPassword) {
            setValidityMsg('Passwords don\'t match')
        }else {
            setValidityMsg('')
            const uri = BASE_URL + "/users/change_profile/change_password/"
            console.log("Sending ChangeUsername request with usern_id:", userId)
            const body = {"user_id": userId, "current_password": currentPassword, "new_password": newPassword}
            axios.patch(
            uri, body,
            { headers: {
                'Authorization' : token.token_type + " " + token.access_token
                }
            }
            ).then(response => {
            console.log("-Response :" + JSON.stringify(response.data))
            setValidityMsg("Your password was changed correctly")
            }).catch(error => {
            let errorMsg
            try {
                errorMsg = error.response.data.detail
                } catch (er) {
                    errorMsg = "Something went wrong:: " + er
                }
                console.log("-Response :" + JSON.stringify(errorMsg))
                setValidityMsg(errorMsg)
            })
        }
    }

    function takeInput(inp) {
        const { name, value } = inp.target;
        switch (name) {
        case "setusername":
            setUserame(String(value));
            break;
            
        case "setuserphoto":
            setUserPhoto(String(value))
            break;
    
        case "setuser_id":
            setUser_id(String(value))
            break;

        case "setcurrentpassword":
            setCurrentPassword(String(value))
            break;
            
        case "setnewpassword":
            setNewPassword(String(value))
            break;

        case "setnewpassword2":
            setNewPassword2(String(value))
            break;
            
        default:
            break;
        }
    }
    

return (
    <header className="App-header-blue">
        <div className="App-div-lightsteelblue"><br/>
            <h1>Update your profile</h1>
            <p>
            <br/>
                <input placeholder='New Username' name='setusername' type='text' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
                {/* <input placeholder='New Photo' name='setuserphoto' type='text' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input> */}
                <button className="button-shadow-blue" onClick={ChangeUsername}>Update current data</button>        
            <br/>
            
            </p><p>
                <input placeholder='Current Password' name='setcurrentpassword' type='password' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
                <input placeholder='New password' name='setnewpassword' type='password' onBlur={takeInput} onClick={takeInput} onChange={takeInput} maxLength='32' minLength='8'></input>
                <input placeholder='Repeat New password' name='setnewpassword2' type='password' onBlur={takeInput} onClick={takeInput} onChange={takeInput} maxLength='32' minLength='8'></input><br/>
                <br/><button className="button-shadow-blue" onClick={ChangePassword}>Change Password</button>
                <br/><label>{validityMsg}</label><br />
            </p>
            <button className="button-shadow-blue" onClick={() => dispatch(changeScreen(MAIN_MENU_COMPONENT))}>Back</button>
        <br/></div>
    </header>
)
}

export default UpdateUserProfile
