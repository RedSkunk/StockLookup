const PromiseRouter = require("express-promise-router");
const router = new PromiseRouter();
const stockService = require("../model/database").stockService;
const inputValidate = require("../utility/inputValidate");
const responseFormatter = require("../utility/responseFormatter");
const constants = require("../utility/constants");

router.post("/", async function(req, res, next) {
    let inputJson = req.body;
    let secretIdInput = inputJson["secretId"];
    
    let response = {};
    if (secretIdInput == null || secretIdInput !== constants.secretId) {
        res.status(200).send(responseFormatter.errorIncorrectSecret(response));
        return;
    }

    await stockService.clearStockList();
    let stocks = inputJson["stocks"];
    for (const stock of stocks) {
        stockService.addStock(stock["symbol"], stock["name"], stock["exchange"]);
    }
    
    res.status(200).send(responseFormatter.success(response));
});

router.get("/search", async function(req, res, next) {
    let response = {};

    if (inputValidate.isWhitespaceOrNull(req.query["startWith"])) {
        res.status(200).send(responseFormatter.errorIncorrectParam(response, 
            "startWith is invalid"));
        return;
    }

    let stocks = await stockService.searchStock(req.query["startWith"]);
    response["stocks"] = stocks;
    res.status(200).send(responseFormatter.success(response));
});

module.exports = router;
