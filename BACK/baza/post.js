const mongoose=require("mongoose");

const VremeSchema=new mongoose.Schema({
    sati:{
        type:String,
        trim:true,
        required:true
    },
    datum:{
        type:String,
        trim:true,
        required:true
    }
});

const LokacijaSchema=new mongoose.Schema({
    longituda:{
        type:Number,
        required:true
    },
    latituda:{
        type:Number,
        required:true
    },

    opisLokacije:{
        type:String,
        trim:true,
        required:true
    }
});

const InfoSchema=new mongoose.Schema({
    vreme:VremeSchema,
    lokacija:LokacijaSchema,
});

const GodineSchema=new mongoose.Schema({
    minimum:{
        type:Number,
        required:false
    },
    maximum:{
        type:Number,
        required:false
    }
});

const PostSchema=new mongoose.Schema({
    nazivPosta:{
        type:String,
        trim:true,
        required:true
    },
    slika:{
        type:String,
        trim:true,
        required:true
    },
    info:InfoSchema,
    opisPosta:{
        type:String,
        trim:true,
        required:true
    },
    interesovanja:{
        type:String,
        trim:true,
        required:true,
    },
    godine:GodineSchema,

    idKorisnika:{
        type:String,
        trim:true,
        required:true
    }
});

module.exports=mongoose.model("post", PostSchema);