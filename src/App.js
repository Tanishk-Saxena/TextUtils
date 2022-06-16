import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import TextForm from './components/TextForm';
import React, {useState} from 'react';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  const toggleMode = () => {
    if(mode==="dark"){
      setMode("light");
      document.body.style.backgroundColor="white";
      showAlert("Dark Mode is disabled.", "success");
      document.title="TextUtils - Light Mode";
    }else{
      setMode("dark");
      document.body.style.backgroundColor="black";
      showAlert("Dark Mode is enabled.", "success");
      document.title="TextUtils - Dark Mode";
      // setInterval(() => {
      //   document.title="TextUtils is amazing!";
      // }, 2000);
      // setInterval(() => {
      //   document.title="Download TextUtils now!";
      // }, 1500);
    }
  }
  return (
    <>
    <Router> 
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode}/>
      <Alert alert={alert}/>
      <div className="container my-3"> 
      <Switch>
          {/* /users --> Component 1
          /users/home --> Component 2
          React router dom uses partial matching unless told otherwise by using the keyword "exact" with path
          This means that if we don't use exact, and go to second path, still component 1 will be rendered.
          Thus, to avoid that we use "exact" */}
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/" element={<TextForm heading="Enter the text to analyze below" mode={mode} showAlert={showAlert}/>}/>
        </Switch>
      </div>
    </Router>
    </>
  );
}

export default App;
