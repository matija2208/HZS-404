async function getUsername(){
    var id = localStorage.getItem("id");
    if(id === null)
    {
        return "";
    }
    else
    {
      try{
        var user = await axios.get("http://localhost:3000/api/users/" + id);
        return user.data.user.userName;
      }
      catch(err){
        console.log(err);
      }
    }
}

async function isLoged()
{
    var username = await getUsername();
  
    if(username !== "")
    {
      var nav = document.getElementById("prijavi_regist");
      var text = `<div id="ulog"><li class="nav-item"id="nav-item">
                      <i class="fas fa-user"></i>
                      <span id="kor">KORISNIK: </span>
                    </a>
                  </li><br>
                  <li class="nav-item"id="nav-item">
                      <span id="nav_user">${username}</span>
                    </a>
                  </li><br>
                  <button onclick = "odjaviSe()" id="odj">ODJAVI SE</button></div>`;
      nav.innerHTML = "";
      nav.innerHTML = text;
    }
}
  
function odjaviSe()
{
    localStorage.removeItem("id");
    location.reload();
}

isLoged();