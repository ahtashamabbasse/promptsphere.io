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

    const createPrompt = async (e) => {

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