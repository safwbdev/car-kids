import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import ItemBox from './ItemBox';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/items/')
            .then(response => {
                this.setState({items: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    
    
    render() {
        const itemList = this.state.items.map(function(item, i) {
            //     <Link to={`/item/${item._id}`}>View</Link>
            //     </Grid>
            return <Grid key={i} xs={3}>
                        <ItemBox 
                            key={i} 
                            id={item._id}
                            image={item.item_images[0]}
                            name={item.item_name}
                            type={item.item_type}
                            rating={item.item_rating}
                             />
                             </Grid>
            });
        
        return (
            <Grid container>
                <Grid item xs={12}>
                    <h1>Home Page</h1>
                </Grid>
                {itemList}

        </Grid>
        )
    }
}
