# High Level Architecture Guide
This application is split into the frontend and the backend.

## Frontend
The frontend is built using [React](https://reactjs.org/) (bootstrapped from [create-react-app](https://facebook.github.io/create-react-app/)),
along with [Redux](https://react-redux.js.org/) for global state management. 
The LocalStorage web API is utilized to save searches and minimize internet usage. 
Additionally, the app utilizes built in PWA support from create-react-app. 
Routing is handled by [React Router](https://reacttraining.com/react-router/), and styling is partially handled by [Reactstrap](https://reactstrap.github.io/). 
The `/frontend/src/` directory contains the following 5 directories:

* `components` - Contains many React components, some of which are connected to the Redux store.
* `redux` - Contains redux modules, each containing actions, an initial state, and a reducer. These modules are combined in `reducer.js`.
* `strings` - Contains all displayed strings in frontend. Contains only English, but allows for quicker internationalization.
* `styles` - Contains SCSS files used for styling throughout app, as well as static images.
* `utils` - Contains utilities for application, including API Wrapper and Constants.

## Backend
The backend is built on [Flask](http://flask.pocoo.org/) (bootstrapped from [Flask Boilerplate](https://github.com/tko22/flask-boilerplate)). 
We use [SQLAlchemy](https://www.sqlalchemy.org/) as an ORM, and [PostgreSQL](https://www.postgresql.org/) for our database. 
Additionally we use [Celery](http://www.celeryproject.org/) execute asynchronous tasks, and [Redis](https://redis.io/) as a broker to hold tasks that have yet to be picked up by Celery worker.
