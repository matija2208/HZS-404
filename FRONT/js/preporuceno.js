GetData();

function CreateCard(post, userName) {
    
    //console.log(IDs.length);
    //console.log(IDs[IDs.length-1]);
    
    //console.log(txt);
    let card = `
    <div class="card-container" id="${post._id}" onclick="location.href = 'Prikaz-aktivnosti.html' + '?' + this.id">
    <div id="kartica" style="background-image: url('${post.slika}');">
    </div>
    <div id="CardLower" class = "CardAnimated">
        <span class="ActiveName">${post.nazivPosta}</span> 
                    
    </div>
    <div id = "CardDifficulty" class = "CardAnimated">
        <span class="DifficultyName">Autor objave: ${userName}</span><br>
    </div> 
    </div>
    `;
    return card;
}

async function RenderPosts(posts) {
    const cardsDiv = document.querySelector(".cards");
    let cards = "";
    Posts=[Object];
    var counter=0;
    posts.forEach(function(post){
        Posts.push(post);
        counter++;
    });
    console.log(Posts);
    var user=await GetUser();
    console.log(user);
    if(user !== null)
    {
        console.log(1);
        for(var i=1;i<Posts.length;i++)
        {
            console.log(Posts[i].interesovanja);
                user.interesovanja.every(j=>
                {
                    console.log(Posts[i].interesovanja, j);
                    if(Posts[i].interesovanja.trim()===j)
                    {
                        cards+=  CreateCard(Posts[i], user.userName);
                        return false;
                    }
            
                });
        }
        cardsDiv.innerHTML="";
        cardsDiv.innerHTML = cards;
    }
}

async function GetData() {
    try {
        let posts = await axios.get("http://localhost:3000/api/posts");
        counter=0;
        await RenderPosts(posts.data.posts);
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

async function GetUser() 
{
    var id=localStorage.getItem("id");
    var link = "http://localhost:3000/api/users/"+id;
    console.log(id);
    try {
        if(id!==null)
        {
            var user = await axios.get(link);
            console.log(user.data.user);
            return user.data.user;
        }
        else
        {
            return null;
        }
    }catch (err) {
        console.log(err);
    }
}