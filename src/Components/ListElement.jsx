export default function ListElement( { fixture , index , dir }){

    let css = "text-center px-2";
    const diff = fixture[1];

    if(diff === 2){
        css+= " bg-green-400";
    }
    else if(diff ===0){
        css += " bg-slate-100"
    }
    else if(diff===3){
        css += " bg-slate-400"
    }
    else if(diff === 4){
        css+= " bg-red-300";
    }
    else{
        css+= " bg-red-600"
    }
    if (dir === "row") {
        css += " flex flex-row"; // Added "flex" here
    } else {
        css += " flex flex-col"; // Added "flex" here
    }
    return(
        <li className={css}  key={index}>{fixture[0] + "[" + fixture[1] + "]"}</li>
    );
}