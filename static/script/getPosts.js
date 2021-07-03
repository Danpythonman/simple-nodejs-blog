function getPosts() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let responseData = JSON.parse(this.responseText);
            let postData = "";
            for (let i = 0; i < responseData.length; i++) {
                postData += "\n<h3>" + responseData[i]["title"] + "</h3>";
                postData += "\n<p>" + responseData[i]["body"] + "</p>";
            }
            document.getElementById("blog-posts").innerHTML = postData;
        }
    };
    xhttp.open("GET", "/getBlogPosts", true);
    xhttp.send();
}
