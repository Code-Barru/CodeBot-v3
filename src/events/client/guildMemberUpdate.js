module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember, client){

        if(oldMember.roles.cache.size != newMember.roles.cache.size) {
            const roles = await client.executeSQL(`SELECT roleID
                                    FROM discordRoles
                                    WHERE discordID='${newMember.id}' AND guildID='${newMember.guild.id}'`
                                    );
            if (roles.length != 0) {
                await client.executeSQL(`DELETE FROM discordRoles
                                        WHERE discordID='${newMember.id}' AND guildID='${newMember.guild.id}'`
                                        );
                for (const role of newMember.roles.cache) {
                    if (role[0] != newMember.guild.id)
                        await client.executeSQL(`INSERT INTO discordRoles VALUES
                                                (${newMember.id},${role[0]},${newMember.guild.id})`
                                                );
                }
            }
        }   
    }
}