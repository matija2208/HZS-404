async function putData(post)
{
    const cardsDiv = document.querySelector(".ostatak");

    var idKorisnika = localStorage.getItem("id");

    var min=(post.godine.minimum===-1)?"":`<h2 class="opisBitno"><b><i class="fas fa-arrow-down"></i> Minimalne godine: ${post.godine.minimum}</b></h2>`;
    var max=(post.godine.maximum===-1)?"":`<h2 class="opisBitno"><b><i class="fas fa-arrow-up"></i> Maksimalne godine: ${post.godine.maximum}</b></h2>`;

    var src=`
    <div class="prostor">
    <div class="slika"><img id="slika" src="${post.slika}"></div>
    </div> 
    <div class="linija"></div>
    <div class="sastojci">
    <h1 class = "opisBitnoTop">${post.nazivPosta}</h1>
    <h2 id="user-name"><i><u>Autor objave: ${await GetUserData(post.idKorisnika)}</u></i></h2>
    <h2 class="opisBitno"><b><i class="fas fa-calendar-alt"></i> Datum događaja: ${post.info.vreme.datum}</b></h2>
    <h2 class="opisBitno"><b><i class="fas fa-stopwatch"></i> VREME događaja: ${post.info.vreme.sati}</b></h2>
    <h2 class="opisBitno"><b><i class="fas fa-map-marker-alt"></i> Opis lokacije: ${post.info.lokacija.opisLokacije}</b></h2>
    ${min}
    ${max}
    <h2 class="opisBitno"><b><i class="fab fa-angellist"></i> Tip događaja: ${post.interesovanja}</b></h2>
    <h2 class="opisBitno"><b>Opis događaja:</b></h2><br>
    <p id="opisBitnoSastojci">
        <i>${post.opisPosta}</i>
    </p>
    </li><br>
    
    <button name="hidden_buttons" class="delete-button hidden" id="button1" onclick = "location.href='update.html?'+location.search.substring(1)">Update <i class="fas fa-pencil-alt"></i> </button>
    <button name="hidden_buttons" class="delete-button hidden" id="button2" onClick = "obrisi()">&nbsp;🗑️&nbsp;</button>
    <br>
    <br>
    </div>
    `;

    cardsDiv.innerHTML="";
    cardsDiv.innerHTML = src;
}

async function GetData() {
    var id = "http://localhost:3000/api/posts/"+location.search.substring(1);
    try {
        
        var pOSTS = await axios.get(id);
        await putData(pOSTS.data.post);
        showButtons(pOSTS.data.post);
    }catch (err) {
        console.log(err);
    }
}

async function obrisi()
{
    var id = location.search.substring(1);
    let idstring="http://localhost:3000/api/posts/"+id;
    try{
        await axios.delete(idstring);
        location.href="dogadjaji.html";
    }
    catch(err)
    {
        console.log(err);
    }
}

function showButtons(post){
    var idname = "id";
    var loginId = localStorage.getItem(idname);
    console.log(loginId, post.idKorisnika);
    if(loginId.trim() === post.idKorisnika.trim()){
        const buttons = document.getElementsByName("hidden_buttons");

        buttons.forEach(i=>{
            i.classList.remove("hidden");
        })
    }
  }

GetData();

async function GetUserData(id) {
    var link = "http://localhost:3000/api/users/"+id;
    try {
        var user = await axios.get(link);
        return user.data.user.userName;
    }catch (err) {
        console.log(err);
    }
}

async function updateLike(id){
    var idKorisnika = localStorage.getItem("id");
    if(idKorisnika !== null){
        try{
            var post = await axios.get("http://localhost:3000/api/posts/"+id);
            var t = true;
            post.data.post.lajkovi.forEach(function (i, j){
                if(i === idKorisnika){
                    post.data.post.brojLajkova--;
                    post.data.post.lajkovi.splice(j, 1);
                    t = false;
                    console.log(j, i);

                }
            });
            if(t){
                post.data.post.brojLajkova++;
                post.data.post.lajkovi.push(idKorisnika);
            }
            await axios.put("http://localhost:3000/api/posts/"+id, post.data.post);
            GetData();
        }
        catch (err) {
            console.log(err);
        }
    }
    
}