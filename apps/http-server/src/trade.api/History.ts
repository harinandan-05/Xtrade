
export  async function getSummary(symbol:string){
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=dM1IGM5BC0OOA0YDI`
    console.log(url)
    if(!url){
        return
    }

    const res = await fetch(url)
    const data = await res.json()

    const timeseries = data["Weekly Time Series"]
    if(!timeseries){
        return console.log("no res")
    }
    return timeseries

}


