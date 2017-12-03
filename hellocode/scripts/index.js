jQuery(function($) {
  $("#register-form").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      url: "database.php",
      type: "POST",
      data: {
        function: "register",
        usernames: $("input[id=usernames]").val(),
        firstname: $("input[id=firstname]").val(),
        lastname: $("input[id=lastname]").val(),
        email: $("input[id=email]").val(),
        passs: $("input[id=passs]").val()
      },
      success: function() {
        alert("Account created!");
      }
    });
  });

  $("#login-form").on("submit", function(e) {
    e.preventDefault();
    var usernames = document.getElementById("usernames").value;
    var passwords = document.getElementById("passs").value;  
    $.ajax({
      url: "database.php",
      type: "POST",
      data: {
        function: "verification",
        usernames: $("input[id=usernames]").val(),
        passs: $("input[id=passs]").val()
      },
      success: function(data) {
              alert("Login Success!");
              window.location = "http://www.google.com"; // Redirecting to other page.    
      }
    });
  })

})(jQuery);
