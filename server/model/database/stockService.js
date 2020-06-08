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
        const res = await db.query("SELECT * FROM stock WHERE symbol ILIKE $1 OR name ILIKE $2 LIMIT 10", 
            [startWith+"%", "%"+startWith+"%"]);        
        return res.rows;
    } catch (err) {
        console.log(err.stack);
        return false;
    }
}

exports.addUpdateRecord = async function() {
    try {
        const res = await db.query("INSERT INTO update_record(update_date) VALUES (NOW())", 
            []);
        return true;
    } catch (err) {
        console.log(err.stack);
        return false;
    }
}

exports.getLastUpdateDate = async function() {
    try {
        const res = await db.query("SELECT * FROM update_record ORDER BY update_date DESC LIMIT 1", 
            []);
        return res.rows[0]["update_date"];
    } catch (err) {
        console.log(err.stack);
        return false;
    }
}