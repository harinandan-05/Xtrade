const fetchs = require("node-fetch")
export async function getPrice(symbol:string){
    
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=QU6R7BNH5GDYYKA3`;

    const response = await fetch(url)
    const data = await response.json()
    console.log(data,"data from api")

    const timeseries = data["Time Series (Daily)"]
    if (!timeseries) {
        throw new Error("Could not fetch price data");
    }

    const laetestDate = Object.keys(timeseries)[0]
    const latestData = timeseries[laetestDate!]
    const closePrice = parseFloat(latestData["4. close"])
     if (isNaN(closePrice)) {
        throw new Error("Invalid price data");
    }
    
    return closePrice
}

module.exports = {getPrice}

