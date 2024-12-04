import prisma from "@/app/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

async function getData() {
    const data = await prisma.order.findMany({
        select: {
            amount: true,
            id: true,
            User: {
                select: {
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                    email: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 7,
    });

    return data;
}

export async function RecentSales() {

    const data = await getData();

    return (
        <Card className="">
        <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Sales transactions</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-8">
            
        {
            data.map((item) => (
                <div className="flex items-center gap-4" key={item.id}>
                    <Avatar className="hidden sm:flex h-9 w-9">
                    <AvatarImage
                        src={item.User?.profileImage} alt="User Avatar"
                    />
                        <AvatarFallback>{item.User?.firstName.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium">{item.User?.firstName} {item.User?.lastName}</p>
                        <p className="text-sm text-muted-foreground">{item.User?.email}</p>
                        
                    </div>
                    <p className="ml-auto font-medium">₦{new Intl.NumberFormat("en-US").format(item.amount / 100)}</p>
                </div>                
            ))
        }
               
        </CardContent>
    </Card>        
    )
}