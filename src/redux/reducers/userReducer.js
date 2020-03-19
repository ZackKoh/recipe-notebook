const initialState = {
    name: "Thomas",
    savedRecipes: [],
    uploadedRecipes: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SAVE': {
            let newArray = state.savedRecipes.slice();
            newArray.push(action.payload.recipeId);
            return {
                ...state,
                savedRecipes: newArray
            }
        }
        case 'UNSAVE':
            return {
                ...state,
                savedRecipes: state.savedRecipes.filter(id => id !== action.payload.recipeId)
            }
        case 'UPLOAD': {
            let newArray = state.uploadedRecipes.slice();
            newArray.push(action.payload.recipeId);
            return {
                ...state,
                uploadedRecipes: newArray
            }
        }
        default:
            return state;
    }
}