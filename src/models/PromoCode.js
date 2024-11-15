import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema({
    name: { type: String, required: true, uppercase: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    maxDiscount: { type: Number, required: true },
    usageLimit: { type: Number, default: 1 },
    perUserLimit: { type: Number, default: 1 },
    usesCount: {type: Number, default: 0 }
});

export default mongoose.models.PromoCode ||  mongoose.model("PromoCode", promoCodeSchema);
