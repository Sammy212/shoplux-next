"use client";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ProductCreateRoute() {
    return (
        <form action="">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/products">
                    <ChevronLeft className="w-4 h-4"/>
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">Add New Product</h1>
            </div>

            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>Add product information</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-3">
                            <div className="w-full">
                                <Label>Product Name</Label>
                                <Input type="text" placeholder="Product Name"/>
                            </div>
                            <div className="w-full">
                                <Label>Product Price</Label>
                                <Input type="number" placeholder="$ Price"/>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <Label>Product Description</Label>
                            <Textarea className="w-full" placeholder="Write product Description"/>
                        </div>

                        <div className="flex gap-3 justify-center items-center">
                            <div className="w-full flex flex-col gap-2">
                                <Label>Featured Product</Label>
                                <Switch />
                            </div>
                            <div className="w-full gap-2">
                                <Label>Status</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>Add Product Images</Label>
                            <UploadDropzone 
                                endpoint="imageUploader"
                                onUploadError={(error: Error) => {
                                    alert(`ERROR! ${error.message}`);
                                }}
                                onClientUploadComplete={(res) => {
                                    alert("Product Image Upload Completed");
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
                        </div>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button>Create Product</Button>
                </CardFooter>
            </Card>
        </form>
    )
};
