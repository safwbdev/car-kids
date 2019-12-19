import React, { Component } from 'react'
import axios from 'axios';

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'lol',
            rating: 'pop',
            availability: '',
            type: '',
            images: []
        };

    }

    componentDidMount() {
        axios.get(`http://localhost:4000/items/${this.props.match.params.id}`)
            .then(response => {
                console.log(response.data)
                this.setState(
                    {
                        name: response.data.item_name,
                        type: response.data.item_type,
                        availability: response.data.item_available,
                        rating: response.data.item_rating,
                        images: response.data.item_images
                    });
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    render() {
        console.log(this.state.images)
        return (
            <div>
                <h1>ITEM PAGE</h1>
                <p>{this.state.name}</p>
                <p>{this.state.type}</p>
                <p>{this.state.availability}</p>
                <p>{this.state.rating}</p>
                <p>{this.state.images}</p>
            </div>
        )
    }
}
