$(function(){
  function buildHTML(message){

    let id = message.id
    let text_image = `<p>${message.content}</p>
                      <img src="${message.image_url}" alt="graphics">`
    let html = `<div class="right-content__middle__userdate" data-id="${id}">
                  <div class="right-content__middle__userdate__user">
                    ${message.user_name}
                  </div>
                  <div class="right-content__middle__userdate__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="right-content__middle__message" data-id="${id}">
                  ${message.image_url ? text_image : message.content }
                </div>
                  `
    return html;
  }
  $(".message-form").on("submit", function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log(data);
      let html = buildHTML(data);
      $(".right-content__middle").append(html)
      $(".right-content__middle").animate({
        scrollTop: $(".right-content__middle")[0].scrollHeight}, 'fast');
      $(".message-form")[0].reset();
      $(".right-content__lower__btn").removeAttr('disabled');
    })
    .fail(function() {
        alert("メッセージ送信に失敗しました");
        $(".right-content__lower__btn").removeAttr('disabled');
    });
  })

  let reloadMessages = function() {
    last_message_id = $(".right-content__middle__userdate").last().data('id');
    $.ajax({
      url: "api/messages",
      type: "get",
      data: { id: last_message_id },
      dataType: "json"
    })
    .done(function(messages) {
      let insertHTML = '';
      messages.forEach(function(message){
        insertHTML += buildHTML(message);
      });
      $(".right-content__middle").append(insertHTML)
      if (messages.length !== 0) {
      $(".right-content__middle").animate({
        scrollTop: $(".right-content__middle")[0].scrollHeight}, 'fast');
      }
    })
    .fail(function() {
      alert("通信エラーです。");
    });
  };
  let path = location.pathname.split("/")
  if (path[1] == "groups" && path[3] == "messages"){
    setInterval(reloadMessages, 1000);
  }
});
