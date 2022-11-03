DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS guildTrack;
DROP TABLE IF EXISTS guildChannels;
DROP TABLE IF EXISTS discordRoles;

CREATE TABLE accounts (
    summonerName VARCHAR(20) PRIMARY KEY,
    summonerID VARCHAR(63) NOT NULL,
    tier VARCHAR(10),
    `rank` VARCHAR(5),
    lp int
);

CREATE TABLE guildChannels (
    guildID VARCHAR(25) NOT NULL,
    channelID VARCHAR(25) NOT NULL,
    PRIMARY KEY(guildID,channelID)
);

CREATE TABLE guildTrack (
    summonerID VARCHAR(63) NOT NULL,
    guildID VARCHAR(25) NOT NULL,
    PRIMARY KEY(summonerID, guildID)
);

CREATE TABLE discordRoles (
    discordID VARCHAR(20) NOT NULL,
    roleID VARCHAR(21) NOT NULL,
    guildID VARCHAR(25) NOT NULL,
    PRIMARY KEY(discordID, roleID, guildID)
);