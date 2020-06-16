## Recipe Notebook

This is a sample application meant to simulate how a user would upload and save recipes to the internet.

### Features of the application

Currently, a person visiting the site can do the following:

- See the top 3 recipes (in terms of likes)
- Search for recipes. These results can be filtered by:
  - Recipe name
  - Category
  - Ingredients used
- Sort the search results by the following:
  - Recipe name
  - Date uploaded
  - Number of saves
- Upload a recipe via a form. Currently only one picture is supported.
- View the recipes that the user uploaded.
- Save a recipe, and view the saved recipes

All these functions can be accessed through the menu icon on the top left hand corner.

### Additional notes

I did not write the recipes. I referred to them to create realistic examples of sample data.

Clicking on the search button when all filter fields are empty would return all results.

### Acknowledgements

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Redux is used to provide some memory management for the system.

Material-UI was used to provide some basic styling to the application.

In-app navigation is done via react-router

Most recipes referenced come from allRecipes.com, with some slight modifications.

The site can be accessed via https://zackkoh.github.io/recipe-notebook.