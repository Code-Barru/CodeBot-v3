

module.exports = (client) => {
    client.getMaxRolePosition = (roles) => {
        var max = 0;
        for (const role of roles) {
            if (role[1].rawPosition > max)
                max = role[1].rawPosition;
        }
        return max;
    }
}