/** @jsx React.DOM */

// Constants
var Events = require('../Events');
var debug = require('../Helpers').debug;

// Global variables
var store = require('../store');
var flux = require('../flux/dispatcher');

function NYI(event) {
    alert('not yet implemented!');
    event.preventDefault();
}

function CreateForm(onSave, onCancel, previousValue) {

    function onKeyUp(e) {
        if (e.keyCode == 13) {
            return onSave(e);
        }
        return true;
    }

    return (
        <tr>
            <td>
                <input type="text" className="form-control" placeholder='Label'
                  defaultValue={previousValue || ''} onKeyUp={onKeyUp}
                  ref="label" />
            </td>
            <td>
                (NYI)
            </td>
            <td>
                <div className="btn-group" role="group">
                    <button className="btn btn-success" onClick={onSave}>save</button>
                    <button className="btn btn-danger" onClick={onCancel}>cancel</button>
                </div>
            </td>
        </tr>);
}

var CategoryListItem = React.createClass({

    getInitialState: function() {
        return {
            editMode: false
        }
    },

    _onSaveEdit: function(e) {
        var label = this.refs.label.getDOMNode().value.trim();
        if (!label)
            return false;

        var category = {
            title: label
        };

        flux.dispatch({
            type: Events.user.updated_category,
            id: this.props.cat.id,
            category: category
        });

        this.setState({
            editMode: false
        });
        e.preventDefault();
    },

    _onCancelEdit: function(e) {
        this.setState({
            editMode: false
        });
        e.preventDefault();
    },
    _onShowEdit: function(e) {
        this.setState({
            editMode: true
        }, function() {
            // then
            this.refs.label.getDOMNode().select();
        });
        e.preventDefault();
    },

    // TODO
    _onDelete: NYI,

    render: function() {

        if (this.state.editMode)
            return CreateForm(this._onSaveEdit, this._onCancelEdit, this.props.cat.title);

        return (
            <tr key={this.props.cat.id}>
                <td>{this.props.cat.title}</td>
                <td>(NYI)</td>
                <td>
                    <div className="btn-group" role="group">
                        <button className="btn btn-primary" onClick={this._onShowEdit}>edit</button>
                        <button className="btn btn-danger" onClick={this._onDelete}>delete</button>
                    </div>
                </td>
            </tr>
        );
    }
});

module.exports = React.createClass({

    _listener: function() {
        this.setState({
            categories: store.categories
        });
    },

    getInitialState: function() {
        return {
            showForm: false,
            categories: []
        }
    },

    componentDidMount: function() {
        store.subscribeMaybeGet(Events.server.loaded_categories, this._listener);
    },

    componentWillUnmount: function() {
        store.removeListener(Events.server.loaded_categories, this._listener);
    },

    _onShowForm: function(e) {
        e.preventDefault();
        this.setState({
            showForm: !this.state.showForm
        });
    },

    _onSave: function(e) {
        e.preventDefault();

        var label = this.refs.label.getDOMNode().value.trim();
        if (!label)
            return false;

        var category = {
            title: label
        };

        flux.dispatch({
            type: Events.user.created_category,
            category: category
        });

        this.refs.label.getDOMNode().value = '';
        this.setState({
            showForm: false
        });
        return false;
    },

    render: function() {
        var items = this.state.categories.map(function (cat) {
            return (
                <CategoryListItem cat={cat} key={cat.id} />
            );
        });

        var maybeForm = this.state.showForm ? CreateForm(this._onSave, this._onShowForm)
                                            : <tr/>;

        return (
        <div>
            <div className="page-header">
                <h1>Categories</h1>
            </div>

            <div className="panel panel-default">
                <div className="panel-body">
                    <div>
                        You can find here the list of categories, modify them or
                        even deleting them.
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-11">
                        <a className="btn btn-primary text-uppercase pull-right" href="#" onClick={this._onShowForm}>
                            add a category<strong>+</strong>
                        </a>
                    </div>
                </div>

                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>CATEGORY NAME</th>
                            <th>SUPERCATEGORY</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maybeForm}
                        {items}
                    </tbody>
                </table>
            </div>
        </div>);
    }
});

