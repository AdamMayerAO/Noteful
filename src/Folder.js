import React, { Component } from 'react'
import data from './dummy-store'
import {Link} from 'react-router-dom'

export default class Folder extends Component {
  componentDidMount(){
  }

  render() {
    

      return (
        <div className='Main'>
          <div className ="FoldersList">
            <h3>Folders:</h3>
            <ul className = "Folders">
              {this.props.state.folder.map(folder =>
                <li key = {folder.id}>
                  <Link to={`/Folder/${folder.id}`}>
                    {folder.name}
                  </Link>
                </li>
              )}
              <li>  
                <button>
                  <Link to={`/`}>
                     Add Folder
                  </Link>
                </button>
              </li>
            </ul>
          </div>
          <div className = "NotesList">
            <h3>Notes:</h3>
            <ul className = "Notes">
              {this.props.state.note.filter(note => note.folderId === this.props.match.params.folderId).map(note =>
              <li key = {note.id}>
                <Link to={`/Note/${note.id}`}>
                  {note.name}
                </Link>
              </li>
              )}
            </ul>
          </div>
          <button>
               <Link to={`/`}>
                  Add Note
                </Link>
            </button>
        </div>
      )
    }
  }