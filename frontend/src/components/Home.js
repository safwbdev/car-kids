import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from 'axios';

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
                return <div key={i} >
                    <p>{item.item_name}</p>
                    <p>{item.item_rating}</p>
                    <p>{item.item_type}</p>
                    <p>{item.item_images[0]}</p>
                    <p>{item._id}</p>
                    <Link to={`/item/${item._id}`}>View</Link>
                    </div>
            });
        
        return (
            <div>
                <h1>Home Page</h1>
                {itemList}
            </div>
        )
    }
}
