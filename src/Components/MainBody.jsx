import React, { useState, useEffect } from 'react';
import ListElement from './ListElement';
import TopPlayers from './TopPlayers';
import { teamMapping, GW } from '../data';
import ShowTeam from './ShowTeam';

export default function MainBody() {
    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [gwFixtures, setGWFFixtures] = useState([]);
    const [shouldHide , setShouldHide] = useState(true);
    const [showEnterPlayer, setShowEnterPlayer] = useState(false);
    const [nextFour, setNextFour] = useState([]);
    const [showTopPlayers, setShowTopPlayers] = useState(false);
    const [showTeams, setShowTeams] = useState(false);

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
                    for(let k = 0; k<=3; k++){
                        if(nextFixtures[k].length === 0){
                            nextFixtures[k].push(["BLK",0]);
                        }
                    }
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

    function clickShowTopPlayers(){
        setShowTopPlayers(true);
        setShowEnterPlayer(false);
        setShowTeams(false);
    }
    function clickShowPlayer(){
        setShowTopPlayers(false);
        setShowEnterPlayer(true);
        setShowTeams(false);

    }
    function clickShowTeams(){
        setShowTopPlayers(false);
        setShowEnterPlayer(false);
        setShowTeams(true)
    }
    

    //nextFour[1].map((fixture, index) => (console.log("++", fixture)));
    
    return (
    <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Fantasy Premier League Players</h2>
            <div className="flex space-x-4">

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={clickShowTeams}>
                    Team Information
                </button>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={clickShowTopPlayers}>
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

            {/* function TopPlayers({ filteredPlayers, gwFixtures, nextFour }) */}
           {showTopPlayers ? (
            <TopPlayers filteredPlayers={filteredPlayers} gwFixtures={gwFixtures} nextFour={nextFour} />
           ): null}
           {showTeams ? (
           <ShowTeam nextFour = {nextFour} gwFixtures={gwFixtures} />
           ) : null}
    </div>
    );
}