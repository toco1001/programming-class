// Flicker Photo Searchの実行
function imageSearch(){
    // ユーザ入力のクエリを取得
	var query = document.getElementById("searchText").textContent;
	// FlickerPhotoSearchを実行するためのスクリプトを生成
	var new_script = document.createElement('script');
	new_script.src = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=8d3f83ee4cfc93cd7c5972ce66ade6ed&format=json&jsoncallback=showResults&safe_search=1&sort=relevance&tags="+query;
	// 生成したスクリプトを自HTMLの先頭に追加してブラウザに実行させる
	document.head.appendChild(new_script);
}

// 検索結果の表示（dataに検索結果が入る（FlickerがJSON形式で入れてくれる））
function showResults(data){
  clearResults(1);
    // Flickerから戻るdata形式は https://www.flickr.com/services/api/flickr.photos.search.htmlのexample results
    if (data.stat != "ok"){ // 検索が成功しているかどうか確認、失敗の時はstatusを表示して戻る
		document.write(data.stat);
		return;
	}
	//最初の8個のデータのみ利用
	var max_num = 8;
	if (data.photos.photo.length <8) max_num = data.photos.photo.length;//8個より検索結果が少ない場合の処理
	for (var i=0; i<max_num; i++){
	  var photo = data.photos.photo[i];
      // imgエレメントを生成
	  var new_image = document.createElement('img');
	  // imgのsrcにi番目の結果(URL)を設定 (
	  var url="https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_m.jpg";
	  new_image.src = url ;
	  new_image.width="100"; 	 // 幅を100ピクセルに設定
 	  // imgエレメントを検索結果のi番目のセルに追加
 	  document.getElementById("r"+String(i)).appendChild(new_image);
  	}
}

function clearResults(flg){
  switch(flg){
    case 1:
    for (var i=0;i<8;i++){
      var node = document.getElementById("r"+String(i));
      while (node.lastChild){
        node.removeChild(node.lastChild);
      }
    }
    break;
    case 2:
    var node = document.getElementById("s");
    while(node.lastChild){
      node.removeChild(node.lastChild);
    }
    break;
    case 3:
    var node = document.getElementById("s");
    var base_num = node.childNodes.length-1;
    var check_num = base_num - 1;
    while (base_num>=1){
      while (check_num>=0){
        if (node.childNodes[base_num].src == node.childNodes[check_num].src) {
          node.removeChild(node.childNodes[base_num]);
          break;
        }
        check_num--;
      }
      base_num--;
      check_num = base_num-1;
    }
    break;
  }
}

function saveResult(flg){
  var saved_image = document.createElement('img');
  saved_image.src = document.getElementById("r"+ String(flg)).firstChild.src;
  saved_image.width = "100";
  document.getElementById("s").appendChild(saved_image);
  document.getElementById("s").lastChild.addEventListener("click", function(){onClickDo(this);})
}

var select_1;
var select_2;
var round_count = 0;
var isGameStarted = false;
function onClickDo(node){
  var parent_node=document.getElementById("s");
  var base_url = "http://www.waseda.jp/student/weekly/contents/2007b/137j01.jpg"; //早稲田ベアのURL
  if (node.src==base_url){
    node.src = node.alt;
  } else {
    node.alt = node.src;
    node.src = base_url;
  }
  // ゲーム中の場合
  if (isGameStarted){
    if (round_count==0){
      select_1 = node;
      round_count++;
    } else {
      select_2 = node;
      if (select_1.src==select_2.src) {
        showModal();
      } else {
        select_1.alt = select_1.src;
        select_1.src = base_url;

        select_2.alt = select_2.src;
        select_2.src = base_url;
      }
      select_1 = null;
      select_2 = null;
      round_count=0;
    }
  }
}

function randomizeImage(){
  var node = document.getElementById("s");
  var base_url = node.childNodes.length-1;
  base_num = node.childNodes.length;
  for (var i=0;i<=base_num*3;i++){
    var a = Math.floor(Math.random()*base_num);
    var b = Math.floor(Math.random()*base_num);
    var tmp = node.childNodes[b].src;
    node.childNodes[b].src = node.childNodes[a].src;
    node.childNodes[a].src = tmp;
  }
}

function startGame(){
  isGameStarted = true;
  //保存領域の画像が０枚の時、早期リターンさせる。
  var node = document.getElementById("s");
  if (node.childNodes.length == 0){ return; }
  // (1)重複画像を削除する
  clearResults(3);
  // (2)画像を２枚ずつになるようにコピーする
  duplicateImages();
  // (3)画像の並び順をランダムにする
  randomizeImage();
  // (4)画像を裏返す
  reverseImages();
}

function duplicateImages(){
  var node = document.getElementById("s");
  var nodes_length = node.childNodes.length;
  for (var i=0;i<nodes_length;i++){
    var copied_image = document.createElement('img');
    copied_image.src = document.getElementById("s").childNodes[i].src;
    copied_image.width = "100";
    document.getElementById("s").appendChild(copied_image);
    document.getElementById("s").lastChild.addEventListener("click", function(){onClickDo(this);})
  }
}

function reverseImages(){
  var parent_node = document.getElementById("s");
  var nodes_length = parent_node.childNodes.length;
  var base_url = "http://www.waseda.jp/student/weekly/contents/2007b/137j01.jpg"; //早稲田ベアのURL
  for (var i=0;i<nodes_length;i++){
    var node = parent_node.childNodes[i];
    if (node.src==base_url){
      node.src = node.alt;
    } else {
      node.alt = node.src;
      node.src = base_url;
    }
  }

  var parent_node=document.getElementById("s");
  var base_url = "http://www.waseda.jp/student/weekly/contents/2007b/137j01.jpg"; //早稲田ベアのURL
  if (parent_node.src==base_url){
    parent_node.src = parent_node.alt;
  } else {
    parent_node.alt = parent_node.src;
    parent_node.src = base_url;
  }
}

function showModal(){
  alert("よくできました");
  isGameStarted = false;
}
