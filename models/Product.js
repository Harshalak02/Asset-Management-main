import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";
const ProductSchema = new Schema({


    id: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },

    selectedDate: {
        type: Date,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    serviceDate: {
        type: Date,
    },
    supplierId: {
        type: String,
        required: true,
    },
    employeeId: {
        type: Number,
        ref: 'Employee',
    },
    category: {
        type: Schema.Types.ObjectId, ref: 'Category',
    },
    properties: {
        type: Object,
    },
    image: {
        type: String,
    },

},
    {
        timestamps: true,
    });


//export const Product_1 = models.Product_1 || model('Product_1', ProductSchema);
export const Product_1 = models?.Product_1 || model('Product_1', ProductSchema);
//export default model('Product', ProductSchema);