import React from 'react';
import { Router, Link } from "@reach/router"
import PubPub from './Pubpub/PubPub';
import EditorJS from './EditorJS'
import DraftJS from './DraftJS';
import Draftail from './Draftail';

function App() {
  const Home = () => <div>Editor Playgounrd</div>
  const Pubpub = () => <PubPub />

  return (
    <div className="App">
      <header style={{ background: '#aaa', borderBottom: 'solid 1px #000' }}>
        <Link to="/">Home</Link> | {" "}
        <Link to="pubpub">PubPub-Editor</Link> | {" "}
        <Link to="editor">Editor.js</Link> | {" "}
        <Link to="draft">Draft.js</Link> | {" "}
        <Link to="draftail">Draftail</Link> | {" "}
      </header>
      <Router>
        <Home path="/" />
        <Pubpub path="pubpub" />
        <EditorJS path="editor" />
        <DraftJS path="draft" />
        <Draftail path='draftail' />
      </Router>
    </div>
  );
}

export default App;
