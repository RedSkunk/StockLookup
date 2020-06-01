const PromiseRouter = require("express-promise-router");
const router = new PromiseRouter();
const stockService = require("../model/database").stockService;
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

    await stock.clearStockList();
    let stocks = inputJson["stocks"];
    for (const stock of stocks) {
        stockService.addStock(stock["symbol"], stock["name"], stock["exchange"]);
    }
    
    res.status(200).send(responseFormatter.success(response));
});

module.exports = router;
