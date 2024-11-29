"use client";
import { createBanner, createProduct } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { bannerSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function BannerRoute() {

    const [image, setImages] = useState<string | undefined>(undefined);
    const [lastResult, action] = useFormState(createBanner, undefined);

    const [form, fields] = useForm({
        lastResult,

        onValidate({formData}) {
            return parseWithZod(formData, {schema: bannerSchema})
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <form id={form.id}
            onSubmit={form.onSubmit}
            action={action}
        >
            <div className="flex items-center gap-x-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/products">
                        <ChevronLeft className="w-4 h-4"/>
                    </Link>
                </Button>

                <h1 className="text-xl font-semibold tracking-tight">New Banner</h1>
            </div>

            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Banner Details</CardTitle>
                    <CardDescription>Create Banner Details</CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col gap-y-6">
                        <div className="flex flex-col gap-3">
                            <Label>Name</Label>
                            <Input type="text" placeholder="Add banner title" 
                                name={fields.title.name}
                                key={fields.title.key}
                                defaultValue={fields.title.initialValue}
                            />

                            {/* error message */}
                            <p className="text-red-500 text-xs">{fields.title.errors}</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>Banner</Label>
                            <input type="hidden"
                                value={image} key={fields.imageString.key}
                                name={fields.imageString.name}
                                defaultValue={fields.imageString.initialValue}
                            />
                            {
                                image !== undefined ? (
                                    <Image 
                                        src={image} alt="Website Banner"
                                        width={600}
                                        height={280}
                                        className="w-[600px] h-[280px] object-cover border rounded-lg"
                                    />
                                ): (
                                    <UploadDropzone 
                                        endpoint="bannerImageRoute"
                                        onClientUploadComplete={(res) => {
                                            setImages(res[0].url)
                                        }}

                                        onUploadError={(error: Error) => {
                                            alert(`ERROR! ${error.message}`);
                                        }}
                                        appearance={{
                                            button: {
                                                backgroundColor: "black"
                                            },
                                            uploadIcon: {
                                                color: "CaptionText"
                                            },
                                        }}
                                    />
                                )
                            }
                            {/* error message */}
                            <p className="text-red-500 text-xs">{fields.imageString.errors}</p>
                        </div>
                    </div>
                </CardContent>

                <CardFooter>
                    <SubmitButton text="Create Banner"/>
                </CardFooter>
            </Card>
        </form>
    )
};
