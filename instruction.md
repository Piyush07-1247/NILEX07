# Nilex07 Store - Setup Instructions

## 1. Backend API (Google Apps Script)

To handle Orders dynamically instead of using "Mock Mode" (LocalStorage), follow these steps:

1.  Go to [Google Apps Script](https://script.google.com/).
2.  Create a **New Project**.
3.  Paste the following code into `Code.gs`:

```javascript
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    if (action === 'createOrder') {
      const order = payload.data;
      // Add headers if sheet is empty
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['OrderID', 'Date', 'Customer', 'Phone', 'Address', 'Items', 'Total', 'Status']);
      }
      
      const rowData = [
        order.id,
        order.timestamp,
        order.customerName,
        order.customerPhone,
        order.address,
        JSON.stringify(order.items), // Storing items as JSON string
        order.total,
        order.status
      ];
      
      sheet.appendRow(rowData);
      return ContentService.createTextOutput(JSON.stringify({ success: true, orderId: order.id })).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (action === 'updateStatus') {
      // Logic to find row by OrderID and update Status column
      // (Implementation depends on your exact sheet structure)
      return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: e.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
   // Logic to fetch orders
   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
   const data = sheet.getDataRange().getValues();
   // Convert rows to JSON array of objects...
   return ContentService.createTextOutput(JSON.stringify({ orders: [] })).setMimeType(ContentService.MimeType.JSON);
}
```

4.  **Deploy** the script:
    *   Click `Deploy` > `New Deployment`.
    *   Select type: `Web App`.
    *   Execute as: `Me`.
    *   Who has access: **Anyone** (Important for the frontend to reach it).
    *   Click `Deploy`.
5.  Copy the **Web App URL**.
6.  Open `constants.ts` in your project.
7.  Replace `'YOUR_SCRIPT_ID_HERE'` with your actual URL.

## 2. Firebase Authentication Setup

To make the Login/Register page work with real users:

1.  Go to [Firebase Console](https://console.firebase.google.com/).
2.  Create a new project.
3.  Go to **Authentication** > **Sign-in method** and enable **Email/Password**.
4.  Go to **Project Settings** (Gear icon).
5.  Scroll down to "Your apps" and select the Web icon (`</>`).
6.  Register the app (name it "Nilex07").
7.  Copy the `firebaseConfig` object provided.
8.  Open `lib/firebase.ts` in your project.
9.  Replace the placeholder values with your actual config:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "12345...",
  appId: "1:12345..."
};
```

## 3. Code Comments

Look for the comment `// INSTRUCTION:` in the following files to see exactly where to paste keys:

*   `constants.ts`: For the Google Sheet Backend URL.
*   `lib/firebase.ts`: For the Firebase Auth Configuration.
