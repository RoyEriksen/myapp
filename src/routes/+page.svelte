<script>
    import { onMount } from 'svelte';
    import { isLoggedInStore, authenticateUser, getUserId, logOut, getUsername, checkIsLoggedIn } from '../utils/auth.js';
    import humanize from 'humanize-plus';
    import { goto } from '$app/navigation';


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
            {#if isLoggedIn}
                <button on:click="{() => goto('./jobs')}">Create New Job</button>
                <button on:click={handleLogOut}>Log Out</button>
            {:else}
                <button on:click={handleRegister}>Register</button>
                <button on:click={handleLogIn}>Log In</button>
            {/if}
        </div>
    </div>
</header>

<h1 class="text-center text-xl font-bold">Find Your Next Job</h1>


<div class="overflow-x-auto w-full">
    {#each data.jobs as job}
        <div class="flex flex-col mt-10">
            <div>
                <a class="font-bold text-2xl" href="/jobs/{job.id}">{job.title}</a>
                <div class="text-sm mt-1">
                    {job.employer} . {job.location} .
                    <span class="text-sm"
                        >USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(job.maxAnnualCompensation)}</span
                    >
                </div>
                <div class="italic text-xs opacity-50 mt-2"
                    >posted {new Date(job.created).toLocaleDateString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</div
                >
            </div>

            <div class="mt-4 ">
                {job.description.slice(0, 240)}...
            </div>
        </div>
    {/each}

    {#if isLoggedIn}
    <div class="text-center mt-10">
      <!-- Show content for logged-in users -->
      <p>Welcome, {username}!</p>
    </div>
  {:else}   
    <div class="text-center mt-10">
      <!-- Show content for non-logged-in users -->
      <p>Please log in to see additional content.</p>
    </div>
  {/if}
</div>

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
