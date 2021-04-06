import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import CircleButton from './CircleButton'
import {countNotesForFolder} from './notes-helpers'
import './NoteListNav.css'
import Context from './Context'
import config from './config'

export default class NoteListNav extends React.Component {
    static contextType = Context;
  
  
  handleDeleteFolder = e => {
    e.preventDefault()
    const folderId = e.target.id
    fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      // .then(res => {
      //   if (!res.ok)
      //     return res.json().then(e => Promise.reject(e))
      //   return res.json()
      // })
      .then( res => {
        if(!res.ok)
        throw "Delete Request Failed"
      })
      .then(() => {
        this.context.deleteFolder(folderId)
        // allow parent to perform extra behaviour
        //this.props.onDeleteFolder(folderId)
      })
      .catch(error => {
        console.error({ error })
      })
  } 
  render() {
      const { folders=[] } = this.context
      const { notes=[]} = this.context
    
      return (
        <div className='NoteListNav'>
          <ul className='NoteListNav__list'>
            {folders.map(folder =>
            
              <li key={folder.id} id={folder.id}>
                <NavLink
                  className='NoteListNav__folder-link'
                  to={`/folders/${folder.id}`}
                >
                  <span className='NoteListNav__num-notes'>
                    {countNotesForFolder(notes, folder.id)}
                  </span>
                  {folder.title}
                </NavLink>
                <button id={folder.id}
                    className='Folder__delete'
                    type='button'
                    onClick={this.handleDeleteFolder}

                  >
                    Delete Folder
                </button>
              </li>
            )}
          </ul>
          <div className='NoteListNav__button-wrapper'>
            <CircleButton
              tag={Link}
              to='/add-folder'
              type='button'
              className='NoteListNav__add-folder-button'
            >
              Add Folder
            </CircleButton>
          </div>
        </div>
      )
    }
  }