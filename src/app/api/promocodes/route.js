import connectMongo from "@/lib/mongoConnection";
import PromoCode from "@/models/PromoCode";


class ValidationError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'ValidationError';
    this.code = code;
  }
}

export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectMongo();

    const promoCodes = await req.json();
    console.log('Promo codes received:', promoCodes);

    if (!Array.isArray(promoCodes) || promoCodes.length === 0) {
      throw new ValidationError('Invalid data: Should be a non-empty array', 'INVALID_ARRAY');
    }

    // Validate each promo code
    const validatedPromoCodes = promoCodes.map((promoCode, index) => {
      const {
        name,
        gender,
        startDate,
        endDate,
        maxDiscount,
        usageLimit,
        perUserLimit,
      } = promoCode;
      console.log("isidemap",  name,
        gender,
        startDate,
        endDate,
        maxDiscount,
        usageLimit,
        perUserLimit, );

      if (!name || !gender || !startDate || !endDate || maxDiscount == null) {
        return new Response(
          JSON.stringify({ error: `Promo code #${index + 1}: Missing required fields` }),
          { status: 400 }
        );
      }

     

      console.log("all fields valid");

      return {
        name: name.toUpperCase(),
        gender,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        maxDiscount: parseFloat(maxDiscount),
        usageLimit: usageLimit ? parseInt(usageLimit) : 1,
        perUserLimit: perUserLimit ? parseInt(perUserLimit) : 1,
      };
    });

    console.log("validpromo", validatedPromoCodes);

    const result = await PromoCode.insertMany(validatedPromoCodes);

    return new Response(
      JSON.stringify({ message: 'Promo codes added successfully!', data: result }),
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return new Response(
        JSON.stringify({ error: error.message, code: error.code }),
        { status: 400 }
      );
    }
    console.error('Error saving promo codes:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing the promo codes' }),
      { status: 500 }
    );
  }
}


export async function GET(req) {
    try {
      await connectMongo();
  
      const promoCodes = await PromoCode.find();

      console.log("fetchpromocodes", promoCodes);
  
      return new Response(
        JSON.stringify({ data: promoCodes }),
        { status: 200 }
      );
    } catch (error) {
      console.error('Error fetching promo codes:', error);
      return new Response(
        JSON.stringify({ error: 'An error occurred while fetching promo codes' }),
        { status: 500 }
      );
    }
  }