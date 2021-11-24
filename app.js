var poem_list = [
  { title: "靜夜思", author: "李白", content: "床前明月光，疑是地上霜。舉頭望明月，低頭思故鄉。" },
  { title: "涼州詞", author: "王翰", content: "葡萄美酒夜光杯，欲飲琵琶馬上催。醉臥沙場君莫笑，古來征戰幾人回！" },
  { title: "念奴嬌·赤壁懷古", author: "蘇軾", content: "大江東去，浪淘盡，千古風流人物。故壘西邊，人道是，三國周郎赤壁。亂石穿空，驚濤拍岸，捲起千堆雪。江山如畫，一時多少豪傑。遙想公瑾當年，小喬初嫁了，雄姿英發。羽扇綸巾，談笑間，檣櫓灰飛煙滅。故國神遊，多情應笑我，早生華髮。人生如夢，一尊還酹江月。(人生 一作：人間；尊 通：樽)" },
]

function search() {
  var inputField = document.getElementById("word")
  var word = inputField.value

  // search logic
  

  // display results
  var resultsDiv = document.getElementById("results")
  poem_list.forEach((poem) => {
    title = document.createElement("h2")
    title.innerHTML = poem.title
    author = document.createElement("h3")
    author.innerHTML = poem.author
    content = document.createElement("p")
    content.innerHTML = poem.content
    resultsDiv.append(title, author, content)
  })
}

// $( document ).ready(onDocumentReady);
