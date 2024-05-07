<!DOCTYPE html>
<html>
  <head>
    <title>Registration</title>
  </head>
  <body>
    <h1>Register</h1>
    <select id="registration-options">
      <option value="user">User</option>
      <option value="agence">Agence</option>
      <option value="bailleur">Bailleur</option>
    </select>
    <div id="registration-forms">
      <div id="user-form" class="registration-form">
        <form id="registration-form" method="POST" action="/register">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required><br>

          <label for="firstname">First Name:</label>
          <input type="text" id="firstname" name="firstname" required><br>

          <label for="cellphone">Cellphone Number:</label>
          <input type="tel" id="cellphone" name="cellphone" required><br>

          <button type="submit">Register</button>
        </form>
      </div>
      <div id="agence-form" class="registration-form">
        <form id="registration-form" method="POST" action="/register-agence">
          <label for="societe">Societe:</label>
          <input type="text" id="societe" name="societe" required><br>

          <label for="SIRET">SIRET:</label>
          <input type="text" id="SIRET" name="SIRET" required><br>

          <label for="nom">Nom:</label>
          <input type="text" id="nom" name="nom" required><br>

          <label for="prenom">Prenom:</label>
          <input type="text" id="prenom" name="prenom" required><br>

          <label for="naissance">Naissance:</label>
          <input type="date" id="naissance" name="naissance" required><br>

          <label for="adresse">Adresse:</label>
          <input type="text" id="adresse" name="adresse" required><br>

          <label for="cp">CP:</label>
          <input type="text" id="cp" name="cp" required><br>

          <label for="ville">Ville:</label>
          <input type="text" id="ville" name="ville" required><br>

          <label for="tel">Tel:</label>
          <input type="tel" id="tel" name="tel" required><br>

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required><br>

          <label for="pwd">Password:</label>
          <input type="password" id="pwd" name="pwd" required><br>

          <label for="formule">Formule:</label>
          <input type="text" id="formule" name="formule" required><br>

          <label for="langue">Langue:</label>
          <input type="text" id="langue" name="langue" required><br>

          <button type="submit">Register</button>
        </form>
      </div>
      <div id="bailleur-form" class="registration-form">
        <form id="registration-form" method="POST" action="/register-bailleur">
          <label for="responsable">Responsable:</label>
          <input type="text" id="responsable" name="responsable" required><br>

          <label for="adresse">Adresse:</label>
          <input type="text" id="adresse" name="adresse" required><br>

          <label for="cp">CP:</label>
          <input type="text" id="cp" name="cp" required><br>

          <label for="ville">Ville:</label>
          <input type="text" id="ville" name="ville" required><br>

          <label for="tel">Tel:</label>
          <input type="tel" id="tel" name="tel" required><br>

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required><br>

          <label for="boite_cle">Boite cle:</label>
          <input type="password" id="boite_cle" name="boite_cle" required><br>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
    <script>
      
      const registrationOptions = document.getElementById('registration-options');

      
      const registrationForms = document.getElementById('registration-forms');

      
      registrationOptions.addEventListener('change', () => {
        // Hide all registration forms
        Array.from(registrationForms.children).forEach((form) => {
          form.style.display = 'none';
        });

        // Show the selected registration form
        const selectedForm = document.getElementById(`${registrationOptions.value}-form`);
        selectedForm.style.display = 'block';
      });

    
      Array.from(registrationForms.children).forEach((form) => {
        form.style.display = 'none';
      });

      // Show the default registration form
      const defaultForm = document.getElementById('user-form');
      defaultForm.style.display = 'block';
    </script>
  </body>
</html>