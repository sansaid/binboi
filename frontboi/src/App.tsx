import React from 'react';
import './App.css';
import { CodeTxt } from './components/CodeTxt'
import { FormSlider } from './components/FormSlider'

function App() {
  return (
    <div className="App">
      <p>
        👋 I'm <CodeTxt>binboi</CodeTxt> and I can remind you of your next bin collection day.
      </p>
      <FormSlider/>
    </div>
  );
}

export default App;
