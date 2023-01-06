
const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('mmr')
        .setDescription('Estime le MMR  du compte')
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

        const mmr = await client.getMMR(summoner.name);
        if (!mmr) {
            await interaction.editReply(`**${summoner.name}** n'a pas fait assez de parties solo récemment!`);
            return;
        }
        mmr.summonerName = summoner.name;
        mmr.profileIconId = summoner.profileIconId;
        const embed = client.getMMREmbed(mmr);
        await interaction.editReply({
            embeds: [embed]
        });
    }
}