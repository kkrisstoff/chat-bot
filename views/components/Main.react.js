/** @jsx React.DOM */

var React = require('react');
var Users = require('./Users.react');
var TopControls = require('./TopControls.react');

module.exports = Main = React.createClass({
    componentWillMount: function () {
        console.log("componentWillMount");
    },
    componentDidMount: function () {
        console.log("componentDidMount");
    },
    componentWillReceiveProps: function () {
        console.log("componentWillReceiveProps");
    },
    componentWillUpdate: function () {
        console.log("componentWillUpdate");
    },
    getInitialState: function (props) {
        var props = props || this.props;
        console.log(props);
        return {
            users: props.users
        };
    },
    /**
     * Controls --> User Added
     * @param text
     */
    onUserAdded: function (user) {
        var self = this;

        network.ajaxRequest({
            type: 'POST',
            url: 'api/addNegotiator',
            callback: function (data) {
                console.log(data);
                var user = {
                    id: data.id,
                    username: data.username,
                    password: '123',
                    isLoggedIn: !!data.sid,
                    isStarted: false
                };
                self.addItemToState(user);
            },
            errorCallback: function () {
                console.log("ERROR");
                console.log(arguments);
            }
        });

    },

    addItemToState: function (item) {
        console.log("New User added", item);
        var newUsers = [].concat(this.state.users);
        newUsers.push(item);

        this.setState({
            users: newUsers
        });
    },


    render: function() {

        return (
            <div className="chat-app-holder">
                <TopControls onUserAdded={this.onUserAdded}/>
                <Users users={this.state.users} />
            </div>
            );
    }

});
