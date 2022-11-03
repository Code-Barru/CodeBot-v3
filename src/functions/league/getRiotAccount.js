const axios = require("axios");

module.exports = (client) => {
    client.getRiotAccount = async (summonerName) => {
        url = encodeURI(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`);

        data = await axios.get(url).then(res => {
            return res.data;
        }).catch(error => {
            //console.error(error);
        });

        return data;
    }
}