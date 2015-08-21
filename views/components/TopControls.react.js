/** @jsx React.DOM */

var React = require('react');

module.exports = TopControls = React.createClass({
    onFormSubmit: function (e) {
        e.preventDefault();
        var text = "test";

        this.props.onUserAdded(text);
    },
    render: function(){
        return (
            <div className="controls-holder">
                <form onSubmit={this.onFormSubmit}>
                    <input type="submit" className="form-control" value="Add..." />
                </form>
            </div>
            );
    }
});