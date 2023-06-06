// src/alerts.js

import { writable } from 'svelte/store';

// Create a writable store for alerts
export const alerts = writable([]);

// Function to add an alert
export function addAlert(message, type = 'info') {
  const alert = { message, type };

  // Update the alerts store
  alerts.update((existingAlerts) => [...existingAlerts, alert]);

  // Automatically remove the alert after a certain duration
  setTimeout(() => {
    removeAlert(alert);
  }, 5000); // Set the duration in milliseconds (e.g., 5000 = 5 seconds)
}

// Function to remove an alert
export function removeAlert(alert) {
  // Update the alerts store
  alerts.update((existingAlerts) =>
    existingAlerts.filter((a) => a !== alert)
  );
}
