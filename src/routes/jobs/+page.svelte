<script>
  import { getUserId } from '../../utils/auth.js';
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  import { onMount } from 'svelte';
  import Layout from '../Layout.svelte';

  
  let job = {
    user: getUserId(),
    title: '',
    minAnnualCompensation: '',
    maxAnnualCompensation: '',
    description: '',
    requirements: '',
    applicationInstructions: '',
    location: '',
    employer: ''
  };
  
  let showSuccessMessage = false;
  // let isEditing = false;

  export async function createJobOnBackend(job) {
    const resp = await fetch(
      PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(job)
      }
    );
  
    if (resp.ok) {
      const createdJob = await resp.json();
      job.id = createdJob.id;
      console.log('Job created successfully');
      resetFormFields();
      showSuccessMessage = true;
    } else {
      console.error('Job creation failed');
    }
    }

    function handleSubmit(event) {
      event.preventDefault();
        createJobOnBackend(job);
      }



    function resetFormFields() {
        job = {
        user: getUserId(),
        id: '',
        title: '',
        minAnnualCompensation: '',
        maxAnnualCompensation: '',
        description: '',
        requirements: '',
        applicationInstructions: '',
        location: '',
        employer: ''
    };
  }

  // isEditing = userId === job.user;
</script>

{#if showSuccessMessage}
<div class="success-overlay">
    <div class="success-message">
        <p>Job created successfully</p>
        <div class="success-message-buttons">
          <button on:click={() => showSuccessMessage = false}>Add Another Job</button>
          <button on:click={() => window.location.href = '/'}>Return Home</button>
        </div>
      </div>
</div>
{/if}

<Layout showButtons={false}>
<form on:submit={handleSubmit}>
    <div>
        <label for="title">Job Title:</label>
        <input id="title" type="text" bind:value={job.title} placeholder="Job Title" />
    </div>
    <div>
        <label for="minAnnualCompensation">Minimum Annual Comp:</label>
        <input id="minAnnualCompensation" type="number" bind:value={job.minAnnualCompensation} placeholder="Minimum Annual Comp" />
    </div>
    <div>
        <label for="maxAnnualCompensation">Maximum Annual Comp:</label>
        <input id="maxAnnualCompensation" type="number" bind:value={job.maxAnnualCompensation} placeholder="Maximum Annual Comp" />
    </div>
    <div>
        <label for="employer">Employer:</label>
        <input id="employer" type="text" bind:value={job.employer} placeholder="Employer" />
    </div>
    <div>
        <label for="location">Location:</label>
        <input id="location" type="text" bind:value={job.location} placeholder="Location" />
    </div>
    <div>
        <label for="description">Job Description:</label>
        <textarea bind:value={job.description} placeholder="Job Description"></textarea>
    </div>
    <div>
        <label for="requirements">Requirements:</label>
        <textarea bind:value={job.requirements} placeholder="Job Requirements"></textarea>
    </div>
    <div>
        <label for="applicationInstructions">Application Instructions</label>
        <textarea bind:value={job.applicationInstructions} placeholder="Application Instructions"></textarea>
    </div>

    <button type="submit">
      Add Job
    </button>
  </form>
  
  <style>
    form {
      max-width: 400px;
      margin: auto;
    }
  
    input[type="text"],
    input[type="number"],
    textarea {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
  
    button[type="submit"] {
      background-color: #4caf50;
      color: white;
      padding: 10px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    button[type="submit"]:hover {
      background-color: #45a049;
    }

    .success-overlay {
      position: fixed;
      top: 20%;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 9999;
    }

    .success-message {
      background-color: #f2f2f2;
      color: black;
      padding: 10px;
      margin: auto;
      margin-top: 20px;
      max-width: 400px;
      border-radius: 4px;
      text-align: center;
      position: relative;
      top: 50%;
      transform: translateY(-10%);
    }

    .success-message p {
        margin: 0;
        padding-bottom: 15px;
        text-align: center;
        line-height: 1;
    }

    .success-message button {
    background-color: #4caf50;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 5px;
    font-size: 12px;
  }

  .success-message button:hover {
    background-color: #45a049;
  }
  </style>
  </Layout>
