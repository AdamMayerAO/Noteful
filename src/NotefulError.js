import React, {Component} from 'react'

export default class NotefulError extends Component {
    constructor (props) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    render (){
        if(this.state.hasError){
            return(
                <h2>We're sorry, something is not quite right :/</h2>
            );
        }
        return this.props.children
    }
}
