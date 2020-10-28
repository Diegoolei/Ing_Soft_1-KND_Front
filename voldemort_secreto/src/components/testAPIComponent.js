import React, { useState } from 'react'
import { BASE_URL } from '../redux/globalTypes'
import { useSelector, useDispatch } from 'react-redux'
import { get, post, put } from '../redux/reduxIndex'

function TestAPI() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.testAPI.loading)
  const returnBody = useSelector(state => state.testAPI.returnBody)
  const error = useSelector(state => state.testAPI.error)
  const [endpoint, setEnpoint] = useState('/todos')
  const [params, setParams] = useState(null)
  const [body, setBody] = useState({
    email: 'agustin.marcelo.dominguez@mi.unc.edu.ar',
    password: 'estaEsDefinitivamenteMiContraseñaReal',
  })

  const printJson = data => <div>{JSON.stringify(data, null, 2)}</div>

  function handleClick(inp) {
    const { name } = inp.target
    switch (name) {
      case "get":
        dispatch(get(endpoint, params))
        break;

      case "post":
        dispatch(post(endpoint, params, body))
        break;

      case "put":
        dispatch(put(endpoint, params, body))
        break;

      default:
        break;
    }

  }

  function printResponse() {
    if (error !== '') {
      return (
        <div>
          response: {printJson(returnBody)}
        </div>
      )
    } else {
      return (
        <div>
          error: {printJson(error)}
        </div>
      )
    }
  }

  return (
    <div className="App-header">
      baseUrl: {BASE_URL}
      <br />endpoint: {endpoint}
      <br />params: {printJson(params)}
      body: {printJson(body)}
      <button name="get" onClick={handleClick}>GET REQUEST</button>
      <button name="post" onClick={handleClick}>POST REQUEST</button>
      {/* <button name="put" onClick={handleClick}>PUT REQUEST</button> */}
      {loading ? "loading..." : printResponse()}
    </div>
  )
}

export default TestAPI
