import ListElement from "./ListElement";

export default function DisplayFixtures({ fixtures }){
    

    return(
        <ul>
            {fixtures ? (
                        <ul>
                        {fixtures.map((fixture, index) => (
                            <ListElement fixture = {fixture} index= {index} dir = "col" />
                        ))}
                        </ul>
                    ) : (
                        "wait"
                    )}
        </ul>
    )
}