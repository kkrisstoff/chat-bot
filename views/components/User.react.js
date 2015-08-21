/** @jsx React.DOM */
var React = require('react');

module.exports = User = React.createClass({
    onClick: function () {
        console.log(arguments);
    },
    render: function(){
        var user = this.props.user;
        console.log(user);
        return (
            <li className="message-item">
                <span className="user">{user}</span>
                <span onClick={this.onClick}>Click</span>
            </li>
            )
    }
});