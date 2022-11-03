const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('traque')
        .setDescription('Ajoute un compte à la liste de traque.')
        .addStringOption(option => 
            option.setName('compte')
                .setDescription('Le compte LoL')
                .setRequired(true)),

    async execute(interaction, client) {
        await interaction.deferReply();

        const summonerName = await interaction.options.getString('compte');
        const summoner = await client.getRiotAccount(summonerName);
        if (!summoner) {
            await interaction.editReply(`Le summoner **${summonerName}** n'existe pas en euw!`);
            return;
        }

        //verifier si il est déjà dans la tracklist du serv
        const isInGuildTrackList = await client.executeSQL(`SELECT * 
                                                        FROM guildTrack 
                                                        WHERE summonerID='${summoner.id}' AND guildID='${interaction.guildId}'`
                                                        );
        if (isInGuildTrackList.length != 0) {
            interaction.editReply(`Le joueur **${summonerName}** est déjà dans la tracklist !`);
            return;
        }

        await client.executeSQL(`INSERT INTO guildTrack 
                                VALUES ('${summoner.id}', '${interaction.guildId}')`
                                )

        //si non, vérifier si il est déjà dans la tracklist
        const isInGlobalTrackList = await client.executeSQL(`SELECT * FROM accounts WHERE summonerName='${summoner.name}'`);
        if (isInGlobalTrackList.length == 0) {
            const soloQ = await client.getSoloQ(summoner.id);
            await client.executeSQL(`INSERT INTO accounts VALUES 
                                    ('${summoner.name}', '${summoner.id}', '${soloQ.tier}','${soloQ.rank}', ${soloQ.leaguePoints})`
                                    );
        }

        await interaction.editReply(`Le summoner **${summoner.name}** a été ajouté au tracking !`);

        const doesGuildHasTrackChannel = await client.executeSQL(`SELECT * 
                                                            FROM guildChannels 
                                                            WHERE guildID='${interaction.guildId}'`
                                                            );
        if (doesGuildHasTrackChannel.length == 0) {
            await client.executeSQL(`INSERT INTO guildChannels 
                                    VALUES ('${interaction.guildId}', '${interaction.channelId}')`);
            interaction.followUp({
                content: `Le serveur n'avait pas de channel pour log le tracking !\n`
                +`Il se fera donc sur ce channel ! (tu peux choisir le channel avec la commande /traqueici)`,
                ephemeral:true
            });
        }
    }
}