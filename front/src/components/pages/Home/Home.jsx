import React from 'react';
import { Avatars, Status } from '../../atoms/Avatars/Avatars';

const Home = () => {
    return (
        <div className='bg-black-500 flex h-screen'>
            <div className='flex flex-none flex-col gap-2 w-[72px] items-center pt-2'>
                <div>
                    <Avatars src='https://dummyimage.com/48x48/8a8a8a/fff.png' w={12} h={12} />
                </div>
                <div>
                    <Avatars src='https://dummyimage.com/48x48/8a8a8a/fff.png' w={12} h={12} />
                </div>
            </div>
            <div className='flex w-full'>
                <div className='flex flex-none flex-col justify-between w-60 bg-black-200'>
                    <div className='flex flex-col'>
                        <div className='border-b border-black-500 w-full h-12 px-2 flex flex-none items-center'>
                            <input type="text" className='w-full py-0.5 pl-1.5 rounded bg-black-500' placeholder='Recherche' />
                        </div>
                        <div className='pt-2 px-2'>
                            <div className='flex gap-2 items-center'>
                                <Avatars src='https://dummyimage.com/100x100/8a8a8a/fff.png' size={'w-8 h-8'}>
                                    <Status status={2} size={'w-3 h-3'} />
                                </Avatars>
                                <h3 className='text-greyple'>Nom user</h3>
                            </div>
                        </div>
                    </div>
                    <div className='bg-black-300 flex p-2'>
                        <div className='flex gap-2 items-center'>
                            <Avatars src='https://dummyimage.com/100x100/8a8a8a/fff.png' size={'w-8 h-8'}>
                                <Status status={2} size={'w-3 h-3'} />
                            </Avatars>
                            <h3 className='text-greyple'>Nom user</h3>
                        </div>
                    </div>
                </div>
                <div className='bg-black-100 flex flex-col justify-between flex-auto'>
                    <div className='h-12 pl-2 border-b border-black-500 flex flex-none items-center'>
                        <div className='flex gap-2 items-center'>
                            <Avatars src='https://dummyimage.com/100x100/8a8a8a/fff.png' size={'w-6 h-6'}>
                                <Status status={4} size={'w-2.5 h-2.5'} />
                            </Avatars>
                            <h3 className='text-greyple'>Nom user</h3>
                        </div>
                    </div>
                    <div className='px-2'>
                        <div>teste</div>
                        <div className='pb-2'>
                            <input type="text" placeholder='Envoyer un message à ' className='bg-black-500 text-greyple py-1.5 pl-4 rounded w-full' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;