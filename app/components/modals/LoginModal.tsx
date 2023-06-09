'use client';
import React, {useCallback, useState} from "react";
import {signIn} from 'next-auth/react';
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useRegisterModal from "../../hooks/useRegisterModal";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Modal from "./Modal";
import Heading from "../heading/Heading";
import Input from "../inputs/Input";
import {toast} from "react-hot-toast";
import Button from "../button/Button";
import useLoginModal from "../../hooks/useLoginModal";
// @ts-ignore
import {useRouter} from "next/navigation";

const LoginModal = () => {
    const registerModal = useRegisterModal();
    const router = useRouter();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((callback) => {
                setIsLoading(false);
                if (callback?.ok) {
                    toast.success('Logged in');
                    router.refresh();
                    loginModal.onCLose();
                }

                if (callback?.error) {
                    toast.error(callback?.error)
                }
            })
    };

    const toggle = useCallback(() => {
        loginModal.onCLose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent =  (
        <div className='flex flex-col gap-4'>
            <Heading
                title={'Welcome back'}
                subtitle={'Login to your account!'}
            />

            <Input
                id={'email'}
                label={'Email'}
                register={register}
                errors={errors}
                required
            />
            <Input
                id={'password'}
                type={'password'}
                label={'Password'}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr/>
            <Button
                outline
                label={'Continue with Google'}
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label={'Continue with GitHub'}
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className='
                text-neutral-500
                text-center
                mt-4
                font-light
            '>
                <div className='
                        justify-center
                        flex
                        flex-row
                        items-center
                        gap-2'
                >
                    <div>
                        Firs time using Airbnb?
                    </div>
                    <div
                        onClick={toggle}
                        className='
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        '
                    >
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    );



    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginModal.onCLose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
};

export default LoginModal;