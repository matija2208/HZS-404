GetData();

async function CreateCard(post) {
    
    //console.log(IDs.length);
    //console.log(IDs[IDs.length-1]);
    
    //console.log(txt);
    let card = `
    <div class="card-container" id="${post._id}" onclick="location.href = 'Prikaz-aktivnosti.html' + '?' + this.id">
    <div id="kartica" style="background-image: ${post.slika};">
    </div>
    <div id="CardLower" class = "CardAnimated">
        <span class="ActiveName">${post.nazivPosta}</span> 
                    
    </div>
    <div id = "CardDifficulty" class = "CardAnimated">
        <span class="DifficultyName">Autor objave: ${await GetUserData(post.idKorisnika)}</span><br>
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
    var tag="VOLONTIRANJE";
    for(let i=1;i<Posts.length;i++)
    {
        console.log(tag);
        
            if(Posts[i].interesovanja===tag)
            {
                cards+= await CreateCard(Posts[i]);
            }
    }
    cardsDiv.innerHTML="";
    cardsDiv.innerHTML = cards;
}

async function GetData() {
    try {
        let posts = await axios.get("http://localhost:3000/api/posts");
        counter=0;
        RenderPosts(posts.data.posts);
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