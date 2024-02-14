import React, { useState, useEffect } from 'react';
import ListElement from './ListElement';

const teamMapping = {
    1: "ARS",
    2: "AVL",
    3: "BOU",
    4: "BRE",
    5: "BHA",
    6: "BUR",
    7: "CHE",
    8: "CRY",
    9: "EVE",
    10: "FUL",
    11: "LIV",
    12: "LUT",
    13: "MCI",
    14: "MUN",
    15: "NEW",
    16: "NOT",
    17: "SHU",
    18: "TOT",
    19: "WHU",
    20: "WOL"
};

export default function MainBody() {
    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [gwFixtures, setGWFFixtures] = useState([]);
    const [shouldHide , setShouldHide] = useState(true);
    const [showEnterPlayer, setShowEnterPlayer] = useState(false);
    const[nextFour, setNextFour] = useState([]);

    let fixtures = {};
    let currFixtures = {};
    let next4Fixtures = {};

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
            
            filteredPlayers.forEach(player => {
                const positionId = player.element_type;
                let position = '';

                switch (positionId) {
                    case 1:
                        position = 'G';
                        break;
                    case 2:
                        position = 'D';
                        break;
                    case 3:
                        position = 'M';
                        break;
                    case 4:
                        position = 'F';
                        break;
                    default:
                        position = 'U';
                        break;
                }

// Add the position to the player object
                player.position = position;
                
            }); 
            setFilteredPlayers(filteredPlayers);
            // console.log(filteredPlayers[25]);
            // console.log(filteredPlayers[1]);


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
                    let nextFixtures = [[],[],[],[]];

                    // for (let j=0; j<=37; j++){
                    //     const element = fixtures[j]
                    // }
                    fixtures[i].forEach((element,index) => {
                        // console.log("-----", element);
                        if(index<38){
                            if(element[0]===GW){
                                const app = [element[1], element[2]];
                                // console.log(app);
                                res.push(app);
                            }    

                            if(element[0]=== GW+1){
                                const app = [element[1], element[2]];
                                // console.log(app);
                                nextFixtures[0].push(app);
                            }
                            if(element[0]=== GW+2){
                                const app = [element[1], element[2]];
                                // console.log(app);
                                nextFixtures[1].push(app);
                            }
                            if(element[0]=== GW+3){
                                const app = [element[1], element[2]];
                                // console.log(app);
                                nextFixtures[2].push(app);
                            }
                            if(element[0]=== GW+4){
                                const app = [element[1], element[2]];
                                // console.log(app);
                                nextFixtures[3].push(app);
                            }
                            //console.log("Next fixtures", nextFixtures)
                    }});
                    currFixtures[i] = res;
                    next4Fixtures[i] = nextFixtures
                
            }
                console.log("-------", next4Fixtures)
                setNextFour(next4Fixtures);
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

    function clickShowPlayer(){
        setFilteredPlayers([])
        setShowEnterPlayer(true);
    }
    

    //nextFour[1].map((fixture, index) => (console.log("++", fixture)));
    
    return (
    <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Fantasy Premier League Players</h2>
            <div className="flex space-x-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={showPlayers}>
                    Top 20 Players
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={clickShowPlayer}>
                    Enter Players
                </button>
            </div>
            {showEnterPlayer && (
                <div className="flex items-center justify-center mt-4">
                    <div className="flex w-full justify-center">
                        <input
                            type="text"
                            placeholder="Enter player name here"
                            className="w-3/4 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button className="right-0 top-0 bottom-0 px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Search
                        </button>
                    </div>
                </div>
            )}
           {shouldHide ? null :(
            <div className = "bg-slate-600 hide mt-5">
                <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Team</th>
                        <th className="px-4 py-2">Pos</th>

                        <th className="px-4 py-2">Exp Pts</th>

                        <th className="px-4 py-2">GW {GW}</th>
                        <th className="px-4 py-2">Next 4 Gameweeks</th>

                    </tr>
                </thead>
                <tbody>
                        {filteredPlayers
                        .sort((a, b) => b.ep_next - a.ep_next) // Sort in decreasing order of expected points
                        .map(player => (
                        <tr key={player.id}>
                            <td className="border px-4 py-2">{player.first_name} {player.second_name}</td>
                            <td className="border px-4 py-2">{teamMapping[player.team]}</td>
                            <td className="border px-4 py-2">{player.position}</td>
                            <td className="border px-4 py-2">{player.ep_next}</td>
                            

                            <td className="border px-4 py-2">
                                {gwFixtures && gwFixtures[player.team] ? (
                                    <ul>
                                    {gwFixtures[player.team].map((fixture, index) => (
                                        <ListElement fixture = {fixture} index= {index} dir = "col" />
                                    ))}
                                    </ul>
                                ) : (
                                    "wait"
                                )}
                                </td>
                                <td className="border px-4 py-2">
                                                    {nextFour && nextFour[player.team] ? (
                        <ul className='flex flex-row'>
                            {nextFour[player.team].map((fixture, index) => (
                                <React.Fragment key={index}>
                                    {fixture.map((f, i) => (
                                        <ListElement fixture={f} index={i*Math.random()} dir ="row" />
                                        
                                    ))}
                                </React.Fragment>
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