import React from 'react'

const NewsItem=(props)=> {
  
    
    console.log("hi m constrcutor")
  


    let  {title, description,imageUrl,Url,author,date,source} = props;
    return (
    
      <div className='my-3'>
      <div className="card">
     <div  style={
      {
        display:'flex',
        justifyContent:'flex-end',
       position:'absolute',
       right:'0'
      }
     }>
      <span className="badge rounded-pill bg-danger">
    {source}
    </span>
    </div>
  <img src={imageUrl?imageUrl:"https://static.toiimg.com/thumb/msid-107333936,width-1070,height-580,imgsize-32864,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"}  className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
  
   

    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} and {new Date(date).toUTCString()}</small></p>
    <a href={Url} rel="noreferrer" target="_blank"className="btn btn-sm btn-dark">Go somewhere</a>
  </div>
</div>
      </div>
    )
 
}

export default NewsItem
