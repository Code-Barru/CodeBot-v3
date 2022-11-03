const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.getRolesEmbed = (roles, member) => {
        if (roles.length == 0) {
            rolesTxt = 'Pas de roles sauvegardés.';
        } else {
            var rolesTxt= `-<@&${roles[0].roleID}>`;

            for (var i=1; i < roles.length ; i++) {
                rolesTxt+= `\n-<@&${roles[i].roleID}>`;
            }
        }
        

        return new EmbedBuilder()
            .setTitle(`${member.displayName}`)
            .addFields({name: 'Roles sauvegardés', value:rolesTxt})
    }
}