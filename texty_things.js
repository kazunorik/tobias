function remove_edge_spaces(text){
    while(text[0]=='\t' || text[0]==' '){
        text = text.substring(1)
    }
    while(text[text.length - 1]=='\t' || text[text.length - 1]==' '){
        text = text.substring(0, text.length - 1)
    }
    return text
}

