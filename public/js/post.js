var form = document.getElementById("form");

function handleForm(event) {
	event.preventDefault();
	} 
form.addEventListener('submit', handleForm);
  
function sendMessage() {

	var currentDate = new Date();
	var Timestamp = 
	currentDate.getUTCFullYear() + "-" + ("0" + (currentDate.getUTCMonth() + 1)).slice(-2) + "-" +
	("0" + currentDate.getUTCDate()).slice(-2) + "T" + ("0" + currentDate.getUTCHours()).slice(-2) + ":" +
	("0" + currentDate.getUTCMinutes()).slice(-2) + ":" + ("0" + currentDate.getUTCSeconds()).slice(-2) + ".000Z";

	var TTSStatus = false;
	if (document.getElementById("tts").checked == true) { TTSStatus = true; }
	var Color = document.getElementById("color").value;
	var Title = document.getElementById("title").value;
	var Username = document.getElementById("username").value;
	var Avatar = document.getElementById("avatar").value;
	var Description = document.getElementById("description").value;
	var Author = document.getElementById("author").value;
	var Image = document.getElementById("image").value;
	var url = "https://ptb.discord.com/api/webhooks/" + document.getElementById("url").value;
	var EmbedPayload = {
	 "embeds": [
          {
			"color": Color,
            "title": Title,
			"description": Description,
			"timestamp": Timestamp,
			"footer": {
				"text": Author
			},
			"image": {
				 "url": Image
			}
          }
        ],
		"username": Username,
		"avatar_url": Avatar
	}
	var ContentPayload = {
		"content": Description,
		"tts": TTSStatus,
		"username": Username,
		"avatar_url": Avatar
     };
	
	if (Title === "") {
		var data = JSON.stringify(ContentPayload, null);
	}
	else {
		EmbedPayload.embeds[0].color = 0x000000 + parseInt('0x' + EmbedPayload.embeds[0].color); // What the fuck
		data = JSON.stringify(EmbedPayload, null,2); 
	}
	XHR = new XMLHttpRequest();
	XHR.open("POST", url, true);
	XHR.setRequestHeader("Content-Type", "application/json");
	XHR.responseType = "text";
	XHR.onload = function() {
		if (XHR.status === 204) {document.getElementById("response").innerHTML = "204 No Content";}
		else if (XHR.status === 400) {document.getElementById("response").innerHTML = "400 Bad Request";}
		else if (XHR.status === 429) {document.getElementById("response").innerHTML = "429 Too Many Requests";}
	};

	XHR.send(data);
	console.log(data)
}

jQuery('#description').on('input', function () {
	const heart = /{+h+e+a+r+t+}/g; description.value = (description.value.replace(heart, '❤️'));
	const skull = /{+s+k+u+l+l+}/g; description.value = (description.value.replace(skull, '💀'));
	const pensive = /{+p+e+n+s+i+v+e}/g; description.value = (description.value.replace(pensive, '😔️'));
});
