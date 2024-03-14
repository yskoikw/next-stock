"use server";
import { CONSTANTS } from '@/app/constants';
import { getOrganizationId, getUserId } from '@/app/lib/actions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';
import type { Purchase, Stock, User } from '@prisma/client';

const prisma = new PrismaClient();

export async function getStocks(): Promise<Stock[] | null> {
  const organizationId = await getOrganizationId();
  if(!organizationId) return null;
  const stocks = await prisma.stock.findMany({
    where: {
      organizationId: organizationId,
    },
  })
  return stocks ?? null;
}

export async function getStockById(id: string): Promise<Stock | null> {
  const organizationId = await getOrganizationId();
  if(!organizationId) return null;
  const stock = await prisma.stock.findUnique({
    where: {
      organizationId: organizationId,
      id: id,
    },
  })
  return stock ?? null;
}

//sign up & create org
export async function createProductAndStock(
  prevState: string | undefined,
  formData: FormData,
) {
  const organizationId = await getOrganizationId();
  const name = formData.get("name");
  const inputedPrice = Number(formData.get("price"));
  const quantity = Number(formData.get("quantity"));
  const inputedAsset = Number(formData.get("asset"));
	if (
    typeof organizationId !== "string" ||
    typeof name !== "string" ||
    typeof inputedPrice !== "number" ||
    typeof quantity !== "number" ||
    typeof inputedAsset !== "number" ||
    inputedPrice < 0 ||
    quantity < 0 ||
    inputedAsset < 0
	) {
		return "Invalid value";
	}

  const price = inputedPrice * CONSTANTS.CAD_MULTIPLIER;
  const asset = inputedAsset * CONSTANTS.CAD_MULTIPLIER;

  const stock = await prisma.stock.create({
    data: {
      organizationId: organizationId,
      name: name,
      price: price,
      quantity: quantity,
      asset: asset
    },
  });
  return  'success';
}

export async function createPurchase(
  prevState: string | undefined,
  formData: FormData,
) {
  const userId = await getUserId();
  const organizationId = await getOrganizationId();
  const stockId = formData.get("stockId");
  const quantity = Number(formData.get("quantity"));
  const inputedCost = Number(formData.get("cost"));
	if (
    typeof organizationId !== "string" ||
    typeof userId !== "string" ||
    typeof stockId !== "string" ||
    typeof quantity !== "number" ||
    typeof inputedCost !== "number" ||
    quantity <= 0 ||
    inputedCost < 0
	) {
		return "Invalid value";
	}
  const cost = inputedCost * CONSTANTS.CAD_MULTIPLIER;
  const currentStock = await getStockById(stockId);
  if(!currentStock || currentStock.organizationId !== organizationId) return "Unexpected error";
  const purchase = await prisma.purchase.create({
    data: {
      stockId: currentStock.id,
      userId: userId,
      quantity: quantity,
      cost: cost,
    },
  });
  
  const newQuantity = currentStock.quantity + quantity;
  const newAsset = currentStock.asset + cost;
  const updatedStock = await prisma.stock.update({
    where: { id: currentStock.id },
    data: { 
      quantity: newQuantity,
      asset: newAsset
    },
  });
  revalidatePath('/manager/stock');
  redirect('/manager/stock');
}

export async function getPurchases(stockId: string): Promise<(Purchase & { user: Pick<User, 'firstName' | 'lastName'> })[] | null> {
  const stock = await getStockById(stockId);
  const organizationId = await getOrganizationId();
  if(!stock || !organizationId || stock.organizationId !== organizationId) return null;
  const purchases = await prisma.purchase.findMany({
    where: {
      stockId: stock.id,
    },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  })
  return purchases ?? null;
}