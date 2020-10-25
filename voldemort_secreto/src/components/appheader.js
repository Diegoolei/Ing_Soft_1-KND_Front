import React from 'react';
import nimbus from './../nimbus.svg';
import TestComponent from './testComponent'
import TestHookComponent from './testHooksComponent'

const AppHeader = () => {
  return (
    <header className="App-header">
      <img src={nimbus} className="App-logo" alt="logo" />
      <p>
        Bienvenido a Secret Voldemort
      </p>
      <a
        className="App-link"
        href="https://drive.google.com/drive/folders/1Pr_bbW787_3N7bLAmw2CrIMbEZedu-vp"
        target="_blank"
        rel="noopener noreferrer"
      >
        Doc Principal
      </a>
      <TestComponent />
      <TestHookComponent />
    </header>
  )
}

export default AppHeader