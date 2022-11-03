const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rendstp')
        .setDescription('Rends tes rôles ou ceux du bouffons que tu tags.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Le bouffon')
                .setRequired(false)),

    async execute(interaction, client) {
        await interaction.deferReply();

        var bouffon = await interaction.options.getUser('user');
        if(bouffon) {
            if (bouffon.bot) {
                interaction.editReply(`<@${bouffon.id}> est un bot.`);
                return;
            }
            bouffon = await interaction.guild.members.fetch(bouffon.id);
        }

        const member = (bouffon) ? bouffon : interaction.member;

        const roleIDs = await client.executeSQL(`SELECT roleID
                                                FROM discordRoles
                                                WHERE discordID='${member.id}' AND guildID='${interaction.guildId}'`
                                                );

        if (roleIDs.length == 0) {
            interaction.editReply('Tu n\'as pas de roles sauvegardés!');
            return;
        }

        var error = await client.giveBackRoles(member, roleIDs);
        if (error) {
            await interaction.editReply('Tes roles sont trop grands pour moi.');
            return;
        }
        await interaction.editReply(`Tes roles ont été rendus !`);
    }
}