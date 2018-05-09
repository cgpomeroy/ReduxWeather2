import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {clearErrorMessage, fetchWeather} from "../actions";
import FontAwesome from 'react-fontawesome';

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
            <div style={{padding: "1em"}}>
            <form
                className="input-group"
                onSubmit={this.onFormSubmit}
                style={{borderBottom: "1px solid #4286D4"}}
            >
                <span className="input-group-btn">
                    <button
                        className="btn btn-secondary"
                        style={{border: "none", backgroundColor: "rgba(54,124,214,0)"}}
                        type="submit"><FontAwesome name='search'/></button>
                </span>
                <input
                    className="form-control"
                    onChange={this.onInputChange}
                    style={{border: "none", backgroundColor: "rgba(54,124,214,0)", color: "white", fontSize: "2em"}}
                    value={this.state.term}
                />
                <span className="input-group-btn">
                    <button
                        className="btn btn-secondary"
                        onClick={()=>{this.setState({term: ""}, this.props.clearErrorMessage)}}
                        style={{border: "none", backgroundColor: "rgba(54,124,214,0)"}}
                        type="button"
                    ><FontAwesome name='times'/></button>
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