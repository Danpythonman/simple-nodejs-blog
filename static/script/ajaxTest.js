function onClick() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status ==  200) {
            document.getElementById("textbox").value = this.responseText;
        }
    };
    xhttp.open("GET", "/getText", true);
    xhttp.send();
}
