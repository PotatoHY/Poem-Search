var poemList = [
  { 
    title: "靜夜思", 
    author: "李白", 
    content: "床前明月光，疑是地上霜。舉頭望明月，低頭思故鄉。", 
    keywords: ["光","月"] 
  },
  { 
    title: "涼州詞", 
    author: "王翰", 
    content: "葡萄美酒夜光杯，欲飲琵琶馬上催。醉臥沙場君莫笑，古來征戰幾人回！", 
    keywords: ["光","酒","人"] 
  },
  { 
    title: "念奴嬌·赤壁懷古", 
    author: "蘇軾", 
    content: "大江東去，浪淘盡，千古風流人物。故壘西邊，人道是，三國周郎赤壁。亂石穿空，驚濤拍岸，捲起千堆雪。江山如畫，一時多少豪傑。遙想公瑾當年，小喬初嫁了，雄姿英發。羽扇綸巾，談笑間，檣櫓灰飛煙滅。故國神遊，多情應笑我，早生華髮。人生如夢，一尊還酹江。", 
    keywords: ["月","人"] 
  },
  {
    title: "甜蜜的復仇",
    author: "夏宇",
    content: "把你的影子加點鹽 醃起來 風乾 老的時候 下酒 ",
    keyword: ["酒"]
  },
]

function search(event, key) {
  var resultsDiv = document.getElementById("results")

  // TODO: get rid of else statement after debugging

  var word = key;

  // search logic
  var results = []
  poemList.forEach((poem) => {
    console.log(word)
    if (poem.content.indexOf(word) >= 0) {
      results.push(poem)
    }
  })

  // display results
  resultsDiv.innerHTML = ""

  text = document.createElement("p")
  text.innerHTML = "相關詩詞："
  text.setAttribute("id", "相關詩詞")
  resultsDiv.append(text)
  results.forEach((poem) => {
    // TODO: 記得skip自己
    title = document.createElement("p")
    title.innerHTML = '<label style="color: red" onclick="onClickTitle(event)">' + poem.title + '</label>'
    resultsDiv.append(title)
      

  })
}

function onClickTitle(event){
  var poemTitle = event.srcElement.innerHTML
  var requiredPoem = {}
  poemList.forEach((poem) => {
    if (poem.title === poemTitle) {
      requiredPoem = poem
    }
  })

  var poemDiv = document.getElementById("poem")
  title = document.createElement("h2")
  title.innerHTML = requiredPoem.title
  author = document.createElement("h3")
  author.innerHTML = requiredPoem.author
  content = document.createElement("p")
  content.innerHTML = requiredPoem.content
  requiredPoem.keywords.forEach((key)=>{
        content.innerHTML = content.innerHTML.replace(key, '<label style="color: blue" onclick="search(event,\''+ key + '\')">' + key + '</label>')
    })


  // TODO: change keywords in content to label onClick = "search(event)"
  // TODO: change label CSS

  poemDiv.innerHTML = ""
  poemDiv.append(title, author, content)

  var homePage = document.getElementById("home_page")
  var poemPage = document.getElementById("poem_page")
  homePage.setAttribute("style", "display: none")
  poemPage.setAttribute("style", "")
}

function onClickBack() {
  var homePage = document.getElementById("home_page")
  var poemPage = document.getElementById("poem_page")
  homePage.setAttribute("style", "")
  poemPage.setAttribute("style", "display: none")
}

function onDocumentReady() {
  var homePage = document.getElementById("home_page")
  
  poemList.forEach((poem) => {
    title = document.createElement("p")
    title.innerHTML = poem.title
    title.setAttribute("id","poem_link")
    title.setAttribute("onclick","onClickTitle(event)")
    homePage.append(title)
  })
}

$( document ).ready(onDocumentReady);
