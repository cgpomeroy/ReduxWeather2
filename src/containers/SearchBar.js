import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchWeather} from "../actions";

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state ={term: ''};

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(e){
        e.preventDefault();

        //We'll fetch data here!
        this.props.fetchWeather(this.state.term);
        this.setState({term: ''});
    }

    onInputChange(e){
        this.setState({term: e.target.value});
    }


    render(){
        return(
            <form
                className="input-group"
                onSubmit={this.onFormSubmit}
            >
                <input
                    className="form-control"
                    onChange={this.onInputChange}
                    placeholder="Get a five-day forecast in any city."
                    value={this.state.term}
                />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Search</button>
                </span>
            </form>
        );
    }
}

function matchDispatchToProps (dispatch){
    return bindActionCreators({ fetchWeather }, dispatch);
};

export default connect(null, matchDispatchToProps)(SearchBar);