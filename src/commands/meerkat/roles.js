const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Affiche tes roles ou ceux du bouffon que tu tag.')
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
        const roleIds = await client.executeSQL(`SELECT roleID
                                                FROM discordRoles
                                                WHERE discordID='${member.id}' AND guildID='${interaction.guildId}'`
                                                );
        
        await interaction.editReply({
            embeds: [client.getRolesEmbed(roleIds, member)]
        });
    }
}