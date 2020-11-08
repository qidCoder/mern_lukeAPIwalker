//this component will take in the dropdown category and ID and then call the API to retrive the data. It will then display (conditionally) the data on the page

import Axios from 'axios';
import React, { useEffect, useState } from 'react';

const APICaller = props => {
    //deconstruct props
    const { category, input } = props;

    //create state variable to hold the retrieved information
    const [retrieved_data, setRetrieved_data] = useState([]);

    //call the API to retrieve information
    useEffect(() => {
        Axios.get(`https://swapi.dev/api/${category}/${input}`)
            //update state variables
            .then(res => {
                setRetrieved_data(res.data)

                //if it's a person, we will run the API call again to get the homeworld
                if (category === 'people') {
                    Axios.get(`${retrieved_data.homeworld}`)
                        .then(res => {
                            const new_homeworld2 = res.data.name

                            //update state variable to get the homeworld
                            setRetrieved_data({ ...retrieved_data, new_homeworld: new_homeworld2 })
                        })
                }
            })
            .catch(err => displayError())
    }, [props])//adding props in the dependency array allows for when the user selects a new item, it will re-run the query to the API to get the new data

    const displayPeople = () => {
        return (
            <>
                <h1>{retrieved_data.name}</h1>

                <h3>Height: {retrieved_data.height} cm</h3>

                <h3>Mass: {retrieved_data.mass} kg</h3>

                <h3>Hair Color: {retrieved_data.hair_color}</h3>

                <h3>Skin Color: {retrieved_data.skin_color}</h3>

                <h3>Homeworld: {retrieved_data.new_homeworld}
                </h3>
            </>)
    }

    const displayPlanets = () => {
        return (
            <>
                <h1>{retrieved_data.name}</h1>

                <h3>Climate: {retrieved_data.climate}</h3>

                <h3>Terrain: {retrieved_data.terrain}</h3>

                <h3>Surface Water: {retrieved_data.surface_water}</h3>

                <h3>Population: {retrieved_data.population}</h3>
            </>

        )
    }

    //creating a function to display an error if th API request is unsuccessful
    const displayError = () => {
        return (
            <>
                <h1>These aren't the droids you're looking for</h1>
                <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/3326657-the-graham-norton-show-s20-e02-weekly-sneak-peak-3-youtube-preset-1920x1080-783391811912.jpg" alt="Obi Wan Kenobi" />
            </>
        )
    }


    return (
        <>
            {/* check for which category was selected to display their properties */}
            {category === 'people' ?
                displayPeople() :
                category === 'planets'
                    ? displayPlanets()
                    : displayError()
            }

        </>
    );
}

export default APICaller;