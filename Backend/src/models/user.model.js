import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudnary url
      required: true,
    },
    coverImage: {
      type: String, //cloudnary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    password: {
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", async function (next) {
  //it takes times and it is middleware
  if (!this.isModified("password")) return next();
  
  // for (let index = 0; index < 3; index++) {
    // }
  this.password =await bcrypt.hash(this.password,10); //now here one prb created is that if user save the pwd will encrypted but when user will upate anything then also password will encrypt so if condition
  next();
}) //here in pre don't write arrow function callback bcoz it create prb context nahi pata hoga this keyword ko means previous value

userSchema.methods.isPasswordCorrect = async function (password) {
  
  return await bcrypt.compare(password, this.password);
};

//
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  )
}

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
}; // only usage difference

export const User = mongoose.model("User", userSchema);
