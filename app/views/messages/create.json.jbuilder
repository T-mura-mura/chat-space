json.content @message.content
json.image_url @message.image
json.user_name @message.user.name
json.created_at @message.created_at.in_time_zone('Tokyo').strftime("%Y/%m/%d %H:%M")
json.id @message.id