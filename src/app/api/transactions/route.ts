import { NextRequest } from "next/server";
import { prisma } from "../_base";

export const GET = async(req: NextRequest) => {
    try {
        const searchParams = req.nextUrl.searchParams;
        const query = searchParams.get("query")?? '';
        const types = searchParams.get("type")?.split(",") ?? [];
        const categories = searchParams.get("category")?.split(",") ?? [];
        const months = searchParams.get("month")?.split(",") ?? ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        const years = searchParams.get("year")?.split(",") ?? ["2024", "2025"];

        const MONTH_TO_NUMBER: Record<string, number> = {
            jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
            jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
        };

        const transactions = await prisma.transaction.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            { name: { contains: query, mode: "insensitive" }},
                            { category: { contains: query, mode: "insensitive" }},
                            { money: isNaN(parseInt(query)) ? undefined : { equals: parseInt(query) }}
                        ]
                    },
                    types.length > 0 ? { type: { in: types }} : {},
                    categories.length > 0 ? { category: { in: categories }} : {},
                    
                    {
                        OR: years.map(year => ({
                            OR: months.map(month => ({
                                date: {
                                    gte: new Date(parseInt(year), MONTH_TO_NUMBER[month], 1),
                                    lt: new Date(parseInt(year), MONTH_TO_NUMBER[month] + 1, 1)
                                }
                            }))
                        }))
                    },
                ]
            },
            orderBy: {
                date: 'desc'
            }
        });

        console.log(`ini hasil dari ${months.toString()}`, transactions)
        return new Response(JSON.stringify(transactions), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
        });

    } catch (error: any) {
        return new Response("GET transactions error: " + error.message);
    }
}

export const POST = async(req: Request) => {
    try {
        const body = await req.json(); 

        if (body.name && body.name.length > 20) {
            return new Response("Name exceeds maximum length of 20 characters or null", {
                status: 400
            });
        }

        const newTransaction = await prisma.transaction.create({
            data: {
                date: body.date,
                name: body.name,
                type: body.type,
                category: body.category,
                money: body.money
            }
        })
        return new Response(JSON.stringify(newTransaction), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
        })
    } catch (error: any) {
        return new Response("POST transactions error: " + error.message);
    }
}

// export const GET = async (req: Request) => {
//     try {
//         const transactions = await prisma.transaction.findMany({
//             orderBy: {
//                 date: 'asc' // or 'desc' for descending order
//             }
//         });
//         return new Response(JSON.stringify(transactions), {
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             status: 200 // Status 200 indicates success
//         });
//     } catch (error: any) {
//         return new Response("GET transactions error: " + error.message, {
//             status: 500 // Status 500 indicates internal server error
//         });
//     }
// }