import React, { Component } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            rating: '',
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
            console.log(this.state.rating)
    }


    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          };

        const imageSlides = this.state.images.map(function(img, id){
            return <div key={id}>
                        <img src={img["imgurl"]} alt="" />
                    </div>
        }
        );
        return (
            <Grid container spacing={3}> 
                <Grid item xs={8}>
                    <Slider {...settings}>
                        {imageSlides}
                    </Slider>
                </Grid>
                <Grid item xs={4}>
                    <h1>{this.state.name}</h1>
                    <p>type: {this.state.type}</p>
                    <p>date availbale: {this.state.availability}</p>
                    <p>rating: {this.state.rating}</p>
                    <Link to={`/edit/${this.props.match.params.id}`}>Edit</Link>
                </Grid>
            </Grid>
        )
    }
}
