### AllyDataLab Project Structure

নিচে AllyDataLab প্রজেক্টের জন্য একটি সাজেশনকৃত ফোল্ডার এবং ফাইল স্ট্রাকচার দেওয়া হল:

```
AllyDataLab/
│
├── data/
│   ├── raw/
│   ├── processed/
│   └── archive/
│
├── scripts/
│   ├── process_data.ps1
│   ├── save_data.ps1
│   └── distribute_data.ps1
│
├── web/
│   ├── forms/
│   │   └── data-entry-form.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── scripts.js
│
└── logs/
    └── activity.log
```

### Folder Description
- **data/**: এই ফোল্ডারে ডাটা সংরক্ষণ করা হবে।
  - **raw/**: কাঁচা ডাটা সংরক্ষণ করার জন্য।
  - **processed/**: প্রসেস করা ডাটা সংরক্ষণের জন্য।
  - **archive/**: পুরোনো এবং আর্কাইভ ডাটা সংরক্ষণের জন্য।
  
- **scripts/**: PowerShell স্ক্রিপ্ট সংরক্ষণ করার জন্য।
  - **process_data.ps1**: ডাটা প্রক্রিয়াকরণের জন্য।
  - **save_data.ps1**: ডাটা সংরক্ষণের জন্য।
  - **distribute_data.ps1**: ডাটা বিতরণের জন্য।
  
- **web/**: ওয়েব সম্পর্কিত ফাইল সংরক্ষণ করার জন্য।
  - **forms/**: HTML ফরম সংরক্ষণের জন্য।
    - **data-entry-form.html**: ডাটা এন্ট্রি ফরম।
  - **css/**: স্টাইলশিট সংরক্ষণের জন্য।
    - **style.css**: কাস্টম CSS।
  - **js/**: জাভাস্ক্রিপ্ট ফাইল সংরক্ষণের জন্য।
    - **scripts.js**: কাস্টম স্ক্রিপ্ট।
  
- **logs/**: লগ ফাইল সংরক্ষণের জন্য।
  - **activity.log**: কার্যকলাপ লগ।

### PowerShell Commands

নিচে কিছু PowerShell কমান্ড এবং স্ক্রিপ্ট দেওয়া হল যা আপনার প্রজেক্টটি তৈরি করতে প্রয়োজন হবে:

#### ফোল্ডার এবং ফাইল তৈরি করতে:
```powershell
# Create directories
New-Item -ItemType Directory -Path "AllyDataLab\data\raw"
New-Item -ItemType Directory -Path "AllyDataLab\data\processed"
New-Item -ItemType Directory -Path "AllyDataLab\data\archive"
New-Item -ItemType Directory -Path "AllyDataLab\scripts"
New-Item -ItemType Directory -Path "AllyDataLab\web\forms"
New-Item -ItemType Directory -Path "AllyDataLab\web\css"
New-Item -ItemType Directory -Path "AllyDataLab\web\js"
New-Item -ItemType Directory -Path "AllyDataLab\logs"

# Create placeholder files
New-Item -ItemType File -Path "AllyDataLab\scripts\process_data.ps1"
New-Item -ItemType File -Path "AllyDataLab\scripts\save_data.ps1"
New-Item -ItemType File -Path "AllyDataLab\scripts\distribute_data.ps1"
New-Item -ItemType File -Path "AllyDataLab\web\forms\data-entry-form.html"
New-Item -ItemType File -Path "AllyDataLab\web\css\style.css"
New-Item -ItemType File -Path "AllyDataLab\web\js\scripts.js"
New-Item -ItemType File -Path "AllyDataLab\logs\activity.log"
```

#### ডাটা সংরক্ষণ করার জন্য PowerShell স্ক্রিপ্ট:
```powershell
# save_data.ps1

param (
    [string]$formData
)

# Define the path to save data
$dataPath = "C:\Path\To\AllyDataLab\data\raw\submitted_data.txt"

# Save the form data to the file
Add-Content -Path $dataPath -Value $formData

# Log the activity
$logPath = "C:\Path\To\AllyDataLab\logs\activity.log"
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Add-Content -Path $logPath -Value "$timestamp - Data saved: $formData"
```

### HTML Data Entry Form

এই একটি উদাহরণ `data-entry-form.html` ফাইলের জন্য:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    <title>Data Entry Form</title>
</head>
<body>
    <h1>Data Entry Form</h1>
    <form id="dataEntryForm">
        <label for="dataInput">Enter Data:</label>
        <input type="text" id="dataInput" name="dataInput" required>
        <button type="submit">Submit</button>
    </form>
    <div id="message"></div>
    <script src="../js/scripts.js"></script>
</body>
</html>
```

### JavaScript to Handle Form Submission

এই স্ক্রিপ্টটি `scripts.js` ফাইলে যোগ করুন যা ফরমটি সাবমিট করলে ডাটা সংরক্ষিত হবে এবং সাকসেস মেসেজ দেখাবে:

```javascript
document.getElementById('dataEntryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var formData = document.getElementById('dataInput').value;
    
    // Example of sending data to the server (you need a server-side handler)
    fetch('/path/to/server/script', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formData }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = 'Data submitted successfully!';
        document.getElementById('dataEntryForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
```

আপনাকে সার্ভার-সাইডে একটি হ্যান্ডলার তৈরি করতে হবে যা ফরম ডাটা গ্রহণ করবে এবং PowerShell স্ক্রিপ্টটি চালাবে। 😊
