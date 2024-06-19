import React, { useState, useEffect } from 'react';
import { HiOutlineUser } from 'react-icons/hi';
import { MdSend } from 'react-icons/md';
import io from 'socket.io-client';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../api';
import axios from 'axios';

const END_POINT = 'http://localhost:8080';
const admin_id = "661f719872a6c8a62c14b9d0"

const ChatComponent = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [socket, setSocket] = useState(null);
    const currentUser = useSelector((state) => state.user.currentUser);
    const [officers, setOfficers] = useState([]);

    const getDistrictOfficers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/get-officers-names`);
            // console.log('District Officers:', response?.data?.data);
            setOfficers(response?.data?.data);
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    const fetchMessages = async (selectedUser) => {
        try {
            // console.log(selectedUser)
            const response = await axios.get(`${BASE_URL}/admin/messages?receiver=${selectedUser._id || admin_id}`);
            // console.log(response.data.data)
            setMessages(response.data.data);
        } catch (error) {
            console.log('Error fetching messages:', error);
        }
    }


    useEffect(() => {
        const socket = io(END_POINT);
        setSocket(socket);

        socket.on('receive-message', (data) => {
            // Add all received messages to state
            setMessages(prevMessages => [...prevMessages, { message: data.message, sender: data.sender, receiver: data.receiver, createdAt: data.createdAt }]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        fetchMessages(selectedUser);
        if (socket && selectedUser) {
            socket.emit('join', { selectedUser });
        }
    }, [selectedUser]);

    const sendMessage = () => {
        if (message.trim() !== '') {
            // Include the receiver and sender in the message data
            socket.emit('send-message', {
                message,
                sender: currentUser.name, // Assuming `username` is the field representing the sender's identity
                receiver: selectedUser._id || admin_id // Assuming `selectedUser._id` is the ID of the officer
            });
            setMessage('');
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage();
    };

    const handleUserSelect = async (selectedUser) => {
        setSelectedUser(selectedUser);
        // Fetch messages again for the selected user
        await fetchMessages(selectedUser);
    };



    useEffect(() => {
        getDistrictOfficers();
    }, []);

    return (
        <div className="flex w-full h-screen text-white">
            <div className="w-1/4 p-4 " style={{ backgroundColor: '#171717' }}>
                <h2 className="text-lg font-bold mb-4">Chats</h2>
                <ul className="space-y-2">
                    {/* User list */}
                    {currentUser?.role === 'Admin' ? (
                        officers?.map((officer, index) => (
                            <li key={index}
                                className={`flex items-center px-4 py-2 rounded-lg cursor-pointer ${selectedUser === officer ? 'bg-gray-800' : 'hover:bg-gray-700'}`}
                                onClick={() => handleUserSelect(officer)}
                            >
                                <HiOutlineUser className="text-gray-500 mr-2" />
                                <div className="flex-1">{officer.officerName}</div>
                            </li>
                        ))
                    ) : (
                        <li className={`flex items-center px-4 py-2 rounded-lg cursor-pointer ${selectedUser === 'Admin' ? 'bg-gray-800' : 'hover:bg-gray-700'}`} onClick={() => handleUserSelect('Admin')}>
                            <HiOutlineUser className="text-gray-500 mr-2" />
                            <div className="flex-1">Admin</div>
                        </li>
                    )}

                </ul>
            </div>

            <div className="w-3/4 p-4 flex flex-col" style={{ backgroundColor: '#212121' }}>
                <div className="flex-1 overflow-y-scroll">
                    {/* Messages */}
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex my-2 ${msg.sender === currentUser.name ? 'justify-end' : 'justify-start'
                                }`}
                        >
                            <div
                                className={`flex items-end bg-white text-black rounded-lg px-4 py-2 max-w-2/3 ${msg.sender !== currentUser.name ? 'bg-blue-500 ' : 'bg-gray-400'
                                    }`}
                                style={{ borderRadius: msg.sender === currentUser.name ? '20px 0px 20px 20px' : '0px 20px 20px 20px' }}
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
