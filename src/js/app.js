window.addEventListener('load', function() {
  let width = window.innerWidth;
  if(width<=720){
      const windows = document.getElementById("windows");
      windows.classList.add("hidden")
  }
  else{
    const mobileTablet = document.getElementById("mobileTablet");
    mobileTablet.classList.add("hidden")
  }
});

const searchBTN = document.getElementById("search");
const Subject = document.getElementById("title");
const Category = document.getElementById("category");
const Country = document.getElementById("country");
const mainElement = document.getElementById("main");
const loading = document.getElementById("loading")
const menuBarMain = document.getElementById("menuBarMain");


apiKey = "cc008e0d203d43bc981ffff58791625a";

let url = "https://newsapi.org/v2/everything?q=android&from=2023-05-24&to=2023-05-24&sortBy=popularity&apiKey="
let urlAll = "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=";

let loadLoop=true;

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    loadLoop=false;
    console.log(data);
    return data.articles;
  } catch (error) {
    console.log('خطا:', error);
  }
}

searchBTN.addEventListener("click", function () {
  mainElement.innerHTML="";
  loading.classList.remove("hidden");
  let txt_subject = Subject.value;
  let category = Category.value;
  let country = Country.value;
  if (txt_subject && category == "" && country == "") {
    let urlSubject = `https://newsapi.org/v2/everything?q=${txt_subject}&from=2023-04-25&sortBy=publishedAt&apiKey=` + apiKey;
    fetchData(urlSubject).then(result => {
      console.log(1);
      creatGroupCard(result);
    });
  }
  else if(txt_subject=="" && country){
    if(category == "")
      {
        alert("please enter Category!");
        return
      }
    let urlCountry = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=`+apiKey;
    fetchData(urlCountry).then(result => {
      creatGroupCard(result);
    });
  }


});

function creatGroupCard(list) {
  let counGroupCard = list.length/3;
  let index = 0;
  let stringCard = "";
  let elementGroupCard=""
  for (let i = 0; i < Math.floor(counGroupCard); i++) {
    stringCard="";
    for (let j = 0; j < 3; j++) {
      let caption = list[index]["description"];
      let urlImage = list[index]["urlToImage"];
      let date = list[index]["publishedAt"];
      index++;
      stringCard += creatCard(urlImage, caption, date);
    }
    elementGroupCard += `<div class="Cards flex mx-auto p-1 justify-center gap-10">${stringCard}</div>`;
  }
  if(Math.floor(counGroupCard)*3<list.length){
    for(index;index<list.length;index++){
      stringCard="";
      let caption = list[index]["description"];
      let urlImage = list[index]["urlToImage"];
      let date = list[index]["publishedAt"];
      stringCard += creatCard(urlImage, caption, date);
      elementGroupCard += `<div class="Cards flex mx-auto p-1 justify-center gap-10">${stringCard}</div>`;
    }
  }
  mainElement.innerHTML=elementGroupCard;
  loading.classList.add("hidden");
}

function creatCard(urlImage, caption, date) {
  let card = `<div class="card block w-80 h-auto bg-slate-200 rounded-md">
<div class="">
    <img id="imageCard" class="w-80 h-60 mx-auto rounded-t-lg" src="${urlImage}" alt="image">
</div>
<div class="text-center p-1" id="paragraph">
    <p class="overflow-y-scroll h-40 mx-auto">${caption}</p>
</div>

<hr class="h-1 mt-5 bg-slate-800 me-1 ms-1 rounded-full">

<div class="text-center mt-10 mb-5 bg-blue-600 w-40 mx-auto p-1 rounded-full text-white" id="date">
    ${date}
</div>
</div>`;

  return card;
}

menuBarMain.addEventListener("click",function(event){
  const menuBarTopBorder = document.getElementById("menuBarTopBorder");
  const menuBarbottomBorder = document.getElementById("menuBarbottomBorder");
  const menuList = document.getElementById("menuList");
  menuBarTopBorder.classList.toggle("bottomOpen");
  menuBarbottomBorder.classList.toggle("topOpen");
  menuList.classList.toggle("hidden");
});

