/** @jsx React.DOM */
var React = require('react');

function connectAndStart(id) {
    console.log("id: ", id);
    network.ajaxRequest({
        type: 'POST',
        url: 'api/connectAndStart',
        callback: function (data) {
            console.log("logInAndStart", data);

        },
        errorCallback: function () {
            console.log("ERROR");
            console.log(arguments);
        },
        body: {
            id: id
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
        connectAndStart(id);
        this.setState({
            user: newUserState
        });
    },
    onGoClicked: function (id, e) {

        network.ajaxRequest({
            type: 'POST',
            url: 'api/sentMessage',
            callback: function (data) {
                console.log("sentMessage: DONE");

            },
            errorCallback: function () {
                console.log("ERROR");
                console.log(arguments);
            }
        });
    },
    render: function(){
        var user = this.state.user,
            name = user.username,
            pass = user.password,
            id = user.id,
            isStartedClass = user.isStarted ? 'started' : 'stopped',
            isLoggedInClass = user.isLoggedIn ? 'logged' : '';
        console.log(id);
        return (
            <li className="message-item">
                <span className={"user " + isLoggedInClass}>{name}</span>
                <span className={"user-controls " + isStartedClass}  onClick={this.onClick.bind(this, id)}></span>
                <span onClick={this.onGoClicked.bind(this, id)}>GO!</span>
            </li>
            )
    }
});