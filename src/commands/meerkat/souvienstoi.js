const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('souvienstoi')
        .setDescription('Te marque toi/un bouffon pour se souvenir de tes/ses roles.')
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

        const member = (bouffon) ? bouffon : interaction.member

        await client.executeSQL(`DELETE FROM discordRoles
                            WHERE discordID='${member.id}' AND guildID='${interaction.guildId}'`
                            );

        for(const role of member.roles.cache) {
            if (role[0] != interaction.guildId)
                await client.executeSQL(`INSERT INTO discordRoles VALUES
                                    (${member.id},${role[0]},${interaction.guildId})`
                                    );
        }

        if(bouffon) {
            interaction.editReply(`Les roles de <@${bouffon.id}> ont été sauvegardés`);
            return;
        }

        interaction.editReply('Tes roles ont été sauvegardés');
    }
}