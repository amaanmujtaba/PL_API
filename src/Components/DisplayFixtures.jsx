import ListElement from "./ListElement";

export default function DisplayFixtures({ fixtures }){
    console.log("In the Display Fixtures", fixtures);

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