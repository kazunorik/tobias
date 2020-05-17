function $(id){
    return document.getElementById(id);
}

/* Se não há dados, criar zeros */
if(localStorage.getItem('data') == null){
    var data = '[{"name": "Oberon", "kills": 0, "drops": 0}, {"name": "Scarlett", "kills": 0, "drops": 0}]';
    localStorage.setItem('data', data);
}

/* Dados para serem usados */
var data_json = JSON.parse(localStorage.getItem('data'));

/* Adicionar ou remover drops e kills */
function boss_count(boss){
    data_json[boss].kills += 1;
    localStorage.setItem('data', JSON.stringify(data_json));
    $("count" + boss).innerHTML = data_json[boss].kills;
}

function boss_count_minus(boss){
    if(data_json[boss].kills > 0 && data_json[boss].kills > data_json[boss].drops){
        data_json[boss].kills -= 1;
        localStorage.setItem('data', JSON.stringify(data_json));
        $("count" + boss).innerHTML = data_json[boss].kills;
    }
}

function boss_drop(boss){
    if(data_json[boss].kills > data_json[boss].drops){
        data_json[boss].drops += 1;
        localStorage.setItem('data', JSON.stringify(data_json));
        $("drop" + boss).innerHTML = data_json[boss].drops;
    }
}

function boss_drop_minus(boss){
    if(data_json[boss].drops > 0){
        data_json[boss].drops -= 1;
        localStorage.setItem('data', JSON.stringify(data_json));
        $("drop" + boss).innerHTML = data_json[boss].drops;
    }
}

function addnewboss(){
    var newbossname = $("newboss").value
    data_json.push({"name": newbossname, "kills": 0, "drops": 0})
    localStorage.setItem('data', JSON.stringify(data_json));
    i = data_json.length - 1
    var newrow = document.createElement("TR")
    newrow.innerHTML = "<th><button class=\"delbut\" onclick=\"removeboss(" + i + ")\">x</button></th><th class=\"bossname\">" + data_json[i].name + "</th><th><button onclick=\"boss_count(" + i + ")\">+</button><a id=\"count" + i + "\">" + data_json[i].kills + "</a><button onclick=\"boss_count_minus(" + i + ")\">-</button></th><th><button onclick=\"boss_drop(" + i + ")\">+</button><a id=\"drop" + i + "\">" + data_json[i].drops + "</a><button onclick=\"boss_drop_minus(" + i + ")\">-</button></th>"
    newrow.id = "boss" + i
    $("bosses").appendChild(newrow)
    $("newboss").value = ''
}

function buildtable(){
    for(let i = 0; i < data_json.length; i++){
        var newrow = document.createElement("TR")
        newrow.innerHTML = "<th><button class=\"delbut\" onclick=\"removeboss(" + i + ")\">x</button></th><th class=\"bossname\">" + data_json[i].name + "</th><th><button onclick=\"boss_count(" + i + ")\">+</button><a id=\"count" + i + "\">" + data_json[i].kills + "</a><button onclick=\"boss_count_minus(" + i + ")\">-</button></th><th><button onclick=\"boss_drop(" + i + ")\">+</button><a id=\"drop" + i + "\">" + data_json[i].drops + "</a><button onclick=\"boss_drop_minus(" + i + ")\">-</button></th>"
        newrow.id = "boss" + i
        $("bosses").appendChild(newrow)
    }
}

function removeboss(boss){
    console.log(data_json.length)
    if(confirm("Delete tracking of " + data_json[boss].name + "?")){
        for(let i = 0; i < data_json.length; i++){
            var element = $("boss" + i)
            element.remove()
        }

        data_json.splice(boss, 1)
        localStorage.setItem('data', JSON.stringify(data_json));

        buildtable()
    }
}

/* Run */
buildtable()