import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PartyPopper, ShoppingBag, User2 } from "lucide-react";

export function DashboardStats() {
  return (
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
                <p className="text-xs text-muted-foreground">
                    Total sales on shoplux
                </p>
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
  );
}
