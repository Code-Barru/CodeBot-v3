

module.exports = (client) => {
    client.giveBackRoles = async (member, roleIDs) => {
        var roles = [];
        for(const roleID of roleIDs) {
            roles.push(await member.guild.roles.resolve(roleID.roleID));
        }
        try {
            await member.roles.add(roles);
        } catch (error) {
            if(error.code == 50013)
                return error
        }
    }
}