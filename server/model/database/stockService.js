const db = require("./db");

exports.addStock = async function(symbol, name, exchange) {
    try {
        const res = await db.query("INSERT INTO stock(symbol, name, exchange) " + 
            "VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING *", 
            [symbol, name, exchange]);
        if (res.rows[0]) {
            return true;
        }
        return false;
    } catch (err) {
        console.log(err.stack);
        return false;
    }
}

exports.clearStockList = async function() {
    try {
        const res = await db.query("DELETE FROM stock", 
            []);
        return true;
    } catch (err) {
        console.log(err.stack);
        return false;
    }
}

exports.searchStock = async function(startWith) {
    try {
        const res = await db.query("SELECT * FROM stock WHERE symbol ILIKE $1", 
            [startWith+"%"]);        
        return res.rows;
    } catch (err) {
        console.log(err.stack);
        return false;
    }
}