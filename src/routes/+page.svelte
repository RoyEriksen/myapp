<script>
    import { isLoggedInStore, getUserId } from '../utils/auth.js';
    import humanize from 'humanize-plus';

    let isLoggedIn = false;
    let username = '';

    isLoggedInStore.subscribe(value => {
        isLoggedIn = value;
        if (isLoggedIn) {
            username = getUserId(); 
        } else {
            username = '';
        }
    });

    export let data;

</script>

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
