var $Input,
    $recBtn;
$(document).ready(function() {
  $Input = $("#speech");
  $recBtn = $("#rec");
  $recBtn.on("click", function(event) {
    send();
  });
});
function send() {
  var text = $Input.val();
  $.ajax({
    type: "POST",
    url: baseUrl + "query",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      "Authorization": "Bearer " + accessToken
    },
    data: JSON.stringify({query: text, lang: "en", sessionId: "yaydevdiner"}),
    success: function(data) {
      prepareResponse(data);
    }
  });
}
function prepareResponse(val) {
  var debugJSON = JSON.stringify(val, undefined, 2);
  var response = val.result.speech;
  respond(response);
}
function respond(val) {
  $("#response").addClass("is-active").find(".response__text").html(val);
}
function keypressed(event) {
  if(event.keyCode == 13) {
    send();
  }
} 