"use client";
import Image from "next/image";
import React from "react";

export default function Avatar() {
    return (
        <Image
            alt="Avatar"
            height={30}
            width={30}
            className="rounded-full "
            src="/images/placeholder.jpg"
        />
    );
}
