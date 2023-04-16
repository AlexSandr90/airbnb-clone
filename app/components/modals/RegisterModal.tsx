'use client';
import React, {useCallback, useState} from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Modal from "./Modal";
import Heading from "../heading/Heading";
import Input from "../inputs/Input";
import {toast} from "react-hot-toast";
import Button from "../button/Button";
import {signIn} from "next-auth/react";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
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
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                toast.success('Registered!');
                registerModal.onCLose();
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const bodyContent =  (
        <div className='flex flex-col gap-4'>
            <Heading title={'Welcome to Airbnb!'} subtitle={'Create an account'} />

            <Input
                id={'email'}
                label={'Email'}
                register={register}
                errors={errors}
                required
            />
            <Input
                id={'name'}
                label={'Name'}
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
                onClick={() => {}}
            />
            <Button
                outline
                label={'Continue with GitHub'}
                icon={AiFillGithub}
                onClick={ () => signIn('github')}
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
                        Already have an account?
                    </div>
                    <div
                        onClick={registerModal.onCLose}
                        className='
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        '
                    >
                        Log In
                    </div>
                </div>
            </div>
        </div>
    );



    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={registerModal.onCLose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
};

export default RegisterModal;