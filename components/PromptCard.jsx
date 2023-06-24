import React, {useState} from 'react';
import Image from "next/image";
import {useSession} from "next-auth/react";

const PromptCard = ({post, handleTagClick}) => {

    const [copied, setCopied] = useState('')
    const handleCopy = () => {
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => setCopied(''), 3000)
    }

    return (
        <div className={'prompt_card'}>
            <div className={'flex justify-between items-start gap-5'}>
                <div className={'flex-1 flex justify-start items-center gap-3 cursor-pointer'}>
                    <Image
                        width={40}
                        height={40}
                        alt={'user image'}
                        src={post?.creator?.image}
                        className={'rounded-full object-contain'}
                    />
                    <div className={'flex flex-col'}>
                        <h3 className={'font-satoshi font-semibold text-gray-900'}>{post.creator.username}</h3>
                        <p className={'font-inter text-sm text-gray-500'}>{post.creator.email}</p>
                    </div>
                </div>
                <div className={'copy_btn'} onClick={handleCopy}>
                    <Image
                        width={12}
                        height={12}
                        alt={'copy icon'}
                        src={copied ? '/icons/tick.svg' : '/icons/copy.svg'}
                    />
                </div>
            </div>
            <p className={'my-4 font-satoshi tex-sm text-gray-700 '}>{post.prompt}</p>
            <p
                className={'font-inter text-sm blue_gradient cursor-pointer'}
                onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
                {post.tag}
            </p>
        </div>
    );
};

export default PromptCard;