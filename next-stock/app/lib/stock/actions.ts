"use server";
import { PrismaClient } from '@prisma/client';
import type { Stock } from '@prisma/client';
import { getOrganizationId } from '@/app/lib/actions';

const prisma = new PrismaClient();


//sign up & create org
export async function createProductAndStock(
  prevState: string | undefined,
  formData: FormData,
) {
  const organizationId = await getOrganizationId();
  const name = formData.get("name");
  const price = Number(formData.get("price"));
  const quantity = Number(formData.get("quantity"));
  const asset = Number(formData.get("asset"));
	if (
    typeof organizationId !== "string" ||
    typeof name !== "string" ||
    typeof price !== "number" ||
    typeof quantity !== "number" ||
    typeof asset !== "number" ||
    price < 0 ||
    quantity < 0 ||
    asset < 0
	) {
		return "Invalid value";
	}

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