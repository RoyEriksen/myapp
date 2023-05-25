export async function load({ fetch }) {
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

