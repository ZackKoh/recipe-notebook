import React, { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { Link as BrowserLink } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: 330,
        marginBottom: 16,
        marginRight: 16
    },
    media: {
        height: 140
    },
    header: {
        marginTop: 0
    },
    description: {
        marginTop: 0
    }
})

export default function (props) {
    const { recipe, saved, uploaded } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const saveRecipe = useCallback(() => {
        dispatch({ type: "SAVE", payload: { recipeId: recipe.id } });
        dispatch({ type: "RECIPE_SAVED", payload: { recipeId: recipe.id } });
    }, [dispatch, recipe.id])

    const unsaveRecipe = useCallback(() => {
        dispatch({ type: "UNSAVE", payload: { recipeId: recipe.id } });
        dispatch({ type: "RECIPE_UNSAVED", payload: { recipeId: recipe.id } });
    }, [dispatch, recipe.id])

    return (
        <Card className={classes.root}>
            <CardActionArea component={BrowserLink} to={`/recipe/${recipe.id}`}>
                <CardMedia
                    className={classes.media}
                    image={recipe.image}
                    title={recipe.name} />
                <CardContent>
                    <h2 className={classes.header}>{recipe.name}</h2>
                    <p className={classes.description}>{recipe.description}</p>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {!uploaded ? <Button onClick={saved ? unsaveRecipe : saveRecipe}>{saved ? "Unsave" : "Save"}</Button> : ''}
                SAVES: {recipe.saves}
                <Button component={BrowserLink} to={`/recipe/${recipe.id}`}>Read more</Button>
            </CardActions>
        </Card>
    )
}