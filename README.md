car-kids
## INSTAL DEPENDENCIES FIRST

Before you run anny of the applications, run the following the following command in each directory:

### `npm install`


## BACKEND

Before running this project you must first go into the 'backend' directory, and run the following command:

### `npx nodemon server.js`


## MongoDB

MongoDB Database is 'catalog;
create with POST 'http://localhost:4000/catalog/add' with the following details:

{
        "item_images": [
            {
                "imgurl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAXlh45KawprnOkcqcqW-gBLByLEXqc6vSI0senAiZ-0myMuUi4A&s"
            }
        ],
        "item_name": "Hot  Wheels Red",
        "item_type": "Remote Controlled",
        "item_available": "2019-12-30T10:00:20.000Z",
        "item_rating": "5"
    }

You may use the sample data from the 'sample-data.json' file

## FRONTEND

This is the directory for frontend part of the site.
Go into this directory and run the following command:

### `npm start`
