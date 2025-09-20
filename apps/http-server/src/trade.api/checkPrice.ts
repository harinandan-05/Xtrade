import { PriceData } from "../types";

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
    console.log(timeseries,"time series")
    const laetestDate = Object.keys(timeseries)[0]
    const latestData = timeseries[laetestDate!]
    const high = parseFloat(latestData["1. open"])
    const open = parseFloat(latestData["2. high"])
    const low = parseFloat(latestData["3. low"])
    const close = parseFloat(latestData["4. close"])
    const finalData:PriceData ={high , open , low , close} 
    return finalData
}

module.exports = {getPrice}

