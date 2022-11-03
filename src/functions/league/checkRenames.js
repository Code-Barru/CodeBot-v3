const axios = require('axios')

async function getRiotAccountById(summonerId) {
    url = encodeURI(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}`);

    data = await axios.get(url).then(res => {
        return res.data;
    }).catch(error => {
        //console.error(error);
    });

    return data;
}

module.exports = (client) => {
    client.checkRenames = async () => {
        const players = await client.executeSQL(`SELECT summonerName, summonerID
                                                FROM accounts
                                                ORDER BY summonerName
                                                `);
        
        for (const player of players) {
            const liveAccount = await getRiotAccountById(player.summonerID);

            if (player.summonerName == liveAccount.name)
                continue;
            
            await client.executeSQL(`UPDATE accounts
                                    SET summonerName='${liveAccount.name}'
                                    WHERE summonerName='${player.summonerName}'`
                                    );
            
            const guildChannels = await client.executeSQL(`SELECT *
                                                        FROM guildChannels
                                                        INNER JOIN guildTrack ON guildTrack.guildID=guildChannels.guildID
                                                        WHERE summonerID='${player.summonerID}'`
                                                        );
            for (const guildChannel of guildChannels) {
                await client.channels.cache.get(guildChannel.channelID).send(`:rotating_light: **${player.summonerName}** a changé son pseudo en **${liveAccount.name}**!:rotating_light:`);
            }
        }
    }
}