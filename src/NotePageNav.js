import React from 'react'
import CircleButton from './CircleButton'
import './NotePageNav.css'
import Context from './Context'
import {findNote, findFolder} from './notes-helpers'
import { Link} from 'react-router-dom'
import PropTypes from 'prop-types'

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
    static propTypes = {
      history: PropTypes.object,
      match: PropTypes.object,
      params: PropTypes.object,
    }
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
          <div className='NotePageNav__button-wrapper'>
            <CircleButton
              tag={Link}
              to='/add-note'
              type='button'
              className='NotePageNav__add-note-button'
            >
              Add Note
            </CircleButton>
          </div>
          {folder && (
            <h3 className='NotePageNav__folder-name'>
              {folder.name}
            </h3>
          )}
        </div>
      )
    }
  }