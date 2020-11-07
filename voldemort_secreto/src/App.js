import { Provider } from 'react-redux'
import store from  './redux/store'
import ComponentController from './components/componentController'
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ComponentController/>
      </Provider>
    </div>
  );
}

export default App;
