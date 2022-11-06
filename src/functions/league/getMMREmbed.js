const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.getMMREmbed = (mmr) => {
        const ranked = mmr.ranked;
        const normal = mmr.normal;
        const aram = mmr.ARAM;

        fields = [];

        if (ranked.avg) {
            var rankedTxt = `${ranked.avg} +- ${ranked.err}\n(Top ${(100 - ranked.percentile).toPrecision(3)}% ${ranked.closestRank})`;
            fields.push(
                {name: 'Ranked', value: rankedTxt}
            );

            var rankedAvgsTxt = `${ranked.tierData[0].name} (${ranked.tierData[0].avg})\n`;
            rankedAvgsTxt += `${ranked.tierData[1].name} (${ranked.tierData[1].avg})\n`;
            rankedAvgsTxt += `${ranked.tierData[2].name} (${ranked.tierData[2].avg})`;

            fields.push(
                {name: 'Closest ranks averages', value: rankedAvgsTxt}
            );
        }

        if (normal.avg) {
            var normalTxt = `${normal.avg} +- ${normal.err}\n(Top ${(100 - normal.percentile).toPrecision(3)}% ${normal.closestRank})`;
            fields.push(
                {name:'Normal', value: normalTxt}
            );
        }

        if (aram.avg) {
            var aramTxt = `${aram.avg} +- ${aram.err}\n(Top ${(100 - aram.percentile).toPrecision(3)}% ${aram.closestRank})`
            fields.push(
                {name: 'Aram', value: aramTxt}
            )
        }

        return new EmbedBuilder()
            .setTitle(`${mmr.summonerName}`)
            .setURL(encodeURI(`https://www.op.gg/summoners/euw/${mmr.name}`))  
            .setThumbnail(`https://opgg-static.akamaized.net/images/profile_icons/profileIcon${mmr.profileIconId}.jpg`)
            .setColor(0xFF0000)
            .addFields(fields);
    }
}