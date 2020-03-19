import React from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import RecipeCard from './RecipeCard';

function getTop3Recipes(array) {
    let arr = array.slice();
    arr.sort((a, b) => b.saves - a.saves);
    return arr.slice(0, 3);
}

const useStyles = makeStyles({
    results: {
        display: "flex",
        flexWrap: "wrap",
    },
})

export default function () {
    const recipes = useSelector(state => state.recipes);
    const saved = useSelector(state => state.user.savedRecipes);
    const uploaded = useSelector(state => state.user.uploadedRecipes);
    const classes = useStyles();

    return (<>
        <h2>Welcome to the recipe notebook!</h2>
        <Link to='/search'>Click Here to start browsing for recipes!</Link>
        <p>Or...</p>
        <Link to='/new'>Click here to upload your own!</Link>
        <h3>Hot recipes</h3>
        <div className={classes.results}>
            {getTop3Recipes(recipes).map(recipe => {
                return (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        saved={saved.includes(recipe.id)}
                        uploaded={uploaded.includes(recipe.id)} />
                )
            })}
        </div>
    </>)
}