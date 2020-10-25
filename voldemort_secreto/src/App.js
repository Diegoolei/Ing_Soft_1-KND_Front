import { Provider } from 'react-redux'
import store from  './redux/store'

import AppHeader from './components/appheader'
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppHeader />
      </Provider>
    </div>
  );
}

export default App;
