/** @jsx React.DOM */

var React = require('react');
var Main = require('./views/components/Main.react');

var initialStateHolder = document.getElementById('initial-state'),
    initialState = JSON.parse(initialStateHolder.innerHTML),
    mountNode = document.getElementById('react-app');
//initialStateHolder.innerHTML = '';
console.log(initialState);
React.render(React.createElement(Main, initialState), mountNode);