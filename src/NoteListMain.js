import React from 'react'
import {Link} from 'react-router-dom'
import Note from './Note'
import CircleButton from './CircleButton'
import './NoteListMain.css'
import Context from './Context'
import {getNotesForFolder} from './notes-helpers'

export default class NoteListMain extends React.Component {
    static defaultProps = {
      match: {
        params: {}
      }
    }
    static contextType = Context
  
    render() {
      const { folderId } = this.props.match.params
      const { notes=[] } = this.context
      const notesForFolder = getNotesForFolder(notes, folderId)
      return (
        <section className='NoteListMain'>
          <ul>
            {notesForFolder.map(note =>
              <li key={note.id}>
                <Note
                  id={note.id}
                  name={note.name}
                  modified={note.modified}
                />
              </li>
            )}
          </ul>
          <div className='NoteListMain__button-container'>
            <CircleButton
              tag={Link}
              to='/add-note'
              type='button'
              className='NoteListMain__add-note-button'
            >
              
              <br />
              Note
            </CircleButton>
          </div>
        </section>
      )
    }
  }