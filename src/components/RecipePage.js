import React from 'react';

import { useParams } from 'react-router-dom';

import RecipeView from './RecipeView';

export default function () {
    const {id} = useParams();

    return (<>
        <RecipeView id={parseInt(id)}/>
    </>)
}