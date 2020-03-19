import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import RecipeCard from './RecipeCard';

const useStyles = makeStyles({
    searchBar: {
        display: "flex",
        marginBottom: 16
    },
    searchBarMobile: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: 16
    },
    sorter: {
        marginBottom: 16
    },
    results: {
        display: "flex",
        flexWrap: "wrap",
    },
})

function filterResults(array, filterObj) {
    let arr = array.slice();
    if (filterObj.name !== '') {
        console.log(filterObj.name);
        arr = arr.filter((item) => item.name.toLowerCase().includes(filterObj.name.toLowerCase()));
    }
    if (filterObj.categories !== '') {
        const searchStrings = filterObj.categories.split(" ");
        if (array.length === arr.length) {
            arr = [];
            searchStrings.forEach((searchString) => {
                arr = arr.concat(array.filter((item) => item.categories.some(category => category.toLowerCase().includes(searchString.toLowerCase()))));
            })
        }
        else {
            let holder = [];
            searchStrings.forEach((searchString) => {
                holder = holder.concat(arr.filter((item) => item.categories.some(category => category.toLowerCase().includes(searchString.toLowerCase()))));
            })
            arr = holder;
        }
    }
    if (filterObj.ingredients !== '') {
        const searchStrings = filterObj.ingredients.split(" ");
        if (array.length === arr.length) {
            arr = [];
            searchStrings.forEach((searchString) => {
                arr = arr.concat(array.filter((item) => item.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchString.toLowerCase()))));
            })
        }
        else {
            let holder = [];
            searchStrings.forEach((searchString) => {
                holder = holder.concat(arr.filter((item) => item.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchString.toLowerCase()))));
            })
            arr = holder;
        }
    }
    return arr;
}

function sortResults(array, sortObj) {
    function sortByName(a, b) {
        if (a.toLowerCase() < b.toLowerCase()) {
            return -1;
        }
        else if (a.toLowerCase() > b.toLowerCase()) {
            return 1
        }
        else {
            return 0;
        }
    }
    let arr = array.slice();
    switch (sortObj.property) {
        case 'name':
            if (sortObj.isAsc) {
                return arr.sort((a, b) => sortByName(a.name, b.name))
            }
            else {
                return arr.sort((a, b) => sortByName(b.name, a.name))
            }
        case 'dateUploaded':
        case 'saves':
            if (sortObj.isAsc) {
                return arr.sort((a, b) => a[sortObj.property] - b[sortObj.property]);
            }
            else {
                return arr.sort((a, b) => b[sortObj.property] - a[sortObj.property])
            }
        default:
            return arr
    }
}

export default function (props) {
    const allResults = props.recipes;
    const classes = useStyles();
    const isMobile = useMediaQuery('(max-width:800px)');
    const saved = useSelector(state => state.user.savedRecipes);
    const uploaded = useSelector(state => state.user.uploadedRecipes);

    const [search, setSearch] = useState({ name: '', categories: '', ingredients: '' });
    const [triggerSearch, setTriggerSearch] = useState(false);
    const [sort, setSort] = useState({ property: "", isAsc: false });
    const [results, setResults] = useState(allResults);

    useEffect(() => {
        if (triggerSearch) {
            setResults(filterResults(allResults, search))
            setTriggerSearch(false);
        }
    }, [triggerSearch, search, allResults])

    const handleSearchChange = name => e => {
        setSearch(
            {
                ...search,
                [name]: e.target.value
            }
        )
    }

    const handleSortChange = name => () => {
        if (name === sort.property) {
            setSort(
                {
                    ...sort,
                    isAsc: !sort.isAsc
                }
            )
        }
        else {
            setSort(
                {
                    property: name,
                    isAsc: false
                }
            )
        }
    }

    const startSearch = () => {
        setTriggerSearch(true);
    }

    return (<div>
        <h2>Browse Recipes</h2>
        <div>
            <div className={isMobile ? classes.searchBarMobile : classes.searchBar}>
                <TextField label="name" variant='outlined' value={search.name} onChange={handleSearchChange('name')} />
                <TextField label="categories" variant='outlined' value={search.categories} onChange={handleSearchChange('categories')} />
                <TextField label="ingredients" variant='outlined' value={search.ingredients} onChange={handleSearchChange('ingredients')} />
            </div>
            <Button variant="outlined" onClick={startSearch}>Search</Button>
        </div>
        <div className={classes.sorter}>
            <p>Sort By: </p>
            <Button
                variant="outlined"
                onClick={handleSortChange('name')}
                endIcon={sort.property === 'name' && (sort.isAsc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}>
                name
            </Button>
            <Button
                variant="outlined"
                onClick={handleSortChange('dateUploaded')}
                endIcon={sort.property === 'dateUploaded' && (sort.isAsc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}>
                date uploaded
            </Button>
            <Button
                variant="outlined"
                onClick={handleSortChange('saves')}
                endIcon={sort.property === 'saves' && (sort.isAsc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}>
                saves
            </Button>
        </div>
        <div className={classes.results}>
            {results.length !== 0 ? sortResults(results, sort).map(recipe => {
                return (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        saved={saved.includes(recipe.id)}
                        uploaded={uploaded.includes(recipe.id)} />
                )
            }) : "No results match your query"}
        </div>
    </div>)
}