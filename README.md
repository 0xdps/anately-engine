# Anately Engine

Anately is a privacy-focused, high-throughput web analytics engine designed for simplicity and performance. It collects website events without storing PII (Personally Identifiable Information) or using persistent tracking cookies.

## 🚀 Features

- **Privacy-First**: No IP storage, no persistent cookies. Uses daily-rotating salts for unique visitor counting.
- **High Performance**: Decoupled architecture using Redis Streams for ingestion and DuckDB/MotherDuck for analytics.
- **Lightweight Tracker**: Minimal JavaScript footprint (< 1KB).
- **Modern Dashboard**: React-based dashboard for real-time insights.
- **Self-Hostable**: Built with standard technologies (Node.js, Redis).

## 🏗 Architecture

The project is structured as a monorepo:

- **`backend/`**: The core engine.
    - **Ingestion API**: Node.js HTTP server that receives events.
    - **Worker**: Background process that consumes Redis streams and aggregates data into MotherDuck.
- **`frontend/`**: The analytics dashboard.
    - Built with Vite, React, and TypeScript.

## 🛠 Prerequisites

- **Node.js** (v18+)
- **Redis** (v5+)
- **MotherDuck Account** (optional, falls back to in-memory DuckDB)

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/anately-engine.git
   cd anately-engine
   ```

2. **Install dependencies:**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

## ⚙️ Configuration

Create a `.env` file in the `backend/` directory:

```env
# Server
PORT=3000

# Redis
REDIS_URL=redis://localhost:6379

# Database (Optional)
# Leave empty to use in-memory DuckDB
MOTHERDUCK_TOKEN=

# Privacy
# Secret salt for hashing session IDs. Rotate this to reset tracking.
SITE_ID_HASH=your-secret-salt-value
```

## 🏃‍♂️ Running Locally

### 1. Start Redis
Ensure you have a Redis instance running locally.
```bash
redis-server
```

### 2. Start the Backend
```bash
cd backend
npm run dev
```
The API will be available at `http://localhost:3000`.

### 3. Start the Frontend
```bash
cd frontend
npm run dev
```
The dashboard will be available at `http://localhost:5173`.

## 📖 Usage

### Integrating the Tracker

Add the following script to the `<head>` of your website:

```html
<script defer src="http://localhost:3000/tracker.js"></script>
<script>
  // Optional: Custom initialization if needed
  // window.anately = { ... };
</script>
```

The tracker automatically captures:
- Page Views
- Referrers
- Screen Width (for device type detection)

### API Endpoints

#### `GET /collect`
Ingests an analytics event.
- **Query Params**:
    - `path`: Page path (e.g., `/blog/post-1`)
    - `referrer`: Referrer URL
    - `screen_width`: Device screen width
    - `type`: Event type (`pageview` or `click`)

#### `GET /health`
Health check endpoint. Returns `200 OK`.

## 🛡 Privacy Mechanism

Anately uses a **daily-rotating hash** to count unique visitors without compromising privacy:

```
Session ID = SHA256(IP + UserAgent + Date + Salt)
```

- **IP Address**: Never stored. Used only in memory to generate the hash.
- **Date**: The hash changes every day, preventing cross-day tracking.
- **Salt**: A secret key you control.

## 📄 License

MIT © [Anately](LICENSE)
