import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // MONGODB_URI is the canonical name. MONGDB_URI is kept as a temporary
    // fallback for the existing Render environment while it is renamed there.
    const mongoUri = process.env.MONGODB_URI || process.env.MONGDB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is required');
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
