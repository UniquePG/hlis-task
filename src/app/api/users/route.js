import connectMongo from "@/lib/mongoConnection";
import Users from "@/models/Users";

export async function GET(req) {
    try {
      await connectMongo();
  
      const users = await Users.find();

      console.log("fetchusers", users);
  
      return new Response(
        JSON.stringify({ data: users }),
        { status: 200 }
      );
    } catch (error) {
      console.error('Error fetching fetching users:', error);
      return new Response(
        JSON.stringify({ error: 'An error occurred while fetching users' }),
        { status: 500 }
      );
    }
  }