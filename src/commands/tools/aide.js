const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

function getAideEmbed() {
    const commandesTraqueLol = `\`/traque <compte>\` ajoute un compte lol au tracking.\n`                +
                               `\`/detraque <compte>\` enlève un compte du tracking.\n`                  +
                               `\`/traqueliste <compte>\` affiche la liste des personnes traquées.\n`    +
                               `\`/profilelol <compte>\` affiche le profile d'un compte.\n`              +
                               `\`/mmr <compte>\` calcule (:nerd:) le mmr d'un compte.`;
    
    const commandesMeerkat =    `\`/souvienstoi <bouffon>\` te sauvegarde tes rôles ou celui de la personne que tu passes.\n`               +
                                `\`/oubliele <bouffon>\` oublie les rôles d'un bouff (il faut qu'il soit en-dessous de toi).\n`             +
                                `\`/roles <bouffon>\` affiche tes rôles sauvegardés ou ceux de la personne que tu passes.\n`                +
                                `\`/tejle <bouffon>\` tej un bouff mais lui renvoie une invite (il faut qu'il soit en-dessous de toi).\n`   +
                                `\`/rendstp <bouffon> \` qui te redonnes tes rôles ou qui redonne les rôles d'un bouffon.`;
    
    const description = "Beepboop je suis un bot dev par <@260109480455307264> :nerd: qui fait plein de trucs, les commande sont en dessous.";

    return new EmbedBuilder()
        .setTitle("Aide")
        .setColor(0xFF0000)
        .addFields([
            {name: 'Description du bot :robot:', value: description},
            {name: 'Commandes Traque LoL', value: commandesTraqueLol},
            {name: 'Commandes Meerkat', value: commandesMeerkat}
        ])
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aide')
        .setDescription('T\'accordes de l\'aide'),
    async execute(interaction, client) {
        await interaction.deferReply();
        await interaction.editReply({
            embeds: [getAideEmbed()]
        });
    }
}