//window.onload =  popuniFormu();

var link;

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


async function PostaviDogadjaj(marker){
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
            var x=await axios.post("http://localhost:3000/api/posts/",newPost);
            console.log(x);
            location.href="./dogadjaji.html"
        }
        catch(err)
        {
            console.log(err);
        }
    }
}

