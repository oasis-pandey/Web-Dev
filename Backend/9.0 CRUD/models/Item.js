import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        default:1
    },
    inStock:{
        type:Boolean,
        default:true
    }
});

const Item = mongoose.model("Item", itemSchema);
export default Item;