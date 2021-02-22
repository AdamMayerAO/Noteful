import React, {Component} from 'react'
import NotfulForm from './NotefulForm'
import Context from './Context'
import config from './config'

export default class AddNote extends Component {
    static defaultProps = {
        history: {
            push: () =>{}
        },
    }
    static contextType = Context;

    handleSubmit = e =>{
        e.preventDefault()
        const newNote = {
            name: e.target['note-name'].value,
            content: e.target['note-content'].value,
            folderId: e.target['note-folder-id'].value,
            modified: new Date(),
        }
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newNote),
        })
        .then(res =>{
            if(!res.ok)
                return res.json().then(e=>Promise.reject(e))
            return res.json()
        })
        .then(note => {
            this.context.addNote(note)
            this.props.history.push(`/folder/${note.folderId}`)
        })
        .catch(error =>{
            console.error({error})
        })
    }

    render(){
        const {folders = []} = this.context
        return(
            <section className = 'AddNote'>
                <h2>Create a Note</h2>
                <NotfulForm onSubmit = {this.handleSubmit}>
                    <div className = 'field'>
                        <label htmlFor ='note-name-input'>
                            Name
                        </label>
                        <input type='text' id='note-name-input' name='note-name' />
                    </div>
                    <div className = 'field'>
                        <label htmlFor ='note-content-input'>
                            Content
                        </label>
                        <textarea id='note-content-input' name='note-content' />
                    </div>
                    <div className = 'field'>
                        <label htmlFor= 'note-folder-select'>
                            Folder
                        </label>
                        <select id ='note-folder-select' name='note-folder-id'>
                            <option value={null}>...</option>
                            {folders.map(folder =>
                                <option key={folder.id} value={folder.id}>
                                {folder.name}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className = 'buttons'>
                        <buttot type = 'submit'>
                            Add note
                        </buttot>
                    </div>
                </NotfulForm>
            </section>
        )
    }
}