let input = document.querySelector(".repos__input");
let btn = document.querySelector(".repos__btn");
let reposList = document.querySelector(".repos__list");
let noDataToShow = document.querySelector(".noData");

btn.addEventListener("click", (e) => {
  getRepos()
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getRepos()
  }
});

function getRepos() {
  if (input.value === "") {
    reposList.innerHTML = "";
    noDataToShow.innerHTML = "Please Write GitHub UserName"
  } else {
    reposList.innerHTML = "";
    noDataToShow.innerHTML = ""
    async function getData() {
      let response = await fetch(`https://api.github.com/users/${input.value}/repos`)
      let data = await response.json();
      return data;
    }
    getData().then((data) => {
      try {
        if (data.length === 0) {
          noDataToShow.innerHTML = "Username Is Not Valid"
        } else {
          let reposLength = document.createElement("div");
          reposLength.className = "repos__length";
          let resposLengthText = document.createTextNode("Number OF Repositories")
          reposLength.appendChild(resposLengthText)
          let theSpan = document.createElement("span")
          theSpan.className = "lengthOfRepos"
          let dataLength = document.createTextNode(data.length)
          theSpan.appendChild(dataLength)
          reposLength.appendChild(theSpan)
          reposList.appendChild(reposLength)
          data.forEach((ele) => {
            let reposItem = document.createElement("li")
            let reposText = document.createElement("div")
            let reposTextDeatils = document.createElement("div")
            let reposStar = document.createElement("div")
            let reposVisit = document.createElement("div")
    
            reposItem.className = "repos__item"
            reposText.className = "repos__text"
            reposTextDeatils.className = "repos__text__deatils"
            reposStar.className = "repos__stars"
            reposVisit.className = "repos__visit"
    
            let visitLink = document.createElement("a")
            let reposLinkData = document.createTextNode("Visit")
            visitLink.href = `https://github.com/${input.value}/${ele.name}`;
            visitLink.setAttribute("target", "_blank")
            visitLink.append(reposLinkData)
            reposVisit.appendChild(visitLink)
    
            let reposTextData = document.createTextNode(ele.name)
            let reposStarData = document.createTextNode(ele.stargazers_count)
            
            reposText.appendChild(reposTextData);
            reposStar.appendChild(reposStarData)
    
            reposTextDeatils.append(reposStar,reposVisit)
            reposItem.append(reposText,reposTextDeatils)
            reposList.append(reposItem)
          })
        }
      } catch(err) {
        reposList.innerHTML = "";
        noDataToShow.innerHTML = "Username Is Not Valid"
      }
    })
  }
}