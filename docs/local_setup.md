# Localhost Setup
Clone the childs-play-tool repository onto your computer.

## Frontend
In your terminal, cd into the frontend folder and type in
```
 npm install
``` 
To run your program, type in 
```
npm start
```
The site will be displayed on: http://localhost:3000


## Backend
Open a new tab and in your terminal, cd into the backend folder

### Running Development Server

First, install virtualenv, create and activate the environment called **venv**:

```bash
$ pip3 install virtualenv
$ virtualenv -p python3 venv
$ source venv/bin/activate
```
You will then have a ```(venv)``` before the ```$```, meaning that you are now in your virtual environment. Then, install the python package dependencies, which include Flask.
```
(venv)$ pip install -r requirements.txt
```

To install Postgres with Homebrew([postgresapp](http://postgresapp.com/) also works). If you are using linux, use your linux distributon's package manager to install postgres (**do this in new terminal**):
```
$ brew install postgresql
$ brew link postgresql
```
This should start your postgres server:
```
$ brew services start postgresql
```
To stop:
```
$ brew services stop postgresql
```
On a separate CLI, check whether you can access the database. Your postgres server must be on in order for this to work. For mac:
```
$ createdb
$ psql -h localhost
# \q
```
For windows:
```
$ psql -p 5432 -h localhost -U postgres
# \q
```
After installing Postgres, create a user(with name 'testusr' and password 'password') and a database called 'testdb' then grant privileges. We will do this in your CLI (run the `psql` command below using the command above corresponding to your OS):
```
$ psql
# create user testusr with password 'password';
# create database cpdb owner testusr encoding 'utf-8';
# GRANT ALL PRIVILEGES ON DATABASE cpdb TO testusr;
```
Note: Please replace the user name and password and database name to what you want in your own application. You must change those configurations in ```config.py``` and in ```.env```
<br>
**Open 3 CLIs**
<br>
**CLI 1 (in venv)**

To run the server type in:
```
(venv)$ python manage.py runserver
```
**CLI 2**

Install [redis-server](https://redis.io/topics/quickstart) then run:
```
$ redis-server
```
**CLI 3 (in venv)**

To run the asynchronous worker, type in:
```
(venv)$ celery -A celery-worker.celery worker
```
To deactivate the virtualenvs when you are done using them, run:
```
(venv)$ deactivate venv
```
If you are using pip, your command line will have `(venv)$` in front instead of the `(flask......) bash-3.2$` Now look above for instructions to run the server.

The API should be at http://127.0.0.1:8080/ 
