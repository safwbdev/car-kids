import React, { Component } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';

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
            slidesToScroll: 1,
            arrows: true,
            className: 'slides'
          };

        const imageSlides = this.state.images.map(function(img, id){
            return <div key={id}>
                        <img src={img["imgurl"]} alt="" className="width-full" />
                    </div>
        });
        let stars = [];
        for (let i=0;i<this.state.rating ;i++){
            stars.push(<StarIcon />)
        }


        return (
            <Grid container spacing={3}> 
                <Grid item 
                    lg={8} 
                    md={8} 
                    sm={8} 
                    xs={12} >
                    <Slider {...settings}>
                        {imageSlides}
                    </Slider>
                </Grid>
                <Grid item 
                    lg={4} 
                    md={4} 
                    sm={4} 
                    xs={12} >
                    <h1>{this.state.name}</h1>
                    <p>Rating: {stars}</p>
                    <p>Type: <strong>{this.state.type}</strong></p>
                    <p>Date of availbility: <strong>{this.state.availability}</strong></p>
                </Grid>
                
                <Grid item 
                    lg={6} 
                    md={6} 
                    sm={6} 
                    xs={6} >
                        <Link to="/">
                            <Button variant="contained">
                                <ArrowBackIosIcon /> Back
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item 
                        lg={6} 
                        md={6} 
                        sm={6} 
                        xs={6} >
                        <Link to={`/edit/${this.props.match.params.id}`}>
                            <Button variant="contained">
                                <EditIcon /> Edit
                            </Button>
                        </Link>
                    </Grid>
            </Grid>
        )
    }
}
