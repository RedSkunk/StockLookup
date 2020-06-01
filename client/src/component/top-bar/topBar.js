import React from "react";
import Autosuggest from 'react-autosuggest';

import "./topBar.css";

class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchStr: "",
            suggestions: [{"symbol":"AAPL","name":"Apple Inc. - Common Stock","exchange":"NASDAQ"},{"symbol":"AAP","name":"Advance Auto Parts Inc Advance Auto Parts Inc W/I","exchange":"NYSE"}]
        };

        this.changedSearch = this.changedSearch.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    }

    onSuggestionsFetchRequested({ value }) {
        console.log(value);
    }

    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    }

    getSuggestionValue(suggestion) {
        return suggestion.symbol;
    }

    renderSuggestion(suggestion) {
        return (
            <div>
                {suggestion.name}
            </div>
        );
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
