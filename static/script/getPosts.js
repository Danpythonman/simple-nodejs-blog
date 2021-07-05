function getPosts() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let responseData = JSON.parse(this.responseText);
            let currentBlogPostDiv, currentTitle, currentBody;
            for (let i = 0; i < responseData.length; i++) {
                currentBlogPostDiv = document.createElement("div")
                currentTitle = document.createElement("h1");
                currentTitle.appendChild(document.createTextNode(responseData[i]["title"]));
                currentBody = document.createElement("p");
                currentBody.appendChild(document.createTextNode(responseData[i]["body"]));
                currentBlogPostDiv.appendChild(currentTitle);
                currentBlogPostDiv.appendChild(currentBody);
                document.getElementById("blog-posts").appendChild(currentBlogPostDiv);
            }
            document.getElementById("blog-posts").innerHTML = postData;
        }
    };
    xhttp.open("GET", "/api/getBlogPosts", true);
    xhttp.send();
}
