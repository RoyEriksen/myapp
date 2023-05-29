<script>
    import { authenticateUser } from "../../utils/auth";
    import { goto } from '$app/navigation';
    
    let username = '';
    let password = '';
  
    async function handleLogin() {
      const loginResult = await performLogin();

      if (loginResult.success) {
        goto('/')
      }
    }

    async function performLogin() {
    return await authenticateUser(username, password);
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
  