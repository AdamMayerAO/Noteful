import React, { Component } from 'react'
import data from './dummy-store'
import {Link} from 'react-router-dom'
import './Main.css'

export default class Main extends Component {
    render() {
      return (
        <div className='Main'>
          <div className ="FoldersList">
            <h3>Folders</h3>
            <ul className = "Folders">
              {this.props.state.folder.map(folder =>
                <li key = {folder.id}>
                  
                  <Link to={`/Folder/${folder.id}`} >
                    {folder.name}
                    
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className = "NotesList">
            <h3>Notes:</h3>
            <ul className = "Notes">
              {this.props.state.note.map(note =>
              <li key = {note.id}>
                <Link to={`/Note/${note.id}`}>
                  {note.name}
                </Link>
              </li>
              )}
            </ul>
          </div>
        </div>
      )
    }
  }