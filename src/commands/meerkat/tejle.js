const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tejle')
        .setDescription('Tej un bouffon.')
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

        const channel = await bouffon.createDM();
        const invite = await interaction.channel.createInvite()
        await channel.send(invite.toString());
        await bouffon.kick();
        await interaction.editReply(`<@${bouffon.id}> a été tej !`);
    }
}