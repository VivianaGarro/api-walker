import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";

const People = () =>{
    const [apiData, setApiData] = useState({});
    const { id } = useParams();
    const [isError, setIsError] = useState(false);
    const [homeworld, setHomeworld] = useState();
    const[homeworldId, setHomeworldId] = useState();

    useEffect(()=>{
        axios
        .get(`https://swapi.dev/api/people/${id}`)
        .then((response) => {
            setIsError(false);
            console.log(response.data);
            setApiData(response.data);
            getHomeworldId(response.data.homeworld);
            axios
                .get(response.data.homeworld)
                .then((homeworldResponse) =>{
                    console.log(homeworldResponse.data.name);
                    setHomeworld(homeworldResponse.data.name);
                })
        })
        .catch((err) =>{
            console.log(err);
            setIsError(true);
        });
    }, [id]);

    const getHomeworldId = (homeworldURL) =>{
        
        if(homeworldURL.charAt(homeworldURL.lenght -3) === "/"){
            const hwId = homeworldURL.chartAt(homeworldURL.length - 2);
            setHomeworldId(hwId);
        }else{

            const firstId = homeworldURL.charAt(homeworldURL.lenght - 3);
            const secondId = homeworldURL.charAt(homeworldURL.lenght - 2);
            const id = `${firstId}${secondId}`;
            setHomeworldId(id);
        }
    }

    if(!isError){
        return(
            <div>
                <h1>{apiData.name}</h1>
                <p>Height:{apiData.height}</p>
                <p>Eye Color:{apiData.eye_color}</p>
                <p>Skin Color:{apiData.skin_color}</p>
                <p>Homeworld:{homeworld}</p>
                <Link to={`/planets/${homeworldId}`}>Homeworld</Link>
            </div>
        );
    }else{
        return(
            <div>
                <h3>Estos no son los droides que estas buscando</h3>
                <img src="https://i.kym-cdn.com/editorials/icons/mobile/000/004/391/Hello_there.jpg" alt="Imagen Obi Wan"></img>
                
            </div>
        );
    }
}

export default People;