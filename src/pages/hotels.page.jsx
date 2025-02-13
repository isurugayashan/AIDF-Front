
const HotelsPage = () =>{

    // const HotelsPage = async () =>{
    //     //1st method
    //     //promise handlining
    //     //  const res =  fetch("http://localhost:8000/api/hotels" , {
    //     //         method:"GET",
    //     //     });
    //     //     res.then((body) =>{
    //     //         return body.json();
    //     //     }).then((data) =>{
    //     //         console.log(data);
    
    //     //     })
    //     //     .catch((error) =>{
    //     //         console.log(error);
                
    //     //     });      

    //     //async method
    //     try{
    //         const res = await fetch("http://localhost:8000/api/hotels" , {
    //             method:"GET",
    //         });
    //         const data = await res.json();
    //         return data;
    //     }catch(error){
    //             console.log(error);
                
    //     }
                
    // };

    return(
        <main>
            <h1>Hotels</h1>
            
        </main>
    )
}

export default HotelsPage