export default function ListElement( { fixture , index}){

    let css = "text-center";
    const diff = fixture[1];

    if(diff === 2){
        css+= " bg-green-400";
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
    return(
        <li className={css}  key={index}>{fixture[0] + "[" + fixture[1] + "]"}</li>
    );
}