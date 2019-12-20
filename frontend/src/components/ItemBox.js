import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Link } from "react-router-dom";

export default class ItemBox extends Component {
    render() {
        return (
            <Link to={`/item/${this.props.id}`} className="item-box">
              <Card className="card-item">
                <CardContent className="card-content">
                  <img src={this.props.image} className="width-full" alt="" />
                  <p>{this.props.name}</p>
                </CardContent>
                <CardActions disableSpacing>
                </CardActions>
              </Card>
            </Link>
        )
    }
}
