import React from 'react';
import ReactDom from 'react-dom';
import { useState, useEffect} from 'react';


function App() {
    //const [counter, setCounter] = useState(0);
    const [scores, setScores] = useState([]);
    
    useEffect(() => {
      async function getData() {
        const response = await fetch('/scores');
        const val = await response.json();  
        //data = val;
        setScores(val);
      }
      getData();
      //setCounter(100);
    }, []);

    console.log(scores);

    return (
          <div id="MongoBox">
          <h4>MongoDB Data:</h4>
          <>
            {
              <div class='container-fluid' id="data">
                {scores.map(score => (
    
                  <ul class= "dataList" key= {score.id}>
                    <li>Name: {score.Name}</li>
                    <li>Braincells: {score.Score}</li>
                  </ul>
                ))}
              </div>
            }
          </>
          <br></br>
          <a href="https://github.com/Joeychez23/REACT-APP" target="_blank">Github</a>
        </div>
      );

}


function Home() {
    return (
        <div id="contents"> 
            <h1>Hi Kaylie</h1>
            <h4>Cloud: AWS</h4>
            <h4>Build: React</h4>
            <h4>Server: Node.js</h4>
            <h4>Hello: Express()</h4>
            <h4>Database: MongoDB</h4><br></br>
             <> {
              <App />
            }
            </>
        </div>
    );
}

ReactDom.render(<Home />, document.getElementById('root'));