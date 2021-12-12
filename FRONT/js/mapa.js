async function generatePoint(post)
{
    ///////////////////////
    //mihina Funkcija//////
    ///////////////////////
    var id = post._id;
    var longituda = post.info.lokacija.longituda;
    var latituda = post.info.lokacija.latituda;
    var ime_lokacije = post.info.lokacija.opisLokacije;
    var datum = post.info.vreme.datum;
    var vreme = post.info.vreme.sati;

    //linija za query:
    //  locatio.href="Prikaz-aktivnosti.html/?"+id
}

async function RenderPosts(posts, tag)
{
    posts.forEach(async i => {
        if(i.interesovanja===tag)
        {
            await generatePoint(i);
        }
        else if(tag==="")
        {
            await generatePoint(i);
        }
    });
}

async function GetData(tag="")
{
    try{
        var posts = await axios.get("http://localhost:3000/api/posts");
        console.log(posts.data.posts);
        await RenderPosts(posts.data.posts, tag);
    }
    catch(err)
    {
        console.log(err);
    }
}

GetData();