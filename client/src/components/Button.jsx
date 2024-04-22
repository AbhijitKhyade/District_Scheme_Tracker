import React from 'react'
import {
    Button,
} from "@material-tailwind/react";

export default function ButtonComp({ className, name, type, disabled, onClick }) {
    return (
        <Button className={className} type={type} disabled={disabled} onClick={onClick}>
            {name}
        </Button>
    )
};
