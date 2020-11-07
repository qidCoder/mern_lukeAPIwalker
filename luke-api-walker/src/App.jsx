import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {

  //list of dropdown categories
  const categories = ['', 'Planets', 'People'];

  //State variables
  const [category, setCategory] = useState(categories[0]);


  return (
    <div className="App">

      {/* search form */}
      <form>
        <label>Search For: </label>
        <select value={category}>

          {/* map out all the options */}
          {
            categories.map( (cat, i) => {
              return(
                <option key={i} value={cat}>{cat == '' ? "----Select an Item------" : cat}</option>
              )
            })
          }

        </select>
      </form>

    </div>
  );
}

export default App;


