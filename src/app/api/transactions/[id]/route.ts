import { prisma } from "../../_base";

export const DELETE = async(_req: Request, {params} : { params: { id: string }}) => {
    try {
        const { id } = params;
        const deletedTransaction = await prisma.transaction.delete({
            where: {
                id: parseInt(id, 10)
            }
        })
        return new Response(JSON.stringify(deletedTransaction), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
        });
    } catch (error: any) {
        return new Response("DELETE transaction error: " + error.message);
    }
}

export const UPDATE = async(req: Request, {params} : { params: { id: string }}) => {
    try {
        const { id } = params;
        const checkTransaction = await prisma.transaction.findUnique({
            where: {
                id: parseInt(id, 10)
            }
        })

        if (!checkTransaction) {
            return new Response("Transaction not found", { status: 404});
        }

        const body = await req.json();
        const updatedTransaction = await prisma.transaction.update({
            where: {
                id: parseInt(id, 10)
            },

            data: {
                date: body.date,
                category: body.category,
                name: body.name,
                money: body.money
            }
        })
        
        return new Response(JSON.stringify(updatedTransaction), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
        })

    } catch (error: any) {
        return new Response("UPDATE transaction error: " + error.message);
    }
}