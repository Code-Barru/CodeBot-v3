const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('traqueliste')
        .setDescription('Affiche la tracklist du serveur.'),
    
    async execute(interaction, client) {
        await interaction.deferReply();
        await client.processTracking();
        
        const response = await client.executeSQL(`SELECT summonerName
                                                FROM accounts
                                                INNER JOIN guildTrack ON accounts.summonerID=guildTrack.summonerID
                                                WHERE guildID='${interaction.guildId}'
                                                ORDER BY summonerName ASC`
                                                );

        if (response.length == 0 ) {
            await interaction.editReply(`Il n'y a aucun joueur traqué sur ce serveur !`);
            return;
        }

        await interaction.editReply({
            embeds: [client.getTraqueEmbed(response)]
        });
       
    }
}