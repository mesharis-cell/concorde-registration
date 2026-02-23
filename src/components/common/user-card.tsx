import React from "react";
import {
    bodyFontSemiBold,
    displayFontBold,
    bodyFontRegular,
    displayFontExtraBoldItalic
} from "@/fonts";
import Link from "next/link";

interface UserCardProps {
    name?: string;
    email?: string;
    number?: string;
    link?: string;
    linkText?: string;
    isLoading?: boolean;
}

function UserCard({ name, email, number, link, linkText, isLoading }: UserCardProps) {
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <div className="relative h-[160px] w-[296px] overflow-hidden rounded-xl shadow-lg">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FFE0C2] via-[#d4a574] to-[#b88d3d]" />

                {isLoading ? (
                    <div className="flex h-full w-full items-center justify-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-b-2 border-white" />
                    </div>
                ) : (
                    <div className="relative flex h-full flex-col justify-between p-3">
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col text-[#000000]">
                                <div className={`pt-2 text-[9px] tracking-wide ${bodyFontSemiBold.className} `}>
                                    WELCOME
                                </div>
                                <div className={`mb-2 text-xl font-bold ${bodyFontRegular.className}`}>{name}</div>
                                <div className={`text-[9px] tracking-wide ${bodyFontRegular.className}`}>
                                    EMAIL
                                </div>
                                <div
                                    className={`mb-2 text-xs font-normal tracking-wide ${displayFontExtraBoldItalic.className}`}
                                >
                                    {email}
                                </div>
                                <div className={`text-[9px] tracking-wide ${bodyFontRegular.className}`}>
                                    CONTACT NUMBER
                                </div>
                                <div
                                    className={`mb-2 truncate text-xs font-normal tracking-wide ${displayFontExtraBoldItalic.className}`}
                                >
                                    {number}
                                </div>
                            </div>

                            {link && (
                                <Link
                                    href={link}
                                    className={`text-[8px] tracking-wide text-[#b88d3d] ${displayFontBold.className} `}
                                >
                                    {linkText}
                                </Link>
                            )}

                            <div className="absolute right-0 bottom-0 p-4 text-[8px] tracking-wide text-black/60">
                                SAVVIO CONCORDE
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserCard;
