$(function(){
  function buildHTML(message){

    let text_image = `<p>${message.content}</p>
                      <img src="${message.image_url}" alt="graphics">`
    let html = `<div class="right-content__middle__userdate">
                  <div class="right-content__middle__userdate__user">
                    ${message.user_name}
                  </div>
                  <div class="right-content__middle__userdate__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="right-content__middle__message">
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
      let html = buildHTML(data);
      $(".right-content__middle").append(html)
    })
  })
});