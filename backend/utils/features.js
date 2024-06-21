import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { getBase64 } from "../lib/helper.js";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";

export const cookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: 24 * 60 * 60 * 1000,
};

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `Connected to database successfully ${connection.connection.host}`
    );
  } catch (error) {
    console.log(`Error while connecting to DB!!`, err);
    throw error;
  }
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("chat-token", token, cookieOptions).json({
    success: true,
    message,
  });
};


const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);

    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResults;
  } catch (err) {
    throw new Error("Error uploading files to cloudinary", err);
  }
};

const deletFilesFromCloudinary = async (public_ids) => {}


const emitEvent = (req,event,users,data) => {
  console.log('EMiiting event: - ', event )
}

export { connectDB, sendToken, emitEvent, deletFilesFromCloudinary, uploadFilesToCloudinary };
