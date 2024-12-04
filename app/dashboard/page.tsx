import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { RecentSales } from "../components/dashboard/RecentSales";
import { Chart } from "../components/dashboard/Chart";

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

                    <CardContent>
                        <Chart/>
                    </CardContent>
                </Card>
                
            <RecentSales/>
            </div>
        </>
    )
}