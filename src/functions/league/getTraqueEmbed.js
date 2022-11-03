const { EmbedBuilder, Embed } = require('discord.js');


module.exports = (client) => {
    client.getTraqueEmbed = (summonerNames) => {

        var listTxt = `[${summonerNames[0].summonerName}](https://www.op.gg/summoners/euw/${encodeURI(summonerNames[0].summonerName)})`;
        for (var i=1 ; i < summonerNames.length ; i++) {
            listTxt += `\n[${summonerNames[i].summonerName}](https://www.op.gg/summoners/euw/${encodeURI(summonerNames[i].summonerName)})`;
        }

        return new EmbedBuilder()
            .setTitle('TrackList')
            .setColor(0xFF0000)
            .addFields({name: (summonerNames.length > 1) ? 'Joueurs traqués' : 'Joueur Traqué', value: listTxt});
        
    }
}