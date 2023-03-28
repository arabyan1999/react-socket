import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Join from '../../modals/joinModal'

const Dashboard = () => {
    const navigate = useNavigate();
    const [userName, setUsername] = useState('');
    const [isJoinModalShown, setIsJoinModalShown] = useState(false);
    const [isSubmitDone, setIsSubmitDone] = useState(false);

    const openJoinModal = () => {
        setUsername('');
        setIsJoinModalShown(true);
        setIsSubmitDone(false);
    }

    const handleNameChange = (e) => {
        const { target: { value } } = e;
        setUsername(value);
    }

    const generateId = () => {
        return Math.floor(Math.random() * (99999 - 11111 + 1)) + 11111;
    }

    const joinChat = () => {
        setIsSubmitDone(true);
        if (userName.length > 0) {
            const id = generateId();
            navigate(`/chat/${id}/${userName}`);
        }
    }
    return (
        <div>
            <div>
                <button onClick={openJoinModal}>Join Chat</button>
            </div>
            {isJoinModalShown &&
                <Join
                    userName={userName}
                    handleNameChange={handleNameChange}
                    closeModal={() => setIsJoinModalShown(false)}
                    isSubmitDone={isSubmitDone}
                    joinChat={joinChat}
                />
            }
        </div>
    );
}

export default Dashboard;