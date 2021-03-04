import * as React from 'react';
import './App.css';

import RecursiveProperty from './RecursiveProperty';
import { testJson } from './testJson'

class App extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       export:false,
      //  data:testJson
    }
  }
  
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tree-Rendering</h1>
          <text style={{color:"white"}} >Click export after add child or refresh and see data</text>
        </header>
        <div className="App-intro">
          <RecursiveProperty property={testJson} propertyName="Root" excludeBottomBorder={false} rootProperty={true}/>
          <br/>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}} >
            <text style={{display:this.state.export?"none":"flex"}} >{JSON.stringify(testJson)}</text>
            <button onClick={()=>this.setState({export:!this.state.export})} >Export</button>
        </div>
        </div>
      </div>
    );
  }
}

export default App;



