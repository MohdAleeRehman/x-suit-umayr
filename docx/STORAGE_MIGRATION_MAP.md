# STORAGE MIGRATION MAP
## X Suite - From localStorage to MongoDB + Backend API

**Analysis Date:** June 18, 2026  
**Current Storage:** Browser localStorage (key: 'hsbc_propcrm_records')  
**Target Storage:** MongoDB Atlas + Node.js/Express API  
**Authentication:** JWT tokens (future-ready, not required initially)

---

## CURRENT localStorage OPERATIONS

### 1. Reading All Records
```javascript
// CURRENT (Client-side only)
function getStoredRecords() {
  let item = localStorage.getItem('hsbc_propcrm_records');
  return item ? JSON.parse(item) : [];
}

// Usage:
const records = getStoredRecords();
records.forEach(rec => { /* ... */ });
```

### 2. Writing Records
```javascript
// CURRENT (Client-side only)
function writeStoredRecords(arr) {
  localStorage.setItem('hsbc_propcrm_records', JSON.stringify(arr));
}

// Usage:
let records = getStoredRecords();
records.push(newRecord);
writeStoredRecords(records);
```

### 3. Creating Record
```javascript
// CURRENT (Called from calculateSale/Rent/Prop)
function commitRecord(type, dataset) {
  let records = getStoredRecords();
  
  if (currentEditId !== null) {
    // Update existing
    let idx = records.findIndex(r => r.id === currentEditId);
    if (idx !== -1) {
      records[idx].dataset = dataset;
      records[idx].timestamp = new Date().toLocaleString('en-AE');
    }
    currentEditId = null;
  } else {
    // Create new
    let titleString = '';
    if (type === 'sale') titleString = `Sale: AED ${Math.round(dataset.sellPrice).toLocaleString('en-AE')}`;
    // ... more title logic
    
    let newEntry = {
      id: 'rec_' + Date.now(),
      type: type,
      title: titleString,
      timestamp: new Date().toLocaleString('en-AE'),
      dataset: dataset
    };
    records.push(newEntry);
  }
  
  writeStoredRecords(records);
}
```

### 4. Reading Specific Record
```javascript
// CURRENT (Reading from array)
function viewSavedRecord(id) {
  let records = getStoredRecords();
  let rec = records.find(r => r.id === id);
  if (!rec) return;
  
  isViewingFromHistory = true;
  if (rec.type === 'sale') {
    populateSaleFields(rec.dataset);
    calculateSale(false);
  }
  // ... more logic
}
```

### 5. Updating Record
```javascript
// CURRENT (Edit flow)
function editSavedRecord(id) {
  let records = getStoredRecords();
  let rec = records.find(r => r.id === id);
  if (!rec) return;
  currentEditId = id;
  // ... populate form
}

// Then on save, commitRecord() detects currentEditId and updates
```

### 6. Deleting Record
```javascript
// CURRENT (Delete with confirmation)
function deleteSavedRecord(id) {
  let records = getStoredRecords();
  let rec = records.find(r => r.id === id);
  if (!rec) return;
  let verify = confirm(`Are you sure you want to delete this calculation record?`);
  if (verify) {
    let updated = records.filter(r => r.id !== id);
    writeStoredRecords(updated);
    loadRecordsList();
  }
}
```

### 7. Listing All Records
```javascript
// CURRENT (Load and render)
function loadRecordsList() {
  const container = document.getElementById('recordsContainer');
  container.innerHTML = '';
  let records = getStoredRecords();
  
  if (records.length === 0) {
    container.innerHTML = `<div class="no-records">...</div>`;
    return;
  }
  
  records.forEach(rec => {
    // Create card HTML
    let card = document.createElement('div');
    card.className = 'rec-card';
    card.innerHTML = `...`;
    container.appendChild(card);
  });
}
```

---

## STORAGE LAYER ARCHITECTURE

### Current Stack
```
┌─────────────────────────────┐
│     Frontend (HTML/JS)      │
│                             │
│  getStoredRecords()         │
│  writeStoredRecords()       │
│  commitRecord()             │
│  deleteSavedRecord()        │
└──────────────┬──────────────┘
               │
        localStorage
    'hsbc_propcrm_records'
    (Browser storage)
```

### Proposed Stack
```
┌──────────────────────────────────┐
│     Frontend (React/Next.js)     │
│                                  │
│  GET /api/records                │
│  POST /api/records               │
│  PUT /api/records/:id            │
│  DELETE /api/records/:id         │
│  GET /api/records/:id            │
└──────────────┬──────────────────┘
               │
               │ HTTPS + JWT Token
               │
    ┌──────────────────────┐
    │   Backend Server     │  (Node.js/Express)
    │                      │
    │   Record Controller  │
    │   Record Service     │
    │   Validation         │
    └──────────┬───────────┘
               │
    ┌──────────────────────┐
    │   MongoDB Atlas      │
    │                      │
    │   records collection │
    │   users collection   │
    └──────────────────────┘
```

---

## API ENDPOINTS MAPPING

### Endpoint 1: List All Records (Read)
```
CURRENT:
  const records = getStoredRecords();

FUTURE:
  GET /api/records
  
  Headers:
    Authorization: Bearer {JWT_TOKEN}
    Content-Type: application/json
  
  Response (200):
    {
      "success": true,
      "data": [
        {
          "_id": "507f1f77bcf86cd799439011",
          "type": "sale",
          "title": "Sale: AED 1,100,000",
          "timestamp": "2026-06-18T02:50:00Z",
          "dataset": { /* calculation data */ },
          "createdAt": "2026-06-18T02:50:00Z",
          "updatedAt": "2026-06-18T02:50:00Z"
        },
        // ... more records
      ]
    }
  
  Implementation (Backend):
    router.get('/records', authenticateToken, async (req, res) => {
      try {
        const userId = req.user.id;
        const records = await Record.find({ userId }).sort({ createdAt: -1 });
        res.json({ success: true, data: records });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });
```

### Endpoint 2: Get Single Record (Read)
```
CURRENT:
  let rec = records.find(r => r.id === id);

FUTURE:
  GET /api/records/:id
  
  Response (200):
    {
      "success": true,
      "data": {
        "_id": "507f1f77bcf86cd799439011",
        "type": "sale",
        "title": "Sale: AED 1,100,000",
        "timestamp": "2026-06-18T02:50:00Z",
        "dataset": { /* all calculation fields */ }
      }
    }
  
  Response (404):
    {
      "success": false,
      "error": "Record not found"
    }
  
  Implementation:
    router.get('/records/:id', authenticateToken, async (req, res) => {
      try {
        const record = await Record.findById(req.params.id);
        if (!record) {
          return res.status(404).json({ success: false, error: 'Record not found' });
        }
        res.json({ success: true, data: record });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });
```

### Endpoint 3: Create Record (Write)
```
CURRENT:
  function commitRecord(type, dataset) {
    let newEntry = {
      id: 'rec_' + Date.now(),
      type: type,
      title: titleString,
      timestamp: new Date().toLocaleString('en-AE'),
      dataset: dataset
    };
    records.push(newEntry);
    writeStoredRecords(records);
  }

FUTURE:
  POST /api/records
  
  Request Body:
    {
      "type": "sale",
      "dataset": {
        "origPrice": 913000,
        "sellPrice": 1100000,
        // ... all calculation fields
      }
    }
  
  Response (201):
    {
      "success": true,
      "data": {
        "_id": "507f1f77bcf86cd799439012",
        "type": "sale",
        "title": "Sale: AED 1,100,000",
        "timestamp": "2026-06-18T02:50:01Z",
        "dataset": { /* data */ },
        "createdAt": "2026-06-18T02:50:01Z"
      }
    }
  
  Implementation:
    router.post('/records', authenticateToken, async (req, res) => {
      try {
        const { type, dataset } = req.body;
        
        // Validate input
        if (!type || !dataset) {
          return res.status(400).json({ success: false, error: 'Missing required fields' });
        }
        
        // Generate title
        const title = generateRecordTitle(type, dataset);
        
        // Create record
        const record = new Record({
          userId: req.user.id,
          type,
          dataset,
          title,
          timestamp: new Date()
        });
        
        await record.save();
        res.status(201).json({ success: true, data: record });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });
```

### Endpoint 4: Update Record (Write)
```
CURRENT:
  function commitRecord(type, dataset) {
    if (currentEditId !== null) {
      let idx = records.findIndex(r => r.id === currentEditId);
      if (idx !== -1) {
        records[idx].dataset = dataset;
        records[idx].timestamp = new Date().toLocaleString('en-AE');
      }
      currentEditId = null;
    }
    writeStoredRecords(records);
  }

FUTURE:
  PUT /api/records/:id
  
  Request Body:
    {
      "dataset": {
        "origPrice": 920000,  // Changed
        "sellPrice": 1100000,
        // ... updated fields
      }
    }
  
  Response (200):
    {
      "success": true,
      "data": {
        "_id": "507f1f77bcf86cd799439011",
        "dataset": { /* updated data */ },
        "updatedAt": "2026-06-18T02:55:00Z"
      }
    }
  
  Implementation:
    router.put('/records/:id', authenticateToken, async (req, res) => {
      try {
        const { dataset } = req.body;
        
        const record = await Record.findByIdAndUpdate(
          req.params.id,
          { dataset, updatedAt: new Date() },
          { new: true, runValidators: true }
        );
        
        if (!record) {
          return res.status(404).json({ success: false, error: 'Record not found' });
        }
        
        res.json({ success: true, data: record });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });
```

### Endpoint 5: Delete Record (Delete)
```
CURRENT:
  function deleteSavedRecord(id) {
    let records = getStoredRecords();
    let updated = records.filter(r => r.id !== id);
    writeStoredRecords(updated);
    loadRecordsList();
  }

FUTURE:
  DELETE /api/records/:id
  
  Response (200):
    {
      "success": true,
      "message": "Record deleted successfully"
    }
  
  Response (404):
    {
      "success": false,
      "error": "Record not found"
    }
  
  Implementation:
    router.delete('/records/:id', authenticateToken, async (req, res) => {
      try {
        const record = await Record.findByIdAndDelete(req.params.id);
        
        if (!record) {
          return res.status(404).json({ success: false, error: 'Record not found' });
        }
        
        res.json({ success: true, message: 'Record deleted successfully' });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });
```

### Endpoint 6: Search Records (Advanced)
```
FUTURE (Not in current app, but useful):
  GET /api/records/search?type=sale&minPrice=1000000&maxPrice=2000000&q=villa
  
  Query Parameters:
    - type: sale|rent|property
    - minPrice: minimum transaction price
    - maxPrice: maximum transaction price
    - startDate: YYYY-MM-DD
    - endDate: YYYY-MM-DD
    - q: text search in title
    - limit: 10
    - offset: 0
  
  Response:
    {
      "success": true,
      "data": [ /* filtered records */ ],
      "total": 45,
      "limit": 10,
      "offset": 0
    }
```

---

## MONGODB SCHEMA

### Record Collection Schema

```javascript
// Schema Definition (Mongoose)
const recordSchema = new Schema({
  // User Reference
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  // Record Metadata
  type: {
    type: String,
    enum: ['sale', 'rent', 'property'],
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  
  // Calculation Data
  dataset: {
    type: Schema.Types.Mixed,  // Flexible for different record types
    required: true
  },
  
  // Metadata
  tags: [String],  // For future tagging/categorization
  archived: {
    type: Boolean,
    default: false
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes
recordSchema.index({ userId: 1, createdAt: -1 });  // For listing
recordSchema.index({ userId: 1, type: 1 });        // For filtering
recordSchema.index({ userId: 1, archived: 1 });    // For excluding archived
```

### Example Documents

**Sale Record:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "userId": ObjectId("507f1f77bcf86cd799439001"),
  "type": "sale",
  "title": "Sale: AED 1,100,000",
  "timestamp": ISODate("2026-06-18T02:50:00Z"),
  "dataset": {
    "origPrice": 913000,
    "sellPrice": 1100000,
    "propStatus": "offplan",
    "paidType": "pct",
    "paidVal": 25,
    "devBal": 684750,
    "dldPct": 2,
    "sldBasePct": 2,
    "sldSellPct": 1,
    "nocFee": 5250,
    "spaFee": 1250,
    "titleDeed": 520,
    "bcType": "pct",
    "bcVal": 2,
    "scType": "pct",
    "scVal": 2,
    "hasUtil": true,
    "uWater": 0,
    "uGas": 0,
    "uElec": 0,
    "uFire": 0,
    "payerMap": {
      "Water": "buyer",
      "Gas": "buyer",
      "Elec": "buyer",
      "Fire": "buyer"
    }
  },
  "tags": ["investment", "secondary"],
  "archived": false,
  "createdAt": ISODate("2026-06-18T02:50:00Z"),
  "updatedAt": ISODate("2026-06-18T02:50:00Z")
}
```

**Rent Record:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "userId": ObjectId("507f1f77bcf86cd799439001"),
  "type": "rent",
  "title": "Rent: AED 65,000 (4 Chqs)",
  "timestamp": ISODate("2026-06-18T02:45:00Z"),
  "dataset": {
    "rentAnnual": 65000,
    "rentCheques": 4,
    "rentSewa": 2000,
    "rentFurnished": "unfurnished",
    "rcType": "pct",
    "rcVal": 5,
    "rentStartDate": "2026-06-20"
  },
  "tags": ["residential"],
  "archived": false,
  "createdAt": ISODate("2026-06-18T02:45:00Z"),
  "updatedAt": ISODate("2026-06-18T02:45:00Z")
}
```

---

## FRONTEND API CLIENT

### React Hooks for API Calls

```typescript
// hooks/useRecords.ts

import { useState, useCallback } from 'react';

interface Record {
  _id: string;
  type: 'sale' | 'rent' | 'property';
  title: string;
  dataset: any;
  createdAt: string;
  updatedAt: string;
}

export const useRecords = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get all records
  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/records', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      const data = await response.json();
      if (data.success) {
        setRecords(data.data);
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Get single record
  const getRecord = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/records/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      const data = await response.json();
      return data.success ? data.data : null;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Create record
  const createRecord = useCallback(async (type: string, dataset: any) => {
    try {
      const response = await fetch('/api/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ type, dataset })
      });
      const data = await response.json();
      if (data.success) {
        setRecords([data.data, ...records]);
        return data.data;
      } else {
        setError(data.error);
        return null;
      }
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, [records]);
  
  // Update record
  const updateRecord = useCallback(async (id: string, dataset: any) => {
    try {
      const response = await fetch(`/api/records/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ dataset })
      });
      const data = await response.json();
      if (data.success) {
        setRecords(records.map(r => r._id === id ? data.data : r));
        return data.data;
      } else {
        setError(data.error);
        return null;
      }
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, [records]);
  
  // Delete record
  const deleteRecord = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/records/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      const data = await response.json();
      if (data.success) {
        setRecords(records.filter(r => r._id !== id));
        return true;
      } else {
        setError(data.error);
        return false;
      }
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [records]);
  
  return {
    records,
    loading,
    error,
    fetchRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord
  };
};

// Usage in component:
// const { records, fetchRecords, createRecord } = useRecords();
// useEffect(() => { fetchRecords(); }, []);
```

---

## DATA MIGRATION PLAN

### Step 1: Backup Current Data

```javascript
// Export all localStorage records as JSON
function exportRecords() {
  const records = getStoredRecords();
  const json = JSON.stringify(records, null, 2);
  
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `x-suite-backup-${new Date().toISOString()}.json`;
  a.click();
}
```

### Step 2: Import to MongoDB

```javascript
// Backend endpoint: POST /api/admin/import-records
const importRecords = async (jsonFile) => {
  const records = JSON.parse(jsonFile);
  
  for (const rec of records) {
    // Transform old format to new format if needed
    const newRecord = {
      userId: currentUser._id,
      type: rec.type,
      title: rec.title,
      dataset: rec.dataset,
      createdAt: new Date(rec.timestamp),
      updatedAt: new Date()
    };
    
    await Record.create(newRecord);
  }
};
```

### Step 3: Verify Migration

```
✓ Old records count = New records count
✓ Sample record data matches
✓ All calculation values preserved
✓ Timestamps accurate
✓ User can retrieve all records
```

### Step 4: Parallel Running Period

**During transition (1-2 weeks):**
- New app writes to MongoDB only
- Old app still writes to localStorage
- Before shutdown, export localStorage to MongoDB
- At cutover, migrate remaining records

---

## ERROR HANDLING

### Common Error Scenarios

```javascript
// Network Error
catch (err) {
  if (err.message.includes('Failed to fetch')) {
    showToast('Network error. Check your connection and try again.');
    // Optionally: Queue request for retry
  }
}

// Authentication Error
if (response.status === 401) {
  showToast('Session expired. Please login again.');
  redirectToLogin();
}

// Server Error
if (response.status === 500) {
  showToast('Server error. Please try again later.');
  reportError(error);
}

// Validation Error
if (response.status === 400) {
  showToast(data.error);  // Display validation message
}

// Not Found
if (response.status === 404) {
  showToast('Record not found or deleted.');
  refreshRecordsList();
}
```

---

## PERFORMANCE CONSIDERATIONS

### Caching Strategy
```
// Cache records in memory for 5 minutes
let recordsCache = null;
let recordsCacheTTL = null;

const getRecords = async () => {
  const now = Date.now();
  
  // Return from cache if fresh
  if (recordsCache && recordsCacheTTL && now - recordsCacheTTL < 5 * 60 * 1000) {
    return recordsCache;
  }
  
  // Fetch from API
  const response = await fetch('/api/records');
  const data = await response.json();
  
  // Update cache
  recordsCache = data.data;
  recordsCacheTTL = now;
  
  return recordsCache;
};
```

### Pagination
```
// For users with 1000+ records
GET /api/records?limit=20&offset=0
GET /api/records?limit=20&offset=20
GET /api/records?limit=20&offset=40

// Frontend: Implement infinite scroll or pagination UI
```

---

## SECURITY CONSIDERATIONS

### Authentication
```javascript
// JWT token stored in httpOnly cookie (not localStorage)
// This prevents XSS attacks

// Backend validates token on each request
router.use((req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});
```

### Data Validation
```javascript
// Backend validates all input data
const recordSchema = new Schema({
  dataset: {
    // Validate numbers are actually numbers
    origPrice: { type: Number, min: 0, max: 100000000 },
    sellPrice: { type: Number, min: 0, max: 100000000 },
    // ... validate all fields
  }
});
```

### Authorization
```javascript
// Ensure user can only access their own records
router.get('/records/:id', authenticateToken, async (req, res) => {
  const record = await Record.findById(req.params.id);
  
  // Check record belongs to current user
  if (record.userId.toString() !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  res.json({ success: true, data: record });
});
```

---

## TESTING STRATEGY

### Unit Tests (Backend)

```javascript
// tests/records.test.js
describe('Records API', () => {
  it('should create a new record', async () => {
    const response = await request(app)
      .post('/api/records')
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: 'sale',
        dataset: { origPrice: 913000, sellPrice: 1100000 }
      });
    
    expect(response.status).toBe(201);
    expect(response.body.data.type).toBe('sale');
  });
  
  it('should not allow updating another user\'s record', async () => {
    const response = await request(app)
      .put(`/api/records/${otherUserRecord._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ dataset: { /* data */ } });
    
    expect(response.status).toBe(403);
  });
});
```

### Integration Tests (Frontend)

```javascript
// React Testing Library
describe('Record List Component', () => {
  it('should load and display records', async () => {
    render(<RecordsList />);
    
    await waitFor(() => {
      expect(screen.getByText('Sale: AED 1,100,000')).toBeInTheDocument();
    });
  });
  
  it('should delete record on confirmation', async () => {
    render(<RecordsList />);
    
    const deleteBtn = screen.getByText('Delete');
    fireEvent.click(deleteBtn);
    
    const confirmBtn = screen.getByText('Confirm');
    fireEvent.click(confirmBtn);
    
    await waitFor(() => {
      expect(screen.queryByText('Sale: AED 1,100,000')).not.toBeInTheDocument();
    });
  });
});
```

---

## MIGRATION TIMELINE

```
Week 1: Backend Setup
  - Create MongoDB Atlas cluster
  - Set up Node.js/Express server
  - Create Record model and routes
  - Write API endpoints

Week 2: Frontend Integration
  - Create React hooks for API calls
  - Update form submit handlers
  - Update record listing
  - Error handling

Week 3: Testing & QA
  - Unit tests for backend
  - Integration tests for frontend
  - Manual testing in staging
  - Performance testing

Week 4: Migration & Launch
  - Backup all localStorage data
  - Import to MongoDB
  - Launch new app
  - Monitor for issues
```

---

## BACKWARD COMPATIBILITY

### Dual Write Strategy (During Transition)
```javascript
// While migrating, write to both localStorage and API
async function commitRecord(type, dataset) {
  try {
    // New way: API
    const result = await fetch('/api/records', {
      method: 'POST',
      body: JSON.stringify({ type, dataset })
    });
    showToast('Record saved to cloud');
  } catch (err) {
    // Fallback: localStorage (for offline users)
    const records = getStoredRecords();
    records.push({ type, dataset, /* ... */ });
    writeStoredRecords(records);
    showToast('Saved locally (offline mode)');
  }
}
```

### Read Strategy
```javascript
async function getRecords() {
  try {
    // Try API first
    const response = await fetch('/api/records');
    return await response.json();
  } catch (err) {
    // Fallback to localStorage
    return getStoredRecords();
  }
}
```

---

## MONITORING & METRICS

Track during and after migration:

```
API Performance:
  - Response time: < 200ms (p95)
  - Error rate: < 0.1%
  - Uptime: > 99.9%

User Experience:
  - Time to load records: < 1s
  - Time to save record: < 500ms
  - Successful operations: > 99%

Data:
  - Total records stored
  - Records per user (avg/max)
  - Storage used (MB)
  - Growth rate (records/day)

Business:
  - User retention (records tracked)
  - Feature usage (which modules most used)
  - User satisfaction (support tickets)
```

---

## CONCLUSION

The migration from localStorage to MongoDB provides:
✅ Cloud-based persistence
✅ Cross-device synchronization
✅ Scalability for many users
✅ Professional data security
✅ Audit trail capabilities
✅ Future authentication ready

Recommended approach: Hybrid dual-write during transition, then full API-based after validation.

---

**Storage Migration Map Complete:** June 18, 2026  
**Next Phase:** MongoDB Backend Design  
**Status:** Ready for backend implementation
