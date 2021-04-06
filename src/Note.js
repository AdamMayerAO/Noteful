import React from 'react'
import {Link} from 'react-router-dom'
import Context from './Context'
import config from './config'
import { format } from 'date-fns'
//{format(modified, 'dd/mm/yyyy')}
import PropTypes from 'prop-types'

import './Note.css'

export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = Context;

  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    modified: PropTypes.string,
    folder: PropTypes.number,
  }
  
  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
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
        this.context.deleteNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      }) 
  }

  render() {
    const { name, id, modified, folder } = this.props
    
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/notes/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>

            {folder}
            </span>
          </div>
        </div>
      </div>
    )
  }
}