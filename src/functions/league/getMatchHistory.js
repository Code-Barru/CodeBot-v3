const axios = require("axios");


module.exports = (client) => {
    client.getMatchHistory = async function getMatchHistory(summoner) {

        var url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?start=0&count=5`;

        matchIDs = await axios.get(url).then(res => {
            return res.data;
        }).catch(error => {
            console.error(error);
        });

        history = []

        for (const id of matchIDs) {

            url = `https://europe.api.riotgames.com/lol/match/v5/matches/${id}`;
            match = await axios.get(url).then(res => {
                return res.data;
            }).catch(error => {
                console.error(error);
            });

            var i=0;

            for (const player of match.info.participants) {

                if (player.summonerName === summoner.name) {
                    match = {
                        kills: player.kills,
                        deaths: player.deaths,
                        assists: player.assists,
                        champion: player.championName,
                        win: player.win
                    }
                    history.push(match)
                    break;
                }

            }
        }
        return history;
    }
}