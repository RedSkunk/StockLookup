import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import SimpleAutosuggest from "./component/simple-autosuggest/simpleAutosuggest";
import "./app.css";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestions: [],
            lastUpdateDate: null
        };

        this.fetchStockList = this.fetchStockList.bind(this);
        this.fetchLastUpdateDate = this.fetchLastUpdateDate.bind(this);
        this.selectedSuggestion = this.selectedSuggestion.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.fetchLastUpdateDate();
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

    async fetchLastUpdateDate() {
        let response = await fetch("http://stocklookup-env.eba-mdpeyzrt.us-east-2.elasticbeanstalk.com/api/stock/last-update-date");
        let responseJson = await response.json();
        if (responseJson["status"] == null || responseJson["status"] !== "success") {
            return;
        }
        let lastUpdateDate = new Date(responseJson["lastUpdateDate"]);
        this.setState({
            lastUpdateDate: lastUpdateDate
        });
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
                    <div className="card col-md-6">
                        <div className="card-body">
                            <div className="card-subtitle">Stock Ticker Auto-suggest</div>
                            <div className="row">
                                <SimpleAutosuggest 
                                    placeholder="Enter stock ticker here, e.g. AAPL"
                                    suggestions={this.state.suggestions}
                                    selectedSuggestion={this.selectedSuggestion}
                                    onChange={this.onChange}/>
                            </div>
                            {this.state.lastUpdateDate != null &&
                                <p>Last updated {this.state.lastUpdateDate.getDate()+"/"+
                                (this.state.lastUpdateDate.getMonth()+1)+"/"+
                                this.state.lastUpdateDate.getFullYear()}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
