# Dashboard Enade

Dashboard to record performance of educational institutions and filter data for analysis. The dashboard menu provides the data to be filtered and viewed. The Institutions menu offers the option to register the performance of the institutions and the courses that it offers. The courses menu offers the option of registering the courses to be linked to institutions.

## Starting 

Below are instructions for installing the project and some important notes. The project is divided into two isolated applications:

```
    -- AppServer 
    -- AppClient
```
### Prerequisites 

Both applications are using docker. The main prerequisite is to have the docker set up on your machine. Here's the official docker documentation link: https://docs.docker.com/install/

### Installation

The project root folder is as follows:
```
    -- AppServer 
    -- AppClient
    -- docker-compose.yml
    -- README.md
```
Execute the command below to upload the two applications in their respective containers:
```
$ docker-compose up
```
To access the main project application (frontend), go to your browser:
```
http://localhost:8000
```

To access the api, go to:
```
http://localhost:3000
```

OBS: An API UI has not been made. I recommend using POSTMAN (https://www.getpostman.com/) to test the API. The endpoints are:
```
- Coursers
GET /coursers  - List all coursers
GET /coursers/<id> - Get course by id
POST /coursers/create - Create a course
PUT /coursers/<id>/update - Update a course
DELETE /coursers/<id> - Delete a course

- Instituitions
GET /institutions  - List all institutions
POST /institutions/create - Create a institution
PUT /institutions/<id>/update - Update a institution
DELETE /institutions/<id> - Delete a institution

- Analytics
GET /filter_institutions  - Get institutions order by general note
GET /filter_coursers_in_institutions/<courseName>/<orderBy>/ - Get coursers in instituitions
GET /filters_headers  - Get filters to headers cards to page dashboard
```

## Tests
Before running the tests, enter the AppServer / directory and run to install the project modules locally.
```
 npm install
```
Run the command: 
```
npm run test
```
OBS: We just created tests for the API.

## Main Technologies
* [Node]() - Framework javascript.
* [Reactjs]() - Framework frontend.
* [MongoDB]() - Non-relational database.
* [Express]() - Framework for route abstractions, middlewares, and many other functions for the API.

OBS: I used Mongo Cloud (https://cloud.mongodb.com). The database access settings are in the AppServer / config / db.js directory.

## Future improvements
The project contemplates the requirements of the scope of the test, however, some points that were not in those requirements are important, but due to the time x learning curve of the technologies used, they were not implemented. These would be:
* API Authentication
* API Cache (use nginx)
* Application authentication to configure what each user profile would have access to on the system. Example: The admin user would have access to all the options and the user (institution) would only have access to data visualization and reports.

## Credits

The frontend base template was used in the https://github.com/creativetimofficial/light-bootstrap-dashboard-react repository

## Authors
* **Lucas Alves** - [Linkedin](https://www.linkedin.com/in/lucas-alves-s/)
