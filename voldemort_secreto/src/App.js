import { Provider } from 'react-redux'
import store from  './redux/store'
import ComponentController from './components/componentController'
//import SocketTest from './components/socketTest'
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ComponentController/>
        {/* <SocketTest/> */}
      </Provider>
    </div>
  );
}

export default App;
