import React, { useState } from 'react';
import { TiArrowRightThick } from 'react-icons/ti';
import { HiOutlineUser } from 'react-icons/hi';
import { MdSend } from 'react-icons/md';

const ChatComponent = ({ user }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [users] = useState([
        { _id: 1, username: 'User 1' },
        { _id: 2, username: 'User 2' },
        { _id: 3, username: 'User 3' },
    ]);

    const handleSendMessage = () => {
        const message = {
            sender: user._id,
            receiver: selectedUser,
            message: newMessage
        };
        setMessages([...messages, message]);
        setNewMessage('');
    };

    return (
        <div className="flex w-full h-screen text-white">
            <div className="w-1/4 p-4 " style={{ backgroundColor: '#171717' }}>
                <h2 className="text-lg font-bold mb-4">Chats</h2>
                <ul className="space-y-2">
                    {users.map((user) => (
                        <li
                            key={user._id}
                            className={`flex items-center px-4 py-2 rounded-lg cursor-pointer ${selectedUser === user._id ? 'bg-gray-200' : ''
                                }`}
                            onClick={() => setSelectedUser(user._id)}
                            style={{ backgroundColor: selectedUser === user._id ? '#1E1E1E' : '#212121' }}
                        >
                            <HiOutlineUser className="text-gray-600 mr-2" />
                            <div className="flex-1">{user.username}</div>
                            {selectedUser === user._id && <TiArrowRightThick className="text-blue-500" />}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-3/4 p-4 flex flex-col" style={{ backgroundColor: '#212121' }}>
                <div className="flex-1 overflow-y-scroll">
                    {selectedUser &&
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.sender === user._id ? 'justify-end' : 'justify-start'
                                    } mb-2`}
                            >
                                <div
                                    className={`bg-white rounded-lg px-4 py-2 max-w-2/3 ${message.sender === user._id ? 'bg-blue-500 text-white' : 'bg-gray-400'
                                        }`}
                                >
                                    {message.message}
                                </div>
                            </div>
                        ))}
                </div>
                <div className="mt-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 p-2 px-2 border rounded-3xl mr-2 bg-gray-800 text-white focus:outline-none "
                    />
                    <button onClick={handleSendMessage} className="p-2  text-white rounded-md" style={{ backgroundColor: '#383838' }}>
                        <MdSend />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
