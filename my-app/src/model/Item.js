import mongoose, {Schema} from 'mongoose';  
import bcrypt from "bcryptjs";

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: { 
    required: true, 
    type: String, 

  },

}); 

itemSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw error;
  }
});

itemSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

export const Item = mongoose.models.Item ?? mongoose.model("Item", itemSchema);