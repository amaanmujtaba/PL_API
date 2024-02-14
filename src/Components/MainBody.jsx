import React, { useState, useEffect } from 'react';
import ListElement from './ListElement';

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
    const [gwFixtures, setGWFFixtures] = useState([]);
    const [shouldHide , setShouldHide] = useState(true);

    let fixtures = {};
    let currFixtures = {};

    const GW = 25; //ENTER GAMEWEEK HERE!



    //Get PLayer info
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

    //console.log(filteredPlayers[25]);



    //Fixtures
    useEffect(() => {
        async function fetchFixtureData() {
            try {
                const response = await fetch('https://thingproxy.freeboard.io/fetch/https://fantasy.premierleague.com/api/fixtures/');
                const data = await response.json();
                // Process fixture data and incorporate FDR
                // Map opponent team IDs to FDR values
                // Update players state with FDR data
                data.forEach(fixture => {
                    const homeTeam = fixture.team_h;
                    const awayTeam = fixture.team_a;
                    
                    if (fixtures[homeTeam]) {
                        fixtures[homeTeam].push([fixture.event, teamMapping[awayTeam], fixture.team_h_difficulty]);
                    } else {
                        fixtures[homeTeam] = [[fixture.event, teamMapping[awayTeam], fixture.team_h_difficulty]];
                    }

                    if (fixtures[awayTeam]) {
                        fixtures[awayTeam].push([fixture.event, teamMapping[homeTeam], fixture.team_a_difficulty]);
                    } else {
                        fixtures[awayTeam] = [[fixture.event, teamMapping[homeTeam], fixture.team_a_difficulty]];
                    }
                    
                });
                //console.log(fixtures[1]);
                
                console.log(gwFixtures[1]);

                
                for(let i = 1; i<=20; i++){
                    let res = [];

                    for (let j=0; j<=37; j++){
                        const element = fixtures[j]
                    }
                    fixtures[i].forEach((element,index) => {
                        // console.log("-----", element);
                        if(element[0]===GW && index<38){
                            const app = [element[1], element[2]];
                            // console.log(app);
                            res.push(app);
                        }    
                    });
                    currFixtures[i] = res;
                }

                console.log(currFixtures)
                setGWFFixtures(currFixtures);
                    /*
                    if (homeTeam && awayTeam) {
                        // Add fixture to the home team's array
                        if (fixtures[homeTeam]) {
                            fixtures[homeTeam].push(fixture);
                        } else {
                            fixtures[homeTeam] = [fixture];
                        }
                
                        // Add fixture to the away team's array
                        if (fixtures[awayTeam]) {
                            fixtures[awayTeam].push(fixture);
                        } else {
                            fixtures[awayTeam] = [fixture];
                        }
                    }
                    
                    if(fixture.event == GW){
                        if (homeTeam && awayTeam) {
                            // Add fixture to the home team's set
                            if (!currFixtures[homeTeam]) {
                                currFixtures[homeTeam] = new Set();
                            }
                            currFixtures[homeTeam].add(fixture);
                            
                            // Add fixture to the away team's set
                            if (!currFixtures[awayTeam]) {
                                currFixtures[awayTeam] = new Set();
                            }
                            currFixtures[awayTeam].add(fixture);
                        }
                    }
                });
                */
                //console.log(data);
                //setGWFFixtures(currFixtures)


                
                
                //console.log(teamMapping[11], fixtures[11] );
                
            } catch (error) {
                console.error('Error fetching fixture data:', error);
            }
        }

        fetchFixtureData();
    }, []);


    function showPlayers(){
        setShouldHide(false);
    }
    

    
    return (
    <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Fantasy Premier League Players</h2>
            <div className="flex space-x-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={showPlayers}>
                    Top 20 Players
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Enter Players
                </button>
            </div>
           {shouldHide ? null :(
            <div className = "bg-slate-600 hide mt-5">
                <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Team</th>
                        <th className="px-4 py-2">Exp Pts (Next GW)</th>

                        <th className="px-4 py-2">Next fixtures</th>
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
                            <td className="border px-4 py-2">
                                {gwFixtures && gwFixtures[player.team] ? (
                                    <ul>
                                    {gwFixtures[player.team].map((fixture, index) => (
                                        <ListElement fixture = {fixture} index= {index} />
                                    ))}
                                    </ul>
                                ) : (
                                    "wait"
                                )}
        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)}
    </div>
    );
}