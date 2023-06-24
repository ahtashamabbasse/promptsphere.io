'use client';

import React, {useState} from 'react';
import Form from "@components/Form";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });
    const {data: session} = useSession();
    const router = useRouter()

    const createPrompt = async (e) => {
        e.preventDefault()
        try {
            setSubmitting(true)
            const response = await fetch('/api/prompt/new', {
                method: 'post',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user?.id,
                    tag: post.tag
                })
            })
            if (response.ok) {
                router.push('/')
            }
        } catch (err) {
            console.log('err :: ', err)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            <Form
                post={post}
                type={'Create'}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={createPrompt}
                setSubmitting={setSubmitting}
            />
        </div>
    );
};

export default CreatePrompt;