# Neighborhood Map

## Overview

This application uses React and Google Maps API to display a map of a neighborhood in
Singapore. It performs a search for nearby restaurants and returns information
about the restaurant using Facebook Graph API.

## Features

Each restaurant is indicated by a marker on the map. An info window with
available information about the restaurant can be activated by click or mouse
over of the marker. Clicking on the hamburger button opens a draw displaying a
list view of the restaurants. A text box is available for the user to filter the
list via text input. Clicking on a list item will display the corresponding
marker and info window.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Therefore, the default service worker only works in production build.

## Setup

* Clone the repository to your working directory:
* Install all project dependencies with `npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

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
