"use client"
import React from "react";
import {BiSearch} from "react-icons/bi"
export default function Search() {
    return (
        <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm transition hover:shadow-md cursor-pointer">
            <div className="flex flex-row items-center justify-center">
                <div className="px-6 text-sm font-semibold">
                    Anywhere
                </div>
                <div className="flex-1 hidden px-6 text-sm font-semibold text-center sm:block border-x-[1px]">
                    AnyWeek
                </div>
                <div className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
                    <div className="hidden sm:block">Add Guest</div>
                    <div className="p-2 text-white rounded-full bg-rose-500">
                        <BiSearch />
                    </div>
                </div>
            </div>
        </div>
    );
}
