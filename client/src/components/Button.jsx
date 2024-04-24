import React from 'react'
import {
    Button,
} from "@material-tailwind/react";

export default function ButtonComp({ className, name, type, onClick, loading }) {
    return (
        <Button className={className} type={type} disabled={loading} onClick={onClick}>
            {loading ? 'Loading...' : name}
        </Button>
    )
};
