$(function(){
  function buildHTML(message){
    let html = `<div class="right-content__middle__userdate">
                  <div class="right-content__middle__userdate__user">
                  ${message.user.name}
                  </div>
                  <div class="right-content__middle__userdate__date">
                  ${message.created_at.strftime("%Y/%m/%d %H:%M")}
                  </div>
                <div class="right-content__middle__message">
                  <% if message.content.present? %>
                  ${message.content}
                  <%= image_tag message.image.url, class: 'image' if message.image.present? %>
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
    })
  })
});