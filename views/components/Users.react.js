/** @jsx React.DOM */

var React = require('react');
var User = require('./User.react.js');

module.exports = Users = React.createClass({

    render: function(){
        console.log(this.props);
        var content = this.props.users.map(function(user){
            return (
                <User user={user} />
                )
        });

        return (
            <ul className="messages-holder">{content}</ul>
            )
    }
});