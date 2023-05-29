<script>
    import { authenticateUser } from "../src/utils/auth";
    
    let username = '';
    let password = '';
  
    function handleLogin() {
      // Perform authentication logic here
      // You can make an API call or validate the username/password locally
  
      // If the authentication is successful, redirect to the desired page
      // Replace '/dashboard' with the appropriate URL
      window.location.href = '/dashboard';
    }
  </script>
  
  <main>
    <h1>Login</h1>
    <form on:submit|preventDefault={handleLogin}>
      <label>
        Username:
        <input type="text" bind:value={username} />
      </label>
      <label>
        Password:
        <input type="password" bind:value={password} />
      </label>
      <button type="submit">Log In</button>
    </form>
  </main>
  
  <style>
    main {
      text-align: center;
      margin-top: 50px;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }
    label {
      margin-bottom: 10px;
    }
    input {
      padding: 5px;
      margin-left: 5px;
    }
    button {
      padding: 10px 20px;
      margin-top: 20px;
    }
  </style>
  