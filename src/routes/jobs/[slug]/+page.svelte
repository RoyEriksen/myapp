<script>
  import SvelteMarkdown from 'svelte-markdown';
  import humanize from "humanize-plus";
  import { getUserId } from '../../../utils/auth.js';
  import { onMount } from 'svelte';
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  import { getTokenFromLocalStorage } from '../../../utils/auth.js';
  import Layout from '../../Layout.svelte';
	// import { contenteditable_truthy_values } from 'svelte/internal';
  
  export let data;
  
  let user;
  let editMode = false;

  onMount(async () => {
    user = await getUserId();
  });

  function toggleEditMode() {
    editMode = !editMode;
  }

  async function updateJobOnBackend() {
    try {
      const response = await fetch(
        PUBLIC_BACKEND_BASE_URL +`/api/collections/jobs/records/${data.job.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getTokenFromLocalStorage()
        },
        body: JSON.stringify(data.job),
      });

      if (response.ok) {
        console.log('Job successfully updated.');
        toggleEditMode();
      } else {
        // Handle error if the update request fails
        console.error('Failed to update job data.');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error occurred while updating job data:', error);
    }
  }

</script>

<Layout>
<style>
  .container {
    margin-top: 10px;
  }

  .flex-container {
    display: flex;
  }

  .flex-1 {
    flex: 1;
  }

  .job-title {
    font-size: 3xl;
    font-weight: bold;
  }

  .employer {
    font-size: xl;
  }

  .heading {
    font-size: xl;
    font-weight: thin;
  }

  .content {
    margin-top: 6px;
  }

  .salary-content {
    margin-left: 4px;
  }

  .overlay {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
   }

  .overlay-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 1200px;
    width: 100%;
    max-height: 90%;
    overflow-y: auto;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    justify-content: center;
  }

    /* Hide the scrollbar */
    .overlay-content::-webkit-scrollbar {
    display: none;
  }

    /* Optional: Add a custom scrollbar style */
    .overlay-content {
    scrollbar-width: thin;
    scrollbar-color: #ccc transparent;
  }

  .form-container {
    background-color: white;
    padding: 20px;
    border-radius: 4px;
    width: 100%;
    /* max-width: 1000px; */
  }

  .form-field {
    margin-bottom: 10px;
  }

  .form-field label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .form-field input,
  .form-field textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .form-field textarea {
    resize: none;
    height: auto;
    min-height: 250px;
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  .button-container button {
    padding: 8px 16px;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .button-container button + button {
    margin-left: 10px;
  }

  .edit-button {
    background-color: #007bff;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    position: fixed;
    top: 60px; /* Adjust this value as needed to align the button */
    right: 25px; /* Adjust this value as needed to align the button */
    z-index: 999; /* Ensure the button appears above other elements */
    height: 30px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
</Layout>

<div>
  {#if data.job.user === user}
    <button class="edit-button" on:click={toggleEditMode}>
      {#if editMode}
        Save
      {:else}
        Edit
      {/if}
    </button>
  {/if}
</div>

{#if editMode}
  <div class="overlay">
    <div class="overlay-content">
      <div class="form-container">
        <div class="form-field">
          <label for="title">Job Title:</label>
          <input type="text" id="title" bind:value={data.job.title} />
        </div>
        <div class="form-field">
          <label for="employer">Employer:</label>
          <input type="text" id="employer" bind:value={data.job.employer} />
        </div>
        <div class="form-field">
          <label for="description">Description:</label>
          <textarea id="description" bind:value={data.job.description}></textarea>
        </div>
        <div class="form-field">
          <label for="requirements">Requirements:</label>
          <textarea id="requirements" bind:value={data.job.requirements}></textarea>
        </div>
        <div class="form-field">
          <label for="applicationInstructions">How to Apply?</label>
          <input id="applicationInstructions" bind:value={data.job.applicationInstructions}/>
        </div>
        <div class="form-field">
          <label for="location">Location:</label>
          <input type="text" id="location" bind:value={data.job.location} />
        </div>
        <div class="form-field">
          <label for="minAnnualCompensation">Minimum Annual Compensation:</label>
          <input type="text" id="minAnnualCompensation" bind:value={data.job.minAnnualCompensation} />
        </div>
        <div class="form-field">
          <label for="maxAnnualCompensation">Maximum Annual Compensation:</label>
          <input type="text" id="maxAnnualCompensation" bind:value={data.job.maxAnnualCompensation} />
        </div>
        <div class="button-container">
          <button on:click={toggleEditMode}>Cancel</button>
          <button on:click={toggleEditMode, updateJobOnBackend}>Save</button>
      </div>
    </div>
  </div>
</div>
{/if}

<div class="container">
  <div class="flex-container">
    <div class="flex-1">
      <h1 class="job-title">{data.job.title}</h1>
      <p class="employer">{data.job.employer}</p>
    </div>
  </div>

  <div class="flex-container w-full mt-8">
    <div class="basis-2/3 prose max-w-none w-full">
      <h2 class="heading">Description</h2>
      <div>
        <SvelteMarkdown source={data.job.description} />
      </div>

      <div class="mt-6" />

      <h2 class="heading">Requirements</h2>
      <div>
        <SvelteMarkdown source={data.job.requirements} />
      </div>

      <div class="mt-6" />

      <h2 class="heading">How to Apply?</h2>
      <p class="content">{data.job.applicationInstructions}</p>
    </div>

    <div class="basis-1/3 ml-4">
      <h2 class="heading">Location</h2>
      <p class="content">{data.job.location}</p>

      <div class="mt-6" />

      <h2 class="heading">Salary Range</h2>
      <p class="salary-content">
        USD {humanize.formatNumber(data.job.minAnnualCompensation)} - USD {humanize.formatNumber(data.job.maxAnnualCompensation)}
      </p>
    </div>
  </div>
</div>
