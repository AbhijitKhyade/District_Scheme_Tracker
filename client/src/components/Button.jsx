import React from 'react'
import {
    Button,
} from "@material-tailwind/react";

export default function ButtonComp({ className, name, type, onClick, loading, disabled }) {
    return (
        <Button className={className} type={type} disabled={disabled} onClick={onClick} >
            {loading ? 'Loading...' : name}
        </Button>
    )
};
