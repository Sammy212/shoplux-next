"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {

    const {pending} = useFormStatus();

    return (
        <>
            {
                pending ? (
                    <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please Wait
                    </Button>
                ): (
                    <Button type="submit">Create Product</Button>
                )
            }
        </>
    )
};
