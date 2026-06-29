# Swabhiman Pawan Nidhi — Complete AWS Infrastructure Setup
**Stack: Node.js 20 + TypeScript + PostgreSQL 15 (RDS) + Redis 7 (ElastiCache) + EC2**
**Region: ap-south-1 (Mumbai) | All data stays 100% on AWS — no local DB**

---

## AWS Services You Will Use

| # | Service | What It Does in Your App |
|---|---|---|
| 1 | IAM | Users, roles, permissions for every service |
| 2 | VPC | Private network that wraps everything |
| 3 | EC2 | Runs your Node.js backend server |
| 4 | RDS PostgreSQL 15 | Primary database (all 15 tables from your schema) |
| 5 | ElastiCache Redis 7 | OTP cache, sessions, rate limiting, idempotency |
| 6 | S3 (3 buckets) | KYC docs, bank statements PDF, dispute evidence |
| 7 | SES | Transaction emails, statements, freeze alerts |
| 8 | SNS | OTP SMS + Firebase push notification trigger |
| 9 | API Gateway + WAF | Public entry point, rate limiting, SQL injection block |
| 10 | ACM | Free SSL/TLS certificate for your domain |
| 11 | Route 53 | DNS — points api.swabhimannidhi.in to your server |
| 12 | Secrets Manager | JWT keys, DB password, Redis token, FCM key |
| 13 | CloudWatch | Logs, alarms, dashboards |
| 14 | ALB | Load balancer in front of EC2 |

---

## PHASE 1 — Account & IAM (Before Anything Else)

### STEP 1: Secure Your AWS Root Account

```
1. Log in to https://console.aws.amazon.com
2. Top-right corner → your account name → Security credentials
3. Multi-factor authentication (MFA) → Assign MFA device
   → Choose: Authenticator app (Google Authenticator or Authy)
   → Scan QR code → enter two consecutive OTPs to confirm
4. DONE — never use root account again for day-to-day work
```

### STEP 2: Create Your Working IAM Admin User

```
AWS Console → IAM → Users → Create user

User name:        swabhiman-admin
AWS access type:  Provide user access to the AWS Management Console
Console password: Custom password [choose a strong one]
Require reset:    No

Permissions → Attach policies directly
Policy:           AdministratorAccess

Create user → Download .csv (save this file safely)

After creation:
→ Click on the new user → Security credentials → Assign MFA device
→ Do the same MFA setup as root

Now log out of root and log in as swabhiman-admin from now on.
```

### STEP 3: Create IAM Roles (Services Need These to Talk to Each Other)

**Role A — EC2 Instance Role** (your Node.js server uses this to access S3, SES, SNS, Secrets Manager)

```
IAM → Roles → Create role
Trusted entity type: AWS service
Use case: EC2
Click Next

Add these permissions (search and tick each):
  ✓ AmazonS3FullAccess
  ✓ AmazonSESFullAccess
  ✓ AmazonSNSFullAccess
  ✓ SecretsManagerReadWrite
  ✓ CloudWatchLogsFullAccess
  ✓ CloudWatchAgentServerPolicy

Role name: swabhiman-ec2-role
Create role
```

**Role B — CI/CD Deploy Role** (GitHub Actions uses this to deploy your code)

```
IAM → Users → Create user
User name: swabhiman-deploy
Access type: Programmatic access only (no console)

Attach policies:
  ✓ AmazonEC2FullAccess
  ✓ SecretsManagerReadOnly

Create user → Save Access Key ID + Secret Access Key
→ Add these to GitHub repository → Settings → Secrets:
    AWS_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY
    AWS_REGION = ap-south-1
```

---

## PHASE 2 — VPC (Private Network for All Your Resources)

### STEP 4: Create the VPC

```
AWS Console → VPC → Your VPCs → Create VPC

Name tag:   swabhiman-vpc
IPv4 CIDR:  10.0.0.0/16
Tenancy:    Default

Create VPC
```

### STEP 5: Create Subnets (Minimum 2 Availability Zones)

Go to VPC → Subnets → Create subnet, select swabhiman-vpc, then create all 4:

```
Subnet 1 — Public A (for ALB and EC2 with internet access)
  Name:              swabhiman-public-1a
  Availability Zone: ap-south-1a
  IPv4 CIDR:         10.0.1.0/24

Subnet 2 — Public B (second AZ for ALB high availability)
  Name:              swabhiman-public-1b
  Availability Zone: ap-south-1b
  IPv4 CIDR:         10.0.2.0/24

Subnet 3 — Private A (RDS + Redis — NO internet access)
  Name:              swabhiman-private-1a
  Availability Zone: ap-south-1a
  IPv4 CIDR:         10.0.10.0/24

Subnet 4 — Private B (RDS Multi-AZ standby)
  Name:              swabhiman-private-1b
  Availability Zone: ap-south-1b
  IPv4 CIDR:         10.0.11.0/24
```

### STEP 6: Internet Gateway (Public Internet Access)

```
VPC → Internet Gateways → Create internet gateway
Name: swabhiman-igw
Create

After creation:
→ Actions → Attach to VPC → select swabhiman-vpc → Attach
```

### STEP 7: Route Tables

**Public Route Table** (used by public subnets — EC2, ALB)

```
VPC → Route Tables → Create route table
Name: swabhiman-rt-public
VPC:  swabhiman-vpc
Create

Select swabhiman-rt-public → Routes tab → Edit routes
Add route:
  Destination: 0.0.0.0/0
  Target:      swabhiman-igw (select Internet Gateway)
Save changes

Subnet Associations tab → Edit subnet associations
Add: swabhiman-public-1a, swabhiman-public-1b
Save
```

**Private Route Table** (used by RDS and Redis subnets — no internet)

```
VPC → Route Tables → Create route table
Name: swabhiman-rt-private
VPC:  swabhiman-vpc
Create

[No internet route needed — RDS and Redis should NEVER reach the internet]

Subnet Associations → Edit
Add: swabhiman-private-1a, swabhiman-private-1b
Save
```

### STEP 8: Security Groups (Firewall Rules)

Create 4 security groups. Go to VPC → Security Groups → Create security group each time.

---

**SG-1: ALB Security Group**
```
Name:        sg-swabhiman-alb
Description: Load balancer — accepts public HTTPS traffic
VPC:         swabhiman-vpc

Inbound rules:
  Type: HTTPS  | Port: 443 | Source: 0.0.0.0/0  (public internet)
  Type: HTTP   | Port: 80  | Source: 0.0.0.0/0  (redirect to HTTPS)

Outbound rules:
  Type: All traffic | Destination: 0.0.0.0/0
```

---

**SG-2: EC2 Security Group**
```
Name:        sg-swabhiman-ec2
Description: Node.js app server
VPC:         swabhiman-vpc

Inbound rules:
  Type: Custom TCP | Port: 8080 | Source: sg-swabhiman-alb   ← ALB only, NOT internet
  Type: SSH        | Port: 22   | Source: YOUR_OFFICE_IP/32   ← your IP only for SSH

Outbound rules:
  Type: All traffic | Destination: 0.0.0.0/0
```

> Replace YOUR_OFFICE_IP with your actual static IP.
> Go to https://whatismyip.com to find it.

---

**SG-3: RDS Security Group**
```
Name:        sg-swabhiman-rds
Description: PostgreSQL database — only EC2 can connect
VPC:         swabhiman-vpc

Inbound rules:
  Type: PostgreSQL | Port: 5432 | Source: sg-swabhiman-ec2   ← ONLY from your EC2

Outbound rules:
  Type: All traffic | Destination: 0.0.0.0/0
```

---

**SG-4: Redis Security Group**
```
Name:        sg-swabhiman-redis
Description: ElastiCache Redis — only EC2 can connect
VPC:         swabhiman-vpc

Inbound rules:
  Type: Custom TCP | Port: 6379 | Source: sg-swabhiman-ec2   ← ONLY from your EC2

Outbound rules:
  Type: All traffic | Destination: 0.0.0.0/0
```

---

## PHASE 3 — Databases on AWS (100% Cloud, No Local DB)

### STEP 9: RDS PostgreSQL 15 (Primary Database)

**9.1 — Create DB Subnet Group first**

```
RDS → Subnet groups → Create DB subnet group

Name:        swabhiman-rds-subnet-group
Description: Private subnets for RDS
VPC:         swabhiman-vpc

Add subnets:
  ap-south-1a → swabhiman-private-1a (10.0.10.0/24)
  ap-south-1b → swabhiman-private-1b (10.0.11.0/24)

Create
```

**9.2 — Create the RDS Instance**

```
RDS → Databases → Create database

Choose a database creation method: Standard create

Engine options:
  Engine type:    PostgreSQL
  Engine version: PostgreSQL 15.x (latest 15.x available)

Templates:
  Dev/Test   → for dev environment
  Production → for prod environment

Settings:
  DB instance identifier: swabhiman-postgres-prod
  Master username:        swabhiman_admin
  Master password:        [create a strong password, min 16 chars]
                          Example: Sw@bh!man#2026$Nidhi
                          SAVE THIS — you'll store it in Secrets Manager

Instance configuration:
  DB instance class: Burstable classes
    Dev:  db.t3.medium   (2 vCPU, 4 GB RAM)   ~$60/month
    Prod: db.r6g.large   (2 vCPU, 16 GB RAM)  ~$230/month

Storage:
  Storage type:      gp3  (faster and cheaper than gp2)
  Allocated storage: 50 GB
  Enable storage autoscaling: ✓ YES
  Maximum storage threshold: 200 GB

Availability & durability:
  Dev:  Single DB instance       (saves cost)
  Prod: Multi-AZ DB instance     ← MANDATORY for banking app
        (automatic failover if AZ goes down — ~60 sec)

Connectivity:
  Compute resource: Don't connect to an EC2 compute resource (we do this manually)
  VPC:              swabhiman-vpc
  DB subnet group:  swabhiman-rds-subnet-group
  Public access:    No  ← CRITICAL — database is NOT reachable from internet
  VPC security group: Choose existing → sg-swabhiman-rds
  Availability Zone: ap-south-1a

Database authentication:
  Password authentication ✓

Additional configuration:
  Initial database name:    swabhiman_db
  DB parameter group:       default.postgres15  (we'll create custom one below)
  Backup retention period:  7 days
  Backup window:            03:00 - 04:00 UTC (3:00 - 4:00 = 8:30 - 9:30 AM IST, low traffic)
  Enable deletion protection: ✓ YES (prevents accidental delete)
  Enable Performance Insights: ✓ YES
  Enable Enhanced Monitoring:  ✓ YES, granularity: 60 seconds

Create database
(Takes 5–10 minutes to provision)
```

**9.3 — Enforce SSL on RDS**

```
RDS → Parameter groups → Create parameter group
  Parameter group family: postgres15
  Name:                   swabhiman-pg-ssl
  Description:            Force SSL on all connections

Create → click on the group → Edit

Search parameter: rds.force_ssl
Set value: 1
Save changes

Now attach it:
RDS → Databases → swabhiman-postgres-prod → Modify
  DB parameter group: swabhiman-pg-ssl
Apply: Immediately
(Requires a reboot — do this in off-hours for prod)
```

**9.4 — Note Your Connection Details**

```
After RDS is created:
RDS → Databases → swabhiman-postgres-prod → Connectivity & security

Endpoint: swabhiman-postgres-prod.XXXXXXXXXXXX.ap-south-1.rds.amazonaws.com
Port:     5432

Your DATABASE_URL will be:
postgresql://swabhiman_admin:YOUR_PASSWORD@swabhiman-postgres-prod.XXXX.ap-south-1.rds.amazonaws.com:5432/swabhiman_db?sslmode=require

Save this — you'll put it in Secrets Manager next.
```

---

### STEP 10: ElastiCache Redis 7 (Sessions, OTP, Rate Limiting)

**10.1 — Create Subnet Group**

```
ElastiCache → Subnet groups → Create subnet group

Name:        swabhiman-redis-subnet-group
Description: Private subnets for Redis
VPC ID:      swabhiman-vpc

Subnets: add both private subnets:
  swabhiman-private-1a
  swabhiman-private-1b

Create
```

**10.2 — Create Redis Cluster**

```
ElastiCache → Redis OSS caches → Create Redis OSS cache

Creation method: Easy create → No, I want to configure → Configure manually

Cluster info:
  Name:           swabhiman-redis
  Description:    OTP cache, sessions, rate limiting, idempotency keys

Location: AWS Cloud

Cluster settings:
  Cluster mode:   Disabled  (single shard — sufficient for MVP)
  Engine version: 7.x (latest)
  Port:           6379

Node type:
  Dev:  cache.t3.micro   (~$12/month)
  Prod: cache.r6g.large  (~$130/month)

Number of replicas:
  Dev:  0 (no replica)
  Prod: 1 (enables read replica + automatic failover)

Subnet group:
  Select: swabhiman-redis-subnet-group

Security:
  Security groups: sg-swabhiman-redis

Encryption:
  Encryption at rest:    ✓ Enable   (AES-256)
  Encryption in-transit: ✓ Enable   (TLS)
  AUTH token:            ✓ Yes — set a strong token (save this for Secrets Manager)
                         Example: Sw@Redis#2026!Nidhi

Backup:
  Enable automatic backups: ✓ Yes
  Backup retention:         7 days
  Backup window:            04:00 - 05:00 UTC

Create
(Takes 3–5 minutes)
```

**10.3 — Note Your Redis Endpoint**

```
ElastiCache → Redis clusters → swabhiman-redis

Primary endpoint: swabhiman-redis.XXXXX.0001.aps1.cache.amazonaws.com:6379

Your REDIS_URL will be (with TLS — note rediss:// not redis://):
rediss://:YOUR_AUTH_TOKEN@swabhiman-redis.XXXXX.0001.aps1.cache.amazonaws.com:6379
```

---

## PHASE 4 — S3 Storage (3 Buckets)

### STEP 11: Create S3 Buckets

Create all 3 buckets. All are 100% private.

**Bucket 1 — KYC Documents**

```
S3 → Create bucket

Bucket name: swabhiman-kyc-docs-prod
AWS Region:  ap-south-1

Object Ownership: ACLs disabled (recommended)

Block Public Access settings:
  ✓ Block all public access  (all 4 checkboxes ON)

Bucket Versioning: Enable  ← never lose a KYC document

Default encryption:
  Encryption type: Server-side encryption with Amazon S3 managed keys (SSE-S3)

Create bucket
```

**Bucket 2 — Bank Statements PDF**

```
S3 → Create bucket

Bucket name: swabhiman-statements-prod
AWS Region:  ap-south-1

Block Public Access: ✓ Block all (all 4 ON)
Versioning: Enable
Encryption: SSE-S3

Create bucket

After creation, add a Lifecycle rule:
→ Management tab → Create lifecycle rule
   Rule name: archive-old-statements
   Scope: Apply to all objects
   Actions:
     ✓ Transition current versions of objects between storage classes
     After 90 days → Glacier Instant Retrieval  (saves ~70% storage cost)
```

**Bucket 3 — Dispute Evidence**

```
S3 → Create bucket

Bucket name: swabhiman-dispute-evidence-prod
AWS Region:  ap-south-1

Block Public Access: ✓ Block all (all 4 ON)
Versioning: Enable
Encryption: SSE-S3

Create bucket
```

**Add CORS to Buckets 1 and 3** (needed for mobile app's direct S3 uploads via pre-signed URLs)

```
Click bucket → Permissions tab → CORS → Edit → paste this:

[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]

Save changes
```

---

## PHASE 5 — Secrets Manager (Store All Sensitive Config)

### STEP 12: Store All Secrets

Never hardcode passwords in your code. Store everything here.

Go to **Secrets Manager → Store a new secret** for each secret below:
Select: **Other type of secret** → Key/value pairs

---

**Secret 1: Database Password**
```
Key: password
Value: Sw@bh!man#2026$Nidhi   (your actual RDS master password)

Secret name: swabhiman/prod/db-password
```

**Secret 2: Redis Auth Token**
```
Key: token
Value: Sw@Redis#2026!Nidhi   (your actual Redis AUTH token)

Secret name: swabhiman/prod/redis-auth
```

**Secret 3: JWT Private Key (RS256)**

First generate the key pair on your local machine:
```bash
mkdir -p swabhiman-keys
openssl genrsa -out swabhiman-keys/private.pem 2048
openssl rsa -in swabhiman-keys/private.pem -pubout -out swabhiman-keys/public.pem
```

Then store in Secrets Manager:
```
Key:   private_key
Value: [paste full content of private.pem including -----BEGIN RSA PRIVATE KEY----- lines]

Secret name: swabhiman/prod/jwt-private-key
```

**Secret 4: JWT Public Key**
```
Key:   public_key
Value: [paste full content of public.pem including -----BEGIN PUBLIC KEY----- lines]

Secret name: swabhiman/prod/jwt-public-key
```

**Secret 5: FCM Server Key**
```
Go to Firebase Console → your project → Project Settings → Cloud Messaging
Copy the Server key

Key:   fcm_key
Value: [your FCM server key]

Secret name: swabhiman/prod/fcm-key
```

**Secret 6: Full DB Connection String**
```
Key:   url
Value: postgresql://swabhiman_admin:YOUR_PASSWORD@swabhiman-postgres-prod.XXXX.ap-south-1.rds.amazonaws.com:5432/swabhiman_db?sslmode=require

Secret name: swabhiman/prod/database-url
```

**Secret 7: Third-party API Keys**
```
Keys and values:
  PAN_API_KEY:    [your NSDL/CDSL PAN verification API key]
  BBPS_API_KEY:   [your BBPS aggregator key]
  VCIP_SECRET:    [your V-CIP vendor webhook secret]
  CBS_API_KEY:    [your core banking system key]

Secret name: swabhiman/prod/third-party-keys
```

---

## PHASE 6 — EC2 Server (Your Node.js Backend)

### STEP 13: Launch EC2 Instance

**13.1 — Create a Key Pair (for SSH access)**

```
EC2 → Key Pairs → Create key pair

Name:              swabhiman-key
Key pair type:     RSA
Private key format: .pem (for Linux/Mac) or .ppk (for PuTTY on Windows)

Create key pair — download the .pem file
Store it safely: chmod 400 swabhiman-key.pem  (Mac/Linux)
```

**13.2 — Launch EC2 Instance**

```
EC2 → Instances → Launch instances

Name: swabhiman-api-server

Application and OS Images:
  AMI: Ubuntu Server 24.04 LTS (HVM), SSD Volume Type
  Architecture: 64-bit (x86)

Instance type:
  Dev:  t3.medium   (2 vCPU, 4 GB RAM)  ~$30/month
  Prod: t3.large    (2 vCPU, 8 GB RAM)  ~$60/month
        or c5.xlarge (4 vCPU, 8 GB RAM) ~$120/month for high traffic

Key pair: swabhiman-key (the one you just created)

Network settings:
  VPC:                    swabhiman-vpc
  Subnet:                 swabhiman-public-1a   ← PUBLIC subnet (needs internet for updates)
  Auto-assign public IP:  Enable
  Security group:         sg-swabhiman-ec2

Configure storage:
  Root volume: 30 GB, gp3

Advanced details:
  IAM instance profile: swabhiman-ec2-role   ← the role from Step 3

Launch instance
```

**13.3 — Allocate an Elastic IP (Fixed Public IP)**

Without this your server's IP changes on every reboot.

```
EC2 → Elastic IPs → Allocate Elastic IP address
  Network border group: ap-south-1
  Allocate

After allocation:
  Actions → Associate Elastic IP address
  Instance: swabhiman-api-server
  Associate
```

Note this IP — you'll use it for SSH and Route 53 later.

---

### STEP 14: Set Up the Server (SSH into EC2)

Connect to your server:

```bash
# From your local machine terminal
ssh -i swabhiman-key.pem ubuntu@YOUR_ELASTIC_IP
```

Now run all of these commands on the EC2 server:

**14.1 — System Update**
```bash
sudo apt-get update -y
sudo apt-get upgrade -y
```

**14.2 — Install Node.js 20 LTS**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version   # should show v20.x.x
npm --version
```

**14.3 — Install PM2 (Process Manager — keeps Node.js running)**
```bash
sudo npm install -g pm2
pm2 --version
```

**14.4 — Install PostgreSQL Client (to run migrations from EC2)**
```bash
sudo apt-get install -y postgresql-client
# Test connection to RDS:
psql "postgresql://swabhiman_admin:YOUR_PASSWORD@YOUR_RDS_ENDPOINT:5432/swabhiman_db?sslmode=require"
# You should see: psql (15.x) — type \q to exit
```

**14.5 — Install AWS CLI (to pull secrets)**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version
aws configure
# When prompted:
#   AWS Access Key ID: [press Enter — uses the EC2 IAM role automatically]
#   AWS Secret Access Key: [press Enter]
#   Default region name: ap-south-1
#   Default output format: json
```

**14.6 — Install Git**
```bash
sudo apt-get install -y git
git config --global user.name "Swabhiman Deploy"
git config --global user.email "tech@swabhimannidhi.in"
```

**14.7 — Create Application Directory**
```bash
sudo mkdir -p /var/app/swabhiman-api
sudo chown ubuntu:ubuntu /var/app/swabhiman-api
cd /var/app/swabhiman-api
```

**14.8 — Create the .env.production File (fetched from Secrets Manager)**

Create a startup script that pulls all secrets from Secrets Manager at boot:

```bash
sudo nano /var/app/load-secrets.sh
```

Paste this:
```bash
#!/bin/bash
# Fetch all secrets from AWS Secrets Manager and write to .env file

APP_DIR="/var/app/swabhiman-api"
ENV_FILE="$APP_DIR/.env.production"

echo "Fetching secrets from AWS Secrets Manager..."

# Fetch DB URL
DB_URL=$(aws secretsmanager get-secret-value \
  --secret-id swabhiman/prod/database-url \
  --region ap-south-1 \
  --query SecretString \
  --output text | python3 -c "import sys,json; print(json.load(sys.stdin)['url'])")

# Fetch Redis auth
REDIS_TOKEN=$(aws secretsmanager get-secret-value \
  --secret-id swabhiman/prod/redis-auth \
  --region ap-south-1 \
  --query SecretString \
  --output text | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")

# Fetch JWT keys
JWT_PRIVATE=$(aws secretsmanager get-secret-value \
  --secret-id swabhiman/prod/jwt-private-key \
  --region ap-south-1 \
  --query SecretString \
  --output text | python3 -c "import sys,json; print(json.load(sys.stdin)['private_key'])")

# Write .env file
cat > "$ENV_FILE" << EOF
NODE_ENV=production
PORT=8080
DATABASE_URL=$DB_URL
REDIS_URL=rediss://:$REDIS_TOKEN@YOUR_REDIS_ENDPOINT:6379
AWS_REGION=ap-south-1
AWS_S3_BUCKET_KYC=swabhiman-kyc-docs-prod
AWS_S3_BUCKET_STATEMENTS=swabhiman-statements-prod
AWS_S3_BUCKET_DISPUTES=swabhiman-dispute-evidence-prod
AWS_SES_FROM_EMAIL=noreply@swabhimannidhi.in
JWT_ACCESS_TTL=900
JWT_REFRESH_TTL=604800
UPI_ENABLED=false
EOF

echo "Secrets loaded successfully."
```

```bash
sudo chmod +x /var/app/load-secrets.sh
```

**14.9 — Install Nginx (Reverse Proxy in front of Node.js)**

```bash
sudo apt-get install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

Configure Nginx to forward traffic from port 80/443 to your Node.js on port 8080:

```bash
sudo nano /etc/nginx/sites-available/swabhiman-api
```

Paste:
```nginx
server {
    listen 80;
    server_name api.swabhimannidhi.in;

    # Redirect all HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name api.swabhimannidhi.in;

    ssl_certificate     /etc/ssl/swabhiman/fullchain.pem;
    ssl_certificate_key /etc/ssl/swabhiman/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        proxy_pass         http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts (important for CBS-dependent APIs)
        proxy_read_timeout 30s;
        proxy_connect_timeout 10s;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/swabhiman-api /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t   # test config — should say "syntax is ok"
sudo systemctl reload nginx
```

---

### STEP 15: Deploy Your Node.js App to EC2

**15.1 — Clone your repo**
```bash
cd /var/app/swabhiman-api
git clone https://github.com/YOUR_ORG/swabhiman-api.git .
```

**15.2 — Install dependencies**
```bash
npm ci --only=production
```

**15.3 — Build TypeScript**
```bash
npm run build
# This compiles src/ → dist/
```

**15.4 — Load secrets and run database migrations**
```bash
sudo /var/app/load-secrets.sh

# Run your DB migrations against RDS (from your backend build plan Day 2):
source .env.production
npx node-pg-migrate up
```

**15.5 — Start with PM2**
```bash
pm2 start dist/server.js --name swabhiman-api \
  --env production \
  --max-memory-restart 500M \
  --instances 2   # runs 2 processes on multi-core instance

pm2 save
pm2 startup systemd
# Copy and run the command PM2 prints — this makes it start on reboot
```

**15.6 — Verify the app is running**
```bash
pm2 status          # shows running processes
pm2 logs            # view live logs
curl http://localhost:8080/health   # should return {"status":"ok"}
```

---

## PHASE 7 — Load Balancer & SSL

### STEP 16: Application Load Balancer (ALB)

**16.1 — Create Target Group**

```
EC2 → Target Groups → Create target group

Choose: Instances
Name:    swabhiman-api-tg
Protocol: HTTP
Port:     8080
VPC:      swabhiman-vpc

Health checks:
  Protocol:           HTTP
  Path:               /health
  Healthy threshold:  2
  Unhealthy threshold: 3
  Timeout:            5 seconds
  Interval:           30 seconds

Next → Register targets
  Select: swabhiman-api-server
  Port:   8080
  Include as pending below → Create target group
```

**16.2 — Request SSL Certificate**

```
Certificate Manager (ACM) → Request a certificate

Request a public certificate
Domain names: api.swabhimannidhi.in
Validation method: DNS validation

Request

After creation:
  → Click the certificate → Domains section
  → Click "Create records in Route 53" (if your DNS is on Route 53)
  OR copy the CNAME name and value, add to your DNS provider manually

Wait 5–10 minutes → Status changes to "Issued" ✓
```

**16.3 — Create the ALB**

```
EC2 → Load Balancers → Create load balancer → Application Load Balancer

Name:   swabhiman-alb
Scheme: Internet-facing
IP type: IPv4

Network mapping:
  VPC: swabhiman-vpc
  Mappings:
    ap-south-1a → swabhiman-public-1a
    ap-south-1b → swabhiman-public-1b

Security groups: sg-swabhiman-alb

Listeners:
  Listener 1:
    Protocol: HTTP | Port: 80
    Default action: Redirect to HTTPS, port 443, 301 permanent

  Listener 2:
    Protocol: HTTPS | Port: 443
    Default action: Forward to swabhiman-api-tg
    Certificate: api.swabhimannidhi.in (from ACM)

Create load balancer
```

Note the ALB DNS name: `swabhiman-alb-XXXXX.ap-south-1.elb.amazonaws.com`

---

### STEP 17: Route 53 (DNS)

```
Route 53 → Hosted zones → select your domain (swabhimannidhi.in)
→ Create record

Record name: api
Record type: A
Alias:       Yes
Route traffic to: Alias to Application and Classic Load Balancer
                  ap-south-1
                  swabhiman-alb-XXXXX.ap-south-1.elb.amazonaws.com

TTL: 60 seconds
Create records
```

Your API is now live at: **https://api.swabhimannidhi.in**

---

## PHASE 8 — Email & SMS Setup

### STEP 18: SES (Transaction Emails)

**18.1 — Verify your sending domain**
```
SES → Verified identities → Create identity

Identity type: Domain
Domain: swabhimannidhi.in
Use a custom MAIL FROM domain: ✓ (optional but professional)

Create identity

AWS shows you 3 DKIM CNAME records. Add these to your DNS:
  Go to Route 53 → your domain → Create record → paste each CNAME
  (or your DNS provider if not Route 53)

Wait 5–10 minutes → DKIM status shows "Verified" ✓
```

**18.2 — Request SES Production Access**
```
By default SES sandbox = can only email verified addresses.
For real customers you need production access.

SES → Account dashboard → Request production access

Fill the form:
  Mail type: Transactional
  Website URL: https://www.swabhimannidhi.in
  Use case description:
    "We are Swabhiman Pawan Nidhi Pvt. Ltd., an RBI-registered NBFC.
     We send transactional emails only: OTPs, transaction alerts, FD maturity
     reminders, account freeze confirmations, and bank statements to verified
     customers of our mobile banking application. All recipients are existing
     registered customers who have provided KYC-verified contact details."

Submit request
(AWS approves in 24–48 hours)
```

---

### STEP 19: SNS (OTP SMS + Push Notifications)

**19.1 — Verify your mobile number in SMS Sandbox (for testing)**
```
SNS → Text messaging (SMS) → Sandbox destination phone numbers
→ Add phone number → enter your test number → Send OTP → verify
```

**19.2 — Request SMS Production Access**
```
SNS → Text messaging → Move to production (support request)
Use case: OTP and transaction alerts for banking customers
(Takes 24–48 hours)
```

**19.3 — DLT Registration (MANDATORY in India — start this TODAY)**

DLT (Distributed Ledger Technology) is required by TRAI. Without it, Indian telecom operators will BLOCK your SMS messages.

Go to one of these portals and register:
- **Airtel DLT**: https://www.airtelbusiness.in/dlt
- **Vodafone Idea DLT**: https://www.vilpower.in
- **BSNL DLT**: https://www.ucc-bsnl.co.in

Steps on the DLT portal:
```
1. Entity Registration
   Company name: Swabhiman Pawan Nidhi Pvt. Ltd.
   Upload: Certificate of Incorporation, PAN, GST
   (Takes 3–5 working days to approve)

2. Header Registration (Sender ID)
   Apply for: SWNIDHI  (or similar 6-char ID)

3. Template Registration — register EVERY SMS template:

   Template 1 (OTP):
   "Your Swabhiman Pawan Nidhi OTP is {#var#}. Valid for 3 minutes.
    Do not share with anyone. -SWNIDHI"

   Template 2 (Debit alert):
   "Rs.{#var#} debited from A/C XX{#var#} on {#var#}.
    Bal Rs.{#var#}. Ref:{#var#}. -SWNIDHI"

   Template 3 (Credit alert):
   "Rs.{#var#} credited to A/C XX{#var#} on {#var#}.
    Bal Rs.{#var#}. Ref:{#var#}. -SWNIDHI"

   Template 4 (Account freeze):
   "Your Swabhiman account XX{#var#} has been frozen on your request.
    Not done by you? Call 1800XXXXXXX immediately. -SWNIDHI"

   Template 5 (FD maturity):
   "Your FD No. {#var#} of Rs.{#var#} matures on {#var#}.
    Login to Swabhiman app to manage it. -SWNIDHI"
```

After DLT approval, configure SNS:
```
SNS → Text messaging → Text messaging preferences
  Default sender ID: SWNIDHI   (your approved DLT header)
  Default message type: Transactional
Save changes
```

**19.4 — Set Up FCM Push Notifications**
```
SNS → Push notifications → Create platform application

Platform application name: SwabhimanApp-FCM
Push notification platform: Firebase Cloud Messaging (FCM)

Firebase API key: [from Firebase Console → Project Settings → Cloud Messaging → Server key]

Create platform application

Note the Platform Application ARN — your backend uses this in sns.publish() calls
```

---

## PHASE 9 — WAF (Web Application Firewall)

### STEP 20: Create WAF Web ACL

```
WAF & Shield → Web ACLs → Create web ACL

Resource type: Regional resources (for ALB)
Region: ap-south-1
Name: swabhiman-waf

Add managed rule groups:
  ✓ AWS managed rule groups → Add rules:
    → AWSManagedRulesCommonRuleSet        (XSS, CSRF, OWASP Top 10)
    → AWSManagedRulesSQLiRuleSet          (SQL injection)
    → AWSManagedRulesKnownBadInputsRuleSet (known attack patterns)
    → AWSManagedRulesAmazonIpReputationList (bad IP reputation)

Add custom rules:

  Rule 1: Global rate limit
  Name: GlobalRateLimit
  Type: Rate-based rule
  Rate limit: 500 requests per 5 minutes per IP
  Action: Block

  Rule 2: Auth endpoint rate limit
  Name: AuthRateLimit
  Type: Rate-based rule
  Scope-down statement: URI path starts with /api/v1/auth/
  Rate limit: 10 requests per 1 minute per IP
  Action: Block

  Rule 3: OTP endpoint rate limit
  Name: OTPRateLimit
  Type: Rate-based rule
  Scope-down statement: URI path starts with /api/v1/auth/otp
  Rate limit: 3 requests per 10 minutes per IP
  Action: Block

Default action: Allow

Associate WAF to your ALB:
  Next screen → Associated AWS resources → Add
  → select swabhiman-alb

Create web ACL
```

---

## PHASE 10 — Monitoring & Alarms

### STEP 21: CloudWatch Logs & Alarms

**21.1 — Create Log Group**
```
CloudWatch → Log groups → Create log group

Log group name: /swabhiman/api
Retention:      30 days (dev) | 90 days (prod)
```

**21.2 — Install CloudWatch Agent on EC2** (sends system metrics + app logs to CloudWatch)

SSH into your EC2 and run:

```bash
# Install CloudWatch Agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i amazon-cloudwatch-agent.deb

# Configure the agent
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard
# When prompted:
#  - On EC2? Yes
#  - Collect metrics? Yes
#  - Log files to monitor? Yes
#  - Add log file: /var/app/swabhiman-api/logs/app.log
#  - Log group name: /swabhiman/api

# Start the agent
sudo systemctl start amazon-cloudwatch-agent
sudo systemctl enable amazon-cloudwatch-agent
```

**21.3 — Create SNS Topic for Alerts**
```
SNS → Topics → Create topic
Type: Standard
Name: swabhiman-ops-alerts

After creation → Create subscription
Protocol: Email
Endpoint: your-ops-team@swabhimannidhi.in
(Confirm the subscription email)
```

**21.4 — Create CloudWatch Alarms** (as specified in your build plan)

```
# ALARM 1: API 5xx errors
CloudWatch → Alarms → Create alarm
Metric: ApplicationELB → Per AppELB Metrics → HTTPCode_ELB_5XX_Count
  LoadBalancer: swabhiman-alb
Statistic: Sum | Period: 1 minute
Condition: Greater than 5 for 3 consecutive periods
Action: Send notification to swabhiman-ops-alerts
Name: Swabhiman-High5xxErrors

# ALARM 2: EC2 CPU spike
Metric: EC2 → Per-Instance Metrics → CPUUtilization
  InstanceId: your EC2 instance ID
Condition: Greater than 80% for 5 minutes
Action: SNS swabhiman-ops-alerts
Name: Swabhiman-HighCPU

# ALARM 3: RDS CPU
Metric: RDS → Per-Database Metrics → CPUUtilization
  DBInstanceIdentifier: swabhiman-postgres-prod
Condition: Greater than 70% for 5 minutes
Action: SNS swabhiman-ops-alerts
Name: Swabhiman-RDS-HighCPU

# ALARM 4: RDS connections
Metric: RDS → Per-Database Metrics → DatabaseConnections
  DBInstanceIdentifier: swabhiman-postgres-prod
Condition: Greater than 80 connections for 3 minutes
Action: SNS swabhiman-ops-alerts
Name: Swabhiman-RDS-Connections

# ALARM 5: Redis memory
Metric: ElastiCache → Per-Cache Cluster Metrics → DatabaseMemoryUsagePercentage
  CacheClusterId: swabhiman-redis
Condition: Greater than 80% for 5 minutes
Action: SNS swabhiman-ops-alerts
Name: Swabhiman-Redis-HighMemory

# ALARM 6: Panic logout latency (custom metric — your app publishes this)
# Your Node.js backend code sends this metric via AWS SDK:
# cloudwatch.putMetricData({ Namespace: 'Swabhiman/Security',
#   MetricData: [{ MetricName: 'PanicLogoutDuration', Value: durationMs, Unit: 'Milliseconds' }] })
Metric: Swabhiman/Security → PanicLogoutDuration
Condition: Greater than 3000 (3 seconds) for any period
Action: SNS swabhiman-ops-alerts
Name: Swabhiman-PanicLogout-Slow
```

---

## PHASE 11 — GitHub Actions CI/CD (Auto-Deploy on Push)

### STEP 22: Set Up Automated Deployment

Create this file in your repo: `.github/workflows/deploy.yml`

```yaml
name: Deploy to AWS EC2

on:
  push:
    branches:
      - main         # production deploy
      - staging      # staging deploy

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build TypeScript
        run: npm run build

      - name: Run tests
        run: npm test -- --passWithNoTests

      - name: Deploy to EC2
        uses: appleboy/ssh-action@v1
        with:
          host:        ${{ secrets.EC2_HOST }}        # your Elastic IP
          username:    ubuntu
          key:         ${{ secrets.EC2_SSH_KEY }}     # contents of swabhiman-key.pem
          script: |
            cd /var/app/swabhiman-api
            git pull origin main
            npm ci --only=production
            npm run build
            sudo /var/app/load-secrets.sh
            npx node-pg-migrate up
            pm2 reload swabhiman-api --update-env
            pm2 save
            echo "Deployment complete — $(date)"
```

Add these to GitHub → Settings → Secrets:
```
EC2_HOST:    your Elastic IP address
EC2_SSH_KEY: [paste the full content of swabhiman-key.pem]
```

---

## Final Verification Checklist

Run each check after full setup is complete:

```bash
# 1. API is reachable
curl -s https://api.swabhimannidhi.in/health
# Expected: {"status":"ok","timestamp":"..."}

# 2. RDS connection from EC2
psql "$DATABASE_URL" -c "SELECT version();"
# Expected: PostgreSQL 15.x on ...

# 3. Redis connection from EC2
redis-cli -u "$REDIS_URL" ping
# Expected: PONG

# 4. S3 access from EC2
aws s3 ls s3://swabhiman-kyc-docs-prod
# Expected: empty list (no files yet, but no error)

# 5. Secrets Manager access
aws secretsmanager get-secret-value \
  --secret-id swabhiman/prod/database-url \
  --region ap-south-1
# Expected: your secret JSON

# 6. SSL certificate
curl -vI https://api.swabhimannidhi.in/health 2>&1 | grep "SSL certificate verify"
# Expected: SSL certificate verify ok.
```

---

## Day-to-Day Execution Timeline

| Build Plan Day | AWS Action |
|---|---|
| **Today (Before Day 1)** | Steps 1–8: IAM, VPC, Security Groups. Start DLT registration. |
| **Day 1** | Steps 9–12: RDS, Redis, S3 buckets, Secrets Manager. SES domain verification. |
| **Day 1** | Steps 13–15: Launch EC2, install Node.js + PM2 + Nginx, deploy app. Run migrations. |
| **Day 1** | Step 19: SNS SMS sandbox + FCM platform application. |
| **Day 5–6** | Test OTP flow end-to-end (SNS SMS to your test mobile). |
| **Day 22** | Create staging EC2 + staging RDS + staging Redis (repeat Steps 9–15 with -staging names). |
| **Day 25** | Steps 16–17: ALB + ACM certificate + Route 53 DNS. |
| **Day 25** | Step 20: WAF Web ACL, attach to ALB. |
| **Day 26** | Steps 21: CloudWatch agent, log groups, all 6 alarms. |
| **Day 27** | Step 22: GitHub Actions CI/CD pipeline live. |
| **Day 29** | Full QA on staging. Confirm SES + SNS SMS in production mode. |
| **Day 30** | Point prod domain. Enable RDS deletion protection. Enable Multi-AZ. |

---

## Monthly Cost Estimate (ap-south-1 Mumbai)

| Service | Dev | Production |
|---|---|---|
| EC2 t3.medium / t3.large | ~$30 | ~$60 |
| RDS db.t3.medium / db.r6g.large | ~$60 | ~$320 (Multi-AZ) |
| ElastiCache cache.t3.micro / cache.r6g.large | ~$12 | ~$130 |
| ALB | ~$18 | ~$25 |
| S3 (50 GB + requests) | ~$2 | ~$8 |
| Secrets Manager (7 secrets) | ~$3 | ~$3 |
| CloudWatch Logs & Alarms | ~$5 | ~$20 |
| SES (10k emails/month) | ~$1 | ~$3 |
| SNS SMS (10k OTPs @ ₹0.50 each) | — | ~$60 |
| Route 53 (1 hosted zone) | ~$0.50 | ~$0.50 |
| WAF | — | ~$10 |
| **Total** | **~$130/mo** | **~$640/mo** |

---

*Swabhiman Pawan Nidhi — Full AWS Infrastructure Guide | 100% Cloud, No Local DB*
*Node.js 20 + EC2 + RDS PostgreSQL 15 + ElastiCache Redis 7 + S3 + SES + SNS*
*ap-south-1 (Mumbai) | June 2026*
