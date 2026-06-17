# FEATURE MAP
## X Suite V6 - Complete Workflow Documentation

**Analysis Date:** June 18, 2026  
**Purpose:** Document every user workflow, input, calculation, and output

---

## WORKFLOW 1: FOR SALE - Calculate Buyer & Seller Costs

### Entry Point
- **User Action:** Click "For Sale" tile on home dashboard
- **Navigation:** Home → Sale Form
- **Header Updates:** "PropCRM Sales Calculator" | "Sharjah Property — Secondary Market"
- **Form Visibility:** All input fields shown, organized in cards

### User Flow: Default Values

#### Card 1: Property Prices
```
User sees:
  - Original Buying Price (AED): [913000]
  - New Resale Price (AED): [1100000]
  - Property Status toggle: [Off-plan ✓] [Ready]

User can:
  - Change original price
  - Change resale price
  - Toggle property status
```

#### Card 2: Payments Paid So Far (appears only if Off-plan selected)
```
User sees:
  - Amount Paid to Developer: [%▼] [25] 
    Note: "25% of original purchase price"
  - Remaining Developer Balance (AED): [684750] (auto-calculated)

User can:
  - Toggle between % and AED
  - Enter amount paid
  - Balance auto-updates: Remaining = Original - Paid
```

#### Card 3: Land Department Fees (SRERD)
```
User sees:
  - Buyer Share (%): [2] Note: Standard split: 2%
  - Seller Share (%): [2] Note: Standard split: 2%
  - Resale Transfer Fee (%): [1] Note: Standard resale: 1%

Info tip: "Government fees are calculated based on the new Resale Price."

User can:
  - Adjust percentage splits
  - Calculations auto-update
```

#### Card 4: Developer & Paperwork Fees
```
User sees:
  - Developer NOC Fee (AED): [5250] Note: Paid by Seller
  - Sale Purchase Agreement ARADA (AED): [1250] Note: Paid by Buyer
  - Title Deed / Reg Fee (AED): [520] Note: Paid by Buyer

User can:
  - Change any fee amounts
```

#### Card 5: Agent Commission (+ 5% UAE VAT)
```
User sees:
  - Buyer Agent Commission: [%▼] [2] Note: 5% VAT added on top
  - Seller Agent Commission: [%▼] [2] Note: 5% VAT added on top

User can:
  - Toggle each between % and AED
  - Enter commission rates
  - Calculations include VAT automatically
```

#### Card 6: Utility / Handover Deposits
```
User sees:
  - Toggle: [Include utility setup/meter fees?]
    [Yes ✓] [No]

If Yes:
  User sees grid of utilities:
    ┌─────────────────────┬──────────────┐
    │ Water Meter (AED)   │ [0]          │
    │ [Buyer ✓] [Seller]  │              │
    ├─────────────────────┼──────────────┤
    │ Gas Meter (AED)     │ [0]          │
    │ [Buyer ✓] [Seller]  │              │
    ├─────────────────────┼──────────────┤
    │ Electric Meter      │ [0]          │
    │ [Buyer ✓] [Seller]  │              │
    ├─────────────────────┼──────────────┤
    │ Fire Alarm (AED)    │ [0]          │
    │ [Buyer ✓] [Seller]  │              │
    └─────────────────────┴──────────────┘

User can:
  - Enter amount for each utility
  - Toggle payer (buyer or seller)
  - Multiple utilities assigned to same payer accumulate
```

### User Action: Calculate

```
User clicks button: [Calculate & Save Now]
  
Validations applied:
  - No null/undefined values (defaults to 0 if empty)
  - All calculations proceed
  
Calculations executed:
  1. Developer balance (if off-plan)
  2. All buyer costs aggregated
  3. All seller costs aggregated
  4. Net profit/loss calculated
  5. Appreciation metrics computed
  6. Visual charts generated
  7. Summary narrative created
  
Form sections hidden
Results section displayed with 3 tabs
```

### Results Section: TAB 1 - Buyer Costs

#### Metrics Box
```
┌─────────────────────────────────────┐
│ Total Investment Required           │
│ AED [calculated total]              │
│ Purchase price plus all closing fees │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Frictional Fee Overhead             │
│ [X.X]%                              │
│ Total fees above buying price        │
└─────────────────────────────────────┘
```

#### Breakdown Table
```
Property Purchase Overview
  Agreed Real Estate Transaction Value: AED [resale price]

Property Payments Split
  Cash Paid to Seller: AED [resale price - dev balance]
  Remaining Balance Owed to Developer: AED [dev balance]

Government & Admin Fees
  Sharjah Land Department Fee (2%): AED [calc]
  Title Deed / Registration Charge: AED [titleDeed]
  Sale Purchase Agreement ARADA: AED [spa]

Utility Handover Fees
  Utility Deposits (Buyer Share): AED [buyer utilities]  [hidden if 0]

Real Estate Agent
  Agency Commission (incl. 5% VAT): AED [calc]

Total Buyer Cost: AED [total]  [highlighted in red]
```

### Results Section: TAB 2 - Seller Profits

#### Banner Box (Changes Color)
```
If Net Profit ≥ 0:
  ┌──────────────────────────────────┐
  │ Net Take-Home Profit             │ [green background]
  │ AED [net profit]                 │
  └──────────────────────────────────┘

If Net Profit < 0:
  ┌──────────────────────────────────┐
  │ Net Loss After Fees              │ [red background]
  │ AED [abs(net loss)]              │
  └──────────────────────────────────┘
```

#### Metrics Boxes
```
┌──────────────────────┐  ┌──────────────────────┐
│ Gross Price Increase │  │ Total Selling Fees   │
│ AED [appreciation]   │  │ AED [total costs]    │
└──────────────────────┘  └──────────────────────┘
```

#### Breakdown Table
```
Contract Deal Valuation
  Agreed Real Estate Transaction Value: AED [resale]

Property Appreciation
  Gross Value Gain: AED [resale - original]  [blue text]

Selling Expenses
  Sharjah Land Dept. Base Fee (2%): – AED [calc]  [red text]
  Sharjah Resale Admin Fee (1%): – AED [calc]  [red text]
  Developer NOC Fee: – AED [noc]  [red text]
  Utility Expenses (Seller Share): – AED [seller util]  [red text] [hidden if 0]

Real Estate Agent
  Agency Commission (incl. 5% VAT): – AED [calc]  [red text]

Net Profit After Fees: AED [net]  [total row, colored green if profit]
Total Cost Drag Summary: – AED [total costs]  [smaller text below]
```

### Results Section: TAB 3 - Deal Snapshot

#### Visual Progress Charts
```
Three horizontal bar charts:

1. Initial Buying Price
   ┌───────────────────────────────────────┐
   │ AED 913000                     [bar] ◼︎│
   └───────────────────────────────────────┘

2. New Selling Price
   ┌───────────────────────────────────────┐
   │ AED 1100000                    [bar] ◼︎│
   └───────────────────────────────────────┘

3. Total Capital Required
   ┌───────────────────────────────────────┐
   │ AED [total buyer]              [bar] ◼︎│
   └───────────────────────────────────────┘
```

#### Consolidated Metrics Table
```
Agreed Resale Transaction Price: AED [resale]
Historical Original Purchase Price: AED [original]
Gross Asset Capital Appreciation: [X.X]%  [green]
Unleveraged Return Yield on Cost: [X.X]%  [green]

Net Position Disparities
  Total Buyer All-In Capital Injection: AED [buyer total]  [blue]
  Total Seller Liquid Capital Payout: AED [seller net]  [green]

Friction Capital Absorption
  Combined Transfer & Brokerage Friction Costs: AED [friction]
  Friction Ratio Against Asset Value: [X.X]%  [red]
```

#### Summary Narrative
```
Auto-generated text like:
"The property was originally bought for AED 913,000 and resold for AED 1,100,000, 
giving a total gross price increase of AED 187,000. After subtracting all closing 
costs, including Sharjah Land Department fees, real estate agent commissions, and 
NOC administrative outlays, the seller retains AED [X]. The buyer required an 
all-inclusive equity deployment of AED [X]..."
```

### User Actions: From Results
```
Option 1: Click [Print Report] button
  → Browser print dialog opens
  → Currently visible tab prints
  → User saves as PDF or prints to printer

Option 2: Switch tabs
  → [Buyer Costs] [Seller Profits] [Deal Snapshot]
  → View different analysis angles
  → Can print any tab separately

Option 3: Click [← Back to Dashboard]
  → Navigate back to home
  → All form data cleared (unless editing)
  → currentEditId = null
```

### Save/Edit/Update Workflow
```
First time calculation:
  Button text: "Calculate & Save Now"
  ↓ Click
  Record committed to localStorage
  ↓ Results displayed

To edit existing record:
  User goes to Records Directory
  Clicks "Edit" button on record
  ↓
  currentEditId set to record.id
  Form fields populated with old values
  Button text changes to: "Update & Save Record"
  ↓ User modifies values
  ↓ Click button
  commitRecord() finds currentEditId
  Updates existing record (not creating new)
  currentEditId = null
```

---

## WORKFLOW 2: FOR RENT - Calculate Tenant Move-in Costs

### Entry Point
- **User Action:** Click "For Rent" tile on home dashboard
- **Navigation:** Home → Rent Form
- **Header Updates:** "PropCRM Rental Engine" | "Sharjah Residential & Commercial Leasing"
- **Form Visibility:** All input fields shown, organized in cards

### User Flow: Default Values

#### Card 1: Rental Value Parameters
```
User sees grid:
  - Annual Contract Rent (AED): [65000]
  - Number of Cheques: [4] (min: 1, max: 12)
  - Contract Start Date: [today's date] (date picker)

User can:
  - Enter annual rent
  - Change number of cheques (affects cheque schedule)
  - Select contract start date (affects cheque dates)
```

#### Card 2: Deposits & Regulations
```
User sees:
  - SEWA Connection Deposit (AED): [2000]
  - Municipality Attestation Fee: [4% of Annual Rent] (disabled, display only)

Toggle:
  - Property Furnishing Class:
    [Unfurnished (5%) ✓] [Furnished (10%)]

User can:
  - Enter SEWA deposit amount
  - Toggle furnishing type (affects security deposit %)
```

#### Card 3: Brokerage Commissions
```
User sees:
  - Agency Commission Base: [%▼] [5]
    Note: "5% of Annual Contract Rent + 5% UAE VAT"

User can:
  - Toggle between % and AED
  - Enter commission rate/amount
  - VAT (5%) applied automatically
```

### User Action: Calculate

```
User clicks button: [Calculate & Save Now]
  
Calculations:
  1. Municipality attestation fee = Annual Rent * 4%
  2. Security deposit % = 5% (unfurnished) or 10% (furnished)
  3. Security deposit AED = Annual Rent * Security %
  4. Single cheque amount = Annual Rent / Number of Cheques
  5. Commission base calculated (% or fixed amount)
  6. Commission with VAT = Commission * 1.05
  7. Total immediate cash = Cheque 1 + Attestation + SEWA + Security + Commission
  8. Yearly total = Annual Rent + Attestation + SEWA + Security + Commission
  9. Cheque schedule generated with dates
  
Form hidden
Results section displayed
```

### Results Section: Rent Report

#### Metrics Boxes
```
┌─────────────────────────┐  ┌──────────────────────┐
│ Immediate Move-In Cash  │  │ Total Annual Cost    │
│ AED [immediate]         │  │ AED [yearly total]   │
│ 1st Cheque + deposits   │  │ Contract rent plus   │
└─────────────────────────┘  └──────────────────────┘
```

#### Upfront Cash Outflow Table
```
Agreed Lease Terms
  Annual Contract Rent Value: AED [rent] [highlighted blue]

Primary Base Rent
  First Initial Cheque Amount (Due on [date]): AED [single cheque]

Municipal & Official Deposits
  Sharjah Municipality Attestation Fee (4%): AED [calc]
  SEWA Security Deposit (Refundable): AED [sewa]
  Refundable Security Deposit (5%): AED [deposit]

Agency Commission
  Real Estate Commission (incl. 5% VAT): AED [comm]

Total Immediate Outflow: AED [total]  [red highlighted]
```

#### Post-Dated Cheques Schedule
```
If 1 cheque only:
  "Single upfront standard cheque configuration. 
   No upcoming post-dated distributions."

If multiple cheques (e.g., 4):
  Future Post-Dated Cheques Timeline (3 Remaining)
  
  Cheque #2 (Due on [date]): AED [amount]
  Cheque #3 (Due on [date]): AED [amount]
  Cheque #4 (Due on [date]): AED [amount]
  
  Dates calculated as:
    Date = Start Date + (cheque_number - 1) * (12 months / total_cheques)
```

### User Actions: From Results
```
Option 1: Click [Print Report] button
  → Browser print dialog
  → Rent report prints with cheque schedule
  → User saves as PDF

Option 2: Click [← Back to Dashboard]
  → Navigate home
  → Form cleared
```

### Save Workflow
```
On "Calculate & Save Now":
  - Data committed to localStorage
  - Record title: "Rent: AED 65000 (4 Chqs)"
  - All form fields stored in dataset
  - Timestamp recorded
```

---

## WORKFLOW 3: PROPERTY DETAILS - Create Fact-Sheet

### Entry Point
- **User Action:** Click "Property Details" tile
- **Navigation:** Home → Property Form
- **Header Updates:** "Property Fact-Sheet Profile" | "Sharjah Layout & Performance Spec Record"

### User Flow: Default Values

#### Card 1: Identity, Layout Type & Location
```
User sees:
  - Building Name: [Robinia]
  - Unit No.: [131]
  - Level: [1]
  - View: [Community]

Toggle:
  - Property Layout Archetype:
    [Apartment] [Villa / Townhouse / Land ✓]

User can:
  - Enter property identification
  - Toggle layout type (affects which fields shown)
```

#### Card 2: Configuration Dimensions
```
User sees:
  - Type Designation: [C2]
  - No. of Bedrooms: [3]
  - No. of Bathrooms: [4]
  - No. of Living Rooms: [1]
  - Balcony: [Yes]
  - Parking Allocations: [2]

User can:
  - Enter all configuration details
```

#### Card 3: Area Sizing & Financial Metrics
```
User sees (conditional):
  If Villa:
    - Plot Area (SQ FT): [1816]  ← input triggers calcPricePerSqFt()
  
  Always shows:
    - Saleable Area (SQ FT): [2591]  ← input triggers calcPricePerSqFt()
    - Selling Price (DHS): [2450000]  ← input triggers calcPricePerSqFt()
    - Price / SQ FT: [946]  ← auto-calculated, read-only display

User can:
  - Enter plot/saleable area
  - Enter selling price
  - Price per sq ft auto-calculates: Price / SQ FT Area
```

#### Card 4: Status Parameters
```
User sees:
  - Occupancy Status: [Rented till November 26]
  - Paid by Owner Status: [Fully paid]
  - Outstanding Left: [Nill]
  - Expected Rent Value: [140000]  ← input triggers calcReturnPct()
  - Return Metric (%): [5.7]  ← auto-calculated

Toggle:
  - Handover Status: [Yes ✓] [No]

User can:
  - Enter all status/financial fields
  - Expected rent auto-updates return %
  - Return % = (Expected Rent / Selling Price) * 100
```

### User Action: Generate Profile

```
User clicks button: [Generate Profile & Save]

Data Collection:
  - All form fields extracted
  - Archetype and handover status captured
  - Return % calculated if needed

Display:
  - Property fact-sheet table generated
  - All data populated
  - Plot area field conditionally hidden (apartments)
  - ROI highlighted
  - Form hidden
  - Results displayed
```

### Results Section: Property Fact-Sheet

#### Professional Table Display
```
┌────────────────────────────────┬─────────────────────┐
│ Building Name                  │ Robinia             │
├────────────────────────────────┼─────────────────────┤
│ Unit No.                       │ 131                 │
├────────────────────────────────┼─────────────────────┤
│ Level                          │ 1                   │
├────────────────────────────────┼─────────────────────┤
│ View                           │ Community           │
├────────────────────────────────┼─────────────────────┤
│ Type                           │ C2                  │
├────────────────────────────────┼─────────────────────┤
│ No Of Bedrooms                 │ 3                   │
├────────────────────────────────┼─────────────────────┤
│ No Of Bathrooms                │ 4                   │
├────────────────────────────────┼─────────────────────┤
│ No Of Living Rooms             │ 1                   │
├────────────────────────────────┼─────────────────────┤
│ Balcony Included               │ Yes                 │
├────────────────────────────────┼─────────────────────┤
│ Parking Slots                  │ 2                   │
├────────────────────────────────┼─────────────────────┤
│ [Plot Area Size] *             │ 1816 SQ FT          │ * hidden for apartment
├────────────────────────────────┼─────────────────────┤
│ Saleable Area Size             │ 2591 SQ FT          │
├────────────────────────────────┼─────────────────────┤
│ Market Price Evaluation        │ AED 2,450,000       │ [red, large]
├────────────────────────────────┼─────────────────────┤
│ Price Per SQ FT Metrics        │ AED 946 / SQ FT     │
├────────────────────────────────┼─────────────────────┤
│ Current Occupancy Status       │ Rented till Nov 26  │
├────────────────────────────────┼─────────────────────┤
│ Paid Equity to Developer       │ Fully paid          │
├────────────────────────────────┼─────────────────────┤
│ Outstanding Developer Liability│ Nill                │
├────────────────────────────────┼─────────────────────┤
│ Handover Completed Status      │ Yes                 │
├────────────────────────────────┼─────────────────────┤
│ Expected Annual Contract Value │ AED 140,000         │
├────────────────────────────────┼─────────────────────┤
│ Projected Capital Return %     │ 5.7% Gross ROI      │ [green, bold]
└────────────────────────────────┴─────────────────────┘
```

### User Actions: From Results
```
Option 1: Click [Print Report] button
  → Browser print
  → Professional fact-sheet prints
  → Suitable for client distribution

Option 2: Click [← Back to Dashboard]
  → Navigate home
```

### Save Workflow
```
On "Generate Profile & Save":
  - Dataset stored to localStorage
  - Record title: "Prop: Robinia (Unit 131)"
  - All form data persisted
  - Timestamp recorded
```

---

## WORKFLOW 4: SAVED RECORDS - Manage Calculations

### Entry Point
- **User Action:** Click "Saved Records Directory" tile
- **Navigation:** Home → Records Directory
- **Header Updates:** "PropCRM Saved Directory" | "Access and Manage Saved Transaction Files"

### Initial State: Records List

#### Empty State (No Records)
```
User sees:
  ┌─────────────────────────────────────┐
  │ No transaction calculations found   │
  │ in local storage. Create one to     │
  │ populate your directory!            │
  └─────────────────────────────────────┘
```

#### Populated State (Records Present)
```
For each saved record:
  ┌──────────────────────────────────────────────────┐
  │ Sale: AED 1,100,000                              │
  │ 18/06/2026, 2:50 AM • Click to open statement    │
  │                                                   │
  │ [Edit] [Delete]                                  │
  └──────────────────────────────────────────────────┘
  
  ┌──────────────────────────────────────────────────┐
  │ Rent: AED 65,000 (4 Chqs)                        │
  │ 18/06/2026, 2:45 AM • Click to open statement    │
  │                                                   │
  │ [Edit] [Delete]                                  │
  └──────────────────────────────────────────────────┘
```

### User Action: View Record

```
User clicks on record title or "Click to view" area
  ↓
isViewingFromHistory = true
populateXxxFields() called
calculateXxx(false) executed (no save)
Results displayed
Navigation elements hidden (disorienting UX)
```

### User Action: Edit Record

```
User clicks [Edit] button
  ↓
currentEditId = record.id
populateXxxFields() fills form with old values
routeTo(record.type) displays form
Button text: "Update & Save Record"
  ↓
User modifies any fields
  ↓
Clicks save button
  ↓
commitRecord() detects currentEditId
Updates existing record instead of creating new
Timestamp updated to current time
currentEditId = null
Results displayed
```

### User Action: Delete Record

```
User clicks [Delete] button
  ↓
Confirmation dialog appears:
  "Are you sure you want to delete this calculation record?
   "Sale: AED 1,100,000""
  [OK] [Cancel]
  ↓
If OK:
  Record filtered out from array
  Remaining records written to localStorage
  UI refreshed
  Record no longer appears in list
  
If Cancel:
  Dialog closes
  Record remains
```

### User Action: Back to Dashboard

```
User clicks [← Go Back]
  ↓
routeTo('home')
Records section hidden
All records still in localStorage
Home dashboard displayed
```

---

## DATA STORAGE PATTERNS

### Record Structure in localStorage
```javascript
// Key: 'hsbc_propcrm_records'
// Value: JSON array

[
  {
    id: "rec_1708954234567",
    type: "sale",
    title: "Sale: AED 1,100,000",
    timestamp: "18/06/2026, 2:50 AM",
    dataset: {
      origPrice: 913000,
      sellPrice: 1100000,
      propStatus: "offplan",
      paidType: "pct",
      paidVal: 25,
      devBal: 684750,
      // ... all other sale fields
    }
  },
  {
    id: "rec_1708954123456",
    type: "rent",
    title: "Rent: AED 65,000 (4 Chqs)",
    timestamp: "18/06/2026, 2:45 AM",
    dataset: {
      rentAnnual: 65000,
      rentCheques: 4,
      rentSewa: 2000,
      // ... all other rent fields
    }
  },
  // ... more records
]
```

### Default Input Values
```javascript
Sale Form:
  - origPrice: 913000
  - sellPrice: 1100000
  - propStatus: 'offplan'
  - paidType: 'pct', paidVal: 25
  - dldPct: 2, sldBasePct: 2, sldSellPct: 1
  - nocFee: 5250, spaFee: 1250, titleDeed: 520
  - bcType: 'pct', bcVal: 2
  - scType: 'pct', scVal: 2
  - hasUtil: true
  - All utilities default to 0, payer defaults to 'buyer'

Rent Form:
  - rentAnnual: 65000
  - rentCheques: 4
  - rentSewa: 2000
  - rentFurnished: 'unfurnished'
  - rcType: 'pct', rcVal: 5
  - rentStartDate: today

Property Form:
  - pBuilding: 'Robinia'
  - pUnit: '131', pLevel: '1', pView: 'Community'
  - propArchetype: 'Villa'
  - pType: 'C2'
  - pBeds: 3, pBaths: 4, pLiving: 1
  - pBalcony: 'Yes', pParking: '2'
  - pPlotArea: 1816, pSaleArea: 2591
  - pPrice: 2450000, pPriceSqft: 946
  - pStatus: 'Rented till November 26'
  - pPaidOwner: 'Fully paid', pLeft: 'Nill'
  - pExpectRent: 140000, pReturn: 5.7
  - propHandoverVal: 'Yes'
```

---

## NAVIGATION & STATE FLOW DIAGRAM

```
┌─────────────────────────────────┐
│    Home Dashboard               │
│  [For Rent] [For Sale]         │
│  [Property Details]             │
│  [Saved Records Directory]      │
└────────┬────────────────────────┘
         │
         ├─→ ┌─────────────────┐
         │   │ For Rent Form   │ ──→ ┌─────────────┐
         │   └─────────────────┘     │Rent Results │ ──→ [Print] [Back]
         │          │                └─────────────┘
         │          └─→ [Calculate & Save]
         │
         ├─→ ┌─────────────────┐
         │   │ For Sale Form   │ ──→ ┌──────────────────┐
         │   └─────────────────┘     │Sale Results      │
         │          │                │[Buyer][Seller]   │
         │          └─→ [Calculate & Save]
         │                           │[Summary]        │
         │                           └──────────────────┘
         │                                   ↓
         │                            [Print] [Back]
         │
         ├─→ ┌──────────────────┐
         │   │ Property Form    │ ──→ ┌─────────────────┐
         │   └──────────────────┘     │Property Results │ ──→ [Print] [Back]
         │          │                 └─────────────────┘
         │          └─→ [Generate Profile & Save]
         │
         └─→ ┌────────────────────────┐
             │ Records Directory      │
             │ [Edit] [Delete] [View] │
             └───────┬────────────────┘
                     │
                     ├─→ [Edit] ──→ [Form - prefilled]
                     │              └─→ [Update & Save]
                     │
                     ├─→ [Delete] ──→ [Confirm dialog]
                     │
                     └─→ [View] ──→ [Results - read-only]
```

---

## USER ACTIONS SUMMARY TABLE

| Workflow | Input Section | Action | Trigger | Validation | Output |
|----------|---------------|--------|---------|-----------|--------|
| Sale | Property Prices | Enter prices | Text input, oninput | None | Auto-calc dev balance |
| Sale | Dev Balance | Auto-update | oninput on paid amount | None | Remaining = Orig - Paid |
| Sale | Fees | Enter amounts | Text input | None | Calculations proceed |
| Sale | Status Toggle | Select off-plan/ready | onclick | None | Show/hide dev section |
| Sale | Utility Toggle | On/Off | onclick | None | Show/hide utility grid |
| Sale | Payer Toggle | Assign buyer/seller | onclick | None | Filter costs by payer |
| Sale | Commission Type | Toggle %/AED | onchange | None | Different calculation |
| Sale | Calculate | Full calculation | onclick | None | Display 3-tab results |
| Sale | Print | Browser print | onclick | None | PDF output |
| Sale | Back | Navigate home | onclick | None | Clear form |
| Rent | Rent Amount | Enter annual | Text input | None | Updates instant |
| Rent | Cheques | Select 1-12 | Number input | Min=1, Max=12 | Cheque schedule updates |
| Rent | Start Date | Date picker | Date input | None | Cheque dates calculated |
| Rent | Furnishing | Toggle | onclick | None | Security % changes (5/10%) |
| Rent | Commission Type | Toggle %/AED | onchange | None | Different calculation |
| Rent | Calculate | Full calculation | onclick | None | Display results + table |
| Rent | Print | Browser print | onclick | None | PDF output |
| Property | Archetype | Toggle | onclick | None | Show/hide plot area field |
| Property | Area/Price | Enter values | Text input, oninput | None | Auto-calc price/sqft |
| Property | Expected Rent | Enter amount | Text input, oninput | None | Auto-calc return % |
| Property | Handover | Toggle | onclick | None | Update display |
| Property | Generate | Full generation | onclick | None | Display fact-sheet |
| Property | Print | Browser print | onclick | None | PDF output |
| Records | Directory | List | Page load | None | Show all records |
| Records | View | Click title | onclick | None | Load + display results |
| Records | Edit | Click Edit | onclick | None | Form with old values |
| Records | Delete | Click Delete | onclick | Confirm | Remove from storage |
| Records | Back | Navigate | onclick | None | Return to home |

---

## NEXT STEPS FOR PHASE 3

Once confirmed this feature map is complete and accurate, proceed to:
- **UX REVIEW** - Identify navigation gaps, mobile issues, workflow improvements
- **WHATSAPP INTEGRATION DESIGN** - Plan PDF sharing flow
- **STORAGE MIGRATION MAP** - Design API endpoints

---

**Feature Map Created:** June 18, 2026
**Status:** Ready for review and Phase 3
