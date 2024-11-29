import { deleteProduct } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function DeleteRoute({ params }: { params: { id: string } }) {
    return (
        <div className="h-[80vh] w-full flex items-center justify-center">
            <Card className="max-w-xl">
                <CardHeader className="flex flex-col justify-center items-center gap-2">
                    <CardTitle>Are you sure?</CardTitle>
                    <CardDescription className="text-center">This action is not reversable. It would permanently remove this product and its related data from our servers</CardDescription>
                </CardHeader>
                <CardFooter className="w-full flex justify-center items-center gap-8">
                    <Button variant="secondary" asChild>
                        <Link href="/dashboard/products">Cancel</Link>
                    </Button>
                    <form
                        // server action delete product
                        action={deleteProduct}
                    >
                        <input type="hidden" name="productId" value={params.id}/>
                        <SubmitButton variant="destructive" text="Delete Product"/>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
};
