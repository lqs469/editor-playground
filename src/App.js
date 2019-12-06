import React from 'react';
import PubPub from './Pubpub/PubPub';
import EditorJS from './EditorJS'
import { Router, Link } from "@reach/router"

function App() {
  const Home = () => <div>Editor Playgounrd</div>
  const Pubpub = () => <PubPub />

  return (
    <div className="App">
      <header style={{ background: '#aaa', borderBottom: 'solid 1px #000' }}>
        <Link to="/">Home</Link> | {" "}
        <Link to="pubpub">PubPub-Editor</Link> | {" "}
        <Link to="editor">Editor.js</Link> | {" "}
      </header>
      <Router>
        <Home path="/" />
        <Pubpub path="pubpub" />
        <EditorJS path="editor" />
      </Router>
    </div>
  );
}

export default App;
