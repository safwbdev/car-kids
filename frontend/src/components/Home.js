import React, { Component } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import ItemBox from './ItemBox';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            currentPage: 1,
            itemsPerPage: 5
        };
        this.handleClick = this.handleClick.bind(this);
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
    componentDidUpdate(){
        axios.get('http://localhost:4000/items/')
            .then(response => {
                this.setState({items: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
        console.log(Number(event.target.id))
    }

    
    
    render() {

        

        const { currentPage, itemsPerPage } = this.state;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = this.state.items.slice(indexOfFirstItem, indexOfLastItem);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.items.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </li>
            );
        });


        const itemList = currentItems.map(function(item, i) {

            return <Grid 
                        key={i} 
                        item={true}
                        lg={3} 
                        md={3} 
                        sm={4} 
                        xs={6} 
                        >
                        <ItemBox 
                            key={i} 
                            id={item._id}
                            image={item.item_images[0]["imgurl"]}
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
                <Grid container spacing={2}>
                    {itemList}
                </Grid>
                <Grid container spacing={8}>
                <Grid item xs={12}>
                    <ul className="page-numbers">
                    {renderPageNumbers}
                    </ul>
                </Grid>
                </Grid>
            </Grid>
        )
    }
}
