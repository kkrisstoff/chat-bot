/** @jsx React.DOM */

var React = require('react');
var User = require('./User.react.js');

module.exports = Users = React.createClass({

    render: function(){
        console.log(this.props);
        var users = this.props.users,
            usersArr = [],
            content;
        for (var user in users) {
            usersArr.push(users[user]);
        }
        content = usersArr.map(function(user){
            console.log(user);
            return (
                <User user={user} />
                )
        });

        return (
            <ul className="messages-holder">{content}</ul>
            )
    }
});