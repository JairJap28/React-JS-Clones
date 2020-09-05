import React from 'react'
import IComment from '../../../Models/IComment';

const Comment: React.FC<IComment> = ({ text, username }) => {
    return (
        <div>
            <p><strong>{username} </strong>{text}</p>
        </div>
    )
}

export default Comment;