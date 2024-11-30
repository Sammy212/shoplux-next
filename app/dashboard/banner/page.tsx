import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Get banner data from prisma db
async function getData() {
    const data = await prisma.banner.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return data;
};



export default async function BannerRoute() {

    const data = await getData();
    return (
        <>
            {/* Add banner button */}
            <div className="flex items-center justify-end">
                <Button asChild className="flex gap-x-2">
                    <Link href="/dashboard/banner/create">
                        <PlusCircle className="h-3.5 w-3.5"/>
                        <span>Add Banner</span>
                    </Link>
                </Button>
            </div> 


            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Banners</CardTitle>
                    <CardDescription>Manage your site banners</CardDescription>
                    <CardDescription><Link href="/" target="_blank"><span className="text-black underline">Click Here</span> to view changes/update on store front</Link></CardDescription>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead className="text-end">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {/* map through returned data */}
                            {
                                data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Image 
                                                alt="Banner Image" src={item.imageString}
                                                width={120} height={42}
                                                className="rounded-lg object-cover w-54 h-26"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {item.title}
                                        </TableCell>
                                        <TableCell className="text-end">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button size="icon" variant="ghost">
                                                        <MoreHorizontal className="h-4 w-4"/>
                                                    </Button>
                                                </DropdownMenuTrigger>
        
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator/>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/banner/${item.id}/delete`}>Delete</Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>                                    
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
};
