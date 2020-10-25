//import logo from './logo.svg';
import nimbus from './nimbus.svg';
import './App.css';

const doSomething = function doSomething ()
{
  console.log("Clicked!")
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={nimbus} className="App-logo" alt="logo" />
        <img src={nimbus} className="App-logo2" alt="logo" />
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
        <p></p>
        <button onClick={doSomething} >Click me</button>
        <textarea>
          esto no
        </textarea>

        <textarea>
          esto tampoco
        </textarea>
        <form action="/my-handling-form-page" method="get">
          <ul>
            <li>
              <label for="name">Username: </label>
              <input></input>
              <button onClick={doSomething} >Check Username</button>
            </li>
            <li>
              <label for="name">Password: </label>
              <input></input>
              <button onClick={doSomething} >Check Password</button>
            </li>
            <button onClick={doSomething} >Login</button>
          </ul>
        </form>
      </header>
    </div>
  );
}


// <form action="/my-handling-form-page" method="post">
export default App;
