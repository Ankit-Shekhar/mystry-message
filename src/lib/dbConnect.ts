import mongoose from 'mongoose';

// object that is returned from mongoose after Db creation: it may come or may not come, but if it will come then will come in "number" format
type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to Database")
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})

        connection.isConnected = db.connections[0].readyState

        console.log("Database connected successfully");

    } catch (error) {

        console.log("Database connection failed", error);

        process.exit(1);
    }
}

export default dbConnect;