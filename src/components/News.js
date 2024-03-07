import React, { useState,useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

import PropTypes from 'prop-types'




const News=(props)=>{


  // const articles = [
  //   {
  //     "source": {
  //       "id": "espn-cric-info",
  //       "name": "ESPN Cric Info"
  //     },
  //     "author": null,
  //     "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //     "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //     "publishedAt": "2020-04-27T11:41:47Z",
  //     "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "espn-cric-info",
  //       "name": "ESPN Cric Info"
  //     },
  //     "author": null,
  //     "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //     "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //     "publishedAt": "2020-03-30T15:26:05Z",
  //     "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
  //   }
  // ]
 const capitalizeFirst=(string)=>{
  return string.charAt(0).toUpperCase()+string.slice(1);
}
const [articles, setarticles] = useState([]);
const [loading, setloading] = useState(true);
const [page, setPage] = useState(1);
const [totalResults, setTotalResults] = useState(0);

    
  
  //pageSize=10
 const update = async (p, k) => {
    props.setProgress(0);
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${p + k}&pagesize=${props.pageSize}`
    let data = await fetch(url)
      
    console.log("comp won2")
    console.log(`data=${data}`)
    let parsedData = await data.json()
    //console.log(parsedData);
    setarticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setloading(false)
   
    props.setProgress(100);

  }
  useEffect(() => {
    document.title=`${capitalizeFirst(props.category)}-NewsMonkey`
    setloading(true)
    update(page,0)
  }, []);


  const handleNext = async (e) => {
    setloading(true)
    setPage(page+1)
   

    console.log(page);
    console.log(`pagecurrent=${page} and results=${totalResults}`)
    if (page + 1 >= (totalResults / props.pageSize)) {
      e.target.disabled = true
    }
    update(page, 1)

    // setState({
    //   page:page+1
    // })
    console.log(loading)
    console.log(page);


  }
 const handlePrevious = async () => {
    setloading(true)
    setPage(page-1)
    document.getElementById("right").disabled = false
    update(page, -1);
    console.log(page);

  }
const fetchMoreData=async()=>{
 setPage(page+1)
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`
  let data = await fetch(url)
  console.log("comp won2")
  console.log(`data=${data}`)
  let parsedData = await data.json()
  //console.log(parsedData);
  setarticles(articles.concat(parsedData.articles))
  setTotalResults(parsedData.totalResults)
  setloading(false)
  
  //u are getting some  or something fishy must check console when i use articles: concat(parsedData.articles),
  
} 

    
    // console.log(`render-${parsedData.totalResults}`)
    return (
      console.log(page),
    console.log('maybe'),
      <>
        <h2 className='text-center' style={{marginTop:'90px'}}>NewsMonkey -Top  {capitalizeFirst(props.category)} Headlines</h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length<=totalResults-1}
          loader={<h4><Spinner/></h4>}
        >
          <div className="container">
        <div className="row">
          {
            articles.map(
              (element) => {
                return !loading && <div className="col-md-4" key={element.url} >
                  <NewsItem title={element.title} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} Url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              }
            )
          }
</div>

        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button type="button" className="btn btn-dark" disabled={page <= 1} onClick={handlePrevious} >&larr; left</button>
          <button type="button" className="btn btn-dark" id="right" onClick={handleNext} >right&rarr;</button>
        </div> */}

      </>
    )
  
}
 News.defaultProps = {
  country: 'in',
  pageSize: 10,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string

}


export default News
