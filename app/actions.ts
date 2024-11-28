"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod"
import { productSchema } from "./lib/zodSchemas";
import prisma from "./lib/db";

export async function createProduct(prevState: unknown, formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(
        !user 
        // || user.email !== "samuelafo.212@gmail.com"
    ) {
        return redirect("/")
    }

    const submission = parseWithZod(formData, {
        schema: productSchema,
    });

    if(submission.status !== "success") {
        return submission.reply();
    }

    await prisma.product.create({
        data: {
            name: submission.value.name,
            description: submission.value.description,
            status: submission.value.status,
            price: submission.value.price,
            images: submission.value.images,
            category: submission.value.category,
            isFeatured: submission.value.isFeatured,
        },
    });

    redirect("/dashboard/products");
}