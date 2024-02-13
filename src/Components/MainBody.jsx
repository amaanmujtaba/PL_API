import React, { useState, useEffect } from 'react';


const teamMapping = {
1: "Arsenal",
2: "Aston Villa FC",
3: "Bournemouth AFC",
4: "Brentford",
5: "Brighton & Hove Albion",
6: "Burnley FC",
7: "Chelsea FC",
8: "Crystal Palace FC",
9: "Everton FC",
10: "Fulham FC",
11: "Liverpool FC",
12: "Luton Town FC",
13: "Manchester City FC",
14: "Manchester United FC",
15: "Newcastle United FC",
16: "Nottingham Forest FC",
17: "Sheffield United FC",
18: "Tottenham Hotspur FC",
19: "West Ham United FC",
20: "Wolverhampton Wanderers"
};


export default function MainBody() {
    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);


    useEffect(() => {
    async function fetchPlayers() {
        try {
        const response = await fetch('https://thingproxy.freeboard.io/fetch/https://fantasy.premierleague.com/api/bootstrap-static/');
        const data = await response.json();
        setPlayers(data.elements);
    
        } catch (error) {
        console.error('Error fetching players:', error);
        }
    }

    fetchPlayers();
    }, []);

    useEffect(() => {
        if (players.length > 0) {
            const filteredPlayers = players.filter(player => player.chance_of_playing_next_round === 100 && player.ep_next>6);
            setFilteredPlayers(filteredPlayers);
        }
    }, [players]); // Run whenever players state changes

    console.log(filteredPlayers[25]);


    
    return (
    <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Fantasy Premier League Players</h2>
        <table className="table-auto">
        <thead>
            <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Team</th>
                <th className="px-4 py-2">Expected Points (Next GW)</th>
                <th className="px-4 py-2">Actual Points (Last GW)</th>
            </tr>
        </thead>
        <tbody>
                {filteredPlayers
                .sort((a, b) => b.ep_next - a.ep_next) // Sort in decreasing order of expected points
                .map(player => (
                <tr key={player.id}>
                    <td className="border px-4 py-2">{player.first_name} {player.second_name}</td>
                    <td className="border px-4 py-2">{teamMapping[player.team]}</td>
                    <td className="border px-4 py-2">{player.ep_next}</td>
                    <td className="border px-4 py-2">{player.event_points}</td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
    );
}