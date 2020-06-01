const baseUrl = "https://www.alphavantage.co/query?";
const apikey = "57CU5UIPLOT7PXK8";

const alphaVantageService = {
    searchStock: async function(keywords) {
        return fetch(baseUrl+"function=SYMBOL_SEARCH&keywords="+keywords+
            "&apikey="+apikey);
    }
}
export default alphaVantageService;