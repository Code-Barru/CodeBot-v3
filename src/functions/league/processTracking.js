module.exports = (client) => {
    client.processTracking = async () => {
        const players = await client.executeSQL(`SELECT * FROM accounts ORDER BY summonerName`);

        for (const player of players) {
            var soloQ = await client.getSoloQ(player.summonerID);
            if (!soloQ) {
                continue;
            }
            
            var newRankStatus = client.compareRanks(player, soloQ);
            
            if (newRankStatus === '=')
                continue;
            
            await client.sendRankUpdates(player, soloQ, newRankStatus);
            var res = await client.executeSQL(`UPDATE accounts
                                SET tier='${soloQ.tier}',
                                    \`rank\`='${soloQ.rank}',
                                    lp=${soloQ.leaguePoints}
                                    WHERE summonerID='${player.summonerID}'`
                            );
        }
    }
}