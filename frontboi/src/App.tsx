import React from 'react';
import './App.css';
import { CodeTxt } from './components/CodeTxt'
import { FormHero } from './components/FormHero'

function App() {
  return (
    <div className="App">
      <p>
        👋 I'm <CodeTxt>binboi</CodeTxt> and I can generate a bin collection calendar for you.
      </p>
      <FormHero/>
    </div>
  );
}

export default App;
