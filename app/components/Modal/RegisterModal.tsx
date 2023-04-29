"use client";
import { useRegisterModal } from "@/app/hooks";
import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Modal from "./Modal";
import axios from "axios";
import Heading from "../Heading";
import Input from "../Input";
import { Schema, schema } from "@/app/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { FcGoogle} from "react-icons/fc";
type FormData = Pick<Schema, "email" | "name" | "password">;
const registerSchema = schema.pick(["email", "name", "password"]);
export default function RegisterModal() {
    const registerModal = useRegisterModal();
    const [isLoading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: { name: "", email: "", password: "" },
        resolver: yupResolver(registerSchema),
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);

        // try {
        //     const res = await
        // } catch (error) {
        //     console.log(error);
        // }
        axios
            .post("/api/register", data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="Create an account" />
            <Input
                name="email"
                label="Email"
                disabled={isLoading}
                placeholder=" "
                errorMessage={errors.email?.message}
                register={register}
            />
            <Input
                name="name"
                label="Name"
                disabled={isLoading}
                placeholder=" "
                errorMessage={errors.name?.message}
                register={register}
            />
            <Input
                register={register}
                name="password"
                label="Password"
                type="password"
                disabled={isLoading}
                placeholder=" "
                errorMessage={errors.password?.message}
            />
        </div>
    );

    const FooterContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with google"
                icon={FcGoogle}
                onClick={() => {}}
            />
            <Button
                outline
                label="Continue with github"
                icon={FcGoogle}
                onClick={() => {}}
            />
            <div className="mt-4 font-light text-center text-neutral-500">
                <div className="flex items-center justify-center gap-2">
                    <div className="">Already have an account?</div>

                    <div onClick={registerModal.onClose} className="cursor-pointer text-neutral-800 hover:underline">
                        Log in
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={FooterContent}
        />
    );
}
