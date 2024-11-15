import connectMongo from "@/lib/mongoConnection";
import PromoCode from "@/models/PromoCode";
import PromocodeUsages from "@/models/PromocodeUsages";


export async function POST(req) {
  try {
    await connectMongo();

    const { userId, promoCode, totalAmount } = await req.json();
    console.log("deails", userId, promoCode, totalAmount);

    if (!userId || !promoCode || !totalAmount) {
      return new Response(
        JSON.stringify({ error: "All fields (userId, promoCode, totalAmount) are required." }),
        { status: 400 }
      );
    }

    const promo = await PromoCode.findOne({ name: promoCode });
    console.log("promo", promo);
    if (!promo) {
      return new Response(
        JSON.stringify({ error: "Promo code does not exist." }),
        { status: 404 }
      );
    }

    const currentDate = new Date();
    console.log("rrrrrrr1", promo.usageLimit, promo.usesCount);

    if (currentDate > new Date(promo.endDate) || currentDate < new Date(promo.startDate) ) {
      return new Response(
        JSON.stringify({ error: "Promo code is expired." }),
        { status: 400 }
      );
    }

    console.log("rrrrrrr", promo.usageLimit, promo.usesCount);

    if (promo.usageLimit <= promo.usesCount) {
      return new Response(
        JSON.stringify({ error: "Promo code usage limit reached." }),
        { status: 400 }
      );
    }

    const userUsageCount = await PromocodeUsages.countDocuments({ userId, promoCode });

    console.log("usages", userUsageCount);
    if (userUsageCount >= promo.perUserLimit) {
      return new Response(
        JSON.stringify({ error: "You have exceeded the per-user usage limit for this promo code." }),
        { status: 400 }
      );
    }

    const discount = (totalAmount * promo.maxDiscount) / 100;

    const finalAmount = totalAmount - discount;

    promo.usesCount += 1;

    await promo.save();

    const promoUsage = new PromocodeUsages({
      userId,
      promoCode,
      appliedDate: currentDate,
      discountApplied: discount,
      totalAmount,
      finalAmount,
    });

    await promoUsage.save();

    return new Response(
      JSON.stringify({
        message: "Promo code applied successfully!",
        discount,
        finalAmount,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error applying promo code:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to apply promo code." }),
      { status: 500 }
    );
  }
}
