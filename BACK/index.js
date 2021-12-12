const express = require("express");
const app = express();
const connect_baza = require("./baza/baza");
const post = require("./baza/post");
const user = require("./baza/user");
const cors = require("cors");
const mailer=require("nodemailer");
const xoauth2 = require('xoauth2');
const PORT = 3000;

var smtpTransport = mailer.createTransport({
    service: "gmail",
    auth: {
        user: 'tim404.hzs@gmail.com',
        pass: "Tim404hzs"
    }
});

app.listen(PORT, () => {
    console.log(`Server slusa na portu: ${PORT}`);
});

//konekcija sa bazom
connect_baza();

// Sa JSON
app.use(express.json());
app.use(cors());


//PostAPI
    app.get("/api/posts", async function(req,res){
        try{
            const all_posts = await post.find();
            res.json({
                uspesno:true,
                posts:all_posts
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

    app.get("/api/posts/:id", async function(req,res){
        try{
            const postId = req.params.id;
            const Post = await post.findById(postId);
            res.json({
                post:Post
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

    app.post("/api/posts/", async function(req,res){
        try{

            const newPost=new post({
                nazivPosta:req.body.nazivPosta,
                slika:req.body.slika,
                info:{
                    vreme:{
                        sati:req.body.info.vreme.sati,
                        datum:req.body.info.vreme.datum
                    },
                    lokacija:{
                        longituda:req.body.info.lokacija.longituda,
                        latituda:req.body.info.lokacija.latituda,

                        opisLokacije:req.body.info.lokacija.opisLokacije
                    },
                    telefon:req.body.info.telefon
                },
                opisPosta:req.body.opisPosta,
                interesovanja:req.body.interesovanja,
                godine:{
                    minimum:req.body.godine.minimum,
                    maximum:req.body.godine.maximum
                },

                idKorisnika:req.body.idKorisnika
            });

            const savedPost=await newPost.save();

            res.send({
                uspesnost:true,
                objava:savedPost,
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

    app.delete("/api/posts/:id",async function(req,res){
        try{
            const postId = req.params.id;
            const newPost = await post.findById(postId);
            const deletedPost = await newPost.delete();
            res.send({
                uspesnost:true,
                objava:deletedPost,
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

    app.put("/api/posts/:id", async function(req,res){
        try{
            const postId = req.params.id;
            const newPost = await post.findById(postId);

            newPost.nazivPosta=req.body.nazivPosta;

            newPost.slika=req.body.slika;

                newPost.info.vreme.sati=req.body.info.vreme.sati;
                newPost.info.vreme.datum=req.body.info.vreme.datum;
                
                newPost.info.lokacija.longituda=req.body.info.lokacija.longituda;
                newPost.info.lokacija.latituda=req.body.info.lokacija.latituda;

                newPost.info.lokacija.opisLokacije=req.body.info.lokacija.opisLokacije;
                    
                newPost.info.telefon=req.body.info.telefon;

            newPost.opisPosta=req.body.opisPosta;
            newPost.interesovanja=req.body.interesovanja;
                newPost.godine.minimum=req.body.godine.minimum;
                newPost.godine.maximum=req.body.godine.maximum;

            newPost.idKorisnika=req.body.idKorisnika;
            

            const savedPost=await newPost.save();
            console.log("post edit pogodjen");
            console.log(req.body);
            res.send({
                uspesnost:true,
                objava:savedPost,
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

//UserAPI
    app.get("/api/users/", async function(req,res){
        try{
            const all_users = await user.find();
            res.send({
                uspesno:true,
                users:all_users
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

    app.get("/api/users/:id", async function(req, res){
        try{
            const UserId = req.params.id;
            const User = await user.findById(UserId);
            res.json({
                user:User
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

    app.post("/api/users/", async function(req,res){
        try{
            const newUser=new user({
                ime:req.body.ime,
                prezime:req.body.prezime,
                userName:req.body.userName,
                email:req.body.email,
                password:req.body.password,

                interesovanja:req.body.interesovanja,

                datumRodjenja:req.body.datumRodjenja,

                lajkovi:{
                    brojLajkova:req.body.lajkovi.brojLajkova,
                    idLajkova:req.body.lajkovi.idLajkova
                }
            });

            const savedUser=await newUser.save();

            link="Pocetna.html"+"?"+savedUser._id;
            mailOptions={
                to : savedUser.email,
                subject : "Please confirm your Email account",
                html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
            }
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                res.end("error");
                }else{
                    console.log("Message sent: " + JSON.stringify(response));
                res.end("sent");
                 }
            });

            res.send({
                uspesnost:true,
                AddedUser:savedUser,
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

    app.put("/api/users/:id", async function(req,res){
        try{
            const userId = req.params.id;
            const editedUser = await user.findById(userId);

            editedUser.ime=req.body.ime;
            editedUser.prezime=req.body.prezime;
            editedUser.userName=req.body.userName;
            editedUser.email=req.body.email;
            editedUser.password=req.body.password;

            editedUser.interesovanja=req.body.interesovanja;

            editedUser.datumRodjenja=req.body.datumRodjenja;

            editedPost.lajkovi.brojLajkova=req.body.lajkovi.brojLajkova;
            editedUser.lajkovi.idLajkova=req.body.lajkovi.idLajkova;

            const updatedUser=await editedUser.save();
            res.send({
                uspesnost:true,
                updatedUser:updatedUser,
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

    app.delete("/api/users/:id", async function(req,res){
        try{
            const userId = req.params.id;
            const delitingUser = await user.findById(userId);
            const deletedUser=await delitingUser.delete();

            res.send({
                uspesnost:true,
                deletedUser:deletedUser,
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });
