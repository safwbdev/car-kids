import React, { Component } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Fab from '@material-ui/core/Fab';

export default class Edit extends Component {

    constructor(props) {
        super(props);


        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeTodoImage = this.onChangeTodoImage.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            startDate: new Date(),
            name: '',
            rating: '',
            availability: '',
            type: '',
            // images: [],
            images: [{ imgurl: "" }]
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

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeType(e) {
        this.setState({
            type: e.target.value
        });
    }
    onChangeTodoImage(e) {
        this.setState({
            images: e.target.value
        });
    }
    onChangeDate(date) {
        this.setState({
            availability: date
        });
    }
    onChangeRating(e) {
        this.setState({
            rating: e.target.value
        });
    }


    handleImageURLChange = id => evt => {
        const newImageArray = this.state.images.map((image, sid) => {
          if (id !== sid) return image;
          return { ...image, imgurl: evt.target.value };
        });
    
        this.setState({ images: newImageArray });
      };
    
      handleAddImageURL = () => {
        this.setState({
          images: this.state.images.concat([{ imgurl: "" }])

        });
        console.log(this.state.images);
      };
    
      handleRemoveImageURL = id => () => {
        this.setState({
          images: this.state.images.filter((s, sid) => id !== sid)
        });
      };


    onSubmit(e) {
        e.preventDefault();
        const obj = {
            item_name: this.state.name,
            item_type: this.state.type,
            item_available: this.state.availability,
            item_rating: this.state.rating,
            item_images: this.state.images
        };
        axios.post('http://localhost:4000/items/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h1>Edit Page</h1>
                <form onSubmit={this.onSubmit}>
                    <Grid container spacing={3}> 
                        <Grid item 
                            lg={12} 
                            md={12} 
                            sm={12} 
                            xs={12}>
                            <TextField 
                                required 
                                label="Name" 
                                value={this.state.name} 
                                onChange={this.onChangeName} 
                                variant="outlined" />

                        </Grid>
                        <Grid item 
                            lg={12} 
                            md={12} 
                            sm={12} 
                            xs={12}>
                        <label>Item Type: </label>
                        <select value={this.state.type} onChange={this.onChangeType}>
                            <option value="Electric">Electric</option>
                            <option value="Plastic">Plastic</option>
                            <option value="Wooden">Wooden</option>
                            <option value="Remote Controlled">Remote Controlled</option>
                        </select>
                        
                        </Grid>
                        <Grid item 
                            lg={12} 
                            md={12} 
                            sm={12} 
                            xs={12} >
                            <h6>Upload Images</h6>
                            {this.state.images.map((image, id) => (
                                <Grid item 
                                key={id}
                                lg={12} 
                                md={12} 
                                sm={12} 
                                xs={12}
                                >
                                    <TextField 
                                        required 
                                        label={`Image ${(id + 1)}`}
                                        value={image.imgurl}
                                        placeholder="Add image URL"
                                        onChange={this.handleImageURLChange(id)}
                                        variant="outlined" />{'  '}
                                    <Fab 
                                        variant="contained" 
                                        size="small" 
                                        color="secondary"
                                        onClick={this.handleRemoveImageURL(id)}>
                                        <ClearIcon />
                                    </Fab>
                            </Grid>
                            ))}
                            <Button 
                                variant="contained" 
                                onClick={this.handleAddImageURL}>
                                <AddIcon />Add Image URL
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <label>Available Date: </label>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.onChangeDate}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <label>Rating: </label>
                            <select 
                                value={this.state.rating} 
                                onChange={this.onChangeRating}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </Grid>
                        <Grid item xs={12}>
                            <Link to={`/item/${this.props.match.params.id}`}>
                                <Button variant="contained">
                                    <ArrowBackIosIcon /> Back
                                </Button>
                            </Link>
                            <Button variant="contained"  type="submit">Update</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }
}
