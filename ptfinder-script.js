function $(id){
    return document.getElementById(id)
}

function level_range(level){
    var maxlvl = Math.ceil(level*3/2)
    var minlvl = Math.floor(level*2/3)
    return [maxlvl, minlvl]
}

function findParty(sharerange, world, myname, mydata){
    // create table for my party
    var me = document.createElement("TR")
    me.innerHTML = "<th class=\"charnameontable\">"+ mydata.characters.data.name +"</th><th>"+ mydata.characters.data.level +"</th><th class=\"charvocontable\">"+ mydata.characters.data.vocation +"</th>"
    $("myparty").appendChild(me)

    // create table for the results
    var request = new XMLHttpRequest()
        request.open('GET', 'https://api.tibiadata.com/v2/world/'+ world +'.json', true)
        request.onload = function(){
            var data = JSON.parse(this.response)
            for(i=0; i<data.world.players_online.length; i++){
                if(data.world.players_online[i].level <= sharerange[0] && data.world.players_online[i].level >= sharerange[1] && myname.toUpperCase() != data.world.players_online[i].name.toUpperCase()){
                    var resulti = document.createElement("TR")
                    resulti.innerHTML = "<th class=\"charnameontable\">"+ data.world.players_online[i].name +"</th><th>"+ data.world.players_online[i].level +"</th><th class=\"charvocontable\">"+ data.world.players_online[i].vocation +"</th>"
                    $("partyresults").appendChild(resulti)
                    
                }
            }
        }
        request.send()
}

function go(){
    $("myparty").innerHTML=""
    $("partyresults").innerHTML=""
    if ($("charname").value != ''){
        // formating the name
        var charname = $("charname").value.replace(/[&\/\\#,+()$~%.":*?<>{}]/g,' ')
        charname_write = remove_edge_spaces(charname)
        charname = charname_write.replace(/\s+/g, '+')

        // api request
        var request = new XMLHttpRequest()
        request.open('GET', 'https://api.tibiadata.com/v2/characters/'+ charname +'.json', true)
        request.onload = function(){
            var data = JSON.parse(this.response)
            if(data.characters.error == "Character does not exist."){
                alert(charname_write + " does not exist!")
            } else{
                var sharerange = level_range(data.characters.data.level)
                var world = data.characters.data.world
                findParty(sharerange, world, charname_write, data)
            }
        }
        request.send()
    } else {
        alert("Please input character name")
    }
}