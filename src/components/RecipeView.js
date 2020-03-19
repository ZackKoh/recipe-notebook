import React, { useCallback } from 'react';

import { useSelector, useDispatch } from "react-redux";

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    image: {
        maxWidth: "95vw"
    },
    header: {
        display: "flex",
    },
})

export default function (props) {
    const { id } = props;
    const classes = useStyles();
    const recipe = useSelector(state => state.recipes.find(item => item.id === parseInt(id)));
    const savedRecipes = useSelector(state => state.user.savedRecipes);
    const uploadedRecipes = useSelector(state => state.user.uploadedRecipes);
    const dispatch = useDispatch();
    const saveRecipe = useCallback(() => {
        dispatch({ type: "SAVE", payload: { recipeId: id } });
        dispatch({ type: "RECIPE_SAVED", payload: { recipeId: id } });
    }, [dispatch, id])

    const unsaveRecipe = useCallback(() => {
        dispatch({ type: "UNSAVE", payload: { recipeId: id } });
        dispatch({ type: "RECIPE_UNSAVED", payload: { recipeId: id } });
    }, [dispatch, id])

    return (
        <div>
            <div className={classes.header}>
                <h2>{recipe.name}</h2>
                {
                    !uploadedRecipes.some(recipeId => recipeId === id) ?
                        <Button onClick={savedRecipes.some(recipeId => recipeId === id) ? unsaveRecipe : saveRecipe}>
                            {savedRecipes.some(recipeId => recipeId === id) ? "Unsave" : "Save"}
                        </Button> : ''
                }
            </div>
            <img src={recipe.image} className={classes.image} alt={recipe.name} />
            <p>Saves: {recipe.saves}</p>
            <h3>Description</h3>
            <p>{recipe.description}</p>
            <p>Preparation Time: {recipe.cookingTime}</p>
            <p>Categories: {recipe.categories.join()}</p>
            <h3>Ingredients required</h3>
            <ul>
                {recipe.ingredients.map((ingredient, idx) => {
                    return (
                        <li key={idx}>{ingredient}</li>
                    )
                })}
            </ul>
            <h3>Preparation steps</h3>
            <ol>{recipe.instructions.map((instruction, idx) => {
                return (
                    <li key={idx}>{instruction}</li>
                )
            })}
            </ol>
        </div>
    )
}