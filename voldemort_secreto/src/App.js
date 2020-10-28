import { Provider } from 'react-redux'
import store from  './redux/store'

//import AppHeader from './components/appheader'
import TestAPIComponent  from './components/testAPIComponent'
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        {/* <AppHeader /> */}
        <TestAPIComponent/>
      </Provider>
    </div>
  );
}

export default App;
