//this component will take in the dropdown category and ID and then call the API to retrive the data. It will then display (conditionally) the data on the page

import Axios from 'axios';
import React, {useEffect, useState} from 'react';

const APICaller = props => {
    //deconstruct props
    const {category, input} = props;

    //create state variable to hold the retrieved information
    const [retrieved_data, setRetrieved_data] = useState([]);

    //call the API to retrieve information
    useEffect( () => {
    Axios.get(`https://swapi.dev/api/${category}/${input}`)
        //update state variables
        .then(res => setRetrieved_data(res.data))
        .catch(err => console.log(err))
    }, [props])//adding props in the dependency array allows for when the user selects a new item, it will re-run the query to the API to get the new data


    return(
        <h1>This is the category selected: {retrieved_data.name}</h1>
    );
}

export default APICaller;