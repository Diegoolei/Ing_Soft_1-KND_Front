import React from 'react';
import nimbus from './../nimbus.svg';
import LoginRegisterForm from './loginRegisterForm'

const AppHeader = () => {
  return (
    <header className="App-header">
      <img src={nimbus} className="App-logo" alt="logo" />
      <p>
        Bienvenido a Secret Voldemort
      </p>
      <LoginRegisterForm/>
    </header>
  )
}

export default AppHeader
