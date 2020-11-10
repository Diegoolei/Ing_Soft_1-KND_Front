import React, { useState }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeScreen } from '../redux/reduxIndex'
import { MAIN_MENU_COMPONENT } from '../redux/componentController/componentControllerTypes'
import axios from 'axios'

function UpdateUserProfile() {
    //const sessionState = useSelector(state => state.session)
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
        const uri = "http://127.0.0.1:8000/users/change_profile/"
        console.log("Sending ChangeUsername request with usern_id:", userId)
        const body = {"user_id": userId, "changeProfile_username": newUsername, "changeProfile_photo": newPhoto}
        axios.patch(
        uri, body,
        { headers: {
            'Authorization' : token.token_type + " " + token.access_token
            }
        }
        ).then(response => {
        console.log("-Response :" + JSON.stringify(response.data))
        }).catch(error => {
        let errorMsg
        try {
            errorMsg = error.response.data.detail
            } catch (er) {
            errorMsg = "Something went wrong"
            }
            console.log("-Response :" + JSON.stringify(errorMsg))
        })
    }

    
    function ChangePassword() {
        if (newPassword2 !== newPassword) {
            setValidityMsg('Passwords don\'t match')
        }else {
            setValidityMsg('')
            const uri = "http://127.0.0.1:8000/users/change_profile/change_password/"
            console.log("Sending ChangeUsername request with usern_id:", userId)
            const body = {"user_id": userId, "changePassword_current_password": currentPassword, "changePassword_new_password": newPassword, "changePassword_new_password2": newPassword2}
            axios.patch(
            uri, body,
            { headers: {
                'Authorization' : token.token_type + " " + token.access_token
                }
            }
            ).then(response => {
            console.log("-Response :" + JSON.stringify(response.data))
            }).catch(error => {
            let errorMsg
            try {
                errorMsg = error.response.data.detail
                } catch (er) {
                errorMsg = "Something went wrong"
                }
                console.log("-Response :" + JSON.stringify(errorMsg))
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
    <div>
    <h1>UpdateUserProfile</h1>
    <p>
    <br/><button onClick={ChangeUsername}>Change Username</button>
        <input placeholder='New Username' name='setusername' type='text' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
        <input placeholder='New Photo (optional)' name='setuserphoto' type='text' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
    <br/>
    
    </p><p>
    <button onClick={ChangePassword}>Change Password</button>
        <input placeholder='Current Password' name='setcurrentpassword' type='text' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
        <input placeholder='New password' name='setnewpassword' type='text' onBlur={takeInput} onClick={takeInput} onChange={takeInput} maxLength='32' minLength='8'></input>
        <input placeholder='Repeat New password' name='setnewpassword2' type='text' onBlur={takeInput} onClick={takeInput} onChange={takeInput} maxLength='32' minLength='8'></input>
        <br/><label>{validityMsg}</label>
    </p>
    <br/><button onClick={() => dispatch(changeScreen(MAIN_MENU_COMPONENT))}>Back</button>
    
    </div>
)
}
export default UpdateUserProfile