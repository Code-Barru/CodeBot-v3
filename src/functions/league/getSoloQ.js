const axios = require("axios");

module.exports = (client) => {
    client.getSoloQ = async (riotEncryptedID) => {

        const url = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${riotEncryptedID}`;
	
        var data = await axios.get(url).then(res => {
            return res.data;
        }).catch(error => {
            //console.error(error);
        });

        for (const queue of data) {
            if (queue.queueType === 'RANKED_SOLO_5x5')
                return queue;
        }
        return;
    }
}