#Neighborhood Map

This application uses Google Maps API to display a map of a neighborhood in
Singapore. It performs a search for nearby restaurants and returns information
about the restaurant using Facebook Graph API.

Each restaurant is indicated by a marker on the map that can be clicked on to
display available information about the restaurant. Clicking on the hamburger
button opens a draw displaying a list view of the restaurants. A text box is
available for the user to filter the list via text input. Clicking on a list
item will display the corresponding marker and info window.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to Run

* Clone the repository to your working directory:
* Install all project dependencies with `npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

## Dependencies

* create-react-app
* react-burger-menu
* google-maps-react

The generated project includes React and ReactDOM as dependencies. It also includes a set of scripts used by Create React App as a development dependency. You may install other dependencies (for example, React Router) with `npm`:

```sh
npm install --save react-router-dom
```

Alternatively you may use `yarn`:

```sh
yarn add react-router-dom
```

This works for any library, not just `react-router-dom`.
