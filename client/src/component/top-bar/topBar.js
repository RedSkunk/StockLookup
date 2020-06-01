import React from "react";
import Autosuggest from 'react-autosuggest';

import "./topBar.css";

class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchStr: "",
            value: "",
            suggestions: []
        };

        this.changedSearch = this.changedSearch.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    }

    // changedSearch(event) {
    //     this.setState({
    //         search: event.target.value
    //     }, this.searchStock);
    // }

    // async searchStock() {
    //     let searchStr = this.state.search;
    //     let response = await AlphaVantageService.searchStock(searchStr);
    //     let responseJson = await response.json();
    //     console.log(responseJson);
    // }

    onSuggestionsFetchRequested({ value }) {
        console.log(value);
    }

    onSuggestionsClearRequested() {

    }

    getSuggestionValue() {

    }

    renderSuggestion() {

    }

    changedSearch(event) {
        this.setState({
            searchStr: event.target.value
        });
    }

    render() {
        const inputProps = {
            placeholder: "Enter stock ticker here, e.g. AAPL",
            value: this.state.searchStr,
            onChange: this.changedSearch
        };
        return (
            <div className="top-bar row">
                {/* <input className="search form-control col-7" type="text" 
                    placeholder="Enter stock ticker here, e.g. AAPL" 
                    value={this.state.search} onChange={this.changedSearch}/> */}
                <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    theme={{container: "col-7", input:"search form-control"}}
                />
            </div>
        );
    }
}

export default TopBar;
