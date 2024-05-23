function Card({className,children,data,authorData}){
    let arrayOfData;
    data ?
       arrayOfData=[
           data.title && data.title,
           data.author_name && data.author_name[0],
           data.subject && data.subject[0],
           data.first_publish_year && data.first_publish_year,
           authorData && authorData.birth_date && authorData.birth_date,
           authorData && authorData.top_work && authorData.top_work,
           data.ratings_average && Number(data.ratings_average.toPrecision(2))
    ]:arrayOfData=null;
    return(
        <div className="table-row border-2">
        {children && children.map((currentValue)=>(
        <div className={`table-cell ${className}`}>
            {currentValue}
        </div>))}
        {arrayOfData && arrayOfData.map((currentValue)=>(
         <div className={`table-cell ${className}`}>
            {currentValue}
        </div>))}
        </div>
    )
}
export default Card;