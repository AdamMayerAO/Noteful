import React from 'react'
import CircleButton from './CircleButton'
import './NotePageNav.css'
import Context from './Context'
import {findNote, findFolder} from './notes-helpers'

export default class NotePageNav extends React.Component {
    static defaultProps = {
      history: {
        goBack: () => { }
      },
      match: {
        params: {}
      }
    }
    static contextType = Context;
  
    render() {
      const { notes, folders, } = this.context
      const { noteId } = this.props.match.params
      const note = findNote(notes, noteId) || {}
      const folder = findFolder(folders, note.folderId)
      return (
        <div className='NotePageNav'>
          <CircleButton
            tag='button'
            role='link'
            onClick={() => this.props.history.goBack()}
            className='NotePageNav__back-button'
          >
            <br />
            Back
          </CircleButton>
          {folder && (
            <h3 className='NotePageNav__folder-name'>
              {folder.name}
            </h3>
          )}
        </div>
      )
    }
  }