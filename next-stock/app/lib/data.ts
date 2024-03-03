import { PrismaClient } from '@prisma/client';
import { unstable_noStore as noStore} from 'next/cache';

const prisma = new PrismaClient();

// export async function fetchCardData() {
//     noStore();
//     try {
//       // You can probably combine these into a single SQL query
//       // However, we are intentionally splitting them to demonstrate
//       // how to initialize multiple queries in parallel with JS.
//       // await new Promise((resolve) => setTimeout(resolve, 2000));
//       const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
//       const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
//       const invoiceStatusPromise = sql`SELECT
//            SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
//            SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
//            FROM invoices`;
  
//       const data = await Promise.all([
//         invoiceCountPromise,
//         customerCountPromise,
//         invoiceStatusPromise,
//       ]);
  
//       const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
//       const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
//       const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
//       const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');
  
//       return {
//         numberOfCustomers,
//         numberOfInvoices,
//         totalPaidInvoices,
//         totalPendingInvoices,
//       };
//     } catch (error) {
//       console.error('Database Error:', error);
//       throw new Error('Failed to fetch card data.');
//     }
//   }