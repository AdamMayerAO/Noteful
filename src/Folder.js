import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Context from './Context'
import config from './config'
import PropTypes from 'prop-types'

export default class Folder extends Component {
  static defaultProps = {
    onDeleteFolder:() => {},
  }
  static contextType = Context;
  static propTypes ={
    id: PropTypes.number,
    state: PropTypes.object,
    defaultProps: PropTypes.object
  }
  
    handleClickDelete = e => {
    e.preventDefault()
    const folderId = this.props.id

    fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },  
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteFolder(folderId)
        // allow parent to perform extra behaviour
        this.props.onDeleteFolder(folderId)
        
      })
      .catch(error => {
        console.error({ error })
      })
  }


  render() {

      return (
        <div className='Main'>
          <div className ="FoldersList">
            <h3>Folders:</h3>
            <ul className = "Folders">
              {this.props.state.folder.map(folder =>
                <li key = {folder.id}>
                  <Link to={`/folders/${folder.id}`}>
                    {folder.title}
                  </Link>
                  <button
                    className='Folder__delete'
                    type='button'
                    onClick={this.handleClickDelete}
                    
                  >
                    Delete Folder

                  </button>
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
                <Link to={`/notes/${note.id}`}>
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