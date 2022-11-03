const { SlashCommandBuilder } = require('discord.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('detraque')
        .setDescription('Enlève un compte à la liste de traque.')
        .addStringOption(option => 
            option.setName('compte')
                .setDescription('Le compte LoL')
                .setRequired(true)),

    async execute(interaction, client) {
        await interaction.deferReply();

        const summonerName = await interaction.options.getString('compte');
        const summoner = await client.getRiotAccount(summonerName);
        
        if (!summoner) {
            await interaction.editReply(`Le summoner ${summonerName} n'existe pas en euw!`);
            return;
        }
        
        const isDeleted = await client.executeSQL(`DELETE FROM guildTrack
                                                WHERE summonerID='${summoner.id}' AND guildID='${interaction.guildId}'`
                                                );
        if (isDeleted.affectedRows != 0) {
            await interaction.editReply(`Le summoner ${summoner.name} a été supprimé de la tracklist.`);
            const isMultiple = await client.executeSQL(`SELECT COUNT(summonerID) AS COUNT
                                                        FROM guildTrack 
                                                        WHERE summonerID='${summoner.id}'`
                                                        );
            if (isMultiple[0].COUNT == 0) {
                await client.executeSQL(`DELETE FROM accounts
                                        WHERE summonerID='${summoner.id}'`
                                        );
            }
            return;
        }
        await interaction.editReply(`Le summoner **${summoner.name}** n'étais pas dans la tracklist !`);
    }
}