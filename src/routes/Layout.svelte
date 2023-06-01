<script>
  import { onMount } from 'svelte';
  import { isLoggedInStore, authenticateUser, getUserId, logOut, getUsername, checkIsLoggedIn } from '../utils/auth.js';
  import humanize from 'humanize-plus';
  import { goto } from '$app/navigation';

  export let showButtons = true;


  // let isLoggedIn = !!localStorage.getItem("isLoggedIn");
  let isLoggedIn = false;
  let username = '';

  isLoggedInStore.subscribe(value => {
      isLoggedIn = value;
      if (isLoggedIn) {
          username = getUsername(); 
      } else {
          username = '';
      }
  });

  export let data;

  function handleRegister() {
      goto('../users/new')
  }

  function handleLogOut() {
      logOut();
  }

  async function handleLogIn() {
      goto('../login')
  }

  onMount(async () => {
      await checkIsLoggedIn();
  });
</script>

<header>
  <div class="header-container">
      <div class="header-buttons">
        {#if showButtons}
          {#if isLoggedIn}
              <button on:click="{() => goto('./jobs')}">Create New Job</button>
              <button on:click={handleLogOut}>Log Out</button>
          {:else}
              <button on:click={handleRegister}>Register</button>
              <button on:click={handleLogIn}>Log In</button>
          {/if}
        {:else}
        <button on:click={() => window.location.href = '/'}>Return Home</button>
        {/if}  
      </div>
  </div>
</header>

<style>
  .header-buttons {
  display: flex;
  justify-content: flex-end;
  }
  
  .header-buttons button {
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 15px;
  font-size: 12px;
  }

  .header-container {
      height: 50px;
      padding: 10px;
      background-color: rgba(232, 229, 229, 0.5);
  }
</style>

<slot></slot>