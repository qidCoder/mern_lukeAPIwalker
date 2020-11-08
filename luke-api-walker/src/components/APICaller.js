//this component will take in the dropdown category and ID and then call the API to retrive the data. It will then display (conditionally) the data on the page

import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from '@reach/router';//to create hyperlink to planet

const APICaller = props => {
    //deconstruct props
    console.log(props)
    const { category, input } = props;

    //create state variable to hold the retrieved information
    const [retrieved_data, setRetrieved_data] = useState([]);

    //call the API to retrieve information
    useEffect(() => {
        Axios.get(`https://swapi.dev/api/${category}/${input}`)
            //update state variables
            .then(res => {
                setRetrieved_data(res.data)
                // console.log(retrieved_data)

                //if it's a person, we will run the API call again to get the homeworld
                if (category === 'people') {
                    // console.log("a person!")
                    // console.log(retrieved_data.homeworld)
                    Axios.get(retrieved_data.homeworld)
                        .then(res => {
                            const new_homeworld2 = res.data.name//variable for the homeworld name

                            const homeworld_id = retrieved_data.homeworld.slice(29).slice(0,-1);//getting the id from the URL calling the planet API by slicing the URL and getting the last digit
                            //The slice() method selects the elements   starting at the given start argument, and ends at, but does not include, the given end argument.

                            //update state variable to get the homeworld
                            setRetrieved_data({ 
                                ...retrieved_data, 
                                new_homeworld: new_homeworld2, 
                                homeworldID : homeworld_id })
                                // console.log(retrieved_data)
                        })
                        .catch(err => displayError())
                }
                // console.log(retrieved_data)
            })
            .catch(err => displayError())
    }, [category, input])//adding props in the dependency array allows for when the user selects a new item, it will re-run the query to the API to get the new data

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
                
                <Link to={`/planets/${retrieved_data.homeworldID}`} > Click to go to planet {retrieved_data.new_homeworld} </Link>
                
                
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

    const displayFilms = () => {
        return (
            <>
                <h1>{retrieved_data.title}</h1>

                <h3>Episode: {retrieved_data.episode_id}</h3>

                <h3>Director: {retrieved_data.director}</h3>

                <h3>Release Date: {retrieved_data.release_date}</h3>

                <h3>Opening Crawl: {retrieved_data.opening_crawl}</h3>
            </>

        )
    }

    const displayStarships = () => {
        return (
            <>
                <h1>{retrieved_data.name}</h1>

                <h3>Consumables: {retrieved_data.consumables}</h3>

                <h3>Crew: {retrieved_data.crew}</h3>

                <h3>Manufacturer: {retrieved_data.manufacturer}</h3>

                <h3>Model: {retrieved_data.model}</h3>
            </>

        )
    }

    const displayVehicles = () => {
        return (
            <>
                <h1>{retrieved_data.name}</h1>

                <h3>Consumables: {retrieved_data.consumables}</h3>

                <h3>Crew: {retrieved_data.crew}</h3>

                <h3>Model: {retrieved_data.model}</h3>

                <h3>Vehicle Class: {retrieved_data.vehicle_class}</h3>
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
                    : category === 'films'
                    ? displayFilms()
                    : category === 'starships'
                    ? displayStarships()
                    : category === 'vehicles'
                    ? displayVehicles()
                    : displayError()
            }

        </>
    );
}

export default APICaller;