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
      var text = `<li class="nav-item"id="nav-item">
                      <i class="fas fa-user"></i>
                      <span>KORISNIK: </span>
                    </a>
                  </li>
                  <li class="nav-item"id="nav-item">
                      <span id="nav_user">${username}</span>
                    </a>
                  </li>
                  <button onclick = "odjaviSe()" >ODJAVI SE</button>`;
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