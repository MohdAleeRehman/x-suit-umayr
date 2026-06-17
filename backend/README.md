# X Suite Backend API

Backend API for X Suite Real Estate Calculator using Node.js, Express, and MongoDB Atlas.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The server will run on `http://localhost:3001`

### 3. Test API
```bash
# Health check
curl http://localhost:3001/api/health

# Get all records
curl http://localhost:3001/api/records
```

## Project Structure

```
backend/
├── src/
│   ├── server.js                 # Main entry point
│   ├── db.js                     # MongoDB connection
│   ├── models/
│   │   └── Record.js             # Mongoose Record schema
│   ├── controllers/
│   │   └── recordController.js   # Business logic for records
│   ├── routes/
│   │   └── records.js            # Record API routes
│   ├── middleware/
│   │   └── errorHandler.js       # Global error handling
│   └── utils/
│       └── (utilities)
├── package.json
├── .env                          # Environment variables (DO NOT COMMIT)
├── .env.example                  # Example env file
├── .gitignore
└── README.md
```

## API Endpoints

### Records CRUD

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/records` | Get all records (paginated) |
| GET | `/api/records/:id` | Get single record |
| POST | `/api/records` | Create new record |
| PUT | `/api/records/:id` | Update record |
| DELETE | `/api/records/:id` | Soft delete record |
| DELETE | `/api/records/:id/permanent` | Permanently delete record |
| GET | `/api/records/search` | Search records by title |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/version` | API version |

## Example Requests

### Create a Sale Record
```bash
curl -X POST http://localhost:3001/api/records \
  -H "Content-Type: application/json" \
  -d '{
    "type": "sale",
    "dataset": {
      "origPrice": 913000,
      "sellPrice": 1100000,
      "propStatus": "offplan",
      "paidType": "pct",
      "paidVal": 25,
      "devBal": 684750,
      "dldPct": 4.5,
      "sldBasePct": 2,
      "sldSellPct": 2,
      "nocFee": 100,
      "spaFee": 4000,
      "titleDeed": 500,
      "bcType": "pct",
      "bcVal": 2,
      "scType": "pct",
      "scVal": 2,
      "hasUtil": false,
      "payerMap": {
        "Water": "buyer",
        "Gas": "buyer",
        "Elec": "buyer",
        "Fire": "buyer"
      }
    }
  }'
```

### Get All Records
```bash
curl http://localhost:3001/api/records?limit=20&skip=0
```

### Update a Record
```bash
curl -X PUT http://localhost:3001/api/records/[RECORD_ID] \
  -H "Content-Type: application/json" \
  -d '{
    "dataset": {
      "sellPrice": 1200000
      // ... other fields
    }
  }'
```

### Delete a Record
```bash
curl -X DELETE http://localhost:3001/api/records/[RECORD_ID]
```

## Environment Variables

Create `.env` file (see `.env.example`):

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRATION` - JWT expiration time
- `CORS_ORIGIN` - Allowed CORS origin for frontend
- `VERCEL_BLOB_STORE_TOKEN` - Token for PDF storage (later)

## Data Models

### Record Schema

```javascript
{
  _id: ObjectId,
  userId: String,          // User identifier
  type: String,           // 'sale' | 'rent' | 'property'
  title: String,          // Auto-generated title
  dataset: Mixed,         // Flexible storage for all calculation data
  tags: [String],         // For filtering
  archived: Boolean,      // Soft delete flag
  deletedAt: Date,        // When deleted
  createdAt: Date,        // Automatically set
  updatedAt: Date         // Automatically updated
}
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* ... */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## Next Steps

### Week 1 (In Progress)
- [x] Set up Node.js/Express project
- [x] Configure MongoDB Atlas connection
- [x] Create Record model + schema
- [x] Implement CRUD routes
- [ ] Set up authentication (JWT) - NEXT

### Week 2
- [ ] Add validation middleware
- [ ] Implement error handling
- [ ] Add logging (Winston/Pino)
- [ ] Create PDF generation endpoint
- [ ] Set up Vercel Blob integration

### Week 3
- [ ] Unit tests for all endpoints
- [ ] Integration tests
- [ ] Performance testing
- [ ] Load testing
- [ ] Security audit

## Troubleshooting

### MongoDB Connection Error
- Check `.env` file has correct `MONGODB_URI`
- Verify MongoDB Atlas cluster is active
- Check IP whitelist allows your machine

### Port Already in Use
```bash
# Kill process on port 3001
kill -9 $(lsof -t -i:3001)
```

### npm Install Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Commands

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint
```

## Technologies Used

- **Runtime:** Node.js 18+ LTS
- **Framework:** Express.js 4.18
- **Database:** MongoDB with Mongoose 7+
- **Security:** helmet, cors, bcryptjs, jsonwebtoken
- **Utilities:** dotenv, compression, joi
- **Testing:** Jest, Supertest

## Links

- MongoDB: https://www.mongodb.com/
- Express Docs: https://expressjs.com/
- Mongoose Docs: https://mongoosejs.com/
- Node.js Docs: https://nodejs.org/

---

**Backend Phase 1 Status:** ✅ Complete - Ready for npm install
