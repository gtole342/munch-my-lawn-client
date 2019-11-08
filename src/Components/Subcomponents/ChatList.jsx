import React, { Component } from 'react'
import axios from 'axios';
import {LOCALHOST, SERVER} from '../../constants'

class ChatList extends Component {

    state = {
        userId: this.props.user._id, 
        chats: []
    }

    componentDidMount(){
      //console.log('Gimme stuff please from', this.props.user._id)
        axios.get(SERVER + `/message/${this.props.user._id}`)
        .then(response => {
            //console.log(response.data.response)
            this.setState({
                chats: response.data.response
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    render() {
        const ids = this.state.chats.map((chat) => {
            return (
                chat.firstname
            )
        })

        const uniqueIds = [...new Set(ids)]
        
        const nameList = uniqueIds.map((id, idx) => {
            if (uniqueIds) {
                return (
                    <li key={idx} className="chat-list-name">
                        {id}
                        <br/>
                        <input type="submit"/>
                    </li>
                )
            } else {
                return (
                    <h3>
                        Chat History Currently Empty
                    </h3>
                )
            }
        })

        return (
            <div className="chat-list">
               <h2>Chat History</h2> 
                <ul>
                   {nameList}
                </ul>
            </div>
        )
    }
}

export default ChatList
