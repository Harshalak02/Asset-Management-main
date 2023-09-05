import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";
const OrderSchema = new Schema({
    line_items: Object,
    eid: String,
    edepartment: String,
    elocatiom: String,


}, {
    timestamps: true,
});
export const Order = models?.Order || model('Order', OrderSchema);