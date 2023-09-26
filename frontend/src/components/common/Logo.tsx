import React from 'react'

type LogoProps = {
    color: 'white' | 'black'
}

export default function Logo({ color}: LogoProps) {
    return (
        <span style={{color: color }} className={"flex text-lg xl:mr-2 tracking-wide"}>
            global<span className="font-extrabold">Aid</span>
        </span>
    )
}
