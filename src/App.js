import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import config from './config'
import NoteListNav from './NoteListNav'
import NotePageNav from './NotePageNav'
import NoteListMain from './NoteListMain'
import NotePageMain from './NotePageMain'
import AddFolder from './AddFolder'
import Context from './Context'
import AddNote from './AddNote'
import NotefulError from './NotefulError'

class App extends Component {
  state = {
      notes: [],
      folders: []
  };

  componentDidMount() {
      Promise.all([
          fetch(`${config.API_ENDPOINT}/notes`),
          fetch(`${config.API_ENDPOINT}/folders`)
      ])
        .then(([notesRes, foldersRes]) => {
              if (!notesRes.ok)
                  return notesRes.json().then(e => Promise.reject(e));
              if (!foldersRes.ok)
                  return foldersRes.json().then(e => Promise.reject(e));

              return Promise.all([notesRes.json(), foldersRes.json()]);
          })
          .then(([notes, folders]) => {
              this.setState({notes, folders});
          })
          .catch(error => {
              console.error({error});
          });
  };

  handleDeleteNote = (noteId) => {
      this.setState({
          notes: this.state.notes.filter(note => note.id != noteId)
      });
  };

  handleDeleteFolder = (folderId) =>{
     
      this.setState({
          folders: this.state.folders.filter(folder => folder.id !=folderId)
      });
  }

  addFolder=(folder) => {
    let tempState = this.state;
    tempState.folders.push(folder);
    this.setState(tempState)
  }

  addNote = (note) => {
      let tempState = this.state;
      tempState.notes.push(note);
      this.setState(tempState)
  }

  renderNavRoutes() {
      return (
          <>
              {['/', '/folders/:folderId'].map(path => (
                  <Route
                      exact
                      key={path}
                      path={path}
                      component={NoteListNav}
                  />
              ))}
              <Route path="/notes/:noteId" component={NotePageNav}/>
              <Route path="/add-folder" component={NotePageNav} />
              <Route path="/add-note" component={NotePageNav} />
          </>
      );
  }

  renderMainRoutes() {
      return (
          <>
              {['/', '/folders/:folderId'].map(path => (
                  <Route
                      exact
                      key={path}
                      path={path}
                      component={NoteListMain}
                  />
              ))}
              <Route path="/notes/:noteId" component={NotePageMain} />
              <Route path="/add-folder" component={AddFolder} />
              <Route path="/add-note" component={AddNote} />
          </>
      );
  }

  render() {
      const value = {
          notes: this.state.notes,
          folders: this.state.folders,
          deleteNote: this.handleDeleteNote,
          addFolder: this.addFolder,
          addNote: this.addNote,
          deleteFolder: this.handleDeleteFolder,
      };
      return (
          <Context.Provider value={value}>
              <div className="App">
                  <nav className="App__nav">{this.renderNavRoutes()}</nav>
                  <header className="App__header">
                      <h1>
                          <Link to="/">Noteful</Link>{' '}
                      </h1>
                  </header>
                  <NotefulError>
                  <main className="App__main">{this.renderMainRoutes()}</main>
                  </NotefulError>
              </div>
          </Context.Provider>
      );
  }
}

export default App;