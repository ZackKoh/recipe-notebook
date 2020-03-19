import React, {useEffect, useState} from 'react';

import RecipeSearch from './RecipeSearch';

import { useSelector } from 'react-redux';

function getRecipes(recipeArray, userArray) {
    let arr = [];
    recipeArray.forEach((recipe) => {
        if (userArray.includes(recipe.id)) {
            arr.unshift(recipe);
        }
    })
    return arr
}

export default function (props) {
    const type = props.type;
    const recipes = useSelector(state => state.recipes);
    const saved = useSelector(state => state.user.savedRecipes);
    const uploaded = useSelector(state => state.user.uploadedRecipes);
    const [results, setResults] = useState([]);
    console.log(results);

    useEffect(() => {
        console.log(type);
        switch(type) {
            case "SAVES":
                setResults(getRecipes(recipes, saved));
                break;
            case "UPLOADS":
                setResults(getRecipes(recipes, uploaded));
                break;
            default:
                setResults(recipes)
        }
    }, [type, recipes, saved, uploaded])

    return <RecipeSearch allRecipes={results} type={type}/>

}