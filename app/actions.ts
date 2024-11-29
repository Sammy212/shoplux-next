"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod"
import { productSchema } from "./lib/zodSchemas";
import prisma from "./lib/db";


// create products
export async function createProduct(prevState: unknown, formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(
        !user 
        // || user.email !== "samuelafo.212@gmail.com"
    ) {
        return redirect("/");
    }

    const submission = parseWithZod(formData, {
        schema: productSchema,
    });

    if(submission.status !== "success") {
        return submission.reply();
    }

    // Slit images url array into onjects
    const flattenUrls = submission.value.images.flatMap((urlString) =>
        urlString.split(",").map((url) => url.trim())
    );

    await prisma.product.create({
        data: {
            name: submission.value.name,
            description: submission.value.description,
            status: submission.value.status,
            price: submission.value.price,
            images: flattenUrls,
            category: submission.value.category,
            isFeatured: submission.value.isFeatured === true ? true : false,
        },
    });

    redirect("/dashboard/products");
}

// Update Products
export async function editProduct(prevState: any, formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        return redirect("/");
    }

    const submission = parseWithZod(formData, {
        schema: productSchema,
    });

    if(submission.status !== "success") {
        return submission.reply();
    }

    // Slit images url array into onjects
    const flattenUrls = submission.value.images.flatMap((urlString) =>
        urlString.split(",").map((url) => url.trim())
    );    

    // Get product ID from formdata
    const productId = formData.get("productId") as string;
    await prisma.product.update({
        where: {
            id: productId,
        },
        data: {
            name: submission.value.name,
            description: submission.value.description,
            category: submission.value.category,
            price: submission.value.price,
            isFeatured: submission.value.isFeatured === true ? true : false,
            status: submission.value.status,
            images: flattenUrls,
        },
    });

    redirect("/dashboard/products");
}

// Delete Products
export async function deleteProduct(formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        return redirect("/");
    }

    await prisma.product.delete({
        where: {
            id: formData.get("productId") as string,
        },
    });
    
    redirect("/dashboard/products");
}