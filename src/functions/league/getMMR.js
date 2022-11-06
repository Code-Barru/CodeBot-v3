const axios = require('axios');

module.exports = (client) => {
    client.getMMR = async (summonerName) => {

        url = encodeURI(`https://euw.whatismymmr.com/api/v1/summoner?name=${summonerName}`);

        data = await axios.get(url).then(res => {
            return res.data;
        }).catch(error => {
            //console.error(error);
        });

        return data;
    }
}