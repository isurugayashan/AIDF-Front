
export default function LocationTab(props){

    const handleClick = () =>{
        props.onClick(props.name) // select location
    }
    if(props.selectedLocation === props.name){
        return(
            <div className=" bg-gray-400 rounded px-2 py-1 cursor-pointer" onClick={handleClick}>
                {props.name}
            </div>
        )
    }
    return(
            <div className=" bg-gray-200 rounded px-2 py-1 cursor-pointer" onClick={handleClick}>
                {props.name}
            </div>
    )
       
}