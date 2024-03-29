"use server";
import { CONSTANTS } from '@/app/constants';
import { getOrganizationId, getSessionUser } from '@/app/lib/actions';
import { FechedSaleTransactions } from '@/app/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';
import type { Purchase, Stock, User, PaymentMethod, SaleTransaction } from '@prisma/client';
import { number, string } from 'zod';
import { error } from 'console';

const prisma = new PrismaClient();

export async function getPaymentMethods(): Promise<PaymentMethod[] | null> {
    const paymentMethods = await prisma.paymentMethod.findMany();
    return paymentMethods ?? null;
  }

export async function getSaleTransactions() : Promise<FechedSaleTransactions[] | null> {
    const organizationId = await getOrganizationId();
    if(!organizationId) return null;
    const saleTransaction = await prisma.saleTransaction.findMany({
        where: {
            organizationId: organizationId,
        },
        orderBy: {
            createdAt: 'desc',
          },
        include: {
            saleItem: {
                include: {
                    stock: {
                        select: {name: true,}
                    },
                }
            }, 
            user: {
                select: {firstName: true, lastName: true,},
            },
            paymentMethod: {
                select: {name: true,},
            },
        }
    });
    return saleTransaction;
}

export async function getTransactionById() : Promise<SaleTransaction | null> {
    const id = '6748f76a-f641-4bb8-bde1-6ee2dca18f1c'; //
    const saleTransaction = await prisma.saleTransaction.findUnique({
        where: {
            id: id,
        },
        include: {
            saleItem: true,
        }
    });
    return saleTransaction;
}


//sign up & create org
export async function createSale(
    prevState: string | undefined,
    formData: FormData,
) {
    const user = await getSessionUser();
    const paymentMethodId = formData.get("paymentMethodId");
    const discountRate = Number(formData.get("discountRate"));
    const taxRate = 18; // TODO: should be defined by organization
    const tipRate = Number(formData.get("tipRate"));
    const data = convertToNestedItemObject(formData);

    if (
        !user 
        || !paymentMethodId || typeof paymentMethodId !== 'string'
        || typeof discountRate !== 'number' ||  discountRate < 0 || discountRate >= 100 
        || typeof tipRate !== 'number' || tipRate < 0 || tipRate >= 100 
        || !data 
    ) {
        return 'incorrect';
    }

    interface SaleItem {
        stockId: string;
        saleTransactionId: string;
        quantity: number;
        price: number;
        cost: number;
    }
    var subTotalAmount = 0;
    const saleItemsData: SaleItem[] = [];

    for (const stockId of Object.keys(data.item)) {
        const stock = await prisma.stock.findUnique({
            where: {
                id: stockId,
                organizationId: user.organizationId,
            },
        })
        if(!stock) return 'incorrect';
        const price = data.item[stockId]['price'];
        const quantity = data.item[stockId]['quantity'];
        const cost = Math.round(stock.asset / stock.quantity * quantity);
        const updatedStock = await prisma.stock.update({
            where: {
                id: stockId,
            },
            data: {
                asset: stock.asset - cost,
                quantity: stock.quantity - quantity,
            }
        })
        subTotalAmount += price * quantity;
        saleItemsData.push({
            stockId: stockId,
            saleTransactionId: '',
            quantity: quantity,
            price: price,
            cost: cost,
        });
    };
    const discountAmount = Math.round(subTotalAmount * discountRate / 100);
    const taxAmount =  Math.round( (subTotalAmount - discountAmount) * taxRate / 100 );
    const tipAmount = Math.round( (subTotalAmount - discountAmount + taxAmount) * tipRate / 100 );
    const totalAmount = subTotalAmount - discountAmount + taxAmount + tipAmount;

    const saleTransaction = await prisma.saleTransaction.create({
        data: {
            organizationId: user.organizationId,
            userId: user.id,
            paymentMethodId: paymentMethodId,
            discountAmount: discountAmount,
            taxAmount:taxAmount,
            tipAmount:tipAmount,
            subTotalAmount:subTotalAmount,
            totalAmount:totalAmount,
        }
    })

    saleItemsData.forEach(item => {
        item.saleTransactionId = saleTransaction.id;
    }); 
    const saleItems = await prisma.saleItem.createMany({data: saleItemsData});
    return 'success';
}

// validate and vonvert formData to object
function convertToNestedItemObject(formData: FormData): {
    item: { [key: string]: { price: number; quantity: number; } }
} | null {
    interface ReformattedObject {
        item: {
            [key: string]: {
                price: number;
                quantity: number;
            };
        };
    }

    const reformattedObject: ReformattedObject = { item: {} };
    const rawFormData = Object.fromEntries(formData.entries());
    const multiplier = CONSTANTS.CAD_MULTIPLIER;
    try {
        Object.keys(rawFormData).forEach(key => {
            const match = key.match(/items\[(.+?)\]\[(.+?)\]/);
            if (match) {
                const id = match[1];
                const property = match[2] as 'price' | 'quantity';
                const value = property === 'price' ? Number(rawFormData[key]) * multiplier : Number(rawFormData[key]);
                if (isNaN(Number(value)) || Number(value) <= 0) throw new Error;
                if (!reformattedObject.item[id]) {
                    reformattedObject.item[id] = { price: 0, quantity: 0 }; // default is 0
                }
                reformattedObject.item[id][property] = isNaN(Number(value)) ? 0 : Number(value);
            }
        })
    } catch (error) {
        return null;
    }

    for (const id in reformattedObject.item) {
        const item = reformattedObject.item[id];
        if (item.price <= 0 || item.quantity <= 0) {
            return null;
        }
    }
    return reformattedObject;
}