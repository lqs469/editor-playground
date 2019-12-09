import React from 'react';
import { Router, Link } from "@reach/router"
import PubPub from './Pubpub/PubPub';
import EditorJS from './EditorJS'
import DraftJS from './DraftJS';
import Draftail from './Draftail';
import Prosemirror from './Prosemirror';
import CZIProsemirror from './CZI-Prosemirror';

function App() {
  const Home = () => <h1>Editor Playground</h1>

  return (
    <div style={{ height: '100vh' }}>
      <header style={{ background: '#aaa', borderBottom: 'solid 1px #000' }}>
        <Link to="/">Editor Playground</Link> | {" "}
        <Link to="pubpub">PubPub-Editor</Link> | {" "}
        <Link to="editor">Editor.js</Link> | {" "}
        <Link to="draft">Draft.js</Link> | {" "}
        <Link to="draftail">Draftail</Link> | {" "}
        <Link to="prosemirror">Prosemirror</Link> | {" "}
        <Link to="czi-prosemirror">CZI-Prosemirror</Link> | {" "}
      </header>
      <Router style={{ height: 'calc(100% - 20px)' }}>
        <Home path="/" />
        <PubPub path="pubpub" />
        <EditorJS path="editor" />
        <DraftJS path="draft" />
        <Draftail path='draftail' />
        <Prosemirror path='prosemirror' />
        <CZIProsemirror path='czi-prosemirror' />
      </Router>
    </div>
  );
}

export default App;
