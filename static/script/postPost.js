function postPost() {
    let xhttp = new XMLHttpRequest();
    let params = "title=" + document.getElementById("postTitle").value + "&body=" + document.getElementById("postBody").value;

    xhttp.open("POST", "/addNewBlogPost", true);

    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        }
    };

    xhttp.send(params);
}
