import mongoose from "mongoose";

const connectMongo = async () => {
    if (mongoose.connection.readyState === 1) {
        // Already connected
        console.log("Mongodb already connected");
        return mongoose.connection.asPromise();
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw new Error("Failed to connect to MongoDB");
    }
};

export default connectMongo;