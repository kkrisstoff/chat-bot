/** @jsx React.DOM */
var React = require('react');

function logInAndStart(name, pass) {
    console.log(name, pass);
    network.ajaxRequest({
        type: 'POST',
        url: 'api/logInAndStart',
        callback: function (data) {
            console.log("logInAndStart", data);

        },
        errorCallback: function () {
            console.log("ERROR");
            console.log(arguments);
        },
        body: {
            name: name,
            password: pass
        }
    });
}

module.exports = User = React.createClass({
    getInitialState: function (props) {
        var props = props || this.props;
        return {
            user: props.user
        };
    },
    onClick: function (id, e) {
        var newUserState = this.state.user,
            username = newUserState.username,
            password = newUserState.password;
        newUserState.isStarted = !this.state.user.isStarted;
        logInAndStart(username, password);
        this.setState({
            user: newUserState
        });
    },
    render: function(){
        var user = this.state.user,
            name = user.username,
            pass = user.password,
            id = user.id,
            status = user.isStarted ? 'started' : 'stopped';
        console.log(id);
        return (
            <li className="message-item">
                <span className="user" data-pass={pass}>{name} </span>
                <span className={"user-controls " + status}  onClick={this.onClick.bind(this, id)}></span>
            </li>
            )
    }
});