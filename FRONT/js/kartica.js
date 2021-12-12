GetData();

var destination = "Recept_stranica.html"
var counter=0;
var IDs=[String];
var POSTS=[Object];
let Posts=[Object];

function GoToRecipe(id){
    location.href = destination + "?" + id;
}

async function CreateCard(post) {
    IDs.push(post._id);
    //console.log(IDs.length);
    //console.log(IDs[IDs.length-1]);
    POSTS.push(post);

    var txt="";
    post.potrebniSastojci.forEach(i => txt+="- "+i.kolicinaSastojka+" "+i.imeSastojka+"<br>");
    
    //console.log(txt);
    let card = `
    <div class="card-container" id="${post._id}" onclick="GoToRecipe(this.id)">
        <div style="background-image: url(${post.slika}); background-repeat: no-repeat; background-position: center; background-size: cover; height: 360px; border-radius: 25px 0px 0px 0px;">
        </div>
        <div id="CardLower" class = "CardAnimated">
            <span class="RecipeName">${post.imeJela}  &nbsp; &nbsp;<i class="fas fa-heart" id="srce"></i> &nbsp;${post.brojLajkova}</span> 
                        
        </div>
        <div id = "CardDifficulty" class = "CardAnimated">
            <span class="DifficultyName">Autor recepta: ${await GetUserData(post.idKorisnika)}</span><br>
            ${tac}
        </div>
    </div> 

    `;
    return card;
}

async function RenderPosts(posts, tag="") {
    const cardsDiv = document.querySelector(".cards");
    let cards = "";
    Posts=[Object];
    var counter=0;
    posts.forEach(function(post){
        Posts.push(post);
        counter++;
    });
    console.log(Posts);

    for(let i=1;i<Posts.length;i++)
    {
        if(tag==="")
        {
            cards+= await CreateCard(Posts[i])
        }
        else if(tag==="IZNENADI")
        {
            var index=Math.floor(Math.random()*counter);
            console.log(index);

            cards+= await CreateCard(Posts[index+1]);
            break;
        }
        else
        {
            for(var j = 0; j < Posts[i].tagovi.length; j++)
            {
                if(Posts[i].tagovi[j]===tag)
                {
                    cards+= await CreateCard(Posts[i]);
                }
            }
        }
    }
    cardsDiv.innerHTML="";
    cardsDiv.innerHTML = cards;
}

async function GetData(tag="") {
    try {
        let posts = await axios.get("http://localhost:3000/api/posts");
        counter=0;
        RenderPosts(posts.data.posts, tag);
    }catch (err) {
        console.log(err);
    }
}

async function GetUserData(id) {
    var link = "http://localhost:3000/api/users/"+id;
    console.log(id);
    try {
        var user = await axios.get(link);
        return user.data.user.userName;
    }catch (err) {
        console.log(err);
    }
}