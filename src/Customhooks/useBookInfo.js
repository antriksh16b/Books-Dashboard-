import { useEffect, useState } from "react";
import axios from "axios";

function useBookInfo({query,sort,record,page,reset,setReset}){
    let [data,setData]=useState([]);
    let [fetchError,setFetchError]=useState(false);
    let [disable,setDisable]=useState(false);
    useEffect(()=>{
        const controller= new AbortController();
        const {signal}=controller;
        let fetchData=async ()=>{
             
            if(query){
              if(reset===1){
                setData([]);
                setReset(0);
              }
          try{
            // eslint-disable-next-line
            query=query.trim().replace(/ /g,'+');

            if(sort){
                 query=`${query}&sort=${sort}`;
            }
            let response=await axios.get(`https://openlibrary.org/search.json?q=${query}&fields=title,author_name,first_publish_year,subject,ratings_average&sort=${sort}&page=${page}&limit=${record}`,{signal});
            if(response.data.docs.length===0){
            setFetchError(false);
            setDisable(true);
            }
            else{
              setData(response.data.docs);
              setFetchError(false);
            }
        }
         catch(error){
            setFetchError(true);
         }
        }
    }
        fetchData();
        return ()=>{
            controller.abort();
        }
    },[query,sort,record,page,setReset])

    return ({data,fetchError,disable});
}


export default useBookInfo;