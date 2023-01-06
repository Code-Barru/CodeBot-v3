# Code-Bot

Code-Bot est un bot Discord ayant été créé pour tracker les victoires et défaites des joueurs de League of Legends [^1].
Le bot utilise l'[API de Riot Games](https://developer.riotgames.com/), ainsi que [DiscordJS v13](https://discord.js.org/#/docs/discord.js/stable/general/welcome)

---
## Fonctionnalités

### Tracker LoL

- Tracker un joueur et afficher ses victoires et défaites.  
![Tracker LoL](https://i.ibb.co/JpJgj6R/queue.png)

- Associer un compte discord à un compte League of Legends.
- Afficher un profile LoL en donnant le nom du compte.  
![Profile LoL](https://i.ibb.co/8m4CMBj/image.png)

### Administration

- Se souvenir des rôles d'un utilisateur Discord.
- Oublier les rôles d'un utilisateur enregistré.
- Afficher les rôles sauvegardés.
- Rendre les rôles à un utilisateur enregistré (par commande et dès qu'il rejoint le serveur).
- Kick un utilisateur possèdant moins de rôles que soit, tout en lui envoyant une invitation.
---
## Commandes

### Tracker LoL
- `/traque <compte>` ajoute un compte à la liste de tracking du serveur
- `/untraque <compte>` enlève un compte à la liste de tracking du serveur
- `/traqueici` associe un channel Discord pour le tracking
- `/traqueliste` affiche la liste des joueurs track sur le serveurs
- `/profilelol <compte>` affiche un compte LoL *(nom, rank, tier, 5 dernières parties)*

### Admnistration
- `/souvienstoi <personne>` qui sauvegarde vos rôles ou celui de la personne que vous passez
- `/oubliele <personne>` qui oublie les rôles d'une personne (il faut qu'il soit en-dessous de vous)
- `/roles <personne>` qui affiche vos rôles sauvegardés ou ceux de la personne que vous passez
- `/tejle <personne>` qui tej une personne mais lui renvoie une invite (il faut qu'il soit en-dessous de -vous)
- `/rendstp <personne>` qui vous redonne vos rôles ou qui redonne les rôles à une personne
---
## Forme du .env

```py
# Discord Related Infos
TOKEN=

GUILD=

CLIENT=

#Riot API TOKEN

RIOT_API_TOKEN=

#DATABASE

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

DEBUG=false
```

## Schéma de la Base de Donnée
```sql
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
```

[^1]: [League of Legends](https://www.leagueoflegends.com) est un jeu de type MOBA réalisé par [Riot Games](https://www.riotgames.com).