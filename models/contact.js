const mongoose=require('mongoose')

const ContactSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    }
})

const Contact=mongoose.model('Contact',ContactSchema);

module.exports=Contact;