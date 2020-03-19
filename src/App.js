import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import Navigator from "./components/Navigator";
const LandingPage = lazy(() => import('./components/LandingPage'));
const RecipePage = lazy(() => import('./components/RecipePage'))
const RecipeUploadForm = lazy(() => import('./components/RecipeUploadForm'))
const RecipeSearch = lazy(() => import('./components/RecipeSearch'))

const useStyles = makeStyles({
  display: {
    margin: 8
  }
})

function getRecipes(recipeArray, userArray) {
  let arr = [];
  recipeArray.forEach((recipe) => {
    if (userArray.includes(recipe.id)) {
      arr.unshift(recipe);
    }
  })
  return arr
}

function App() {
  const recipes = useSelector(state => state.recipes);
  const saved = getRecipes(recipes, useSelector(state => state.user.savedRecipes));
  const uploaded = getRecipes(recipes, useSelector(state => state.user.uploadedRecipes));
  const classes = useStyles();

  return (
    <div>
      <Navigator />
      <div className={classes.display}>
        <Suspense fallback={<div>Now Loading ...</div>}>
          <Switch>
            <Route path="/recipe/:id">
              <RecipePage />
            </Route>
            <Route path="/saves" component={() => <RecipeSearch recipes={saved} />} />
            <Route path="/uploads" component={() => <RecipeSearch recipes={uploaded} />} />
            <Route path="/search" component={() => <RecipeSearch recipes={recipes} />} />
            <Route path="/new">
              <RecipeUploadForm />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
