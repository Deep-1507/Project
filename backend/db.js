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
},{
    collection:'users' // Specify the collection name here
});



const productSchemaOnline = new mongoose.Schema({
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
     },
     mode: {
        type: String,
        required: true, // Ensure this field is required if necessary
        default: 'online', // Or set a default value
      }, 
     productImages: {
        type: [String], // Array of image paths
        required: true,
      },
      category: { type: String },
  brand: { type: String },
  sku: { type: String },
  weight: { type: Number },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
  },
  inStock: { type: Boolean, default: true },
  tags: [{ type: String }],
  warranty: { type: String },
  color: { type: String },
  size: { type: String },
  material: { type: String },
  rating: { type: Number, min: 0, max: 5 },
},{
    collection:'Products-online' // Specify the collection name here
});


const onlineCartSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
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
     },
     mode: {
        type: String,
        required: true, // Ensure this field is required if necessary
        default: 'online', // Or set a default value
      }, 
     productImages: {
        type: [String], // Array of image paths
        required: true,
      },
      category: { type: String },
  brand: { type: String },
  sku: { type: String },
  weight: { type: Number },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
  },
  inStock: { type: Boolean, default: true },
  tags: [{ type: String }],
  warranty: { type: String },
  color: { type: String },
  size: { type: String },
  material: { type: String },
  rating: { type: Number, min: 0, max: 5 },
},{
    collection:'Online-Cart' // Specify the collection name here
});

const storeSchema = new mongoose.Schema({
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
     location:{
         type:String,
         required:true,
         trim:true,
         maxLength:50
     },
},{
    collection:'stores' // Specify the collection name here
});



const productSchemaOffline = new mongoose.Schema({
    storeId: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        // unique: true,
        // trim: true,
        // lowercase: true,
        // minLength: 3,
        // maxLength: 50
    },
    productQty: {
        type: Number,
        required: true,
        min: 1 // Updated to min
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
    productDescription: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    mode: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        default: 'offline' // Default value if needed
    },
    productImages: {
        type: [String], // Array of image paths
        required: false, // Optional field, can be adjusted
    },
    category: {
        type: String,
        required: false // Optional field, can be adjusted
    },
    brand: {
        type: String,
        required: false // Optional field, can be adjusted
    },
    sku: {
        type: String,
        required: false // Optional field, can be adjusted
    },
    weight: {
        type: Number,
        required: false // Optional field, can be adjusted
    },
    dimensions: {
        length: { type: Number, required: false },
        width: { type: Number, required: false },
        height: { type: Number, required: false },
    },
    inStock: {
        type: Boolean,
        default: true
    },
    tags: [{ type: String }],
    warranty: {
        type: String,
        required: false // Optional field, can be adjusted
    },
    color: {
        type: String,
        required: false // Optional field, can be adjusted
    },
    size: {
        type: String,
        required: false // Optional field, can be adjusted
    },
    material: {
        type: String,
        required: false // Optional field, can be adjusted
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: false // Optional field, can be adjusted
    }
}, {
    collection: 'Products-offline' // Specify the collection name here
});




const sessionDetailsSchema = new mongoose.Schema({
    sessionDate: {
        type: Date,
        required: true,
    },
    sessionTime: {
        type: String, // 'Time' type is not supported in Mongoose. Use 'String' for time.
        required: true,
    },
    storeId: {
        type: String,
        required: true,
        trim: true,
       
    },
    storeHandlersName:{
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    customersName:{
        type: String,
        required: true,
        trim: true,
    },
    Items: {
        type: [Object], // Use Array of Objects for Items
        required: true,
    },
    billingAmount: {
        type: Number,
        required: true,
    },
}, {
    collection: 'Offline-Billing-Sessions', // Specify the collection name here
});




const User = mongoose.model('User',userSchema);
const OnlineProduct = mongoose.model('OnlineProduct',productSchemaOnline);
const OnlineCart = mongoose.model('OnlineCart',onlineCartSchema);


const Stores = mongoose.model('Stores',storeSchema);
const OfflineProduct = mongoose.model('OfflineProduct',productSchemaOffline);

const SessionDetails = mongoose.model('SessionDetails', sessionDetailsSchema);

module.exports={
    User,
    OnlineProduct,
    OnlineCart,
    Stores,
    OfflineProduct,
    SessionDetails
};