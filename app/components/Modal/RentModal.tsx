"use client";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import { useRentModal } from "@/app/hooks/useRentModal";
import { categories } from "../Navbar/Categories";
import Heading from "../Heading";
import CategoryInput from "../Input/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../Input/CountrySelect";
import Map from "../Map";
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}
export default function RentModal() {
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const {
        watch,
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null,
            guestCount: 1,
            roomCount: 1,
            imageSrc: "",
            price: 1,
            title: "",
            description: "",
        },
    });

    const category = watch("category");
    const location = watch("location");
    const setCustomValue = (name: string, value: any) => {
        setValue(name, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };
    const handleBack = () => {
        setStep((value) => value - 1);
    };
    const handleNext = () => {
        setStep((value) => value + 1);
    };
    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Create";
        }
        return "Next";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return "Back";
    }, [step]);
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />
            <div
                className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              gap-3
              max-h-[50vh]
              overflow-y-auto
            "
            >
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) =>
                                setCustomValue("category", category)
                            }
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (STEPS.LOCATION === step) {
        bodyContent = (
            <div className="flex flex-col gap-8 ">
                <Heading
                    title="Where is your located"
                    subtitle="Helps guests find you"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue("location", value)}
                />
                <Map />
            </div>
        );
    }
    return (
        <Modal
            isOpen={rentModal.isOpen}
            title="Airbnb your home"
            onClose={rentModal.onClose}
            onSubmit={handleNext}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : handleBack}
            body={bodyContent}
        />
    );
}
