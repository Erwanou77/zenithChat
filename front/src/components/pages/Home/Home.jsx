import React, { useEffect, useState } from 'react';
import { Avatars, Status } from '../../atoms/Avatars/Avatars';
import api from '../../../services/api';
import { io } from "socket.io-client";

const Home = () => {
    const dataUser = JSON.parse(localStorage.getItem('user'))
    const [friends, setFriends] = useState([]);
    const [friend, setFriend] = useState({})
    const [message, setMessage] = useState([])
    const [boolChangeMessage, setBoolChangeMessage] = useState(false)

    let scroll = document.getElementById('scrollTo')
    
    setTimeout(() => {
        scroll.scrollTo(0, scroll.scrollHeight)
    }, 100) 

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`friendships/addressee/${dataUser._id}`, {
                Authorization: dataUser.token
            })
            const resU = await api.get(`friendships/requester/${dataUser._id}`, {
                Authorization: dataUser.token
            })
            if (Object.keys(friend).length > 0) {
                console.log(friend);

                const resMessages = await api.get(`messages/conversation/${dataUser._id}/${friend.requesterId._id === dataUser._id ? friend.addresseeId._id : friend.requesterId._id}`, {
                    Authorization: dataUser.token
                })
                console.log(resMessages);
                setMessage(resMessages);
                setBoolChangeMessage(false)
                scroll.scrollTo(0, scroll.scrollHeight)
            }
            setFriends([...res, ...resU])
        }
        fetchData()
    }, [friend, boolChangeMessage])

    const socket = io('ws://localhost:3000', {
        query: {
            id: dataUser._id
        },
        extraHeaders: {
            Authorization: dataUser.token
        }
    });
    
    socket.on(dataUser.username, (message) => setMessage(previous => [...previous, message]))
    // if (Object.keys(friend).length > 0) {
    //     socket.on(friend.requesterId.username, (message) => setMessage(previous => [...previous, message]))
    // }
    // socket.on('groupe_', (message) => setMessage(previous => [...previous, message]))

    const handleKeyDown = (e) => {
        if(e.key === "Enter" && e.target.value != "") {
            console.log(e.target.value);
            socket.emit('message', {
                type: 'user',
                to: friend.requesterId.username, 
                by: dataUser.username,
                message: e.target.value
            })
            setMessage(previous => [...previous, e.target.value])
            setBoolChangeMessage(true)
            e.target.value = "";
        }else {
            console.log('Aucune donnée');
        }
    }
    return (
        <div className='bg-black-500 flex h-screen'>
            <div className='flex flex-none flex-col gap-2 w-[72px] items-center pt-2'>
                <div>
                    <Avatars src='https://dummyimage.com/48x48/8a8a8a/fff.png' size={'w-12 h-12'} />
                </div>
                <div>
                    <Avatars src='https://dummyimage.com/48x48/8a8a8a/fff.png' size={'w-12 h-12'} />
                </div>
            </div>
            <div className='flex w-full'>
                <div className='flex flex-none flex-col justify-between w-60 bg-black-200'>
                    <div className='flex flex-col'>
                        <div className='border-b border-black-500 w-full h-12 px-2 flex flex-none items-center'>
                            <input type="text" className='w-full py-0.5 pl-1.5 rounded bg-black-500' placeholder='Recherche' />
                        </div>
                        {friends.map((element, key) => (
                            <>
                                {element.status === "accepted" && (
                                    <div className='py-2 px-2' key={key} onClick={() => setFriend(element)}>
                                        <div className='flex gap-2 items-center'>
                                            <Avatars src='https://dummyimage.com/100x100/8a8a8a/fff.png' size={'w-8 h-8'}>
                                                <Status status={2} size={'w-3 h-3'} />
                                            </Avatars>
                                            <h3 className='text-greyple'>{ element.requesterId.username === dataUser.username ? element.addresseeId.username : element.requesterId.username }</h3>
                                        </div>
                                    </div>
                                )}
                            </>
                        ))}
                        
                    </div>
                    <div className='bg-black-300 flex p-2'>
                        <div className='flex gap-2 items-center'>
                            <Avatars src='https://dummyimage.com/100x100/8a8a8a/fff.png' size={'w-8 h-8'}>
                                <Status status={2} size={'w-3 h-3'} />
                            </Avatars>
                            <h3 className='text-greyple'>{JSON.parse(localStorage.getItem('user')).username}</h3>
                        </div>
                    </div>
                </div>
                <div className='bg-black-100 flex flex-col justify-between flex-auto'>
                    <div className='h-12 pl-2 border-b border-black-500 flex flex-none items-center'>
                        <div className='flex gap-2 items-center'>
                            <Avatars src='https://dummyimage.com/100x100/8a8a8a/fff.png' size={'w-6 h-6'}>
                                <Status status={4} size={'w-2.5 h-2.5'} />
                            </Avatars>
                            <h3 className='text-greyple'>{Object.keys(friend).length > 0 && (friend.requesterId.username === dataUser.username ? friend.addresseeId.username : friend.requesterId.username)}</h3>
                        </div>
                    </div>
                    <div className='px-2 h-fit overflow-y-auto' id='scrollTo'>
                        <div>
                            {message.map(element => (
                                <div className='flex gap-4 pl-2 py-2 items-center hover:bg-black-200 dark:hover:bg-gray-800'>
                                    <Avatars src='https://dummyimage.com/100x100/8a8a8a/fff.png' size={'w-6 h-6'}>
                                        <Status status={4} size={'w-2.5 h-2.5'} />
                                    </Avatars>
                                    <h2 className='text-white'>
                                        {element.recipientId.username}
                                        <button type="button" className="flex items-center justify-between w-full font-medium rtl:text-right text-greyple dark:focus:ring-gray-800 dark:border-black-200 dark:text-black-400">
                                            <p>{element.content}</p>
                                        </button>
                                    </h2>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='pb-2 px-2'>
                        <input type="text" placeholder='Envoyer un message à ' onKeyDown={handleKeyDown} className='bg-black-500 text-greyple py-1.5 pl-4 rounded w-full' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;