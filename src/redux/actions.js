let nextId = 4; //Already have four recipes in the memory as a sample

export const addRecipe = content => ({
    type: "ADD_RECIPE",
    payload: {
        ...content,
        id: ++nextId
    }
})

export const getId = () => {
    return nextId;
}