function getTierValue(tier) {


	switch(tier){
		case 'UNRANKED':
			return 0;
		case 'IRON':
			return 1;
		case 'BRONZE':
			return 2;
		case 'SILVER':
			return 3;
		case 'GOLD':
			return 4;
		case 'PLATINUM':
			return 5;
		case 'DIAMOND':
			return 6;
		case 'MASTER':
			return 7;
		case 'GRANDMASTER':
			return 8;
		case 'CHALLENGER':
			return 9;
	}
}

function getRankValue(value) {
	switch(value) {
		case 'I':
			return 1;
		case 'II':
			return 2;
		case 'III':
			return 3;
		case 'IV':
			return 4;
        default:
            return 'ERROR';
	}
}

module.exports = (client) => {
    client.compareRanks = (rank, newRank) => {

        if (getTierValue(newRank.tier) < getTierValue(rank.tier))
		    return '+tier'
        if (getTierValue(newRank.tier) > getTierValue(rank.tier))
            return '-tier'

        if (getRankValue(newRank.rank) > getRankValue(rank.rank))
            return '+rank'
        if (getRankValue(newRank.rank) < getRankValue(rank.rank))
            return '-rank'

        if (newRank.leaguePoints > rank.lp)
            return '+lp'
        if (newRank.leaguePoints < rank.lp)
            return '-lp'
        
        return '=';
    }
}