module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        
        roleIDs = await client.executeSQL(`SELECT roleID
                                            FROM discordRoles
                                            WHERE discordID='${member.id}' AND guildID='${member.guild.id}'`
                                            );
        if (roleIDs.length == 0) {
            return;
        }
        await client.giveBackRoles(member, roleIDs);
    }
}