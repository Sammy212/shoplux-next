import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SuccessRoute() {
    return (
        <section className="w-full min-h-[80vh] flex items-center justify-center">
            <Card className="w-[350px]">
                <div className="p-6">
                    <div className="w-full flex justify-center">
                        <Check
                            className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2"
                        />
                    </div>

                    <div className="mt-3 text-center sm:mt-5 w-full">
                        <h3 className="text-xl leading-6 font-bold">Payment Successfull</h3>
                        <p className="flex flex-col justify-center mt-2 text-muted-foreground text-sm">
                            Your payment was successfull. Your payment option was successfully charged.   
                            <Link 
                                href="https://mail.google.com/" target="_blank" rel="noopener noreferrer"
                                className="text-sm text-black font-bold hover:text-gray-400 text-center"
                            >
                                View payment confirmation
                            </Link>
                        </p>

                        <Button asChild className="w-full mt-5 sm:mt-6">
                            <Link href="/" className="">Continue Shopping</Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </section>
    )    
};
