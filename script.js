function $(id){
    return document.getElementById(id);
}

var bosses_count = ["oberon_count", "bane_count", "scar_count"];
var bosses_drops = ["oberond_count", "baned_count", "scard_count"];

/* Se não há dados, criar zeros */
if(localStorage.getItem('data') == null){
    var data = '[{"boss": "Oberon", "kills": 0, "drops": 0}, {"boss": "Faceless Bane", "kills": 0, "drops": 0}, {"boss": "Scarlett", "kills": 0, "drops": 0}]';
    localStorage.setItem('data', data);
}

/* Dados para serem usados */
var data_json = JSON.parse(localStorage.getItem('data'));

/* Adicionar ou remover drops e kills */
function boss_count(boss){
    data_json[boss].kills += 1;
    localStorage.setItem('data', JSON.stringify(data_json));
    $(bosses_count[boss]).innerHTML = data_json[boss].kills;
}

function boss_count_minus(boss){
    if(data_json[boss].kills > 0 && data_json[boss].kills > data_json[boss].drops){
        data_json[boss].kills -= 1;
        localStorage.setItem('data', JSON.stringify(data_json));
        $(bosses_count[boss]).innerHTML = data_json[boss].kills;
    }
}

function boss_drop(boss){
    if(data_json[boss].kills > data_json[boss].drops){
        data_json[boss].drops += 1;
        localStorage.setItem('data', JSON.stringify(data_json));
        $(bosses_drops[boss]).innerHTML = data_json[boss].drops;
    }
}

function boss_drop_minus(boss){
    if(data_json[boss].drops > 0){
        data_json[boss].drops -= 1;
        localStorage.setItem('data', JSON.stringify(data_json));
        $(bosses_drops[boss]).innerHTML = data_json[boss].drops;
    }
}

/* Run */
for(let i = 0; i < 3; i++){
    $(bosses_drops[i]).innerHTML = data_json[i].drops;
    $(bosses_count[i]).innerHTML = data_json[i].kills;
}