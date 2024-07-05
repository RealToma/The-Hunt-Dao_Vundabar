const express = require("express");
var cors = require('cors')
require('dotenv').config();
// const PORT = process.env.PORT || 3001;
const PORT = 3001;

const app = express();
const Binance = require('binance-api-node').default;
const Binance_client = Binance();
const Axios = require('axios');



app.use(cors())
// const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

let priceEth = 0;
setInterval(async () => {
    let prices;
    try {
        prices = await Binance_client.prices()
    }
    catch (error) {
        return console.log(error);
    }
    // const prices = await Binance_client.prices()
    Object.keys(prices).forEach(function (key) {
        if (key === 'ETHUSDT') {
            priceEth = prices[key];
        }
    });
}, 2000)
app.get('/get_price_ether', function (req, res) {
    res.send({
        priceEth: priceEth
    })
});

app.get('/get_total_supply', async function (req, res) {
    let config_url = "https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0x4387946a7ed6561cf3390faaac90c1f52b593f2e&apikey=GKT561CCZZB4PWB94HAPCSAD1R5BPXQTUA"
    try {
        let response = await Axios.get(config_url);
        res.send({
            totalSupply: response.data.result
        })
    }
    catch (error) {
        console.log(error);
    }
});

app.get('/get_historical_price', async function (req, res) {
    let config_url = "https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/1/USD/0x4387946a7ed6561cf3390faaac90c1f52b593f2e/?quote-currency=USD&format=JSON&from=2022-05-01&to=2022-08-11&prices-at-asc=true&key=ckey_2b40cb99889a4066ab5a155d5ae"
    try {
        let response = await Axios.get(config_url);
        let priceTemp = [];
        for (let i = 0; i < response.data.data[0].prices.length; i++) {
            let each = {
                date: response.data.data[0].prices[i].date,
                price: response.data.data[0].prices[i].price
            }
            priceTemp.push(each);
        }
        res.send({
            historicalPrice: priceTemp
        })
    }
    catch (error) {
        console.log(error);
    }
});


app.get('/get_all_twitter', async function (req, res) {
    let config_url = "https://api.twitter.com/2/tweets/search/recent?query=from:TheHuntToken&tweet.fields=created_at&expansions=author_id&user.fields=created_at";

    // if (!BEARER_TOKEN) {
    //     res.status(400).send(authMessage);
    // }

    const token = process.env.TWITTER_BEARER_TOKEN;
    const requestConfig = {
        url: config_url,
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + token
        },
        json: true,
    };

    let response;
    try {
        response = await Axios(requestConfig);
    }
    catch (error) {
        console.log(error);
        return res.send({ flagSuccess: false});
    }
    let twitterData = [];
    for (let i = 0; i < response.data.data.length; i++) {
        let config_user_url = `https://api.twitter.com/2/users/${response.data.data[i].author_id}`;
        let requestUserConfig = {
            url: config_user_url,
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + token
            },
            json: true,
        };
        let responseUser = await Axios(requestUserConfig);
        let twitterEachData = {
            name: responseUser.data.data.name,
            username: responseUser.data.data.username,
            text: response.data.data[i].text,
            created_at: new Date(response.data.data[i].created_at).toLocaleString()
        }
        twitterData.push(twitterEachData);
    }
    return res.send({ flagSuccess: true, twitterData: twitterData });
});





app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});