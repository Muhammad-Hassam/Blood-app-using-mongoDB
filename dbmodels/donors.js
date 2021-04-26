const mongoose=require('mongoose');

const DonorSchema=new mongoose.Schema({
    fullname:{
        type:String,
        require:true,
    },
    age:{
        type:Number,
        require:true,
    },
    gender:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    bloodgroup:{
        type:String,
        require:true,
    },
    imageURL:{
        type:String,
    },
    phone:{
        type:Number,
        require:true,
    },
    latitude:{
        type:Number,
        require:true,
    },
    loogitude:{
        type:Number,
        require:true,
    },
    email:{
        type:String,
        require:true,
    }
})
var Donor=mongoose.model("DONOR",DonorSchema);
module.exports=Donor;