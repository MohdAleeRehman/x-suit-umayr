# DEVELOPER QUICK REFERENCE
## X Suite Transformation - Technical Specifications

**Date:** June 18, 2026  
**Purpose:** Quick reference for backend and frontend developers  
**See Also:** All PHASE documents for detailed specifications

---

## PROJECT OVERVIEW

**Current State:** Single-file 1,808-line HTML application with localStorage  
**Target State:** Modern Next.js + Node.js + MongoDB deployment on Vercel  
**Timeline:** 12-16 weeks  
**Key Constraint:** Zero breaking changes to calculations

---

## BACKEND DEVELOPER CHECKLIST

### Environment Setup
```bash
# Node.js version
node --version  # Should be 18+ LTS

# Install dependencies
npm init -y
npm install express mongoose dotenv cors jsonwebtoken bcryptjs
npm install --save-dev nodemon jest supertest

# MongoDB Connection String
mongodb+srv://malirehman969_db_user:A5LnfPaoKJuPpMLl@x-suite.gs4oyek.mongodb.net/?appName=X-Suite
```

### API Endpoints to Implement

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | /api/records | List all user records | JWT |
| GET | /api/records/:id | Get single record | JWT |
| POST | /api/records | Create new record | JWT |
| PUT | /api/records/:id | Update record | JWT |
| DELETE | /api/records/:id | Delete record | JWT |
| POST | /api/generate-pdf | Generate shareable PDF | JWT |
| POST | /api/auth/login | User login (future) | None |
| POST | /api/auth/register | User registration (future) | None |

### MongoDB Collections

**Records Collection**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,              // Reference to User
  type: String,                  // "sale" | "rent" | "property"
  title: String,                 // Auto-generated (e.g., "Sale: AED 1,100,000")
  dataset: Object,               // Flexible - contains all calculation data
  tags: [String],                // For future filtering
  archived: Boolean,             // Default: false
  createdAt: Date,               // Default: now
  updatedAt: Date                // Default: now
}
```

### Sample Request/Response

**Create Record:**
```
POST /api/records
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

{
  "type": "sale",
  "dataset": {
    "origPrice": 913000,
    "sellPrice": 1100000,
    "propStatus": "offplan",
    "paidType": "pct",
    "paidVal": 25,
    "devBal": 684750,
    // ... all other calculation fields
  }
}

Response (201):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439001",
    "type": "sale",
    "title": "Sale: AED 1,100,000",
    "dataset": { /* same as request */ },
    "createdAt": "2026-06-18T02:50:00Z",
    "updatedAt": "2026-06-18T02:50:00Z"
  }
}
```

### Critical Validation Rules

**For Sale Records:**
- origPrice: required, number, > 0, < 100,000,000
- sellPrice: required, number, > 0, < 100,000,000
- propStatus: required, enum: ["offplan", "Ready"]
- All fee fields: number, >= 0

**For Rent Records:**
- rentAnnual: required, number, > 0
- rentCheques: required, number, 1-12
- rentFurnished: enum: ["furnished", "unfurnished"]

**For Property Records:**
- pBuilding, pUnit: required, string
- pBeds, pBaths: number, >= 0
- pPrice: number, > 0

### Authentication (JWT)

```javascript
// Login flow (future)
const token = jwt.sign(
  { id: user._id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};
```

### Error Handling

```javascript
// All endpoints should return consistent error format
{
  "success": false,
  "error": "Human-readable error message",
  "code": "ERROR_CODE"  // Optional, for client debugging
}

// HTTP Status Codes
200 - OK
201 - Created
400 - Bad Request (validation error)
401 - Unauthorized (missing/invalid token)
403 - Forbidden (not allowed)
404 - Not Found
500 - Server Error
```

### Logging

```javascript
// Use Winston or Pino
logger.info(`User ${userId} created record: ${recordId}`);
logger.error(`Failed to save record: ${error.message}`);
logger.warn(`Large record size: ${size} bytes`);
```

### Testing

```bash
# Run tests
npm test

# Test should verify:
- ✓ Create record with valid data
- ✓ Reject invalid data (missing fields, wrong types)
- ✓ Update only own records
- ✓ Cannot access other user's records (403)
- ✓ Delete removes from DB
- ✓ List returns only user's records
```

---

## FRONTEND DEVELOPER CHECKLIST

### Environment Setup

```bash
# Create Next.js project
npx create-next-app@latest x-suite --typescript --tailwind

cd x-suite

# Install additional dependencies
npm install zustand react-hook-form zod html2pdf.js axios

# Create directory structure
mkdir -p src/{components/{Sale,Rent,Property,Records},hooks,services,utils}
```

### Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx          # Sticky header with back/home
│   │   ├── Footer.tsx          # Copyright footer
│   │   └── Navigation.tsx       # Breadcrumb nav
│   ├── Sale/
│   │   ├── SaleForm.tsx        # Input form
│   │   └── SaleResults.tsx     # 3-tab results display
│   ├── Rent/
│   │   ├── RentForm.tsx
│   │   └── RentResults.tsx
│   ├── Property/
│   │   ├── PropertyForm.tsx
│   │   └── PropertyResults.tsx
│   ├── Records/
│   │   ├── RecordsList.tsx     # List view
│   │   ├── RecordCard.tsx      # Individual record card
│   │   └── SearchFilter.tsx    # Search + filter
│   └── Common/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       └── Toast.tsx
├── hooks/
│   ├── useRecords.ts           # CRUD operations
│   ├── useSaleCalculation.ts   # Sale calculations
│   ├── useRentCalculation.ts   # Rent calculations
│   └── usePropertyCalculation.ts
├── services/
│   ├── api.ts                  # Fetch wrapper
│   ├── calculations/
│   │   ├── saleCalculator.ts   # All sale formulas
│   │   ├── rentCalculator.ts   # All rent formulas
│   │   └── propertyCalculator.ts
│   └── pdf.ts                  # PDF generation
├── store/
│   └── appStore.ts             # Zustand store
├── utils/
│   ├── format.ts               # Number formatting
│   └── validation.ts           # Input validation
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── sale/
│   │   └── page.tsx            # /sale route
│   ├── rent/
│   │   └── page.tsx            # /rent route
│   ├── property/
│   │   └── page.tsx            # /property route
│   ├── records/
│   │   └── page.tsx            # /records route
│   └── api/
│       └── [...].ts            # Proxy to backend
└── public/
    ├── manifest.json           # PWA manifest
    ├── icons/                  # App icons (multiple sizes)
    └── splash/                 # Splash screens
```

### Key Hooks to Implement

**useRecords.ts**
```typescript
export const useRecords = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);
  
  const fetchRecords = useCallback(async () => {
    // GET /api/records
    // Populate setRecords
  }, []);
  
  const createRecord = useCallback(async (type, dataset) => {
    // POST /api/records
    // Add to records array
  }, []);
  
  const updateRecord = useCallback(async (id, dataset) => {
    // PUT /api/records/:id
    // Update in array
  }, []);
  
  const deleteRecord = useCallback(async (id) => {
    // DELETE /api/records/:id
    // Remove from array
  }, []);
  
  return { records, loading, fetchRecords, createRecord, updateRecord, deleteRecord };
};
```

**useSaleCalculation.ts**
```typescript
export const useSaleCalculation = (inputs: SaleInputs) => {
  const [results, setResults] = useState<SaleResults | null>(null);
  
  useEffect(() => {
    const results = calculateSale(inputs);
    setResults(results);
  }, [inputs]);
  
  return results;
};
```

### Calculation Functions to Port

From the original app's JavaScript to TypeScript functions:

```typescript
// services/calculations/saleCalculator.ts

export const calculateBuyerCosts = (data: SaleData): BuyerCosts => {
  const dldFee = data.sellPrice * (data.dldPct / 100);
  const bComm = data.bcType === 'pct' 
    ? (data.sellPrice * (data.bcVal / 100) * 1.05)
    : (data.bcVal * 1.05);
  // ... more calculations
  return { dldFee, bComm, /* ... */ };
};

export const calculateSellerProfit = (data: SaleData): SellerProfit => {
  // ... seller calculations
  return { netProfit, grossGain, /* ... */ };
};
```

### API Communication

```typescript
// services/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const fetchRecords = async () => {
  const response = await fetch(`${API_BASE}/records`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  if (!response.ok) throw new Error('Failed to fetch records');
  return response.json();
};

export const createRecord = async (data: Record) => {
  const response = await fetch(`${API_BASE}/records`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Failed to create record');
  return response.json();
};
```

### PDF Generation

```typescript
// services/pdf.ts

// Option 1: Client-side instant download
export const downloadPDFClient = async (html: string, filename: string) => {
  const element = document.getElementById(html);
  const opt = {
    margin: 10,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
  };
  html2pdf().set(opt).from(element).save();
};

// Option 2: Server-side for WhatsApp sharing
export const generateShareablePDF = async (reportData: any) => {
  const response = await fetch(`${API_BASE}/generate-pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(reportData)
  });
  const data = await response.json();
  return {
    shareUrl: data.shareUrl,
    whatsappUrl: data.whatsappUrl,
    emailUrl: data.emailUrl
  };
};
```

### Form Validation

```typescript
// Using React Hook Form + Zod

const saleSchema = z.object({
  origPrice: z.number().positive('Must be positive'),
  sellPrice: z.number().positive('Must be positive'),
  propStatus: z.enum(['offplan', 'Ready']),
  dldPct: z.number().min(0).max(100),
  // ... more fields
});

export const SaleForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(saleSchema)
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('origPrice')} />
      {errors.origPrice && <span>{errors.origPrice.message}</span>}
    </form>
  );
};
```

### PWA Setup

**public/manifest.json**
```json
{
  "name": "X Suite - Real Estate Solutions",
  "short_name": "X Suite",
  "description": "Sharjah Property Transaction Calculator",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#db0011",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/screenshot1.png",
      "sizes": "540x720",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

**Layout.tsx - Add PWA meta tags**
```typescript
export const metadata: Metadata = {
  title: 'X Suite - Real Estate Solutions',
  description: 'Sharjah Property Transaction Calculator',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'X Suite'
  },
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png'
  }
};
```

### Component Example: SaleForm

```typescript
export const SaleForm: React.FC = () => {
  const { register, watch, formState: { errors } } = useForm(/* ... */);
  const results = useSaleCalculation(watch());
  
  return (
    <div>
      <h2>PropCRM Sales Calculator</h2>
      
      <Card>
        <h3>Property Prices</h3>
        <input 
          {...register('origPrice')} 
          type="number" 
          placeholder="Original Buying Price"
        />
        {errors.origPrice && <span>{errors.origPrice.message}</span>}
      </Card>
      
      {/* More form sections */}
      
      <Button onClick={handleCalculate}>Calculate & Save</Button>
      
      {results && <SaleResults data={results} />}
    </div>
  );
};
```

---

## SHARED CALCULATIONS (Backend + Frontend)

These calculations must be identical in BOTH backend (for API) and frontend (for UI):

### Sale Module
```
- Developer balance calculation
- Buyer land department fee
- Seller land department fee (base + resale)
- Agent commission with 5% VAT
- Total buyer investment
- Net seller profit
- Asset appreciation %
- Yield on cost %
- Friction costs
```

### Rent Module
```
- Municipality attestation fee (4% of annual rent)
- Security deposit (5% or 10% based on furnishing)
- Agent commission with 5% VAT
- First cheque amount (annual rent / cheques)
- Cheque schedule dates
```

### Property Module
```
- Price per square foot (price / area)
- Return on investment % (rent / price * 100)
```

**Critical:** Create shared calculation library that both backend and frontend import from:

```
shared/
├── calculations/
│   ├── saleCalculator.test.ts    # Unit tests
│   ├── saleCalculator.ts
│   ├── rentCalculator.ts
│   └── propertyCalculator.ts
└── types/
    └── calculations.ts            # Shared TypeScript types
```

---

## IMPORTANT CONSTRAINTS

### ❌ DO NOT CHANGE
- Any calculation formulas (all must produce identical results)
- Any fee percentages (must match current app defaults)
- Field names in calculation data (used for storage)
- Cheque scheduling algorithm
- ROI/yield calculations

### ✅ DO CHANGE / IMPROVE
- UI/UX (make it better!)
- Navigation (add persistent buttons)
- Mobile experience (larger touch targets)
- Form usability (collapsible sections)
- Performance (lazy loading, code splitting)
- Accessibility (WCAG AA compliance)

---

## TESTING STRATEGY

### Backend Tests (Jest + Supertest)
```
✓ CRUD operations (create, read, update, delete)
✓ Authorization (only own records)
✓ Validation (reject invalid data)
✓ Calculations (verify output matches old app)
✓ Error handling
✓ Edge cases (zero values, max values)
```

### Frontend Tests (Jest + React Testing Library)
```
✓ Form submission
✓ Calculation display
✓ CRUD operations via API
✓ Error toasts
✓ Mobile responsiveness
✓ PDF generation
```

### E2E Tests (Cypress or Playwright)
```
✓ Full workflow: Home → Form → Calculate → Save → View → Edit → Delete
✓ WhatsApp sharing flow
✓ PDF download
✓ Mobile flow
```

---

## DEPLOYMENT COMMANDS

```bash
# Backend
git clone [repo]
cd backend
npm install
npm run build
npm start
# Or with PM2: pm2 start app.js

# Frontend
git clone [repo]
cd frontend
npm install
npm run build
npm start
# Or: vercel deploy

# Environment Variables
# .env.local
NEXT_PUBLIC_API_URL=https://api.x-suite.com
JWT_SECRET=your-secret-key
MONGODB_URI=mongodb+srv://...
```

---

## DEBUGGING TIPS

### If calculations don't match old app:
1. Extract test data from old app localStorage
2. Run through both old and new calculations
3. Print intermediate values (fees, subtotals)
4. Check number precision (rounding?)
5. Add unit tests with exact test cases

### If API calls fail:
1. Check CORS headers (backend should set them)
2. Verify JWT token is valid
3. Check request/response format
4. Use browser DevTools Network tab
5. Add console.logs on backend

### If PDF looks wrong:
1. Test with both html2pdf and Puppeteer
2. Check CSS is inline or bundled
3. Remove dynamic elements before render
4. Test on multiple browsers/devices

---

## RESOURCES

- MongoDB Docs: https://docs.mongodb.com/
- Express Docs: https://expressjs.com/
- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- Zod Validation: https://zod.dev/
- React Hook Form: https://react-hook-form.com/

---

**Last Updated:** June 18, 2026  
**For Questions:** See detailed PHASE documents in project root

