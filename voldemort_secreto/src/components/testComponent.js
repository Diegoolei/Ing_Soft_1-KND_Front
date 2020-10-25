import React from 'react'
import { connect } from 'react-redux'
import { resetTest, runTest } from '../redux/redux_index'

const TestComponent = (props) => {
  return (
    <body>
      <p>
        Test State:
        <br/>v1={props.state_var1 ? 'true' : 'false'} 
        <br/>v2={props.state_var2 ? 'true' : 'false'} 
        <br/>v3={props.state_var3}
      </p>
      <button onClick={props.run_test}>Run Test</button>
      <button onClick={props.reset_test}>Reset Test</button>
    </body>
  )
}

const mapStateToProps = state => {
  return {
    state_var1: state.state_var1,
    state_var2: state.state_var2,
    state_var3: state.state_var3
  }
}

const mapDispatchToProps = dispath => {
  return {
    run_test : () => dispath(runTest()),
    reset_test : () => dispath(resetTest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (TestComponent)