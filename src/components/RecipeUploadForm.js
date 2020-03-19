import React, { useReducer, useState } from 'react';

import { useDispatch } from 'react-redux';

import { Redirect } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';

import { addRecipe, getId } from '../redux/actions';

const useStyles = makeStyles({
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    }
})

const initialFormState = {
    name: '',
    cookingTime: '',
    description: '',
    categories: '',
    ingredients: '',
    instructions: '',
}

function formReducer(state, action) {
    switch (action.type) {
        case "INPUT":
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case "DELETE":
            {
                let newArray = state[action.payload.name].slice();
                newArray.splice(action.payload.index, 1);
                return {
                    ...state,
                    [action.payload.name]: newArray
                }
            }
        default:
            throw new Error("Invalid Action detected")
    }
}

export default function () {
    const classes = useStyles();
    const [formState, formDispatch] = useReducer(formReducer, initialFormState);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const fileInput = React.createRef();

    const saveRecipe = e => {
        e.preventDefault();
        //Parsing for the categories
        const categoryArray = formState.categories.split(" ");
        //Parsing for ingredients
        const ingredientArray = formState.ingredients.split("\n");
        // Parsing for method
        const instructionArray = formState.instructions.split("\n")
        console.log(fileInput.current.files[0]);
        //Extract the image into an ImageUrl
        let dataUrl = ''
        const reader = new FileReader();
        reader.readAsDataURL(fileInput.current.files[0]);
        reader.onload = ((e) => {
            //Add the url to the dataObject
            dataUrl = reader.result;
            const dataObj = {
                name: formState.name,
                dateUploaded: new Date(),
                description: formState.description,
                categories: categoryArray,
                image: dataUrl,
                cookingTime: formState.cookingTime,
                ingredients: ingredientArray,
                instructions: instructionArray,
                saves: 0
            }
            dispatch(addRecipe(dataObj));
            dispatch({ type: "UPLOAD", payload: { recipeId: getId() } });
            setDialogOpen(true);
        })
    }

    const handleChange = name => e => {
        formDispatch({ type: "INPUT", payload: { name: name, value: e.target.value } })
    }

    const handleDialog = () => {
        setDialogOpen(false);
        setIsSubmitted(true);
    }

    return (isSubmitted ? <Redirect to="/" /> : <>
        <h2>Submit new recipe</h2>
        <p>Enter the details of your new recipe here</p>
        <form onSubmit={saveRecipe} className={classes.form}>
            <input type='file' accept="image/*" ref={fileInput} id="fileInput" />
            <label htmlFor="fileInput">Upload a picture of the recipe</label>
            <TextField
                label='Recipe Name'
                variant="outlined"
                value={formState.name}
                onChange={handleChange("name")}
                required />
            <TextField
                label='Cooking time'
                variant="outlined"
                value={formState.cookingTime}
                onChange={handleChange("cookingTime")}
                required />
            <TextField
                label='Description'
                variant="outlined"
                value={formState.description}
                onChange={handleChange("description")}
                required />
            <TextField
                helperText="Enter each category followed by a space"
                label='Categories'
                variant="outlined"
                value={formState.categories}
                onChange={handleChange("categories")}
                required />
            <TextField
                helperText="Enter each ingredient followed by a new line"
                label='Ingredients Required'
                variant="outlined"
                multiline rows={7}
                value={formState.ingredients}
                onChange={handleChange("ingredients")}
                required />
            <TextField
                helperText="Enter each instruction followed by a new line"
                label='Preparation Instructions'
                variant="outlined"
                multiline rows={7}
                value={formState.instructions}
                onChange={handleChange("instructions")}
                required />
            <Button type='submit'>Upload Recipe</Button>
        </form>
        <Dialog open={dialogOpen}>
            Your recipe has been uploaded
            <Button onClick={handleDialog}>Ok</Button>
        </Dialog>
    </>)
}