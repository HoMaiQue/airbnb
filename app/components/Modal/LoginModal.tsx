"use client";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import { Schema, schema } from "@/app/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../Input";
import Modal from "./Modal";
import { useRegisterModal } from "@/app/hooks";
type FormData = Pick<Schema, "email" | "password">;
const loginSchema = schema.pick(["email", "password"]);
export default function LoginModal() {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: { email: "", password: "" },
        resolver: yupResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);

        // try {
        //     const res = await
        // } catch (error) {
        //     console.log(error);
        // }
        signIn("credentials", {
            ...data,
            redirect: false,
        }).then((callback) => {
            setLoading(false);

            if (callback?.ok) {
                toast.success("Logged in successfully");
                router.refresh();
                loginModal.onClose();
            }
            if (callback?.error) {
                toast.error(callback.error);
            }
        });
    };
    const handleToggle = useCallback(()=> {
        loginModal.onClose()
        registerModal.onOpen()
    },[loginModal, registerModal])
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back" subtitle="Login to your account" />
            <Input
                name="email"
                label="Email"
                disabled={isLoading}
                placeholder=" "
                errorMessage={errors.email?.message}
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
                onClick={() => signIn("google")}
            />
            <Button
                outline
                label="Continue with github"
                icon={AiFillGithub}
                onClick={()=> signIn("github")}
            />
            <div className="mt-4 font-light text-center text-neutral-500">
                <div className="flex items-center justify-center gap-2">
                    <div className="">First time using Airbnb?</div>

                    <div
                        onClick={handleToggle}
                        className="cursor-pointer text-neutral-800 hover:underline"
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
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={FooterContent}
        />
    );
}
