import mongoose from "mongoose";

const PromoCodeUsageSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    }, 
    promoCode: { 
      type: String, 
      required: true 
    }, 
    appliedDate: { 
      type: Date, 
      default: Date.now 
    }, 
    discountApplied: { 
      type: Number, 
      required: true 
    }, 
    totalAmount: { 
      type: Number, 
      required: true 
    }, 
    finalAmount: { 
      type: Number, 
      required: true 
    },
 
  },
  { timestamps: true } // Automatically includes createdAt and updatedAt fields
);

export default mongoose.models.PromoCodeUsage || mongoose.model("PromoCodeUsage", PromoCodeUsageSchema);
