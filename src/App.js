import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App=()=> {
  const apiKey=process.env.REACT_APP_NEWS_API
  
  
  const [progress, setProgress] = useState(0);

  
    console.log(`apikey=${apiKey}`)
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
        height={2.4}
   
      />
       
        <Routes>
        <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey}  key="general"pageSize={10} category="general" />} />
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general"pageSize={10} category="general" />} />
          <Route exact path="/business"element= {<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={10}      category="business" />}/>
          <Route exact path="/entertainment" element= {<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={10} category="entertainment" /> }/>
         
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key ="health" pageSize={10}       category="health" />}/>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={10}       category="science" />}/>
          <Route exact path="/sports"   element=  {<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={10}        category="sports" />}/>
          <Route exact path="/technology" element= {<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={10}    category="technology" />} />
          

         
        </Routes>
        </Router>
      </div>
    )

}

export default App
