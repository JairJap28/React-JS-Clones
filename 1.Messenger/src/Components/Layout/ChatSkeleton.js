import React from 'react';

// Components
import Message from '../Chat/Message';

const ChatSkeleton = () => {
    return (
        <div>
            {
                [...Array(6).keys()].map(item => (
                    <Message />
                ))
            }
        </div>
    )
}

export default ChatSkeleton
