import { Product_1 } from "@/models/Product"
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
    //   res.json(req.method);

    const { method } = req;
    await mongooseConnect();
    // await isAdminRequest(req, res);

    if (method == 'GET') {
        if (req.query?.id) {
            res.json(await Product_1.findOne({ _id: req.query.id }));
        }
        else {
            res.json(await Product_1.find());

        }

    }
    if (method === 'POST') {
        const { id, description, price, selectedDate, department, location, serviceDate, supplierId, employeeId, category, properties, base64 } = req.body;
        const productDoc = await Product_1.create({
            id, description, price, selectedDate, department, location, serviceDate, supplierId, employeeId, category, properties, image: base64
        })
        res.json(productDoc);
    }
    if (method === 'PUT') {
        const { id, description, price, selectedDate, department, location, serviceDate, supplierId, employeeId, category, properties, _id } = req.body;
        await Product_1.updateOne({ _id }, { id, description, price, selectedDate, department, location, serviceDate, supplierId, employeeId, category, properties, _id });
        res.json(true);

    }
    if (method === 'DELETE') {
        if (req.query?.id) {
            await Product_1.deleteOne({ _id: req.query?.id });
            res.json(true);
        }
    }

}