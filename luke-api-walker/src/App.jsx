import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  //list of dropdown categories
  const categories = ['', 'Planets', 'People'];

  //State variables
  const [category, setCategory] = useState(categories[0]);
  const [input, setInput] = useState(null);//for form input value


  return (
    <div className="App">

      {/* search form */}
      <form>
        <label>Search For: </label>
        <select value={category} onChange= {e => {setCategory(e.target.value)}}>

          {/* map out all the options */}
          {
            categories.map( (cat, i) => {
              return(
                <option key={i} value={cat}>{cat == '' ? "----Select an Item------" : cat}</option>
              )
            })
          }

        </select>

        {/* add in ID textbox */}
        <label>ID: </label>
        <input type="text" value={input} onChange={ e=> {setInput(e.target.value)}}/>
      </form>

    </div>
  );
}

export default App;


