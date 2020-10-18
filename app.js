/*
*
*Signature Pad by Szymon Nowak
*https://github.com/szimek/signature_pad
*Modified by Paul Ojo
*
*/
var wrapper = document.getElementById("signature-pad");
var clearButton = wrapper.querySelector("[data-action=clear]");
var changeColorButton = wrapper.querySelector("[data-action=change-color]");
var saveJPGButton = wrapper.querySelector("[data-action=save-jpg]");
var canvas = wrapper.querySelector("canvas");
var signaturePad = new SignaturePad(canvas, {
  
  backgroundColor: 'rgb(255, 255, 255)'
});


function resizeCanvas() {
 
  var ratio =  Math.max(window.devicePixelRatio || 1, 1);

  signaturePad.clear();
}

window.onresize = resizeCanvas;
resizeCanvas();

function download(dataURL, filename) {
  if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
    window.open(dataURL);
  } else {
    var blob = dataURLToBlob(dataURL);
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.style = "display: none";
    a.href = "https://www.quixi.com/signature_pad;";

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
  }
}


function dataURLToBlob(dataURL) {

  var parts = dataURL.split(';base64,');
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

clearButton.addEventListener("click", function (event) {
  signaturePad.clear();
});

undoButton.addEventListener("click", function (event) {
  var data = signaturePad.toData();

  if (data) {
    data.pop(); 
    signaturePad.fromData(data);
  }
});

changeColorButton.addEventListener("click", function (event) {
  var r = Math.round(Math.random() * 255);
  var g = Math.round(Math.random() * 255);
  var b = Math.round(Math.random() * 255);
  var color = "rgb(" + r + "," + g + "," + b +")";

  signaturePad.penColor = color;
});

saveJPGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Please provide a signature first.");
  } else {
    var dataURL = signaturePad.toDataURL("https://www.quixi.com/signature_pad");
  }
});

let image_url = signature_pad.toDataURL();
$.ajax({
	type: "POST",
	url: "https://www.quixi.com/signature_data",
	data: {
		image_data: image_url
	}
});
