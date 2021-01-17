import logo from './logo.svg';
import './App.css';
import ImgUpl from './components/Image-upload/ImgUpl'
import CameraForm from './components/Camera/CameraForm'
import {Todo} from './components/InputForm/Todo';
import {Show} from './components/EditDelete/Show';
import {LogoRem} from './components/LogoRem/LogoRem';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Intro from './components/Intro'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Intro/>
          </Route>
          <Route path='/camera'>
            <CameraForm/>
          </Route>
          <Route path='/uplimg'>
            <ImgUpl/>
          </Route>
          <Route path='/form'>
            <Todo/>
          </Route>
          <Route path='/logo'>
            <LogoRem/>
          </Route>
          <Route path='/:id'>
            <Show/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
