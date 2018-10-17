$(document).ready(function(){
  let token = "",
  client = "",
  uid = "",
  id = ""
  url = "";

  $('#sign_in_submit').on('click', function(){
    url = $('#sign_in_url').val();
    const email = $('#sign_in_email').val();
    const password = $('#sign_in_password').val();

    const sign_in_settings = {
      "async": true,
      "crossDomain": true,
      "url": url + "/auth/sign_in",
      "method": "POST",
      "headers": {
        "email": email,
        "password": password
      }
    };

    $.ajax(sign_in_settings).done(function( data, textStatus, jqXHR ) {
      token = jqXHR.getResponseHeader("access-token");
      client = jqXHR.getResponseHeader("client");
        uid = jqXHR.getResponseHeader("uid");
        id = data.data.id;
        const response = "<p>Token: "+ token + "</p>\
        <p>client: "+ client + "</p>\
        <p>uid: "+ uid + "</p>\
        <p>" + JSON.stringify(data) + "</p>"

        $('#sign_in_response')
        .append(response)
        .removeClass("hidden");
    });
    });

    $('#edit_user_submit').on('click', function(){
    const name = $('#edit_user_name').val();
    const firstname = $('#edit_user_firstname').val();
    const nickname = $('#edit_user_nickname').val();
    const zipcode = $('#edit_user_zipcode').val();
    const birthdate = $('#edit_user_birthdate').val();

      const edit_user_settings = {
        "async": true,
        "crossDomain": true,
        "url": url + "/users/" + id,
        "method": "PUT",
        "headers": {
          "uid": uid,
          "client": client,
          "access-token": token,
          "Content-Type": "application/json",
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": "{\
          \"user\":\
          {\
            \"name\": \"" + name +  "\",\
            \"firstname\": \"" + firstname + "\",\
            \"nickname\": \"" + nickname + "\",\
            \"zipcode\": \"" + zipcode + "\",\
            \"birthdate\": \"" + birthdate + "\"\
          }\
        }"
      }

      $.ajax(edit_user_settings).done(function (response) {
        $('#edit_user_response')
        .append("<p>" + JSON.stringify(response) + "</p>")
        .removeClass("hidden");
      });
    });
});
