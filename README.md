# 🌐 PronoobDrive Mirror URL Checker

A Node.js + Express-based URL checker that monitors multiple mirror URLs (e.g. Vercel, Render) and logs their response status and content periodically.

It also includes a basic Express server to keep the Render app alive.

---

## 📦 Features

- 🔁 Automatically checks multiple mirror URLs in a loop
- ⏱ Logs the status every few minutes
- 🧠 Identifies working mirrors based on HTTP 200 or valid data
- 🛡 Express app endpoint (`/`) for uptime ping (Render-friendly)

---

## 🛠 Requirements

- Node.js (v14+)
- npm

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pronoobdrive-url-checker.git
cd pronoobdrive-url-checker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Search Term (Optional)

You can change the search term at the top of `index.js`:

```js
const SEARCH_TERM = 'RADIO%202003';
```

Replace it with your desired query string (make sure it’s URL encoded).

---

## ▶️ Run the App

### For Local Testing

```bash
node index.js
```

### For Development with Auto Restart

```bash
npx nodemon index.js
```

> Optional: install nodemon globally  
> `npm install -g nodemon`

---

## 🚀 Deploy on Render

1. Go to [https://render.com](https://render.com)
2. Create a new “Web Service”
3. Connect this GitHub repo
4. Set build & run command:
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
5. Set environment:
   - **Node Version:** 16+
   - **Port:** 3000 (Render automatically sets `PORT`)
6. Done!

The app will keep running and checking your mirror URLs every few minutes.

---

## 🌐 Output Sample

```bash
🔍 [6/18/2025, 10:25:02 AM] Starting round of checks...
✅ [6/18/2025, 10:25:02 AM] 200 OK from: https://pronoobdrive.onrender.com/Sct?search=RADIO%202003
✅ [6/18/2025, 10:25:03 AM] Result from: https://pronoob-drive.vercel.app/?name=RADIO%202003
[
  {
    "title": "Radio 2003",
    "url": "https://..."
  },
  ...
]
⏳ Waiting 5 minutes before next round...
```

---

## 🔄 How it Works

- The script loops forever using `while (true)`
- Every ~5 minutes, it:
  - Sends GET requests to each URL
  - Logs 200 OKs (for Render mirrors)
  - Parses JSON for valid data (for Vercel)
- Delay of 1 second between each request to prevent overload

---

## 🧪 Test the Express Endpoint

Once deployed, hit:

```
GET / => "✅ Pinger app is running!"
```

Use UptimeRobot or Freshping to ping this URL every 5 minutes and keep it live on Render.

---

## 🧹 Future Improvements

- Email/Telegram/Discord alerts on failures
- Log to file instead of console
- Admin dashboard
- Proxy rotation support

---

## 📄 License

MIT © [Your Name](https://github.com/officeboy12242)

---

## 🔗 Author

- GitHub: [@your-username](https://github.com/officeboy12242)
