import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PartyPopper, ShoppingBag, User2 } from "lucide-react";

export default function Dashboard() {
    return (
        <>
            {/* Dashboard Cards */}
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                {/* card Revenue */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-500" />
                    </CardHeader>

                    <CardContent>
                        <p className="text-2xl font-bold">$100,000</p>
                        <p className="text-xs text-muted-foreground">Based on 100 charges</p>
                    </CardContent>
                </Card>

                {/* card Sales*/}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Total Sales</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-blue-500" />
                    </CardHeader>

                    <CardContent>
                        <p className="text-2xl font-bold">+50</p>
                        <p className="text-xs text-muted-foreground">Total sales on shoplux</p>
                    </CardContent>
                </Card>

                {/* card Products */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Total Products</CardTitle>
                        <PartyPopper className="h-4 w-4 text-indigo-500" />
                    </CardHeader>

                    <CardContent>
                        <p className="text-2xl font-bold">12,800</p>
                        <p className="text-xs text-muted-foreground">Products in Inventory</p>
                    </CardContent>
                </Card>
                {/* card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Total Users</CardTitle>
                        <User2 className="h-4 w-4 text-orange-500" />
                    </CardHeader>

                    <CardContent>
                        <p className="text-2xl font-bold">120</p>
                        <p className="text-xs text-muted-foreground">Total Users Signed Up</p>
                    </CardContent>
                </Card>
            </div>

            {/* Dashboard Charts */}
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
                <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>Recent transactions</CardDescription>
                    </CardHeader>
                </Card>
                
                <Card className="">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        {/* <CardDescription>Sales transactions</CardDescription> */}
                    </CardHeader>

                    <CardContent className="flex flex-col gap-8">
                        
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-9 w-9">
                                <AvatarFallback>SA</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium">Samuel Afolabi</p>
                                <p className="text-sm text-muted-foreground">sammuelafo.212@gmail.com</p>
                            </div>
                            <p className="ml-auto font-medium">+$2,400</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-9 w-9">
                                <AvatarFallback>TU</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium">Test User</p>
                                <p className="text-sm text-muted-foreground">testuser@mail.com</p>
                            </div>
                            <p className="ml-auto font-medium">+$1,100</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-9 w-9">
                                <AvatarFallback>NU</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium">New User</p>
                                <p className="text-sm text-muted-foreground">anotherUse@mail.com</p>
                            </div>
                            <p className="ml-auto font-medium">+$200,400</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}