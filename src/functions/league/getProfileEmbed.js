const { EmbedBuilder } = require("discord.js");

function getRankColor(queueData) {
    
    tier = (queueData) ? queueData.tier : null;

    switch (tier) {
        case 'IRON':
            return 0x62370B;
        case 'BRONZE':
            return 0x946300;
        case 'SILVER':
            return 0xCCCCCC;
        case 'GOLD':
            return 0xECC500;
        case 'PLATINUM':
            return 0x2CDAA0;
        case 'DIAMOND':
            return 0x2C6BDA;
        case 'MASTER':
            return 0xC592E2;
        case 'GRANDMASTER':
            return 0xFF3030;
        case 'CHALLENGER':
            return 0x66CCCC
        default:
            return 0xFFFFFF;
    }
}

module.exports = (client) => {
    client.getProfileEmbed = (summoner, queueData, matchHistory) => {

        if (queueData)
            queueTxt = `${queueData.tier} ${queueData.rank} ${queueData.leaguePoints}LP\n` +
                `${queueData.wins}W ${queueData.losses}L ` + 
                `(${(queueData.wins*100 / (queueData.wins + queueData.losses)).toPrecision(3)}%)`;
        else
            queueTxt='Unranked'

        var championTxt = `${matchHistory[0].champion}`;
        var kdaTxt = `${matchHistory[0].kills}/${matchHistory[0].deaths}/${matchHistory[0].assists}`;
        var winTxt = `${(matchHistory[0].win) ? 'W' : 'L'}`;

        for (var i=1 ; i < matchHistory.length ; i++) {
            championTxt += `\n${matchHistory[i].champion}`;
            kdaTxt += `\n${matchHistory[i].kills}/${matchHistory[i].deaths}/${matchHistory[i].assists}`;
            winTxt += `\n${(matchHistory[i].win) ? 'W' : 'L'}`;

        }

        return new EmbedBuilder()
        .setTitle(`${summoner.name}`)
        .setURL(encodeURI(`https://www.op.gg/summoners/euw/${summoner.name}`))
        .setThumbnail(`https://opgg-static.akamaized.net/images/profile_icons/profileIcon${summoner.profileIconId}.jpg`)
        .setColor(getRankColor(queueData))
        .addFields(
            {name: 'SoloQ', value: queueTxt, inline:false},
            {name: 'Champion', value: championTxt, inline:true},
            {name: 'KDA', value: kdaTxt, inline:true},
            {name: 'Résultat', value: winTxt, inline:true}
        );
    }
}