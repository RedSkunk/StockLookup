import React from "react";
import "./simpleAutosuggest.css";

class SimpleAutosuggest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputStr: "",
            highlightedStr: "",

            highlighted: -1,
            // if input is not in focus, suggestions is not displayed
            suggestions: this.props.suggestions,
            displayedSuggestions: [] // this is what gets displayed
        };
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.clickedSuggestion = this.clickedSuggestion.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.suggestions !== prevProps.suggestions) {
            this.setState({
                suggestions: this.props.suggestions,
                displayedSuggestions: this.props.suggestions
            });
        }
    }

    onChange(event) {
        this.setState({
            inputStr: event.target.value,
            highlightedStr: ""
        });
        this.props.onChange(event.target.value);
    }
    onFocus() {
        this.setState({
            displayedSuggestions: this.state.suggestions
        });
    }
    onBlur() {
        setTimeout( () => {
            this.setState({
                displayedSuggestions: []
            });
        }, 200);
    }
    onMouseEnter() {
        this.setState({
            highlighted: -1
        });
    }
    onKeyDown(event) {
        if (event.keyCode === 40 && 
                this.state.highlighted < this.state.suggestions.length-1) { // down
            this.setState({
                displayedSuggestions: this.state.suggestions,
                highlighted: this.state.highlighted+1,
                highlightedStr: this.state.suggestions[this.state.highlighted+1].symbol
            });
        }
        if (event.keyCode === 38 && 
                this.state.highlighted >= 0) { // up
            this.setState({
                displayedSuggestions: this.state.suggestions,
                highlighted: this.state.highlighted-1,
                highlightedStr: this.state.highlighted > 0 ? this.state.suggestions[this.state.highlighted-1].symbol:""
            });
        }
        if (event.keyCode === 13 && 
                this.state.highlighted >= 0 && 
                this.state.highlighted <= this.state.suggestions.length-1) { // enter
            this.props.selectedSuggestion(this.state.suggestions[this.state.highlighted]);
            this.setState({
                inputStr: this.state.suggestions[this.state.highlighted].symbol,
                displayedSuggestions: [],
                highlighted: -1,
                highlightedStr: ""
            });
        }
    }
    clickedSuggestion(suggestion) {
        console.log(suggestion);
        this.setState({
            inputStr: suggestion["symbol"]
        });
        this.props.selectedSuggestion(suggestion);
    }

    render() {
        return (
            <div className="auto-suggest-container">
                <input className="form-control" type="text" 
                    placeholder={this.props.placeholder} 
                    value={this.state.highlightedStr !== "" ? this.state.highlightedStr : this.state.inputStr} 
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown} 
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    />
                <div className="suggestion-container">
                    { this.state.displayedSuggestions.map((suggestion, index) => (
                        <div key={index} className={"row suggestion-item " + (this.state.highlighted===index ? "highlighted":"")} 
                                onClick={()=>this.clickedSuggestion(suggestion)}
                                onMouseEnter={this.onMouseEnter}>
                            <div className="col-3">{suggestion.symbol}</div>
                            <div className="col-6">{suggestion.name}</div>
                            <div className="col-3">{suggestion.exchange}</div>
                        </div>
                    )) }
                </div>
            </div>
        );
    }
}

export default SimpleAutosuggest;