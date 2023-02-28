const mongoose=require('mongoose')

const Schema=mongoose.Schema;
const ContactSchema=new Schema({
    firstName:{type:String,require:true},
    lastName:{type:String,require:true},
    email:{type:String,require:true},
    phone:{type:String,require:true}
})

const Contact=mongoose.model('contact',ContactSchema);
module.exports=Contact;