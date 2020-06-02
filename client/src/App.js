import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import SimpleAutosuggest from "./component/simple-autosuggest/simpleAutosuggest";
import "./app.css";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestions: []
        };

        this.fetchStockList = this.fetchStockList.bind(this);
        this.selectedSuggestion = this.selectedSuggestion.bind(this);
        this.onChange = this.onChange.bind(this);
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
        this.fetchStockList(value);
    }

    render() {
        return (
            <div>                
                <div className="main-content row">
                    <div className="card col-6">
                        <div className="card-body">
                            <div className="card-subtitle">Stock Ticker Autosuggest</div>
                            <div className="row">
                                <SimpleAutosuggest 
                                    placeholder="Enter stock ticker here, e.g. APPL"
                                    suggestions={this.state.suggestions}
                                    selectedSuggestion={this.selectedSuggestion}
                                    onChange={this.onChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
