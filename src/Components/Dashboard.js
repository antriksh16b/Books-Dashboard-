import { useCallback, useRef, useState } from "react";
import useBookInfo from "../Customhooks/useBookInfo";
import useAuthorInfo from "../Customhooks/useAuthorInfo";
import Card from "./Card";

function Dashboard(){
    let [query,setQuery]=useState("");
    let [sort,setSort]=useState("");
    let timeoutId=useRef(null);
    let [loading,setLoading]=useState(true);
    let [page,setPage]=useState(1);
    let [record,setRecord]=useState(10);
    let [reset,setReset]=useState(1);
    let [debounceInput,setDebounceInput]=useState("");
    let arrayOfHeader=[
        "Title","Author name","Subject","Publish year","Author birth date","Author top work","Rating"
    ];
    let data=useBookInfo({query:debounceInput,sort:sort,record:record,page:page,reset:reset,setReset:setReset});
    let {authorData}=useAuthorInfo({data:data.data,loading:loading,setLoading:setLoading});
    let handleInput=useCallback((event)=>{
        setQuery(event.target.value);
        clearTimeout(timeoutId.current);
        timeoutId.current=setTimeout(()=>{
            setDebounceInput(event.target.value);
            setReset(1);
        },500)
    },[]);
    

    return(
        <>
        <h1 className="text-2xl p-4 text-white bg-blue-400">Dashboard</h1>
        <div className="w-full flex flex-col items-center">
        <div className="flex flex-row items-center">
        <div className="w-full max-w-lg rounded-xl m-4 border flex overflow-hidden">
            <input type="text" 
            className="px-7 py-3 w-full outline-none" 
            placeholder="Search" 
            value={query} 
            onChange={handleInput}
            ></input>
            <select className="bg-blue-400 p-1 outline-none" onChange={(event)=>{setSort(event.target.value)}}>
                <option value="">Sort</option>
                <option value="new">New</option>
                <option value="old">old</option>
            </select> 
        </div>
            <select className="border-2 p-2 rounded-md outline-none" onChange={(event)=>{setRecord(event.target.value)}}>
                <option defaultValue selected value="10">
                    10
                </option>
                <option value="50">
                    50
                </option>
                <option value="100">
                    100
                </option>
            </select>
            {data.data.length>0 && page>1 ? 
            <button className="bg-blue-400 text-lg px-5 py-2 rounded-md ml-10  " onClick={(event)=>{setPage((prev)=>(prev-1))}}>Previous</button>
            :<></>
            }
            {data.data.length>0  ? 
                <button className={`bg-blue-400 text-lg px-10 py-2 rounded-md ml-10 ${data.disable===true && "cursor-not-allowed"}`} disabled={data.disable} onClick={(event)=>{setPage((prev)=>(prev+1))}}>Next</button>
                :<></>
            }
            </div>
            <table className="auto rounded-3xl overflow-hidden m-7">
                <div className="table-header-group p-3">
                    <Card className="px-12 py-4 font-medium">{arrayOfHeader}</Card>
                </div>
                {console.log(authorData)}
                {loading===false && data.data.length>0 && data.data && data.data.map((currentValue,index)=>(
                        <Card className="px-10 py-7" data={currentValue} authorData={authorData[index]}></Card>
                    ))}
            </table>
        </div>
        </>
    )
}
export default Dashboard;