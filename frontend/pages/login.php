<?php include "template/header.php";?>

<!DOCTYPE html>
<html>
  <head>
    <title>Login</title>
  </head>
  <body>
    <h1>Login</h1>
    <form id="login-form" method="POST" action="/login">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required><br>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required><br>

      <button type="submit">Login</button>
    </form>
  </body>
</html>



<?php include "template/footer.php";?>