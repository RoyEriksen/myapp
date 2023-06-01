<script>
    import { onMount } from 'svelte';
    import { authenticateUser, isLoggedInStore, getUsername, logOut, checkIsLoggedIn } from "../../utils/auth";
    import { goto } from '$app/navigation';
    import Layout from '../Layout.svelte';
    
    let isLoggedIn = false;
    let username = '';
    let password = '';


    isLoggedInStore.subscribe(value => {
    isLoggedIn = value;
    if (isLoggedIn) {
      username = getUsername();
    } else {
      username = '';
    }
  });

  export let data;

  // function handleRegister() {
  //   goto('../users/new');
  // }

  // function handleLogOut() {
  //   logOut();
  // }

  async function handleLogin() {
    const loginResult = await performLogin();

    if (loginResult.success) {
      goto('/')
    }
  }
  
  async function performLogin() {
  return await authenticateUser(username, password);
}
  
  onMount(async () => {
    await checkIsLoggedIn();
  });
  </script>
  
  <Layout showButtons={false}>
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
</Layout>
  
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
  