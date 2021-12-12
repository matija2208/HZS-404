const mongoose=require("mongoose");

const LajkoviSchema=new mongoose.Schema({
    brojLajkova:{
        type:Number,
        required:true
    },

    idLajkova:[{
        type:String,
        trim:true,
        required:true
    }]
})

const UserSchema=new mongoose.Schema({
    ime:{
        type:String,
        trim:true,
        required:true,
    },
    prezime:{
        type:String,
        trim:true,
        required:true,
    },
    userName:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        trim:true,
        required:true,
    },
    interesovanja:[{
        type:String,
        trim:true,
        required:true,
    }],
    datumRodjenja:{
        type:String,
        required:true,
    },

    odobren:{
        type:Boolean,
        required:true
    },

    lajkovi:LajkoviSchema
});

module.exports=mongoose.model("user", UserSchema);