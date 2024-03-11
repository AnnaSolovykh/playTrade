import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Seller from "./Seller";
import Buyer from "./Buyer";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter your name"]
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address in this format: name@example.com"
    ]
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    match: [
      /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      "Password should be at least 8 characters long and contain at least one special character"
    ]
  },
  authProvider: {
    type: Boolean,
    default: false,
    required: false
  },
  passwordResetToken: {
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
});

// Encrypt password before saving
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
  });
};

UserSchema.methods.createResetPasswordToken = function () {
  return jwt.sign(
    {
      userId: this._id,
      timestamp: new Date().getTime()
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_RESET_PASSWORD_EXPIRES_IN
    }
  );
};

UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

// Once user is created we setup him as a buyer and seller
UserSchema.post("save", async function (doc) {
  try {
    if (doc.role === "user") {
      await Seller.create({ userId: doc._id });
      await Buyer.create({ userId: doc._id });
    }
  } catch (error) {
    console.log(error);
  }
});

// edit user
UserSchema.methods.editUser = async function (updatedUserInfo) {
  try {
    Object.assign(this, updatedUserInfo);
    await this.save();
    console.log("User was successfully updated");
  } catch (error) {
    console.log("Error");
    throw error;
  }
};

//delete user
UserSchema.methods.deleteUser = async function () {
  try {
    await this.remove();
    console.log("User was successfully deleted");
  } catch (error) {
    console.log("Error");
    throw error;
  }
};

const User = models.UserSchema || model("User", UserSchema);
export default User;