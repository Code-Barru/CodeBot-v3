const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('oubliele')
        .setDescription('Oublie les roles d\'un maxi bouffon.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Le bouffon')
                .setRequired(true)),

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

        const bouffonPos = client.getMaxRolePosition(bouffon.roles.cache);
        const userPos = client.getMaxRolePosition(interaction.member.roles.cache);

        if (bouffonPos > userPos) {
            interaction.editReply(`<@${bouffon.id}> est au-dessus de toi, respecte tes ainés.`);
            return;
        }

        if (bouffonPos == userPos) {
            interaction.editReply(`Vous êtes au même niveau, tu ne peux pas attaquer un frère.`);
            return;
        }

        await client.executeSQL(`DELETE FROM discordRoles
                                WHERE discordID='${bouffon.id}' AND guildID='${interaction.guildId}'`
                                );
        await interaction.editReply(`Les roles de <@${bouffon.id}> ont été oubliés.`);
    }
}