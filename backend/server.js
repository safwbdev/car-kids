const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const itemRoutes = express.Router();
let Item = require('./item.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/catalog", { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


// get all 
itemRoutes.route('/').get(function(req, res) {
    Item.find(function(err, item) {
        if (err) {
            console.log(err);
        } else {
            res.json(item);
        }
    });
});

// get specific item
itemRoutes.route('/:id').get(function(req, res){
    let id = req.params.id;
    Item.findById(id, function(err, item) {
        res.json(item)
    })
});


// add
itemRoutes.route('/add').post(function(req, res) {
    let item = new Item(req.body);
    item.save()
        .then(item => {
            res.status(200).json({'item': 'item added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new item failed');
        });
});


itemRoutes.route('/update/:id').post(function(req, res) {
    Item.findById(req.params.id, function(err, item) {
        if (!item)
            res.status(404).send('data is not found');
        else
            item.item_name = req.body.item_name;
            item.item_images = req.body.item_images;
            item.item_type = req.body.item_type;
            item.item_available = req.body.item_available;
            item.item_rating = req.body.item_rating;

            item.save().then(item => {
                res.json('Item updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/items', itemRoutes);

app.listen(PORT, function() {
    console.log(`Server is running on Port: ${PORT}`);
});

