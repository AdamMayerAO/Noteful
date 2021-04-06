import React, {Component} from 'react'
import NotfulForm from './NotefulForm'
import Context from './Context'
import config from './config'
import PropTypes from 'prop-types'
import NotefulError from './NotefulError'
import ValidationError from './ValidationError'

export default class AddNote extends Component {
    static defaultProps = {
        history: {
            push: () =>{}
        },
    }
    
    static contextType = Context;
    static propTypes = {
        history: PropTypes.object,
    }

    constructor (props) {
        super(props)
        this.state = {
            name: {
                value: "",
                touched: false
            },
            content:{
                value: "",
                touched: false,
            },
            
        }
    }
    
    updateName(name) {
        this.setState({ 
            name:{
                value: name, 
                touched: true 
            } 
        })   
    }
    updateContent(content) {
        this.setState({ 
            content:{
                value: content, 
                touched: true 
            } 
        })   
    }
   
    validateName(textarea) {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return "Name is required";
        } else if (name.length < 3) {
          return "Name must be at least 3 characters long";
        }
    }

    validateContent(textarea) {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
          return "Please enter content for your note";
        }
    }
   
   

    handleSubmit = e =>{
        e.preventDefault()
        const newNote = {
            title: e.target['note-name'].value,
            contents: e.target['note-content'].value,
            folder: e.target['note-folder-id'].value,
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
            this.props.history.push(`/folders/${newNote.folder}`)
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
                <NotefulError>
                <NotfulForm onSubmit = {this.handleSubmit}>
                    <div className = 'field'>
                        <label htmlFor ='note-name-input'>
                            Name
                        </label>
                        <input type='text' id='note-name-input' name='note-name' onChange={e => this.updateName(e.target.value)}/>
                        <ValidationError message = {this.validateName()}/>
                    </div>
                    <div className = 'field'>
                        <label htmlFor ='note-content-input'>
                            Content
                        </label>
                        <textarea id='note-content-input' name='note-content' onChange={e => this.updateContent(e.target.value)}/>
                        <ValidationError message = {this.validateContent()}/>

                    </div>
                    <div className = 'field'>
                        <label htmlFor= 'note-folder-select'>
                            Folder
                        </label>
                        <select id ='note-folder-select' name='note-folder-id'>
                            <option value={null}>...</option>
                            {folders.map(folder =>
                                <option key={folder.id} value={folder.id}>
                                {folder.title}
                                </option>
                            )}

                        </select>

                    </div>
                    <div className = 'buttons'>
                        <button 
                            type = 'submit'
                            disabled={
                                this.validateName() ||
                                this.validateContent()
                            }
                        >
                            Add note
                        </button>
                    </div>
                </NotfulForm>
                </NotefulError>
            </section>
        )
    }
}