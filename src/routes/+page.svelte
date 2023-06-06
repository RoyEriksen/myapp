<script>
    import { onMount } from 'svelte';
    import { isLoggedInStore, authenticateUser, getUserId, logOut, getUsername, checkIsLoggedIn } from '../utils/auth.js';
    import humanize from 'humanize-plus';
    import { goto } from '$app/navigation';
    import Layout from './Layout.svelte'
    import { writable } from 'svelte/store';

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

    onMount(async () => {
        await checkIsLoggedIn();
    });

    const lastVisibleJobIndex = writable(data.jobs.length); // Set it to 1 initially to show the first two jobs

    function goToLogin() {
        goto('/login')
    }
    
</script>

<Layout showButtons={true}>
    <h1 class="text-center text-xl font-bold">Find Your Next Job</h1>

    <div class="overflow-x-auto w-full relative">
        {#each data.jobs.slice(0, $lastVisibleJobIndex) as job, index}
            <div class="flex flex-col mt-10 {index > 1 && !isLoggedIn ? 'blur-filter' : ''}">
                <div>
                    <a class="font-bold text-2xl" href="/jobs/{job.id}">{job.title}</a>
                    <div class="text-sm mt-1">
                        {job.employer} . {job.location} .
                        <span class="text-sm">USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(job.maxAnnualCompensation)}</span>
                    </div>

                    <div class="italic text-xs opacity-50 mt-2">posted {new Date(job.created).toLocaleDateString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                    </div>
                </div>

                <div class="mt-4 ">
                    {job.description.slice(0, 240)}...
                </div>
            </div>
        {/each}

        {#if isLoggedIn}
        <div class="text-center mt-10">
            <p>Welcome, {username}!</p>
        </div>
        {:else}   
        <div class="text-center mt-4 absolute inset-0 flex items-center justify-center">
            <div class="bg-green-800 bg-opacity-50 p-4 rounded">
                <button class="text-white font-bold" on:click={goToLogin}>Please log in to see additional content</button>
            </div>
        </div>
        {/if}
    </div>
</Layout>

<style>
    .blur-filter {
    filter: blur(4px);
  }
</style>
