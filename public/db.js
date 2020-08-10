let db;
// Create a new request for budget database
const request = indexedDB.open('budget', 1);

// Request on upgrade needed
request.onupgradeneeded = function(event) {
    // Create object store 
    const db = event.target.result;
    db.createObjectStore('pending', { autoIncrement: true });
};

// Handle request success 
request.onsuccess = function(event) {
    db = event.target.result;

    // Check if app is online before reading from db 
    if (navigator.onLine) {
        checkDatabase();
    }
};

// Handle request error
request.onerror = function(event) {
    console.log('Error:' + event.target.errorCode);
};

// Helper function for saving the offline transactions
function saveRecord(record){
    // Create a transaction on the pending db with readwrite access
    const transaction = db.transaction(['pending'], 'readwrite');

    // Access pending object store
    const store = transaction.objectStore('pending');

    // Add record to store with add method
    store.add(record);
};

// Helper function to check the database for pending transactions
function checkDatabase() {};

// Event Listener for when the app returns online
window.addEventListener('online', checkDatabase);