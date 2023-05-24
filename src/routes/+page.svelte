<!-- <h1 class="text-3xl font-bold underline">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/about">About my site</a>
<button class="btn">Button</button>
<span class="badge">Badge</span> -->


<script>
  import { onMount } from "svelte";

  // define a function that makes a http request to our backend to get data
  async function getJobs() {
    const resp = await fetch("https://next-jobs-db-backend.fly.dev" + '/api/collections/jobs/records');

    const res = await resp.json();
    if (resp.status == 200) {
      return {
        jobs: res.items
      }
    } else {
      return {
        jobs: []
      }
    }
  }

  // initialize a data variable when our route first gets loaded
  let data = {
    jobs: []
  }
  
  // onMount is a Svelte function that gets called as soon as our component gets loaded, we then call our getJobs function to retrieve data
  onMount(async () => {
    data = await getJobs()
  })
</script>

<h1 class="text-center text-xl font-bold">Find Your Next Job</h1>

<div class="overflow-x-auto w-full">
  {#each data.jobs as job}
    <div class="flex flex-col mt-10">
      <div>
        <a class="font-bold text-2xl" href="/jobs/{job.id}">{job.title}</a>
        <div class="text-sm mt-1">
          {job.employer} . {job.location} . <span class="text-sm">USD {job.minAnnualCompensation} - USD {job.maxAnnualCompensation}</span>
        </div>
        <div class="italic text-xs opacity-50 mt-2">posted {new Date(job.created).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</div>
      </div>
      <div class="mt-4 ">
        {job.description.slice(0, 240)}...
      </div>
    </div>
  {/each}
</div>