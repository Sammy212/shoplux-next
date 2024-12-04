import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelRoute() {
    return (
        <section className="w-full min-h-[80vh] flex items-center justify-center">
            <Card className="w-[350px]">
                <div className="p-6">
                    <div className="w-full flex justify-center">
                        <XCircle
                            className="w-12 h-12 rounded-full bg-red-500/30 text-red-500 p-2"
                        />
                    </div>

                    <div className="mt-3 text-center sm:mt-5 w-full">
                        <h3 className="text-xl leading-6 font-bold">Payment Cancelled</h3>
                        <p className="flex flex-col justify-center mt-2 text-muted-foreground text-sm">Something went wrong, payment unsuccessfull. You have not been charged. Please try again</p>

                        <Button asChild className="w-full mt-5 sm:mt-6">
                            <Link href="/bag" className="">View Shopping Bag</Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </section>
    )
};
