import React from 'react'
import { MdVerified } from "react-icons/md";
import { VscSettingsGear } from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';
import { useAppSelector } from '../../../../Store/store';
import Button from '../../../UI/Button.component';
import { MIN_DRAWER_SIZE_PX } from '../../sideDrawer.Constant';

interface IPROPS {
    name: string;
    imageUrl: string;
    description: string;
    isVerified: boolean;
    publisher: string;
    isInstalled?: boolean;
}

const ExtensionCard: React.FC<IPROPS> = ({ name, imageUrl, description, isVerified, publisher, isInstalled = true }) => {
    const sideDrawerWidth = useAppSelector((state) => state.sideDrawer.sideDrawerWidth);
    const isImageVisible=Math.abs(MIN_DRAWER_SIZE_PX - sideDrawerWidth) > 20;
    return (
        <div className='flex gap-2 hover:bg-[color:var(--hover-text-color)] px-4 py-3 w-full'>
            {
                 isImageVisible? 
                    <div className='min-w-[3.5rem] max-w-[3.5rem]'>
                        <img src={imageUrl} className="object-contain h-14 aspect-square" alt={name} />
                    </div>:null
            }

            <div className={twMerge('flex flex-col w-[calc(100%-70px)]',!isImageVisible?"w-full":"")} >
                <h2 className='font-semibold text-[1rem] text-[color:var(--highlight-text-color)] text-ellipsis overflow-hidden'>{name}</h2>
                <h3 className='text-[color:var(--primary-text-color)] text-ellipsis overflow-hidden mt-0.5'>{description}</h3>
                <div className='flex items-center justify-between mt-0.5'>
                    <div className='flex items-center gap-1 min-w-[10px]'>
                        {isVerified ? <MdVerified className='text-lg text-blue-500' /> : null}
                        <h4 className='text-[color:var(--primary-text-color)] font-semibold overflow-hidden text-ellipsis'>{publisher}</h4>
                    </div>
                    {
                        isInstalled ?
                            <Button className='text-[color:var(--primary-text-color)] hover:text-[color:var(--highlight-text-color)]'>
                                <VscSettingsGear className='' />
                            </Button> :
                            <Button className='bg-[color:var(--accent-color)] text-xs text-[color:var(--highlight-text-color)] px-1  rounded-sm hover:brightness-125'>
                                Install
                            </Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default ExtensionCard