import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "../components/dashboard/DashboardStats";

export default function Dashboard() {
    return (
        <>
            <DashboardStats/>

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