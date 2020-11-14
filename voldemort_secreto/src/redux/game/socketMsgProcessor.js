import { useSelector, useDispatch } from 'react-redux'

const socketProcessor = jsonMsg => {
  console.log("Socket Processor got this message:  " + JSON.stringify(jsonMsg))
}

export default socketProcessor