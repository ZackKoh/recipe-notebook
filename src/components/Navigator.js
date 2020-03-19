import React, {useState} from "react";

import {Link as RouterLink} from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 250;

export default function(){
    const[isOpen, setIsOpen] = useState(false);

    return(<div>
        <AppBar position='static'>
            <Toolbar>
                <IconButton edge="start" onClick={() => setIsOpen(true)}>
                    <MenuIcon />
                </IconButton>
                <h3>Recipe NoteBook</h3>
            </Toolbar>
        </AppBar>
        <Drawer open={isOpen} onClose={() => setIsOpen(false)} onClick={() => setIsOpen(false)} style={{width: drawerWidth}}>
            <ListItem component={RouterLink} to="/">
                Main Page
            </ListItem>
            <ListItem component={RouterLink} to="/search">
                Browse Recipes
            </ListItem>
            <ListItem component={RouterLink} to="/new">
                Add Recipes
            </ListItem>
            <Divider />
            <ListItem component={RouterLink} to="/saves" >
                Saved Recipes
            </ListItem>
            <ListItem component={RouterLink} to="/uploads">
                Uploaded Recipes
            </ListItem>
        </Drawer>
    </div>)
}