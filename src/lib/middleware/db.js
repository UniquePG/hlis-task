import connectMongo from "../mongoConnection";

export async function withMongo(handler) {
    return async function (req, res) {
        try {
            await connectMongo();
            console.log("MongoDb connection successfully");
            return handler(req, res);
        } catch (error) {
            console.error("Database connection error:", error);
            res.status(500).json({ error: "Failed to connect to the database" });
        }
    };
}