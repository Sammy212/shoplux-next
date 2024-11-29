"use client";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function BannerRoute() {
    return (
        <form>
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
                            <Input type="text" placeholder="Add banner title" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>Images</Label>

                            <UploadDropzone 
                                endpoint="imageUploader"
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
