import React, {Component} from 'react'
import NotefulForm from './NotefulForm'
import Context from './Context'
import config from './config'
import CircleButton from './CircleButton'
import PropTypes from 'prop-types'
import NotefulError from './NotefulError'
import ValidationError from './ValidationError'

export default class AddFolder extends Component{
    
    static defaultProps = {
        history: {
            push: ()=>{}
        },

    }
    static contextType = Context;
    static propTypes ={
        history: PropTypes.object,
      }

    constructor (props) {
        super(props)
        this.state = {
            folder: {
                value: "",
                touched: false
            }
        }
    }

    updateFolder(folder){
        this.setState({
            folder:{
                value: folder,
                touched: true
            }
        })
    }

    validateFolder(textarea){
        const folder = this.state.folder.value.trim();
        if (folder.length ===0){
            return "Folder name is required"
        }
    }

    handleSubmit = e =>{
        e.preventDefault()
        const newFolder = {
            name: e.target['folder-name'].value

        }
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFolder),
        })
        .then(res =>{
            if(!res.ok)
                return res.json().then(e=>Promise.reject(e))
            return res.json()
        })
        .then(folder => {
            this.context.addFolder(folder)
            this.props.history.push(`/folder/${folder.id}`)
        })
        .catch(error=> {
            console.error({error})
        })
    }

    render() {
        return(
            <section className = 'AddFolder'>
                <h2>Create a folder</h2>
               <NotefulError>
                <NotefulForm onSubmit = {this.handleSubmit}>
                    <div className = 'field'>
                        <label htmlFor= 'folder-name-input'>
                            Name
                        </label>
                        <input type = 'text' id = 'folder-name-input' name = 'folder-name' onChange={e => this.updateFolder(e.target.value)}/>
                        <ValidationError message = {this.validateFolder()} />
                    </div>
                    <div className = 'buttons'>
                        <button 
                            type = 'submit' 
                            disabled = {this.validateFolder()}
                        >
                            Add folder
                        </button>
                    </div>
                </NotefulForm>
               </NotefulError>
                <CircleButton
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className='NotePageNav__back-button'
                >
                    <br />
                    Back
                </CircleButton>
            </section>
        )
    }
}

