const mongoose = require('mongoose');
const { number } = require('zod');

mongoose.connect("mongodb+srv://admin:deep1507@cluster0.rd0szsg.mongodb.net/Sparkathon");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
     position:{
         type:String,
         required:true,
         trim:true,
         maxLength:50
     },
     positionseniorityindex:{
         type:Number,
         required:true
     }
},{
    collection:'users' // Specify the collection name here
});



const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        // unique: true
        // trim: true,
        // lowercase: true,
        // minLength: 3,
        // maxLength: 50
    },
    productQty: {
        type: Number,
        required: true,
        minLength: 1
    },
    productPrice: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    productName: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    productDescription:{
         type:String,
         required:true,
         trim:true,
         minLength: 1
     }
},{
    collection:'Products-online' // Specify the collection name here
});



const User = mongoose.model('User',userSchema);
const OnlineProduct = mongoose.model('OnlineProduct',productSchema);

module.exports={
    User,
    OnlineProduct
};