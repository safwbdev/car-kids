import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container'
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <AppBar position="static">
                <Container>
                    <Link to="/" className="nav-link">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <DriveEtaIcon />
                            </IconButton>
                            <Typography variant="h6" >
                                Flux Kids
                            </Typography>
                        </Toolbar>
                    </Link>
                </Container>
            </AppBar>
        )
    }
}
