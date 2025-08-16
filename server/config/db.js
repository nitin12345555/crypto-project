import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    mongoose.connection.on('connected', () => {
      console.log('Database Connected');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('Database connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('Database disconnected');
    });
    
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
