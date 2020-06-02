import React from "react";
import SimpleAutosuggest from "../simple-autosuggest/simpleAutosuggest";
import "./topBar.css";

class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestions: []
        };

        this.fetchStockList = this.fetchStockList.bind(this);
        // this.changedSearch = this.changedSearch.bind(this);
        // this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        // this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        // this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        // // this.onSuggestionHighlighted = this.onSuggestionHighlighted.bind(this);
        // this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.clickedButton = this.clickedButton.bind(this);
        this.selectedSuggestion = this.selectedSuggestion.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    clickedButton() {
        this.setState({
            searchStr: "aaa"
        });
    }

    async fetchStockList(searchStr) {
        console.log("fetch");
        let response = await fetch("http://stocklookup-env.eba-mdpeyzrt.us-east-2.elasticbeanstalk.com/api/stock/search?startWith="+searchStr);
        let responseJson = await response.json();
        if (responseJson["status"] == null || responseJson["status"] !== "success") {
            return;
        }
        this.setState({
            suggestions: responseJson["stocks"]
        }, ()=>console.log(this.state.suggestions));
    }

    selectedSuggestion(suggestion) {
        console.log(suggestion);
    }
    onChange(value) {
        console.log(value);
        this.fetchStockList(value);
    }

    render() {
        
        return (
            <div className="top-bar row">
                <SimpleAutosuggest 
                    placeholder="Enter stock ticker here, e.g. APPL"
                    suggestions={this.state.suggestions}
                    selectedSuggestion={this.selectedSuggestion}
                    onChange={this.onChange}/>
                <button onClick={this.clickedButton}/>
                {/* <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    alwaysRenderSuggestions={true}
                    onSuggestionSelected={this.onSuggestionSelected}
                    // onSuggestionHighlighted={this.onSuggestionHighlighted}
                    inputProps={inputProps}
                    theme={{container: "search col-md-7 col-sm-12", 
                        input:"input", 
                        suggestion:"suggestion", 
                        suggestionsList:"suggestionsList",
                        suggestionsContainer:"suggestionsContainer"}}
                /> */}
            </div>
        );
    }
}

export default TopBar;
