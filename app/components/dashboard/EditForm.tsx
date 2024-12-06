"use client";

import { UploadDropzone } from "@/app/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SubmitButton } from "../SubmitButtons";
import { categories } from "@/app/lib/categories";
import { useState } from "react";
import { useFormState } from "react-dom";
import { createProduct, editProduct } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/zodSchemas";
import { type $Enums } from "@prisma/client";

// product data Interface
interface iAppProps {
    data: {
        name: string;
        id: string;
        status: $Enums.ProductStatus;
        description: string;
        price: number;
        images: string[];
        category: $Enums.Category;
        isFeatured: boolean;
    }
}


export function EditForm({ data }: iAppProps) {

    const [images, setImages] = useState<string[]>(data.images);

    const [lastResult, action] = useFormState(editProduct, undefined);
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: productSchema })
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    // Handle Image delete
    const handleDelete = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    }    

    return (
        <form id={form.id}
            onSubmit={form.onSubmit}
            action={action}
        >
            <input type="hidden" name="productId" value={data.id}/>
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/products">
                    <ChevronLeft className="w-4 h-4"/>
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">Edit Product</h1>
            </div>

            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>Update your product information</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-3">
                            {/* Product name */}
                            <div className="w-full">
                                <Label>Product Name</Label>
                                <Input type="text" placeholder="Product Name"
                                    key={fields.name.key}
                                    name={fields.name.name}
                                    defaultValue={data.name}
                                />
                                {/* error message */}
                                <p className="text-red-500 text-xs">{fields.name.errors}</p>
                            </div>
                            {/* Product price */}
                            <div className="w-full">
                                <Label>Product Price</Label>
                                <Input type="number" placeholder="₦ Price"
                                    key={fields.price.key}
                                    name={fields.price.name}
                                    defaultValue={data.price}
                                />
                                {/* error message */}
                                <p className="text-red-500 text-xs">{fields.price.errors}</p>
                            </div>
                        </div>
                        
                        {/* Product Description */}
                        <div className="flex flex-col gap-3">
                            <Label>Product Description</Label>
                            <Textarea className="w-full" 
                                placeholder="Write product Description"
                                key={fields.description.key}
                                name={fields.description.name}
                                defaultValue={data.description}
                            />
                            {/* error message */}
                            <p className="text-red-500 text-xs">{fields.description.errors}</p>
                        </div>

                        <div className="flex gap-3 justify-center items-center">

                            {/* IsFeatured */}
                            <div className="w-full flex flex-col gap-2">
                                <Label>Featured Product</Label>
                                <Switch 
                                    key={fields.isFeatured.key}
                                    name={fields.isFeatured.name}
                                    defaultChecked={data.isFeatured}
                                />
                                {/* error message */}
                                <p className="text-red-500 text-xs">{fields.isFeatured.errors}</p>
                            </div>

                            {/* Product Category */}
                            <div className="w-full gap-2">
                                <Label>Category</Label>
                                <Select
                                    key={fields.category.key}
                                    name={fields.category.name}
                                    defaultValue={data.category}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            categories.map((category) => (
                                                <SelectItem key={category.id} value={category.name}>
                                                    {category.title}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                                {/* error message */}
                                <p className="text-red-500 text-xs">{fields.category.errors}</p>
                            </div>
                            
                            <div className="w-full gap-2">
                                <Label>Status</Label>
                                <Select
                                    key={fields.status.key}
                                    name={fields.status.name}
                                    defaultValue={data.status}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                                {/* error message */}
                                <p className="text-red-500 text-xs">{fields.status.errors}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>Add Product Images</Label>
                            <input type="hidden" 
                                value={images} 
                                key={fields.images.key}
                                name={fields.images.name}
                                defaultValue={fields.images.initialValue as any}
                            />
                            {
                                images.length > 0 ? (
                                    <div className="flex gap-5">
                                        {
                                            images.map((image, index) => (
                                                <div key={index} className="relative w-[100px] h-[100px]">
                                                    <Image 
                                                        width={100} height={100}
                                                        src={image} alt="product image"
                                                        className="w-full h-full object-cover rounded-lg border mt-1"
                                                    />

                                                    <button 
                                                        className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-full text-white"
                                                        type="button"
                                                        onClick={() => handleDelete(index)}
                                                    >
                                                        <XIcon className="w-4 h-4"/>
                                                    </button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ): (
                                    <UploadDropzone 
                                        endpoint="imageUploader"
                                        onUploadError={(error: Error) => {
                                            alert(`ERROR! ${error.message}`);
                                        }}
                                        onClientUploadComplete={(res) => {
                                            setImages(res.map((r) => r.url));
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
                            <p className="text-red-500 text-xs">{fields.images.errors}</p>
                        </div>
                    </div>
                </CardContent>

                <CardFooter>
                    <SubmitButton text="Update Product" />
                </CardFooter>
            </Card>
        </form>
    )
}