# Example Bank App

This app allows you to create a user/login with a default bank account and deposit to and withdraw from it.  Browser local storage is being used to save user/account info.

Node is used to run the local server and serve the static files, everything is rendered on the client side.

### Main technologies used:
- React 15.5
- Redux 3.6
- Webpack 2.4
- React Router 4.1

Steps to run the app (Node v5 or greater and NPM must be installed):

1) clone repository

        git clone https://github.com/cbengtson85/bankapp.git

2) cd into project root and run the following to install dependencies

        npm install

3) build the app with webpack

        npm run build

4) start the node server

        npm start

5) navigate to http://localhost:8080/ to view the app

6) execute unit tests

        npm test


Know Issue: Each tab will be it's own instance of the app as sessionStorage is being used which is per tab.
