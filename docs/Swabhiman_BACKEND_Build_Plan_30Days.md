# Swabhiman Pawan Nidhi — Backend Build Plan (30 Days)
**Stack: Node.js 20 LTS + Express.js + PostgreSQL 15 + AWS**
Version 1.0 | June 22, 2026 | Confidential

---

## Quick Reference

| Item | Detail |
|------|--------|
| Runtime | Node.js 20 LTS |
| Framework | Express.js 4.x |
| Language | TypeScript 5.x |
| Primary DB | PostgreSQL 15 (AWS RDS) |
| Cache / Sessions | Redis 7 (AWS ElastiCache) |
| File Storage | AWS S3 |
| Message Queue | AWS SQS + SNS (replaces Kafka for speed) |
| Push Notifications | Firebase FCM via AWS SNS |
| API Gateway | AWS API Gateway + WAF |
| Hosting | AWS EC2 / ECS Fargate |
| Auth | JWT RS256 + bcrypt |
| OTP / SMS | AWS SNS SMS (DLT registered) |
| Email | AWS SES |
| API Style | REST JSON over HTTPS, versioned at `/api/v1/` |

---

## 30-Day Sprint Overview

| Week | Days | Focus |
|------|------|-------|
| Week 1 | Day 1–7 | Setup, DB schema, Auth APIs, Onboarding APIs |
| Week 2 | Day 8–14 | Dashboard, Accounts, Fund Transfer, Beneficiaries |
| Week 3 | Day 15–21 | FD, Loans, BBPS, UPI stub, QR, Notifications |
| Week 4 | Day 22–30 | Security Center, Profile, KYC, Nominees, Disputes, Testing, Deploy |

---

## Day-by-Day Plan

### WEEK 1 — Foundation, Auth & Onboarding (Days 1–7)

#### Day 1 — Project Setup & Infrastructure
**Tasks:**
- Init Node.js + TypeScript project
- Configure Express app with all middleware
- Set up AWS RDS PostgreSQL 15 instance
- Set up AWS ElastiCache Redis 7
- Set up AWS S3 bucket (KYC docs, statements, dispute evidence)
- Set up AWS SES (email) + SNS (SMS + push trigger)
- Configure environment files (dev / staging / prod)
- Set up Docker Compose for local dev (Postgres + Redis)
- Set up GitHub repo with branch strategy: `main` → `staging` → `develop` → `feature/*`

**Project Structure:**
```
swabhiman-api/
├── src/
│   ├── app.ts                  # Express app setup
│   ├── server.ts               # Server entry point
│   ├── config/
│   │   ├── database.ts         # PostgreSQL pool (pg / Knex)
│   │   ├── redis.ts            # Redis client (ioredis)
│   │   ├── aws.ts              # AWS SDK config (S3, SES, SNS)
│   │   └── env.ts              # Zod-validated env vars
│   ├── middleware/
│   │   ├── auth.middleware.ts  # JWT verify middleware
│   │   ├── rateLimiter.ts      # express-rate-limit + Redis store
│   │   ├── idempotency.ts      # Idempotency-Key dedup middleware
│   │   ├── requestLogger.ts    # Morgan + request_id injection
│   │   └── errorHandler.ts     # Global error handler
│   ├── modules/
│   │   ├── auth/
│   │   ├── onboarding/
│   │   ├── device/
│   │   ├── dashboard/
│   │   ├── accounts/
│   │   ├── transfer/
│   │   ├── upi/
│   │   ├── fd/
│   │   ├── loans/
│   │   ├── bbps/
│   │   ├── notifications/
│   │   ├── support/
│   │   ├── profile/
│   │   ├── security/
│   │   ├── kyc/
│   │   ├── nominees/
│   │   └── disputes/
│   ├── shared/
│   │   ├── jwt.ts              # RS256 sign/verify helpers
│   │   ├── otp.ts              # OTP generate/verify (Redis)
│   │   ├── crypto.ts           # bcrypt, PBKDF2 helpers
│   │   ├── s3.ts               # Pre-signed URL generator
│   │   ├── ses.ts              # Email sender
│   │   ├── sns.ts              # SMS + push trigger
│   │   └── pagination.ts       # Standard paginated response builder
│   ├── db/
│   │   ├── migrations/         # SQL migration files (node-pg-migrate)
│   │   └── seeds/              # Dev seed data
│   └── types/
│       ├── express.d.ts        # Extend Request with user, requestId
│       └── api.types.ts
├── .env.development
├── .env.staging
├── .env.production
├── docker-compose.yml
├── tsconfig.json
└── package.json
```

**Install dependencies:**
```bash
npm init -y
npm install express cors helmet morgan uuid
npm install jsonwebtoken bcrypt
npm install pg knex                         # PostgreSQL
npm install ioredis                         # Redis
npm install aws-sdk @aws-sdk/client-s3 @aws-sdk/client-ses @aws-sdk/client-sns
npm install express-rate-limit rate-limit-redis
npm install zod                             # Env + request validation
npm install multer                          # File uploads
npm install node-pg-migrate                 # DB migrations

npm install -D typescript ts-node nodemon @types/express @types/node
npm install -D @types/jsonwebtoken @types/bcrypt @types/pg @types/uuid
```

**Docker Compose (local dev):**
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: swabhiman_db
      POSTGRES_USER: swabhiman
      POSTGRES_PASSWORD: swabhiman_dev_pass
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:
```

**Environment config (`.env.development`):**
```
NODE_ENV=development
PORT=8080
DATABASE_URL=postgresql://swabhiman:swabhiman_dev_pass@localhost:5432/swabhiman_db
REDIS_URL=redis://localhost:6379
JWT_PRIVATE_KEY_PATH=./keys/private.pem
JWT_PUBLIC_KEY_PATH=./keys/public.pem
JWT_ACCESS_TTL=900              # 15 min in seconds
JWT_REFRESH_TTL=604800          # 7 days in seconds
AWS_REGION=ap-south-1
AWS_S3_BUCKET=swabhiman-docs-dev
AWS_SES_FROM_EMAIL=noreply@swabhimannidhi.in
FCM_SERVER_KEY=<from Firebase>
CBS_BASE_URL=http://localhost:9090  # Mock CBS stub
UPI_ENABLED=false
```

---

#### Day 2 — Database Schema (All Tables)

Run migrations in this order:

```sql
-- Migration 001: customers
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id VARCHAR(20) UNIQUE NOT NULL,
  mobile VARCHAR(15) UNIQUE NOT NULL,
  email VARCHAR(255),
  full_name VARCHAR(255) NOT NULL,
  dob DATE,
  pan_last4 VARCHAR(4),
  aadhaar_last4 VARCHAR(4),
  aadhaar_verified BOOLEAN DEFAULT FALSE,
  kyc_status VARCHAR(20) DEFAULT 'PENDING',
  segment VARCHAR(30) DEFAULT 'GENERAL',
  is_active BOOLEAN DEFAULT TRUE,
  failed_login_attempts INT DEFAULT 0,
  locked_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migration 002: accounts
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE RESTRICT,
  account_number VARCHAR(20) UNIQUE NOT NULL,
  account_type VARCHAR(20) NOT NULL,         -- SAVINGS, CURRENT
  available_balance DECIMAL(15,2) DEFAULT 0,
  ledger_balance DECIMAL(15,2) DEFAULT 0,
  is_frozen BOOLEAN DEFAULT FALSE,
  freeze_reason VARCHAR(100),
  currency VARCHAR(3) DEFAULT 'INR',
  ifsc_code VARCHAR(15),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migration 003: transactions
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  txn_reference VARCHAR(50) UNIQUE NOT NULL,
  account_id UUID REFERENCES accounts(id),
  txn_type VARCHAR(10) NOT NULL,             -- DEBIT, CREDIT
  channel VARCHAR(20) NOT NULL,             -- NEFT, RTGS, IMPS, UPI, BBPS, INTERNAL
  amount DECIMAL(15,2) NOT NULL,
  description TEXT,
  counterparty_name VARCHAR(255),
  counterparty_account VARCHAR(30),
  counterparty_ifsc VARCHAR(15),
  status VARCHAR(20) DEFAULT 'PENDING',     -- PENDING, SUCCESS, FAILED
  initiated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  idempotency_key VARCHAR(100) UNIQUE,
  request_id VARCHAR(50)
);
CREATE INDEX idx_transactions_account_id ON transactions(account_id);
CREATE INDEX idx_transactions_initiated_at ON transactions(initiated_at DESC);

-- Migration 004: beneficiaries
CREATE TABLE beneficiaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  name VARCHAR(255) NOT NULL,
  account_number VARCHAR(30) NOT NULL,
  ifsc_code VARCHAR(15) NOT NULL,
  bank_name VARCHAR(100),
  is_favourite BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'COOLING',     -- COOLING, ACTIVE
  cooling_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migration 005: fixed_deposits
CREATE TABLE fixed_deposits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  account_id UUID REFERENCES accounts(id),
  fd_number VARCHAR(20) UNIQUE NOT NULL,
  principal DECIMAL(15,2) NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL,
  tenure_months INT NOT NULL,
  maturity_date DATE NOT NULL,
  maturity_amount DECIMAL(15,2) NOT NULL,
  interest_earned DECIMAL(15,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'ACTIVE',      -- ACTIVE, MATURED, CLOSED_PREMATURE
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migration 006: loans
CREATE TABLE loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  loan_number VARCHAR(20) UNIQUE NOT NULL,
  loan_type VARCHAR(20) NOT NULL,           -- HOME, PERSONAL, VEHICLE
  principal DECIMAL(15,2) NOT NULL,
  outstanding DECIMAL(15,2) NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL,
  tenure_months INT NOT NULL,
  emi_amount DECIMAL(15,2) NOT NULL,
  next_emi_date DATE,
  status VARCHAR(20) DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migration 007: devices
CREATE TABLE devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  device_id VARCHAR(255) NOT NULL,
  device_name VARCHAR(100),
  platform VARCHAR(10),                     -- ANDROID, IOS
  os_version VARCHAR(20),
  app_version VARCHAR(20),
  device_token VARCHAR(500),
  biometric_public_key TEXT,
  fcm_token VARCHAR(500),
  last_active TIMESTAMPTZ,
  is_trusted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(customer_id, device_id)
);

-- Migration 008: onboarding_sessions
CREATE TABLE onboarding_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_id VARCHAR(50) UNIQUE NOT NULL,
  mobile VARCHAR(15) NOT NULL,
  current_step VARCHAR(50) DEFAULT 'MOBILE_VERIFY',
  pan_last4 VARCHAR(4),
  aadhaar_last4 VARCHAR(4),
  vcip_status VARCHAR(20),
  vcip_recording_ref VARCHAR(255),
  customer_id UUID REFERENCES customers(id),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '24 hours',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migration 009: nominees
CREATE TABLE nominees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  account_id UUID REFERENCES accounts(id),
  name VARCHAR(255) NOT NULL,
  relationship VARCHAR(50) NOT NULL,
  dob DATE,
  allocation_percent DECIMAL(5,2) NOT NULL,
  is_minor BOOLEAN DEFAULT FALSE,
  guardian_name VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migration 010: notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT,
  ref_id VARCHAR(100),
  deep_link VARCHAR(255),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_notifications_customer ON notifications(customer_id, created_at DESC);

-- Migration 011: support_tickets
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id VARCHAR(20) UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id),
  category VARCHAR(50),
  subject VARCHAR(255),
  description TEXT,
  status VARCHAR(20) DEFAULT 'OPEN',       -- OPEN, IN_PROGRESS, RESOLVED, CLOSED
  resolution TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migration 012: disputes
CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dispute_id VARCHAR(20) UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id),
  transaction_id UUID REFERENCES transactions(id),
  reason VARCHAR(100) NOT NULL,
  description TEXT,
  evidence_keys TEXT[],                     -- S3 object keys
  status VARCHAR(20) DEFAULT 'RAISED',
  expected_resolution_date DATE,
  idempotency_key VARCHAR(100) UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migration 013: audit_log (immutable — no UPDATE/DELETE ever)
CREATE TABLE audit_log (
  id BIGSERIAL PRIMARY KEY,
  customer_id UUID,
  device_id VARCHAR(255),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id VARCHAR(100),
  amount DECIMAL(15,2),
  status VARCHAR(20),
  request_id VARCHAR(50) NOT NULL,
  ip_address VARCHAR(45),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Revoke UPDATE and DELETE on audit_log from all roles
REVOKE UPDATE, DELETE ON audit_log FROM PUBLIC;

-- Migration 014: fd_interest_rates
CREATE TABLE fd_interest_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenure_min_months INT NOT NULL,
  tenure_max_months INT NOT NULL,
  rate DECIMAL(5,2) NOT NULL,
  senior_citizen_rate DECIMAL(5,2),
  effective_from DATE NOT NULL,
  effective_to DATE,
  is_active BOOLEAN DEFAULT TRUE
);

-- Migration 015: scheduled_transfers
CREATE TABLE scheduled_transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  beneficiary_id UUID REFERENCES beneficiaries(id),
  amount DECIMAL(15,2) NOT NULL,
  channel VARCHAR(20) NOT NULL,
  remarks TEXT,
  scheduled_date DATE NOT NULL,
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_frequency VARCHAR(20),         -- WEEKLY, MONTHLY
  status VARCHAR(20) DEFAULT 'PENDING',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

#### Day 3 — Auth Module (Part 1: Login, OTP, JWT)

**File: `src/modules/auth/auth.controller.ts`**

Implement these endpoints:

```
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
POST /api/v1/auth/verify-mpin
```

**Login logic (`POST /api/v1/auth/login`):**
```typescript
// Body: { method: 'PASSWORD' | 'OTP' | 'MPIN' | 'BIOMETRIC', ... }
// 1. Fetch customer by mobile/customer_id
// 2. Check locked_until — if locked, return 423 { locked_until }
// 3. Route to method handler
// 4. On success: generate JWT pair, reset failed_login_attempts, update last_active
// 5. On fail: increment failed_login_attempts
//    3 attempts → lock 5 min
//    6 attempts → lock 30 min
//    10 attempts → lock until support reset (locked_until = far future)
```

**JWT helpers (`src/shared/jwt.ts`):**
```typescript
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const privateKey = fs.readFileSync(process.env.JWT_PRIVATE_KEY_PATH!);
const publicKey  = fs.readFileSync(process.env.JWT_PUBLIC_KEY_PATH!);

export function signAccessToken(payload: {
  sub: string;        // customer_id
  device_id: string;
  session_id: string;
}) {
  const jti = uuidv4();
  return jwt.sign({ ...payload, jti }, privateKey, {
    algorithm: 'RS256',
    expiresIn: '15m',
  });
}

export function signRefreshToken(): string {
  return uuidv4(); // Random opaque token stored in Redis
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
}
```

**OTP helpers (`src/shared/otp.ts`):**
```typescript
// Redis keys:
// otp:{mobile}:{type}           → hashed OTP (TTL 3 min)
// otp_attempts:{mobile}:{type}  → attempt count (TTL 30 min)

export async function generateOTP(mobile: string, type: string): Promise<string> {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashed = await bcrypt.hash(otp, 10);
  await redis.set(`otp:${mobile}:${type}`, hashed, 'EX', 180); // 3 min
  await redis.set(`otp_attempts:${mobile}:${type}`, '0', 'EX', 1800);
  return otp; // Send via SNS SMS
}

export async function verifyOTP(mobile: string, type: string, otp: string): Promise<boolean> {
  const attempts = parseInt(await redis.get(`otp_attempts:${mobile}:${type}`) || '0');
  if (attempts >= 3) throw new Error('MAX_ATTEMPTS');
  const hashed = await redis.get(`otp:${mobile}:${type}`);
  if (!hashed) throw new Error('OTP_EXPIRED');
  const valid = await bcrypt.compare(otp, hashed);
  if (!valid) {
    await redis.incr(`otp_attempts:${mobile}:${type}`);
    throw new Error('INVALID_OTP');
  }
  await redis.del(`otp:${mobile}:${type}`);
  return true;
}
```

**Standard error response format (all endpoints):**
```json
{
  "error_code": "INVALID_OTP",
  "message": "The OTP entered is incorrect. 2 attempts remaining.",
  "request_id": "req_abc123",
  "details": {}
}
```

**Standard success + pagination:**
```json
{
  "data": [],
  "page": 1,
  "per_page": 20,
  "total": 150,
  "has_more": true
}
```

---

#### Day 4 — Auth Module (Part 2: Biometric, MPIN, Refresh, Lockout)

Implement:
```
POST /api/v1/auth/biometric/register
GET  /api/v1/auth/biometric/challenge
POST /api/v1/auth/biometric/verify
POST /api/v1/auth/change-mpin
POST /api/v1/auth/change-password
```

**Biometric flow:**
```typescript
// challenge stored in Redis: biometric_challenge:{device_id} → random UUID, TTL 2 min
// verify: use crypto.createVerify('RSA-SHA256') with stored publicKey
import crypto from 'crypto';

export function verifyBiometricSignature(
  publicKeyPem: string,
  challenge: string,
  signature: string
): boolean {
  const verify = crypto.createVerify('RSA-SHA256');
  verify.update(challenge);
  return verify.verify(publicKeyPem, Buffer.from(signature, 'base64'));
}
```

**Refresh token flow:**
```typescript
// Redis key: refresh_token:{token} → customer_id (TTL 7 days)
// On refresh: verify token in Redis → delete old → create new (rotation)
// Store new: refresh_token:{newToken} → customer_id
```

---

#### Day 5 — Device Registration & Onboarding (Part 1)

Implement:
```
POST /api/v1/device/register
GET  /api/v1/device/list
DELETE /api/v1/device/:deviceId

POST /api/v1/onboarding/start
POST /api/v1/onboarding/verify-mobile
POST /api/v1/onboarding/verify-pan
```

**`POST /api/v1/device/register`** — no auth required (pre-login):
```typescript
// Body: { device_id, device_name, platform, os_version, app_version, fcm_token }
// 1. Upsert into devices table (ON CONFLICT(customer_id, device_id) DO UPDATE)
// 2. Return { device_token: uuid } stored in devices.device_token
```

**Onboarding step machine:**
```typescript
// Steps in order:
// MOBILE_VERIFY → PAN_VERIFY → AADHAAR_OTP → AADHAAR_VERIFY → VIDEO_KYC → ACCOUNT_CREATED

// POST /onboarding/start
// Body: { mobile }
// 1. Check if mobile already registered → 409 if yes
// 2. Create onboarding_sessions record with ref_id = uuid
// 3. Send OTP to mobile
// 4. Return { ref_id, current_step: 'MOBILE_VERIFY' }
```

**PAN verification:**
```typescript
// POST /onboarding/verify-pan
// Body: { ref_id, pan_number }
// 1. Call NSDL/CDSL PAN API (or mock in dev)
// 2. Name match check (tolerance for OCR errors: Levenshtein distance < 3)
// 3. Store only pan_last4 in onboarding_sessions
// 4. Advance step to AADHAAR_OTP
```

---

#### Day 6 — Onboarding (Part 2: Aadhaar, V-CIP, Account Creation)

Implement:
```
POST /api/v1/onboarding/aadhaar-otp
POST /api/v1/onboarding/aadhaar-verify
POST /api/v1/onboarding/vcip-callback    (webhook from V-CIP vendor)
GET  /api/v1/onboarding/:refId/status
POST /api/v1/onboarding/create-account
GET  /api/v1/onboarding/:refId           (resume)
```

**Aadhaar rules:**
```typescript
// CRITICAL: Store ONLY { aadhaar_last4, verified: true, verified_at }
// Full Aadhaar number MUST NEVER be persisted — compliance requirement
// Store aadhaar_last4 in onboarding_sessions + customers tables only
```

**V-CIP webhook:**
```typescript
// POST /api/v1/onboarding/vcip-callback
// No auth — secured by vendor secret header (X-VCIP-Secret)
// Body: { ref_id, status: 'APPROVED' | 'REJECTED', recording_s3_ref }
// 1. Verify X-VCIP-Secret header
// 2. Update onboarding_sessions set vcip_status, vcip_recording_ref
// 3. If APPROVED: advance step to ACCOUNT_CREATED_PENDING
// 4. Publish SNS event to notify mobile app via push
```

**Account creation:**
```typescript
// POST /api/v1/onboarding/create-account
// 1. Validate session is at correct step + V-CIP approved
// 2. Generate account_number (format: SWAB + 12 digits)
// 3. Generate customer_id (CIF: format SWCIF + 8 digits)
// 4. Insert into customers + accounts tables (transaction)
// 5. Call CBS stub to sync (mock in dev)
// 6. Return { customer_id, account_number }
// 7. Write to audit_log
```

---

#### Day 7 — Auth Middleware, Rate Limiting, Error Handler

**`src/middleware/auth.middleware.ts`:**
```typescript
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error_code: 'UNAUTHORIZED' });
  try {
    const payload = verifyAccessToken(token) as JwtPayload;
    // Verify device_id matches current device header
    const deviceHeader = req.headers['x-device-id'];
    if (payload.device_id !== deviceHeader) {
      return res.status(401).json({ error_code: 'DEVICE_MISMATCH' });
    }
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error_code: 'TOKEN_EXPIRED' });
  }
};
```

**`src/middleware/idempotency.ts`:**
```typescript
// For all POST financial endpoints
// Header: Idempotency-Key: <uuid-v4>
// Redis: idempotency:{key} → cached response (TTL 24h)
// If key seen: return cached response immediately (no re-processing)
```

**Rate limiting config:**
```typescript
// Global: 100 req/min per IP
// Auth endpoints: 5 req/min per mobile
// OTP send: 3 req/10min per mobile
// Financial POSTs: 20 req/min per customer_id
```

---

### WEEK 2 — Dashboard, Accounts, Fund Transfer (Days 8–14)

#### Day 8 — Dashboard API

```
GET /api/v1/dashboard/summary
```

```typescript
// Single batched query — one round trip to DB:
// 1. Get all customer accounts with balances
// 2. Get last 5 transactions across all accounts
// 3. Get quick_actions config (from DB config table or hardcoded JSON with eligibility filter)
// 4. Get customer segment for card ordering

// Cache in Redis: dashboard:{customer_id} TTL 30s
// Cache-Aside pattern: check Redis first → on miss: query DB → store in Redis

// Response:
{
  "accounts": [{ id, account_number, account_type, available_balance, is_frozen }],
  "quick_actions": [{ id, label, icon, route, enabled }],
  "recent_transactions": [{ id, txn_type, amount, description, status, initiated_at }],
  "customer_segment": "GENERAL"
}
```

---

#### Day 9 — Accounts Module

```
GET  /api/v1/accounts
GET  /api/v1/accounts/:id
GET  /api/v1/accounts/:id/transactions
GET  /api/v1/accounts/:id/statement     (PDF streaming)
POST /api/v1/accounts/:id/statement/email
```

**Statement PDF (streaming):**
```typescript
// Use pdfkit or puppeteer to generate PDF server-side
// Password-protect PDF: DOB formatted as DDMMYYYY
// Stream response (don't buffer entire PDF in memory):
import PDFDocument from 'pdfkit';

res.setHeader('Content-Type', 'application/pdf');
res.setHeader('Content-Disposition', `attachment; filename=statement-${accountId}.pdf`);
const doc = new PDFDocument();
doc.pipe(res);
// ... add transaction rows
doc.end();
```

**Transaction pagination:**
```typescript
// Query params: ?page=1&per_page=100&from=2026-01-01&to=2026-06-22&search=
// Max date range: 12 months
// Max per_page: 100
SELECT * FROM transactions
WHERE account_id = $1
  AND initiated_at BETWEEN $2 AND $3
  AND (description ILIKE $4 OR amount::TEXT ILIKE $4)
ORDER BY initiated_at DESC
LIMIT $5 OFFSET $6;
```

---

#### Day 10 — Fund Transfer (Part 1: Limits, Beneficiaries)

```
GET    /api/v1/limits
GET    /api/v1/beneficiaries
POST   /api/v1/beneficiaries
PUT    /api/v1/beneficiaries/:id
DELETE /api/v1/beneficiaries/:id
```

**Limits endpoint:**
```typescript
// GET /api/v1/limits
// Returns per-channel daily + per-transaction limits
// Source: DB config table (can be updated without deploy)
{
  "NEFT":  { "per_txn_max": 1000000, "daily_max": 1000000 },
  "RTGS":  { "per_txn_min": 200000, "per_txn_max": 10000000 },
  "IMPS":  { "per_txn_max": 500000, "daily_max": 1000000 },
  "UPI":   { "per_txn_max": 100000, "daily_max": 100000 }
}
```

**Beneficiary cooling:**
```typescript
// POST /api/v1/beneficiaries
// 1. Insert with status = 'COOLING', cooling_expires_at = NOW() + cooling_period
// 2. cooling_period from config (confirm with Compliance — placeholder: 30 min)
// 3. Return beneficiary with cooling_expires_at so app can show countdown
// 4. Cron job (every 5 min): UPDATE beneficiaries SET status='ACTIVE'
//    WHERE status='COOLING' AND cooling_expires_at <= NOW()
```

---

#### Day 11 — Fund Transfer (Part 2: Initiate, Status, Scheduled)

```
POST /api/v1/transfer/initiate
GET  /api/v1/transfer/:txnId/status
GET  /api/v1/transfer/scheduled
POST /api/v1/transfer/scheduled
DELETE /api/v1/transfer/scheduled/:id
```

**Transfer initiation (critical path):**
```typescript
// POST /api/v1/transfer/initiate
// Header: Idempotency-Key required
// Body: { from_account_id, beneficiary_id, amount, channel, remarks, mpin_hash }

// Steps (all in DB transaction):
// 1. Idempotency check — if key seen, return cached response
// 2. Verify MPIN (bcrypt compare)
// 3. Check beneficiary status === 'ACTIVE' (not cooling)
// 4. Check available_balance >= amount
// 5. Validate against channel limits
// 6. Deduct balance (optimistic lock: WHERE available_balance >= amount)
// 7. Insert transaction record with status='PENDING'
// 8. Call CBS stub → on success: update status='SUCCESS', credit counterparty
// 9. Insert audit_log record
// 10. Publish SNS push notification trigger
// 11. Return { txn_reference, status, amount, initiated_at }

// If CBS fails: mark transaction FAILED, restore balance, return error
// Never leave balance in deducted state without transaction record
```

---

#### Day 12 — UPI Stub + QR + BBPS (Part 1)

```
POST /api/v1/upi/register
GET  /api/v1/upi/profile
POST /api/v1/upi/pay
GET  /api/v1/upi/status/:txnId
GET  /api/v1/upi/transactions

GET  /api/v1/bbps/billers
POST /api/v1/bbps/fetch-bill
```

**UPI note:** Feature-flagged (`UPI_ENABLED` env). All endpoints return `503 Feature not yet available` when flag is false. Build the full API now; wire to real PSP SDK later.

**UPI status polling (for PENDING transactions):**
```typescript
// GET /api/v1/upi/status/:txnId
// Check DB first
// If still PENDING after 30 min: update to 'DEEMED', return guidance message
// Frontend polls every 10s; backend returns cached status from Redis to avoid CBS hammering
```

---

#### Day 13 — BBPS (Part 2) + Notifications

```
POST   /api/v1/bbps/pay
GET    /api/v1/bbps/status/:txnId
GET    /api/v1/bbps/autopay
POST   /api/v1/bbps/autopay
DELETE /api/v1/bbps/autopay/:id

GET    /api/v1/notifications
PATCH  /api/v1/notifications/:id/read
PATCH  /api/v1/notifications/read-all
GET    /api/v1/notifications/preferences
PATCH  /api/v1/notifications/preferences
```

**BBPS payment flow:**
```typescript
// POST /api/v1/bbps/pay
// 1. Idempotency check
// 2. Forward to BBPS aggregator REST API
// 3. BBPS responds async via webhook → /api/v1/bbps/webhook (internal)
// 4. Fallback: poll BBPS status every 15s for up to 60s
// 5. On confirmation: insert transaction record, send push notification
```

**Push notification helper (AWS SNS → FCM):**
```typescript
// src/shared/push.ts
export async function sendPushNotification(fcmToken: string, payload: {
  type: string;
  ref_id: string;
  title: string;
  body: string;
}) {
  // Use AWS SNS to send to FCM
  // Payload MUST NOT contain balance, account_number, Aadhaar
  // Only type + ref_id + timestamp — sensitive data fetched by app on foreground
  await sns.publish({
    Message: JSON.stringify({ default: JSON.stringify(payload) }),
    MessageStructure: 'json',
    TargetArn: `arn:aws:sns:ap-south-1:ACCOUNT:endpoint/GCM/SwabhimanApp/${fcmToken}`
  }).promise();
}
```

---

#### Day 14 — Fixed Deposits

```
GET  /api/v1/fd/rates
GET  /api/v1/fd
GET  /api/v1/fd/:id
POST /api/v1/fd/create
GET  /api/v1/fd/:id/closure-preview
POST /api/v1/fd/:id/close
```

**FD creation (2FA — MPIN + OTP):**
```typescript
// POST /api/v1/fd/create
// Body: { from_account_id, amount, tenure_months, mpin_hash, otp }
// 1. Verify MPIN
// 2. Verify OTP
// 3. Calculate maturity_amount = principal * (1 + rate/100 * months/12)  [simple interest]
//    or compound interest formula depending on product rules
// 4. Deduct from account balance
// 5. Insert fixed_deposits record
// 6. CBS sync (mock in dev)
// 7. Idempotency key required
```

**FD maturity reminders (cron job):**
```typescript
// Run daily at 9 AM IST
// SELECT * FROM fixed_deposits WHERE status='ACTIVE'
//   AND maturity_date IN (CURRENT_DATE + 30, CURRENT_DATE + 7, CURRENT_DATE + 1)
// For each: publish SNS push trigger
```

---

### WEEK 3 — Loans, Security, Profile, KYC (Days 15–21)

#### Day 15 — Loans Module

```
GET  /api/v1/loans
GET  /api/v1/loans/:id
GET  /api/v1/loans/:id/schedule
POST /api/v1/loans/eligibility
POST /api/v1/loans/application/:step
GET  /api/v1/loans/application/draft
```

**Loan application (server-side draft, multi-step):**
```typescript
// Create loan_applications table:
// { id, customer_id, loan_type, current_step, draft_data JSONB, status, created_at }

// POST /api/v1/loans/application/:step
// Steps: PERSONAL_INFO → EMPLOYMENT → INCOME → DOCUMENTS → REVIEW → SUBMIT
// Each step: validate payload → merge into draft_data JSONB → save → return next_step

// GET /api/v1/loans/application/draft
// Returns most recent DRAFT application for this customer + current_step
// Frontend uses this to resume after app kill
```

**Document upload (S3 pre-signed URL):**
```typescript
// GET /api/v1/upload/presign?type=LOAN_DOC&filename=salary_slip.pdf
// Returns: { upload_url (S3 pre-signed PUT, 15 min TTL), object_key }
// App uploads directly to S3 — backend never proxies the file bytes
// App sends object_key in loan application payload
```

---

#### Day 16 — Customer Support + Profile

```
POST /api/v1/support/ticket
GET  /api/v1/support/tickets
GET  /api/v1/support/ticket/:id
WebSocket /ws/chat (STOMP over SockJS)

GET  /api/v1/profile
POST /api/v1/profile/service-request
GET  /api/v1/profile/banking-profile
```

**WebSocket chat setup (ws + @stomp/stompjs server):**
```typescript
// Use ws + @stomp/stompjs server-side, or socket.io as simpler alternative
// Subscribe: /topic/chat/{customerId}
// Publish: /app/chat/{customerId}
// Reconnect handled client-side; server does not drop messages (queue in Redis)
// Fallback: if WS unavailable → long-poll GET /api/v1/support/chat/poll
```

**Support ticket:**
```typescript
// POST /api/v1/support/ticket
// Generate ticket_id: TICK + timestamp + random 4 digits
// Return ticket_id immediately — do not wait for CRM sync
// Async: POST to CRM via SNS → SQS → background worker
```

---

#### Day 17 — Security Center

```
GET  /api/v1/security/devices
POST /api/v1/security/logout-other-devices
POST /api/v1/security/panic-logout
POST /api/v1/security/freeze
GET  /api/v1/security/sessions
GET  /api/v1/security/audit-log
```

**Panic logout (≤ 3s end-to-end):**
```typescript
// POST /api/v1/security/panic-logout
// CRITICAL: Must complete in ≤ 3 seconds

// 1. Get all active session jtis for customer_id from Redis:
//    SMEMBERS session:{customer_id}
// 2. Pipeline delete all refresh_token:{jti} keys
// 3. DELETE all device FCM tokens? No — only revoke tokens
// 4. Clear session set: DEL session:{customer_id}
// 5. Log to audit_log (async — don't block response)
// 6. Trigger SNS: send SMS + email alert to customer
// 7. Return 200 immediately after step 4

// Redis pipeline ensures atomic bulk delete
const pipeline = redis.pipeline();
jtis.forEach(jti => pipeline.del(`refresh_token:${jti}`));
pipeline.del(`session:${customerId}`);
await pipeline.exec();  // Single round-trip
```

**Account freeze:**
```typescript
// POST /api/v1/security/freeze
// Body: { target: 'ACCOUNT' | 'UPI' | 'INTERNET_BANKING', action: 'FREEZE' | 'UNFREEZE' }
// 1. Update accounts.is_frozen / devices.upi_frozen (depending on target)
// 2. Call CBS to sync freeze state
// 3. Insert audit_log record
// 4. Send SMS + email via AWS SES + SNS (mandatory per spec)
// 5. Return updated freeze state
```

---

#### Day 18 — KYC Center + Nominees

```
POST /api/v1/kyc/update-aadhaar
POST /api/v1/kyc/update-pan
POST /api/v1/kyc/vcip

GET    /api/v1/nominees
POST   /api/v1/nominees
PUT    /api/v1/nominees/:id
DELETE /api/v1/nominees/:id
```

**Nominees validation:**
```typescript
// Max 3 nominees per account
// Sum of allocation_percent must equal 100
// Validate server-side (client-side is informational only)
// Require MPIN + OTP for add/modify/delete
// Idempotency key required on POST
```

---

#### Day 19 — Dispute Management + App Settings

```
POST /api/v1/disputes
GET  /api/v1/disputes
GET  /api/v1/disputes/:id
GET  /api/v1/upload/presign

PATCH /api/v1/notifications/preferences
GET   /api/v1/settings
```

**Dispute resolution timeline (RBI TAT):**
```typescript
// POST /api/v1/disputes
// 1. Idempotency key required
// 2. Link to transaction_id (auto-populate txn details)
// 3. expected_resolution_date = NOW() + RBI_TAT (lookup by dispute reason/amount)
// 4. evidence_keys: array of S3 object keys (uploaded by app via presigned URL)
// 5. Return { dispute_id, expected_resolution_date }
// 6. Notify compliance team via SNS
```

---

#### Day 20 — CBS Mock Stubs + Third-Party Adapters

Build robust mock stubs for all external integrations so dev/QA can proceed without real CBS:

**`src/integration/cbs.stub.ts`:**
```typescript
// Mock all CBS operations:
export const cbsStub = {
  getBalance: async (accountId: string) => ({ available: 50000, ledger: 50000 }),
  debitAccount: async (accountId: string, amount: number) => ({ success: true, ref: 'CBS_' + Date.now() }),
  creditAccount: async (accountId: string, amount: number) => ({ success: true }),
  freezeAccount: async (accountId: string) => ({ success: true }),
  createFD: async (params: any) => ({ fd_number: 'FD' + Date.now() }),
  // ... all operations
};

// In production: replace with real CBS HTTP client
// Feature flag: USE_CBS_STUB=true in dev/staging
```

**`src/integration/uidai.adapter.ts`** — Aadhaar OTP (mock in dev)
**`src/integration/pan.adapter.ts`** — NSDL/CDSL PAN verify (mock in dev)
**`src/integration/bbps.adapter.ts`** — BBPS aggregator (mock in dev)
**`src/integration/vcip.adapter.ts`** — V-CIP vendor (mock webhook in dev)

---

#### Day 21 — Cron Jobs + Background Workers

**Cron jobs (use `node-cron`):**

```typescript
import cron from 'node-cron';

// Every 5 min: activate cooled-off beneficiaries
cron.schedule('*/5 * * * *', activateCooledBeneficiaries);

// Daily 9 AM IST: FD maturity reminders (D-30, D-7, D-1)
cron.schedule('0 3 30 * * *', sendFDMaturityReminders);    // 9 AM IST = 3:30 UTC

// Daily 8 AM IST: EMI due reminders
cron.schedule('0 30 2 * * *', sendEMIReminders);

// Every hour: clean expired onboarding sessions
cron.schedule('0 * * * *', cleanExpiredOnboardingSessions);

// Every 10 min: process scheduled transfers due today
cron.schedule('*/10 * * * *', executeScheduledTransfers);

// Daily midnight: purge notifications older than 90 days
cron.schedule('0 0 * * *', purgeOldNotifications);
```

---

### WEEK 4 — Testing, Security Hardening & Deployment (Days 22–30)

#### Day 22 — Unit Tests (Jest)

Write unit tests for:
- JWT sign/verify edge cases (expired, wrong algorithm, device_id mismatch)
- OTP generate/verify (expired, max attempts, correct hash)
- Transfer initiation (insufficient balance, cooling beneficiary, idempotency dedup)
- MPIN hash verification
- Nominee allocation validation (sum ≠ 100)
- Panic logout Redis pipeline

**Target: ≥ 80% coverage on service layer and shared utilities**

---

#### Day 23 — Integration Tests (Supertest)

```typescript
import request from 'supertest';
import app from '../src/app';

describe('Auth', () => {
  test('POST /auth/login with wrong password increments lockout counter', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ method: 'PASSWORD', mobile: '9876543210', password: 'wrong' });
    expect(res.status).toBe(401);
    expect(res.body.error_code).toBe('INVALID_CREDENTIALS');
  });

  test('Lockout after 3 failed attempts', async () => {
    // 3 failed attempts
    // 4th attempt returns 423 with locked_until
  });
});

describe('Transfer', () => {
  test('Idempotency: same key returns same response without double-debit', async () => {});
  test('Cooling beneficiary blocks transfer', async () => {});
  test('Insufficient balance returns 422', async () => {});
});
```

---

#### Day 24 — Security Hardening

**Checklist:**
- [ ] Helmet.js configured (CSP, HSTS, X-Frame-Options)
- [ ] All secrets in AWS Secrets Manager (not env files in prod)
- [ ] JWT RS256 private key: 2048-bit minimum; never logged
- [ ] audit_log: verified no UPDATE/DELETE possible (test with pg user)
- [ ] Aadhaar: grep codebase — full Aadhaar number must not appear in any INSERT
- [ ] No PII in any push notification payload (verify with test push)
- [ ] No PII or tokens in Morgan access logs (mask Authorization header)
- [ ] SQL injection: all queries use parameterized statements (no string concat)
- [ ] Rate limiting active on all auth endpoints
- [ ] Idempotency middleware active on all financial POST endpoints
- [ ] CORS restricted to app bundle IDs (not open `*`)
- [ ] S3 bucket: private (no public ACL); pre-signed URLs only; server-side encryption AES-256

---

#### Day 25 — AWS Production Setup

**Services to provision:**

```
AWS RDS PostgreSQL 15
  - Multi-AZ deployment
  - Automated backups (7-day retention)
  - Parameter group: enforce SSL connections

AWS ElastiCache Redis 7
  - Cluster mode disabled (single shard for MVP)
  - Encryption in transit + at rest

AWS S3 (3 buckets)
  - swabhiman-kyc-docs-prod       (KYC documents + Video KYC refs)
  - swabhiman-statements-prod     (Generated PDF statements)
  - swabhiman-dispute-evidence-prod

AWS ECS Fargate (container hosting)
  - Task definition: Node.js Docker image
  - Auto-scaling: 2–10 tasks based on CPU/memory
  - ALB (Application Load Balancer) in front

AWS API Gateway + WAF
  - Rate limiting rules
  - SQL injection + XSS rules
  - DDoS protection

AWS SES
  - Verified sending domain: swabhimannidhi.in
  - Production access requested (sandbox → production)

AWS SNS
  - SMS: DLT-registered sender ID and templates
  - Push: Platform Application for FCM (Android + iOS)

AWS Secrets Manager
  - JWT private/public keys
  - DB password
  - Redis password
  - FCM server key
  - Third-party API keys
```

**Dockerfile:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 8080
CMD ["node", "dist/server.js"]
```

---

#### Day 26 — Logging, Monitoring & Alerting

```typescript
// Request logger: Morgan with request_id injection
// Every request gets a UUID request_id; returned in all responses as X-Request-ID header
// Propagate request_id to all CBS/third-party calls for distributed tracing

// Log format (structured JSON for CloudWatch):
{
  "timestamp": "2026-06-22T10:00:00Z",
  "level": "info",
  "request_id": "req_abc123",
  "method": "POST",
  "path": "/api/v1/transfer/initiate",
  "status": 200,
  "duration_ms": 245,
  "customer_id": "SWCIF12345678"
  // NEVER log: tokens, OTPs, MPIN, account numbers, Aadhaar
}
```

**AWS CloudWatch Alarms:**
- API error rate (5xx) > 1% → PagerDuty alert
- DB connection pool exhaustion → alert
- Redis memory > 80% → alert
- Panic logout latency > 3s → alert
- Failed login spike (> 100 failures/min) → security alert

---

#### Day 27 — Load Testing

Use **k6** or **Artillery**:

```javascript
// k6 load test: 500 concurrent users, 10 min
import http from 'k6/http';

export let options = {
  vus: 500,
  duration: '10m',
  thresholds: {
    http_req_duration: ['p95<800'],   // API P95 < 800ms
    http_req_failed: ['rate<0.01'],   // Error rate < 1%
  }
};

export default function () {
  // Simulate dashboard load, transfer, notification fetch
  http.get('https://api.swabhimannidhi.in/api/v1/dashboard/summary', {
    headers: { Authorization: `Bearer ${TOKEN}` }
  });
}
```

**Performance targets to hit:**
- API P95 (non-CBS): < 800ms ✓
- API P95 (CBS-dependent): < 2s ✓
- Panic logout end-to-end: < 3s ✓
- Push notification delivery: < 5s ✓

---

#### Day 28 — API Documentation (Swagger/OpenAPI)

```typescript
// Use swagger-jsdoc + swagger-ui-express
// Document every endpoint with:
// - Request body schema (with example)
// - All response codes (200, 400, 401, 403, 422, 423, 429, 500)
// - Required headers (Authorization, Idempotency-Key, X-Device-ID)
// - Error code catalog

// Publish at: https://api.swabhimannidhi.in/api/docs (staging only, not prod)
```

Deliver to frontend team by Day 28 so they can finalize integration.

---

#### Day 29 — Staging Deployment + End-to-End QA

- Deploy to ECS Fargate staging environment
- Run all integration tests against staging (not mocks)
- QA team runs full happy-path for all 21 modules
- Fix all critical bugs found in staging

---

#### Day 30 — Production Deployment + Go-Live Checklist

**Pre-production checklist:**
- [ ] All secrets migrated to AWS Secrets Manager
- [ ] DB: Multi-AZ enabled, backups tested
- [ ] audit_log: verified immutable
- [ ] Rate limiting confirmed active at API Gateway level
- [ ] All DLT SMS templates approved by telecom operator
- [ ] AWS SES: production access (out of sandbox)
- [ ] Certificate pinning: certificates installed, rotation mechanism tested
- [ ] OWASP checklist completed (or documented exceptions with risk acceptance)
- [ ] Crash-free rate baseline established in Firebase Crashlytics
- [ ] Rollback plan documented: ECS task previous revision ready to deploy

---

## API Standards Reference

| Standard | Specification |
|----------|--------------|
| Base URL | `https://api.swabhimannidhi.in/api/v1/` |
| Auth Header | `Authorization: Bearer <access_token>` |
| Device Header | `X-Device-ID: <device_id>` (required on all authenticated calls) |
| Idempotency | `Idempotency-Key: <uuid-v4>` on all POST financial APIs |
| Content Type | `application/json` |
| Error Format | `{ error_code, message, request_id, details? }` |
| Pagination | `{ data, page, per_page, total, has_more }` |
| Timestamps | ISO 8601 UTC: `2026-06-22T10:30:00Z` |
| Rate Limiting | HTTP 429 + `Retry-After` header |
| Versioning | Breaking changes → `/api/v2/` |

---

## Complete Dependency List

```json
{
  "dependencies": {
    "express": "^4.19.0",
    "cors": "^2.8.5",
    "helmet": "^7.x",
    "morgan": "^1.10.0",
    "uuid": "^9.x",
    "jsonwebtoken": "^9.x",
    "bcrypt": "^5.x",
    "pg": "^8.x",
    "knex": "^3.x",
    "ioredis": "^5.x",
    "@aws-sdk/client-s3": "^3.x",
    "@aws-sdk/client-ses": "^3.x",
    "@aws-sdk/client-sns": "^3.x",
    "@aws-sdk/s3-request-presigner": "^3.x",
    "zod": "^3.x",
    "pdfkit": "^0.15.x",
    "node-cron": "^3.x",
    "node-pg-migrate": "^6.x",
    "ws": "^8.x",
    "express-rate-limit": "^7.x",
    "rate-limit-redis": "^4.x",
    "multer": "^1.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "ts-node": "^10.x",
    "nodemon": "^3.x",
    "jest": "^29.x",
    "supertest": "^7.x",
    "swagger-jsdoc": "^6.x",
    "swagger-ui-express": "^5.x",
    "@types/express": "^4.x",
    "@types/node": "^20.x",
    "@types/jsonwebtoken": "^9.x",
    "@types/bcrypt": "^5.x",
    "@types/pg": "^8.x",
    "@types/uuid": "^9.x"
  }
}
```

---

*Backend Build Plan — Swabhiman Pawan Nidhi | 30 Days | Node.js + Express + PostgreSQL + AWS*
*Version 1.0 | June 22, 2026 | Confidential*
