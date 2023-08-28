"use strict";

// Selectors
const input = document.querySelector(".repos__input"),
  btn = document.querySelector(".repos__btn"),
  reposList = document.querySelector(".repos__list"),
  noDataToShow = document.querySelector(".noData");




// Variables
const baseUrl = "https://api.github.com"




// Functions
async function getReposData() {
  try {
    const response = await fetch(`${baseUrl}/users/${input.value}/repos`);
    const data = await response.json();

    renderReposToPage(data);
  } catch(err) {
    reposList.innerHTML = "";
    noDataToShow.innerHTML = "Username is not valid or the server does not get the data";
  }
}


function createRepoStructure({name, stargazers_count, data_html}) {
  const repoStructure = `
  <li class="repos__item">
    <div class="repos__text">${name}</div>
    <div class="repos__text__details">
      <div class="repos__stars">${stargazers_count}</div>
      <button type=button class="repos__visit">
        <a href=${data_html} target="_blank">Visit</a>
      </button>
    </div>
  </li>`

  reposList.innerHTML += repoStructure
}


function renderReposToPage(data) {
  if (data.length === 0) {
    noDataToShow.innerHTML = "Username is not valid or the server does not get the data";
    return
  }

  data.forEach(obj => createRepoStructure(obj));
  renderNumOfRepos(data)
}


function renderNumOfRepos(data) {
  const reposLengthEle = document.createElement("div");
  reposLengthEle.className = "repos__length";
  const numberOfRepos = document.createTextNode("Number OF Repositories");
  reposLengthEle.appendChild(numberOfRepos);

  const theSpan = document.createElement("span");
  theSpan.className = "lengthOfRepos";
  const dataLength = document.createTextNode(data.length);
  theSpan.appendChild(dataLength);
  reposLengthEle.appendChild(theSpan);
  reposList.prepend(reposLengthEle);
}


function getRepos() {
  if (input.value === "") {
    reposList.innerHTML = "";
    noDataToShow.innerHTML = "Please Write GitHub UserName";
    return;
  }

  noDataToShow.innerHTML = "";
  reposList.innerHTML = ""

  getReposData()
}




// Events
btn.addEventListener("click", () => getRepos());

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") getRepos();
});
