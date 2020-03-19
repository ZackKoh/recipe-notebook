import sweetPotato from "../../assets/Sweet_potato_burritos.jpg"
import eggplant from "../../assets/Eggplant_parmesan.jpg";
import cranberrySauce from "../../assets/Cranberry_sauce.jpg";
import spinachQuiche from "../../assets/crustless_spinach_quiche.jpg";

function createRecipe(id, name, dateUploaded, description, categories, image, cookingTime, ingredients, instructions, saves) {
    return {
        id: id,
        name: name,
        dateUploaded: dateUploaded,
        description: description,
        categories: categories,
        image: image,
        cookingTime: cookingTime,
        ingredients: ingredients,
        instructions: instructions,
        saves: saves
    }
}

//Populate the initial state
const initialState = [
    createRecipe(
        1,
        "Sweet Potato Burritos",
        new Date(2020, 1, 28),
        "Make a burrito using sweet potatoes!",
        ["Mexican"],
        sweetPotato,
        "40 minutes",
        [
            "1 tablespoon vegetable oil",
            "1 onion, chopped",
            "4 cloves garlic, minced",
            "6 cups canned kidney beans, drained",
            "2 cups water",
            "3 tablespoons chili powder",
            "4 tablespoons prepared mustard",
            "2 teaspoons ground curmin",
            "1 pinch cayenne pepper, or to taste",
            "3 tablespoons soy sauce",
            "4 cups mashed cooked sweet potatoes",
            "12 10-inch flour tortillas, warmed",
            "8 ounces shredded cheddar cheese",
        ],
        [
            "Preheat oven to 350 degrees F (175 degrees C)",
            "Heat oil in a medium skillet and saute onion and garlic until soft.",
            "Mash beans into the onion mixture. Gradually stir in water; heat until warm, 2 to 3 minutes.",
            "Remove from heat and stir in the soy sauce, chili powder, mustard, cumin, and cayenne pepper.",
            "Divide bean mixture and mashed sweet potatoes evenly between the tortillas, and top them with cheese.",
            "Fold tortillas burrito-style around the fillings and place on a baking sheet.",
            "Bake in preheated oven until warmed through, about 12 mins",
        ],
        25
    ),
    createRecipe(
        2,
        "Eggplant Parmesan",
        new Date(2020, 2, 1),
        "This is a no fry variation of this popular dish, and is just as delicious!",
        ["Italian"],
        eggplant,
        "1 hour",
        [
            "3 eggplants, peeled and thinly sliced",
            "2 eggs, beaten",
            "4 cups italian seasoned breadcrumbs",
            "6 cups spaghetti sauce, divided",
            "1 (16 ounce) package mozarella cheese, shredded and divided",
            "1/2 cup grated parmesan cheese, divided",
            "1/2 teaspoon dried basil",
        ],
        [
            "Preheat oven to 350 degrees F (175 degrees C).",
            "Dip eggplant slices in egg, then in bread crumbs.",
            "Place in a single layer on a baking sheet.",
            "Bake in preheated oven for 5 minutes on each side.",
            "In a 9x13 inch baking dish spread spaghetti sauce to cover the bottom.",
            "Place a layer of eggplant slices in the sauce. Sprinkle with mozzarella and Parmesan cheeses.",
            "Repeat with remaining ingredients, ending with the cheeses.",
            "Sprinkle basil on top.",
            "Bake in preheated oven for 35 minutes, or until golden brown",
        ],
        33,
    ),
    createRecipe(
        3,
        "Cranberry Sauce",
        new Date(2020, 2, 3),
        "For desserts, mostly...",
        ["Desserts", "Sauces"],
        cranberrySauce,
        "20 mins",
        [
            "12 ounces cranberries",
            "1 cup orange juice",
            "1 cup white sugar",
        ],
        [
            "In a medium sized saucepan over medium heat, dissolve the sugar in the orange juice.",
            "Stir in the cranberries and cook until the cranberries start to pop (about 10 minutes).",
            "Remove from heat and place sauce in a bowl. Cranberry sauce will thicken as it cools.",
        ],
        11,
    ),
    createRecipe(
        4,
        "Crustless Spinach Quiche",
        new Date(2020, 2, 4),
        "Spinach Pie, without the crust",
        ["Pie","Mains"],
        spinachQuiche,
        "50 min",
        [
            "1 tablespoon vegetable oil",
            "1 chopped onion",
            "10 ounce chopped spinach",
            "5 eggs, beaten",
            "3 cups shredded cheese",
            "1/4 teaspoon salt",
            "1/8 teaspoon ground black pepper",
        ],
        [
            "Preheat oven to 175 degrees C",
            "Lightly grease 9-inch pie pan",
            "Heat oil in large skillet over medium-high heat",
            "Add onions and cook, stirring occasionally, until onions are soft",
            "Stir in spinach and cook until moisture is driven off",
            "Blend in a large bowl, the eggs, salt pepper and spinach",
            "Scoop mixture into prepared pie pan",
            "Bake in preheated oven until eggs have set, approximately 30 mins"
        ],
        10,
    )
];

export default function (state = initialState, action) {
    let newArray = state.slice();
    switch (action.type) {
        case "RECIPE_SAVED":{
            let index = newArray.findIndex(item => item.id === action.payload.recipeId);
            newArray[index].saves++;
            return newArray;
        }
        case "RECIPE_UNSAVED":{
            let index = newArray.findIndex(item => item.id === action.payload.recipeId);
            newArray[index].saves--;
            return newArray;
        }
        case "ADD_RECIPE":
            newArray.push(action.payload);
            return newArray;
        case "EDIT_RECIPE":
            newArray[action.payload.index] = action.payload.recipe
            return newArray
        default:
            return state
    }
}