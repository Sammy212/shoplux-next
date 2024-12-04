"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod"
import { bannerSchema, productSchema } from "./lib/zodSchemas";
import prisma from "./lib/db";
import { title } from "process";
import { redis } from "./lib/redis";
import { Cart } from "./lib/interfaces";
import { revalidatePath } from "next/cache";
import { stripe } from "./lib/stripe";
import Stripe from "stripe";


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

// Site Banner Images
export async function createBanner(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    if (!user) {
      return redirect("/");
    }
  
    const submission = parseWithZod(formData, {
      schema: bannerSchema,
    });
  
    if (submission.status !== "success") {
      return submission.reply();
    }
  
    await prisma.banner.create({
      data: {
        title: submission.value.title,
        imageString: submission.value.imageString,
      },
    });
  
    redirect("/dashboard/banner");
}

// Delete Banner Images
export async function deleteBanner(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    if (!user) {
      return redirect("/");
    }

    await prisma.banner.delete({
        where: {
            id: formData.get("bannerId") as string,
        },
    });

    // After delete redirect
    redirect("/dashboard/banner");
}

// Redis State for cart managment | Add items to cart
export async function addItem(productId: string) {
    // protect with kinde auth
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        return redirect("/");
    }

    // Connect user cart to his userId | from Cart Interface
    let cart: Cart | null = await redis.get(`cart-${user.id}`);


    // fetch product data from prism
    const selectedProduct = await prisma.product.findUnique({
        select: {
            id: true,
            name: true,
            price: true,
            images: true
        },
        where: {
            id: productId,
        },
    });

    // verify product exist in db
    if(!selectedProduct) {
        throw new Error("Product doesn't exist");
    }

    let myCart = {} as Cart;

    // verify content in cart or created cart
    if(!cart || !cart.items) {
        myCart = {
            userId: user.id,
            items: [{
                quantity: 1,
                id: selectedProduct.id,
                name: selectedProduct.name,
                price: selectedProduct.price,
                imageString: selectedProduct.images[0],
            },],
        };
    } else {
        // if item exist in user's cart update the quantity by 1
        let itemFound = false;

        myCart.items = cart.items.map((item) => {
            if(item.id === productId) {
                itemFound = true;
                item.quantity += 1;
            }

            return item;
        });

        // if item is not in user's cart | push the item to user's cart
        if(!itemFound) {
            myCart.items.push({
                quantity: 1,
                id: selectedProduct.id,
                name: selectedProduct.name,
                price: selectedProduct.price,
                imageString: selectedProduct.images[0],
            })
        }
    }

    // provide redis with user's cartid and cart content
    await redis.set(`cart-${user.id}`, myCart);

    // revalitate to show update to user's bag/ cart 
    revalidatePath("/", "layout");
}


// remove Items from cart
export async function removeItem(formData: FormData) {
    // protect with kinde auth
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        return redirect("/");
    }

    const productId = formData.get("productId");

    let cart: Cart | null = await redis.get(`cart-${user.id}`);

    if (cart && cart.items) {
        const updateCart: Cart = {
            userId: user.id,
            items: cart.items.filter((item) => item.id !== productId),
        };

        await redis.set(`cart-${user.id}`, updateCart);
    }

    revalidatePath("/bag");
}



// Stripe Checkout
export async function checkOut() {
    // protect with kinde auth
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        return redirect("/");
    }
    
    
    // get user's cart data from redis | upstash
    let cart: Cart | null = await redis.get(`cart-${user.id}`);

    // check there are items in cart
    if(cart && cart.items) {

        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.items.map((item) => (
            {
                price_data: {
                    currency: "ngn",
                    unit_amount: item.price * 100,
                    product_data: {
                        name: item.name,
                        images: [item.imageString]
                    },
                },
                quantity: item.quantity,
            }
        ));

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            success_url: "http://localhost:3000/payment/success",
            cancel_url: "http://localhost:3000/payment/cancel",
        });

        redirect(session.url as string);
    }
}