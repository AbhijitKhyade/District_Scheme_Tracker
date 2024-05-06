import React, { useState, useEffect } from 'react';
import { TiArrowRightThick } from 'react-icons/ti';
import { HiOutlineUser } from 'react-icons/hi';
import { MdSend } from 'react-icons/md';
import io from 'socket.io-client';
import moment from 'moment';

const END_POINT = 'http://localhost:8080';

const ChatComponent = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = io(END_POINT);
        setSocket(socket);

        socket.on('receive-message', (data) => {
            setMessages([...messages, { message: data.message, sender: data.sender, receiver: data.receiver, createdAt: data.createdAt }]);
        });

        return () => {
            socket.disconnect();
        };
    }, [messages]);

    useEffect(() => {
        if (socket && selectedUser) {
            socket.emit('join', { selectedUser });
        }
    }, [socket, selectedUser]);

    const sendMessage = () => {
        if (message.trim() !== '') {
            socket.emit('send-message', { message, sender: selectedUser, receiver: selectedUser === 'Rahul' ? 'Jane' : 'Rahul' });
            setMessage('');
            setMessages([...messages, { message, sender: selectedUser, receiver: selectedUser === 'Rahul' ? 'Jane' : 'Rahul' }]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage();
    };

    const handleUserSelect = (selectedUser) => {
        setSelectedUser(selectedUser);
        setMessages([]);
    };

    return (
        <div className="flex w-full h-screen text-white">
            <div className="w-1/4 p-4 " style={{ backgroundColor: '#171717' }}>
                <h2 className="text-lg font-bold mb-4">Chats</h2>
                <ul className="space-y-2">
                    {/* User list */}
                    <li className="flex items-center px-4 py-2 rounded-lg cursor-pointer" onClick={() => handleUserSelect('Rahul')}>
                        <HiOutlineUser className="text-gray-600 mr-2" />
                        <div className="flex-1">Rahul</div>
                        {selectedUser === 'Rahul' && <TiArrowRightThick className="text-blue-500" />}
                    </li>
                    <li className="flex items-center px-4 py-2 rounded-lg cursor-pointer" onClick={() => handleUserSelect('Jane')}>
                        <HiOutlineUser className="text-gray-600 mr-2" />
                        <div className="flex-1">Jane</div>
                        {selectedUser === 'Jane' && <TiArrowRightThick className="text-blue-500" />}
                    </li>
                </ul>
            </div>

            <div className="w-3/4 p-4 flex flex-col" style={{ backgroundColor: '#212121' }}>
                <div className="flex-1 overflow-y-scroll">
                    {/* Messages */}
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex my-2 ${msg.sender === selectedUser ? 'justify-end' : 'justify-start'
                                }`}
                        >
                            <div
                                className={`flex items-end bg-white text-black rounded-lg px-4 py-2 max-w-2/3 ${msg.sender !== selectedUser ? 'bg-blue-500 ' : 'bg-gray-400'
                                    }`}
                                style={{ borderRadius: msg.sender === selectedUser ? '20px 0px 20px 20px' : '0px 20px 20px 20px' }}
                            >
                                <div className="flex flex-col">
                                    <div className="flex items-center">
                                        {/* {msg.sender !== selectedUser && (
                                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold">
                                                {msg.sender[0]}
                                            </div>
                                        )} */}
                                        <div className="flex flex-col ml-2">
                                            <p className='max-w-96'>{msg.message}</p>
                                            <p className="flex justify-end text-xs text-gray-500">{moment(msg.createdAt).format('LT')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="mt-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 p-2 px-2 border rounded-3xl mr-2 bg-gray-800 text-white focus:outline-none "
                    />
                    <button type="submit" className="p-2 text-white rounded-md" style={{ backgroundColor: '#383838' }}>
                        <MdSend />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatComponent;
