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
    keywords: ["酒"]
  },
]

var currentPoem = null;

function search(event) {
  var resultsDiv = document.getElementById("results")

  var keyword = event.srcElement.innerHTML;

  // search logic
  var results = []
  poemList.forEach((poem) => {
    var index = poem.content.indexOf(keyword)
    if (index >= 0 && poem !== currentPoem) {
      results.push({ poem: poem, foundIndex: index })
    }
  })

  // display results
  resultsDiv.innerHTML = ""

  if (results.length > 0) {
    var text = createHTMLElement("p", "相關詩詞：", "result_heading")
    resultsDiv.append(text)
    
    results.forEach((result) => {
      var poem = result.poem
      var title = createHTMLElement("p", poem.title, "poem_link", "onClickTitle(event)")
      var index = result.foundIndex
      var excerptContent = poem.content.slice(Math.max(index - 5, 0), Math.min(index + 5, poem.content.length - 1))
      var excerpt = createHTMLElement("p", "..." + excerptContent + "...")
      excerpt.innerHTML = excerpt.innerHTML.replace(keyword, '<label style="color: blue">' + keyword + '</label>')
      resultsDiv.append(title, excerpt)
    })
  }
}

function onClickTitle(event){
  var poemDiv = document.getElementById("poem")
  var resultsDiv = document.getElementById("results")

  var poemTitle = event.srcElement.innerHTML
  var requiredPoem = {}
  poemList.forEach((poem) => {
    if (poem.title === poemTitle) {
      requiredPoem = poem
    }
  })

  resultsDiv.innerHTML = ""
  poemDiv.innerHTML = ""

  var title = createHTMLElement("h2", requiredPoem.title)
  var author = createHTMLElement("h3", requiredPoem.author)
  var content = createHTMLElement("p", requiredPoem.content)
  if (requiredPoem.keywords) 
    requiredPoem.keywords.forEach((key)=>{
      content.innerHTML = content.innerHTML.replace(key, '<label style="color: blue" onclick="search(event)">' + key + '</label>')
    })
  poemDiv.append(title, author, content)

  var homePage = document.getElementById("home_page")
  var poemPage = document.getElementById("poem_page")
  homePage.setAttribute("style", "display: none")
  poemPage.setAttribute("style", "")
  currentPoem = requiredPoem
}

function onClickBack() {
  var homePage = document.getElementById("home_page")
  var poemPage = document.getElementById("poem_page")
  homePage.setAttribute("style", "")
  poemPage.setAttribute("style", "display: none")
  currentPoem = null
}

function onDocumentReady() {
  var homePage = document.getElementById("home_page")
  poemList.forEach((poem) => {
    var title = createHTMLElement("p", poem.title, "poem_link", "onClickTitle(event)")
    homePage.append(title)
  })
}

function createHTMLElement(type, innerHTML, className, onClickEvent) {
  var element = document.createElement(type)
  element.innerHTML = innerHTML
  if (className)
    element.setAttribute("class", className)
  if (onClickEvent)
    element.setAttribute("onclick", onClickEvent)
  return element
}

$( document ).ready(onDocumentReady);
