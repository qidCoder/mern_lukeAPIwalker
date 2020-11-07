import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router, navigate} from '@reach/router';//to use navigate
import APICaller from './components/APICaller';

function App() {

  //list of dropdown categories
  const categories = ['', 'Planets', 'People'];

  //State variables
  const [category, setCategory] = useState(categories[0]);
  const [input, setInput] = useState(null);//for form input value

  //function to process the submit button click
  const handleSubmit = e => {
    //first prevent default
    e.preventDefault();

    //second send the form data to other components
    navigate(`/${category}/${input}`)

    //lastly, reset the state variable
    setCategory(categories[0]);
    setInput(null);
  }


  return (
    <div className="App">

      {/* search form */}
      <form onSubmit={handleSubmit}>
        <label>Search For: </label>
        <select value={category} onChange= {e => {setCategory(e.target.value)}}>

          {/* map out all the options */}
          {/* convert the value to lowercase as the API is case sensitive */}
          {
            categories.map( (cat, i) => {
              return(
                <option key={i} value={cat.toLowerCase()}>{cat == '' ? "----Select an Item------" : cat}</option>
              )
            })
          }

        </select>

        {/* add in ID textbox */}
        <label>ID: </label>
        <input type="text" value={input} onChange={ e=> {setInput(e.target.value)}}/>

        {/* add submit button */}
        <input type="submit" />
      </form>

      {/* set up router to actually call the component  */}
      <Router>
          <APICaller path="/:category/:input" />
      </Router>

    </div>
  );
}

export default App;


