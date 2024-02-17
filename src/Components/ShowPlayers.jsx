import React, { useState } from 'react';
import DisplayFilteredPlayers from './DisplayFilteredPlayers';
import { teamMapping, GW } from '../data';

export default function ShowPlayers({ players, gwFixtures, nextFour }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
   

    function handleSearchInputChange(event) {
        const query = event.target.value;
        setSearchQuery(query);
        // Filter players based on search query
        const filteredSuggestions = players.filter(player =>
            player.web_name.toLowerCase().includes(query.toLowerCase()) || player.first_name.toLowerCase().includes(query.toLowerCase())
        );
        // Update suggestions
        setSuggestions(filteredSuggestions);
        console.log(filteredSuggestions)
    }

    function handleSuggestionClick(player) {
        console.log(player)
        // Add the clicked player to the filtered players array
        if(!filteredPlayers.includes(player)){
        setFilteredPlayers(prevFilteredPlayers => [...prevFilteredPlayers, player]);
        }
        // Clear the search query and suggestions
        setSearchQuery('');
        setSuggestions([]);
        console.log(filteredPlayers);
    }


    return (
        <div className="flex flex-col md:flex-row mt-4">
            <div className='flex flex-col'>
                <div className="flex w-full justify-center">
                    <input
                        type="text"
                        placeholder="Enter player name here"
                        className="w-3/4 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <button className="right-0 top-0 bottom-0 px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Search
                    </button>
                </div>
                {/* Display suggestions if search query is not empty */}
                    {searchQuery && (
                        <div className="mt-2">
                            <ul className="border border-gray-300 rounded-md bg-white shadow-md">
                                {suggestions.map(player => (
                                    <li key={player.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSuggestionClick(player)}
                                    >
                                        {player.web_name}[{teamMapping[player.team]}]
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                    
                <div>
                    {filteredPlayers.length >0 && <DisplayFilteredPlayers filteredPlayers={filteredPlayers} gwFixtures={gwFixtures} nextFour={nextFour} />}
                </div>








        </div>
    );
}
