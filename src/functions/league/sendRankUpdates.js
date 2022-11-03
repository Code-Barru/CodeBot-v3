module.exports = (client) => {
    client.sendRankUpdates = async (oldRank, newRank, newRankStatus) => {

        const guildChannels = await client.executeSQL(`SELECT *
                                                FROM guildChannels
                                                INNER JOIN guildTrack ON guildTrack.guildID=guildChannels.guildID
                                                WHERE summonerID='${oldRank.summonerID}'`
                                                );
        var str;
        if (newRankStatus.charAt(0) == '+') {
            str = ':chart_with_upwards_trend:';
            if (newRankStatus == '+tier' || newRankStatus == '+rank')
                str += `**${oldRank.summonerName}** got promoted to **${newRank.tier} ${newRank.rank}**!`;
            else {
                str += `**${oldRank.summonerName}** won **${newRank.leaguePoints - oldRank.lp}** LP.\n`
                str += `\`${oldRank.tier} ${oldRank.rank} ${oldRank.lp} LP => ${newRank.tier} ${newRank.rank} ${newRank.leaguePoints} LP\``;
            }
        }

        else {
            str = ':chart_with_downwards_trend:';
            if (newRankStatus == '-tier' || newRankStatus == '-rank')
                str += `**${oldRank.summonerName}** got demoted to **${newRank.tier} ${newRank.rank}**.`;
            else {
                str += `**${oldRank.summonerName}** lost **${oldRank.lp - newRank.leaguePoints}** LP.\n`;
                str += `\`${oldRank.tier} ${oldRank.rank} ${oldRank.lp} LP => ${newRank.tier} ${newRank.rank} ${newRank.leaguePoints} LP\``;
            }
        }
        
        for (const guildChannel of guildChannels) {
            await client.channels.cache.get(guildChannel.channelID).send(str);
        }
        
    }
}