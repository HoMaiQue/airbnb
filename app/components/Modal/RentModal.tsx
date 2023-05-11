"use client";
import { useRentModal } from "@/app/hooks/useRentModal";
import { schema } from "@/app/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import Input from "../Input";
import CategoryInput from "../Input/CategoryInput";
import Counter from "../Input/Counter";
import CountrySelect from "../Input/CountrySelect";
import ImageUpload from "../Input/ImageUpload";
import { categories } from "../Navbar/Categories";
import Modal from "./Modal";
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}
type FormData = {
    category: string;
    location: any;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    imageSrc: string;
    price: number;
    title: string;
    description: string;
};
const rentSchema = schema.pick(["title", "description"]);
export default function RentModal() {
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {
        watch,
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        reset,
    } = useForm<FormData>({
        defaultValues: {
            category: "",
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: "",
            price: 1,
            title: "",
            description: "",
        },
        resolver: yupResolver(rentSchema),
    });

    const category = watch("category");
    const location = watch("location");
    const guestCount = watch("guestCount");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");
    const imageSrc = watch("imageSrc");
    const Map = useMemo(
        () => dynamic(() => import("../Map"), { ssr: false }),
        [location]
    );
    const setCustomValue = (name: keyof FormData ,value: any) => {
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
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
           
            return handleNext();
        }
       
        setIsLoading(true);

        axios
            .post("/api/listings", data)
            .then(() => {
                toast.success("Listing created");
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                rentModal.onClose();
            })
            .catch((e) => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setIsLoading(false);
            });
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
                <Map center={location?.latlng} />
            </div>
        );
    }

    if (STEPS.INFO === step) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place"
                    subtitle="What amenities do you have"
                />
                <Counter
                    title="Guest"
                    subTitle="How many guest do you  allow ?"
                    value={guestCount}
                    onChange={(value) => setCustomValue("guestCount", value)}
                />
                <hr />
                <Counter
                    title="Rooms"
                    subTitle="How many room do you have  ?"
                    value={roomCount}
                    onChange={(value) => setCustomValue("roomCount", value)}
                />
                <hr />
                <Counter
                    title="Bathrooms"
                    subTitle="How many bathrooms do you have ?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue("bathroomCount", value)}
                />
            </div>
        );
    }
    if (STEPS.IMAGES === step) {
        bodyContent = (
            <div className="flex flex-col ">
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guest what your place looks like"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue("imageSrc", value)}
                />
            </div>
        );
    }
    if (STEPS.DESCRIPTION === step) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place"
                    subtitle="Short and sweets works best"
                />
                <Input
                    name="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errorMessage={errors.title?.message}
                    
                />
                <hr />
                <Input
                    name="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errorMessage={errors.description?.message}
                    
                />
            </div>
        );
    }
    if (STEPS.PRICE === step) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your pice"
                    subtitle="How much do you charge per night"
                />
                <Input
                    name="price"
                    disabled={isLoading}
                    register={register}
                    label="pice"
                    formatPrice
                    type="number"
                    
                />
            </div>
        );
    }
    return (
        <Modal
            isOpen={rentModal.isOpen}
            title="Airbnb your home"
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : handleBack}
            body={bodyContent}
        />
    );
}
