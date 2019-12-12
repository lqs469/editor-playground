import React from 'react';
import { Router, Link } from "@reach/router"
import PubPub from './Pubpub/PubPub';
import EditorJS from './EditorJS'
import DraftJS from './DraftJS';
import Draftail from './Draftail';
import Prosemirror from './Prosemirror';
import CZIProsemirror from './CZI-Prosemirror';
import Quill from './Quill';
import SlateJS from './SlateJS'
import SlateEditableTable from './SlateEditableTable'

function App() {
  const Home = () => <h1>Editor Playground</h1>

  return (
    <div style={{ height: '100vh' }}>
      <header style={{ background: '#aaa', borderBottom: 'solid 1px #000' }}>
        <Link to="/">Editor Playground</Link> | {" "}
        <Link to="pubpub">PubPub-Editor</Link> | {" "}
        <Link to="editor">EditorJs</Link> | {" "}
        <Link to="draft">Draft</Link> | {" "}
        <Link to="draftail">Draftail</Link> | {" "}
        <Link to="prosemirror">Prosemirror</Link> | {" "}
        <Link to="czi-prosemirror">CZI-Prosemirror</Link> | {" "}
        <Link to="quill">Quill</Link> | {" "}
        <Link to="slate">Slate</Link> | {" "}
        <Link to="slate-table">Slate-Editable-Table</Link>
      </header>
      <Router style={{ height: 'calc(100% - 20px)', overflow: 'auto' }}>
        <Home path="/" />
        <PubPub path="pubpub" />
        <EditorJS path="editor" />
        <DraftJS path="draft" />
        <Draftail path='draftail' />
        <Prosemirror path='prosemirror' />
        <CZIProsemirror path='czi-prosemirror' />
        <Quill path='quill' />
        <SlateJS path='slate' />
        <SlateEditableTable path='slate-table' />
      </Router>
    </div>
  );
}

export default App;
