import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetTest, runTest } from '../redux/reduxIndex'
//import { connect } from 'react-redux'

function TestComponent() {
  const var3 = useSelector(state => state.test.state_var3)
  //state.test comes from combining reducers into rootReducer
  // dispatch_tst is usually dispatch. Can have any name
  const dispatch_tst = useDispatch()
  return (
    <body>
      <p>
        v3={var3}
        <button onClick={() =>dispatch_tst(runTest())}>Hook Test</button>
        <button onClick={() =>dispatch_tst(resetTest())}>Reset Hook Test</button>
      </p>
    </body>
  )
}

export default TestComponent