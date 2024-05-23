import { useEffect, useState } from "react";
import axios from "axios";

function useAuthorInfo({data,loading,setLoading}){
    let [authorData,setAuthorData]=useState("");
    useEffect(()=>{
        let fetchData=async ()=>{
            try{
            if(data){
            let arrayOfAuthors=data
            .map((currentValue)=>
                currentValue.author_name?.[0]?.trim().replace(/ /g,'+')
            ).filter((currentValue)=>currentValue);
            let arrayOfUrls=arrayOfAuthors.map((currentValue)=>{
                return `https://openlibrary.org/search/authors.json?q=${currentValue}`
            })
            let response=await axios.all(arrayOfUrls.map((currentValue)=>axios.get(currentValue)));
            console.log(response);
            let authors=response.map((currentValue)=>{
                let {top_work,birth_date}=currentValue.data.docs[0];
                return {top_work,birth_date};
            })
            setAuthorData(authors);
        }
    }
    catch(error){
        setAuthorData([]);
    }
    finally{
        setLoading(false);
    }
    }
        fetchData();
    },[data,setLoading])
    return ({authorData,loading});
}

export default useAuthorInfo;