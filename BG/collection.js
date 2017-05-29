// bodyが読み込まれた時に実行
function bodyDidLoad(){
	imageSearch();
}
// Flicker Photo Searchの実行
function imageSearch(){
	var query = location.search.substring(0).split('=')[1];
	var new_script = document.createElement('script');
	new_script.src = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=8d3f83ee4cfc93cd7c5972ce66ade6ed&format=json&jsoncallback=showResults&safe_search=1&sort=relevance&tags="+query;
	document.head.appendChild(new_script);
}

// 検索結果の表示（dataに検索結果が入る（FlickerがJSON形式で入れてくれる））
function showResults(data){
	// Flickerから戻るdata形式は https://www.flickr.com/services/api/flickr.photos.search.htmlのexample results
	if (data.stat != "ok"){ // 検索が成功しているかどうか確認、失敗の時はstatusを表示して戻る
		document.write(data.stat);
		return;
	}

	var max_num = 50;
	if (data.photos.photo.length <max_num) {
		max_num = data.photos.photo.length;
	}
	for (var i=0; i<max_num; i++){
		var photo = data.photos.photo[i];
		var new_image = document.createElement('img');
		var url="https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_m.jpg";
		new_image.src = url;
		new_image.width="200";
		var rView = document.getElementById("r"+String(i));
		rView.href = url;
		rView.appendChild(new_image);
	}
}
