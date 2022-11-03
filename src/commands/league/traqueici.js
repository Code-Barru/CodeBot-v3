const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('traqueici')
        .setDescription('Associe le salon dans lequel tu éxécutes la commande au tracking.'),

    async execute(interaction, client) {
        await interaction.deferReply();

        const response = await client.executeSQL(`UPDATE guildChannels
                                                SET channelID='${interaction.channelId}'
                                                WHERE guildID='${interaction.guildId}'`
                                                );
        
        if(!response.changedRows && response.affectedRows) {
            await interaction.editReply({
                content:'Ce channel sert déjà au tracking !',
                ephemeral:true
            });
            return;
        }

        if(response.changedRows && response.affectedRows) {
            await interaction.editReply('Le channel de tracking a été changé !');
            return;
        }
        
        await client.executeSQL(`INSERT INTO guildChannels
                                VALUES ('${interaction.guildId}','${interaction.channelId}')`
                                )
        await interaction.editReply('Ce channel servira désormais pour le tracking!');
    }
}