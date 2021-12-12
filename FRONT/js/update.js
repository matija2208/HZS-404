function initMap(latituda=43.93370754259888, longituda=21.371057629006582){
    const cuprija = { lat: 43.9336, lng: 21.3710 };
    const map = new google.maps.Map(
    document.getElementById("map"),{
        zoom: 17,
        center: cuprija,
        styles: 
        [
            {
                "featureType": "poi.government",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "featureType": "poi.government",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            }
        ]
    }
    );

    var marker = new google.maps.Marker({
        position: {lat:latituda, lng:longituda},
        map:map,
    });

    function setMarker(coordSettings){
        var latlng = new google.maps.LatLng(coordSettings.coords.lat(),coordSettings.coords.lng());
        
        marker.setPosition(latlng);
    }

    google.maps.event.addListener(map, 'click', function(event){
        setMarker({coords:event.latLng});
    });

    document.getElementById("dodaj_dogadjaj").addEventListener('click',() => updatePost(marker));
}

function popuniFormu(){
    var ID = location.search.substring(1);
    GetData(ID)
}

async function GetData(id)
{
  console.log(id);
  try 
  {
    var pOSTS = await axios.get("http://localhost:3000/api/posts/"+id);
    console.log(pOSTS.data.post);
    putData(pOSTS.data.post);
  }
  catch (err) 
  {
    console.log(err);
  }
}

function putData(post){  
    

    var entries = document.getElementById("mainForm");
    entries.naziv_dogadjaja_input.value = post.nazivPosta;
    entries.tip_dogadjaja_select.value = post.interesovanja;
    entries.datum_dogadjaja_input.value = post.info.vreme.datum;
    entries.vreme_dogadjaja_input.value = post.info.vreme.sati;
    entries.opis_dogadjaja_input.value = post.opisPosta;
    entries.min_god_dogadjaja_input.value = post.godine.minimum;
    entries.max_god_dogadjaja_input.value = post.godine.maximum;
    entries.naziv_lokacije_input.value = post.info.lokacija.opisLokacije;
    initMap(post.info.lokacija.latituda, post.info.lokacija.longituda);
    link=post.slika;
  }
  var link;
  popuniFormu();

  

  function reportInfo(vars, showType = false) {
      if (showType === true) console.log(typeof vars);
      console.log(vars);
  }
  
  function addImg(ele, content) {
      var myDIV = document.querySelector(ele);
      var newContent = document.createElement('div');
      newContent.innerHTML = content;
  
      while (newContent.firstChild) {
          myDIV.appendChild(newContent.firstChild);
      }
  }
  
  var feedback = function(res) {
      reportInfo(res, true);
      if (res.success === true) {
          var get_link = res.data.link.replace(/^http:\/\//i, 'https://');
          document.querySelector('.status').classList.add('bg-success');
          var content =
              'Image : ' + '<br><input class="image-url" value=\"' + get_link + '\"/>' 
               + '<img class="img" alt="Imgur-Upload" src=\"' + get_link + '\"/>';
          addImg('.status', content);
          link = get_link;
      }
  };
  
  new Imgur({
      clientid: 'a08fd223eb9d597', //You can change this ClientID
      callback: feedback
  });
  

async function updatePost(marker)
{
    var idk=localStorage.getItem("id");

    if(idk!==null)
    {
        var entries = document.getElementById("mainForm");
        var naziv_dogadjaja = entries.naziv_dogadjaja_input.value;
        var tip_dogadjaja = entries.tip_dogadjaja_select.value;
        var datum_dogadjaja = entries.datum_dogadjaja_input.value;
        var vreme_dogadjaja = entries.vreme_dogadjaja_input.value;
        var opis_dogadjaja = entries.opis_dogadjaja_input.value;
        var min_god = entries.min_god_dogadjaja_input.value;
        var max_god = entries.max_god_dogadjaja_input.value;
        var naziv_lokacije = entries.naziv_lokacije_input.value;
        var poz_lat = marker.position.lat();
        var poz_lng = marker.position.lng();

        if(min_god==="")
        {
            min_god=-1;
        }
        else
        {
            min_god=Number(min_god);
        }
        if(max_god==="")
        {
            max_god=-1;
        }
        else
        {
            max_god=Number(max_god);
        }

        var newPost={
            nazivPosta:naziv_dogadjaja,
            interesovanja:tip_dogadjaja,
            info:{
                vreme:{
                    datum:datum_dogadjaja,
                    sati:vreme_dogadjaja,
                },
                lokacija:{
                    longituda:poz_lng,
                    latituda:poz_lat,
                    opisLokacije:naziv_lokacije
                }
            },
            opisPosta:opis_dogadjaja,
            slika:link,
            godine:{
                minimum:min_god,
                maximum:max_god
            },
            idKorisnika:idk
        };
        console.log(newPost);
        try
        {
            var x=await axios.put("http://localhost:3000/api/posts/"+location.search.substring(1),newPost);
            console.log(x);
            location.href="./dogadjaji.html"
        }
        catch(err)
        {
            console.log(err);
        }
    }
}