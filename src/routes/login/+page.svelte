<script>
    import { onMount } from 'svelte';
    import { authenticateUser, isLoggedInStore, getUsername, logOut, checkIsLoggedIn } from "../../utils/auth";
    import { goto } from '$app/navigation';
    import Layout from '../Layout.svelte';
    import { writable } from 'svelte/store';
    
    let isLoggedIn = false;
    let username = '';
    let password = '';

    const errorMessage = writable('');

    isLoggedInStore.subscribe(value => {
    isLoggedIn = value;
    if (isLoggedIn) {
      username = getUsername();
    } else {
      username = '';
    }
  });

  export let data;

  async function handleLogin() {
    const loginResult = await performLogin();

    if (loginResult.success) {
      goto('/')
    } else {
      errorMessage.set('Incorrect username or password.')
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
    <div class="alert-container">
      {#if $errorMessage}
        <div class="alert">{ $errorMessage }</div>
      {/if}
    </div>
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
    .alert-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .alert {
    background-color: #f8d7da;
    color: #721c24;
    padding: 8px 16px;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  </style>
  