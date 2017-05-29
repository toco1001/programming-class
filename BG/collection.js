// Flicker Photo Searchの実行
function imageSearch(){
	// ユーザ入力のクエリを取得
	var query = location.search.substring(0).split('=')[1];
	// FlickerPhotoSearchを実行するためのスクリプトを生成
	var new_script = document.createElement('script');
	new_script.src = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=8d3f83ee4cfc93cd7c5972ce66ade6ed&format=json&jsoncallback=showResults&safe_search=1&sort=relevance&tags="+query;
	// 生成したスクリプトを自HTMLの先頭に追加してブラウザに実行させる
	document.head.appendChild(new_script);
}

// 検索結果の表示（dataに検索結果が入る（FlickerがJSON形式で入れてくれる））
function showResults(data){
	// Flickerから戻るdata形式は https://www.flickr.com/services/api/flickr.photos.search.htmlのexample results
	if (data.stat != "ok"){ // 検索が成功しているかどうか確認、失敗の時はstatusを表示して戻る
		document.write(data.stat);
		return;
	}
	//最初の8個のデータのみ利用
	var max_num = 14;
	if (data.photos.photo.length <max_num) max_num = data.photos.photo.length;//[max_num]個より検索結果が少ない場合の処理
	for (var i=0; i<max_num; i++){
		var photo = data.photos.photo[i];
		// imgエレメントを生成
		var new_image = document.createElement('img');
		// imgのsrcにi番目の結果(URL)を設定 (
		var url="https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_m.jpg";
		new_image.src = url ;
		new_image.width="150"; 	 // 幅を100ピクセルに設定
		// imgエレメントを検索結果のi番目のセルに追加
		document.getElementById("r"+String(i)).appendChild(new_image);
	}
}

function saveResult(flg){
	var saved_image = document.createElement('img');
	saved_image.src = document.getElementById("r"+ String(flg)).firstChild.src;
	saved_image.width = "100";
	document.getElementById("s").appendChild(saved_image);
	document.getElementById("s").lastChild.addEventListener("click", function(){onClickDo(this);})
}

function onClickDo(node){
	var parent_node=document.getElementById("s");
	// 画像をタップした時のコードを書く
}
