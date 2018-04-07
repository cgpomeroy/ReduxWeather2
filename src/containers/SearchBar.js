import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {clearErrorMessage, fetchWeather} from "../actions";

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
        this.props.clearErrorMessage();
        this.setState({term: ''});
    }

    onInputChange(e){
        this.setState({term: e.target.value});
    }

    displayError(){
        if(this.props.error){
            return <div className="alert alert-danger">{this.props.error}</div>
        }
    }


    render(){
        return(
            <div>
            <form
                className="input-group"
                onSubmit={this.onFormSubmit}
            >
                <input
                    className="form-control"
                    onChange={this.onInputChange}
                    placeholder="Get a five-day forecast in any US city."
                    value={this.state.term}
                />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Search</button>
                </span>
            </form>
                {this.displayError()}
            </div>
        );
    }
}

function matchDispatchToProps (dispatch){
    return bindActionCreators({ fetchWeather, clearErrorMessage }, dispatch);
};

function mapStateToProps({error}){
    return {error};
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchBar);