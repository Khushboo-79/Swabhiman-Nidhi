**SWABHIMAN PAWAN NIDHI PVT. LTD.**

**Mobile Banking App**

Product Requirements Document

_Customer Panel - Consolidated Feature Specification_

**Version 1.0**

Document Status: Draft for Review

Date: June 22, 2026

Platforms: Android (native) & iOS (native)

_Prepared for internal product, engineering, design, and compliance review._

# Table of Contents

# 1\. Document Overview

## 1.1 Purpose of this Document

This Product Requirements Document (PRD) defines the complete customer-facing feature scope for the Swabhiman Pawan Nidhi Pvt. Ltd. mobile banking application. It consolidates the foundational customer panel feature set with an advanced feature set covering autopay, security, investments, family banking, and AI assistance, into a single source of truth for product, design, engineering, and compliance teams.

This document focuses on the customer-facing app and does not cover the internal admin/back-office panel, core banking system (CBS) integration architecture, or staff-side workflows, except where they directly affect a customer-facing feature.

## 1.2 Background

Swabhiman Pawan Nidhi Pvt. Ltd. is building a mobile banking application to give customers a fully digital channel for deposits, loans, payments, and account servicing. As a Non-Banking Financial Company (NBFC), certain features in this document (notably UPI issuance, debit/credit card issuance, and mutual fund/insurance distribution) require confirmation of the relevant banking, NPCI, or regulatory partnerships before they can be committed to a release scope. These dependencies are flagged inline under each affected module.

## 1.3 Goals

- Provide a complete, self-service digital banking experience that reduces branch and call-center dependency.
- Offer NBFC-core products - Fixed Deposits, Recurring Deposits, and Loans - as first-class, friction-free digital journeys.
- Build customer trust through a best-in-class Security Center with instant freeze/panic controls.
- Support financial inclusion through accessibility features and regional language support.
- Create a foundation that can extend into investments, insurance, and family banking as the business scales.

## 1.4 Out of Scope (this version)

- Admin/back-office/RM-facing panel and dashboards.
- Core banking system (CBS) and middleware integration specifications (covered in a separate Technical Integration Document).
- Marketing website and public-facing product pages.
- Detailed UI visual design (covered in a separate Design Specification, to be aligned with this PRD).

# 2\. Assumptions & Dependencies

The following assumptions and external dependencies apply across multiple modules in this document:

- UPI functionality (Sections 6, 25a-25c, 31-32) requires a sponsor/partner bank and NPCI PSP certification, since Swabhiman Pawan Nidhi is an NBFC.
- Debit/credit card issuance (Sections 8, 9, 19) requires a co-branded card-issuance partnership with a scheduled bank or RBI-authorized card network tie-up.
- Mutual fund, bonds, gold, and NPS distribution (Section 37) requires SEBI/AMFI-aligned distribution tie-ups or an RIA partnership.
- Insurance servicing and sales (Section 38) requires IRDAI corporate agency or broking licensing.
- Video KYC (Sections 24, 30) must comply with RBI's V-CIP (Video-based Customer Identification Process) guidelines.
- All authentication, transaction limits, beneficiary cooling-periods, and Positive Pay thresholds must be finalized with the Compliance/Risk team before development sign-off; figures referenced in this document are indicative.
- Locker management (Section 28) is conditional on Swabhiman Pawan Nidhi offering locker facilities.

# 3\. Release Prioritization Framework

Each module in this PRD is tagged with a priority to guide phased delivery:

- P0 - Launch Critical: Required for the first public release (MVP). The app is not viable without these.
- P1 - Phase 2: High-value features targeted for the release immediately following launch (typically within 3-6 months of MVP).
- P2 - Phase 3 / Strategic: Differentiating or revenue-expanding features that depend on business/partnership confirmations, targeted post-Phase 2.

The table below summarizes every module across both the foundational and advanced feature sets, in the same order they appear in the detailed specification.

| **Sec.** | **Module**                                           | **Category**             | **Priority**             |
| -------- | ---------------------------------------------------- | ------------------------ | ------------------------ |
| 1        | Splash & Onboarding                                  | Foundation               | **P0 - Launch Critical** |
| 2        | Authentication Module                                | Foundation               | **P0 - Launch Critical** |
| 3        | Home Dashboard                                       | Foundation               | **P0 - Launch Critical** |
| 4        | Accounts Module                                      | Foundation               | **P0 - Launch Critical** |
| 5        | Fund Transfer Module                                 | Money Movement           | **P0 - Launch Critical** |
| 6        | UPI Module                                           | Money Movement           | **P0 - Launch Critical** |
| 7        | QR Scanner Module                                    | Money Movement           | **P0 - Launch Critical** |
| 8        | Debit Card Module                                    | Cards                    | **P1 - Phase 2**         |
| 9        | Credit Card Module                                   | Cards                    | **P2 - Phase 3**         |
| 19       | Digital Card Features                                | Cards                    | **P2 - Phase 3**         |
| 10       | Fixed Deposit Module                                 | Deposits & Savings       | **P0 - Launch Critical** |
| 11       | Recurring Deposit Module                             | Deposits & Savings       | **P1 - Phase 2**         |
| 14       | Goal-Based Savings                                   | Deposits & Savings       | **P1 - Phase 2**         |
| 12       | Loan Module                                          | Loans                    | **P0 - Launch Critical** |
| 13       | Bill Payment Module                                  | Bills & Payments         | **P0 - Launch Critical** |
| 15       | Recharge Module                                      | Bills & Payments         | **P1 - Phase 2**         |
| 16       | Notifications Center                                 | Notifications & Service  | **P0 - Launch Critical** |
| 17       | Service Requests                                     | Notifications & Service  | **P1 - Phase 2**         |
| 18       | Customer Support                                     | Notifications & Service  | **P0 - Launch Critical** |
| 19b      | Document Center                                      | Notifications & Service  | **P1 - Phase 2**         |
| 20       | Profile Management                                   | Profile & Security       | **P0 - Launch Critical** |
| 21       | Security Center (Foundational)                       | Profile & Security       | **P0 - Launch Critical** |
| 23       | App Settings                                         | Profile & Security       | **P0 - Launch Critical** |
| 22       | Location-Based Features (Foundational)               | Smart Banking            | **P1 - Phase 2**         |
| 21b      | Smart Banking Features (AI Assistant - Foundational) | Smart Banking            | **P1 - Phase 2**         |
| 24       | Digital Onboarding (New User)                        | Smart Banking            | **P0 - Launch Critical** |
| 25a      | Personal QR Profile (Advanced)                       | Advanced Money Movement  | **P1 - Phase 2**         |
| 25b      | UPI Autopay                                          | Advanced Money Movement  | **P1 - Phase 2**         |
| 25c      | Mandate Management                                   | Advanced Money Movement  | **P1 - Phase 2**         |
| 25d      | Standing Instructions                                | Advanced Money Movement  | **P1 - Phase 2**         |
| 27       | Cheque Management                                    | Advanced Money Movement  | **P1 - Phase 2**         |
| 31       | Merchant Payments                                    | Advanced Money Movement  | **P1 - Phase 2**         |
| 32       | Scan Anything Module                                 | Advanced Money Movement  | **P2 - Phase 3**         |
| 41       | Beneficiary Management (Advanced)                    | Advanced Money Movement  | **P2 - Phase 3**         |
| 26       | FASTag Management                                    | Assets & Documents       | **P2 - Phase 3**         |
| 28       | Locker Management                                    | Assets & Documents       | **P2 - Phase 3**         |
| 29       | Nominee Management                                   | Assets & Documents       | **P0 - Launch Critical** |
| 30       | KYC Center                                           | Assets & Documents       | **P0 - Launch Critical** |
| 33       | Tax Center                                           | Assets & Documents       | **P1 - Phase 2**         |
| 34       | Rewards Module                                       | Rewards & Growth         | **P2 - Phase 3**         |
| 35       | Spending Analytics                                   | Rewards & Growth         | **P1 - Phase 2**         |
| 37       | Investment Dashboard                                 | Investments & Protection | **P2 - Phase 3**         |
| 38       | Insurance Dashboard                                  | Investments & Protection | **P2 - Phase 3**         |
| 44b      | Service Marketplace                                  | Investments & Protection | **P2 - Phase 3**         |
| 40       | Security Center (Advanced)                           | Advanced Security        | **P0 - Launch Critical** |
| 45       | Dispute Management                                   | Advanced Security        | **P0 - Launch Critical** |
| 39       | Family Banking                                       | Family & AI              | **P2 - Phase 3**         |
| 43       | AI Banking Assistant                                 | Family & AI              | **P1 - Phase 2**         |
| 44       | Location Services (Advanced)                         | Access & Location        | **P1 - Phase 2**         |
| 46       | Notification Hub (Advanced)                          | Access & Location        | **P1 - Phase 2**         |
| 47       | Offline Features                                     | Access & Location        | **P1 - Phase 2**         |
| 48       | Accessibility Features                               | Access & Location        | **P1 - Phase 2**         |
| 49       | Digital Banking Profile                              | Access & Location        | **P0 - Launch Critical** |

# 4\. Detailed Module Specifications

The sections that follow provide the detailed specification for every module: its purpose, key features, user flow (where applicable), and implementation notes. Modules are grouped by functional category for readability; the original section numbers from the source feature lists are retained for traceability.

# Foundation

## 1\. Splash & Onboarding

**Category:** Foundation **Priority: P0 - Launch Critical**

**Purpose**

Introduce first-time users to the app, set language and permissions, and register the device securely before any banking functionality is exposed.

**Key Features**

- App introduction / feature walkthrough screens (3-4 swipeable screens)
- Language selection (English, Hindi, and regional languages relevant to NBFC's operating states)
- Permissions setup: Camera, Notifications, Location, Contacts (optional)
- Device registration with device fingerprinting
- Trusted device setup (device binding to customer profile)

**User Flow**

**App Launch →**

**Language Selection →**

**Intro Walkthrough →**

**Permission Requests →**

**Device Registration →**

**Trusted Device Confirmation →**

**Login/Signup**

**_Note:_** _Device fingerprinting data (IMEI/Android ID/iOS identifierForVendor, OS version, app version) must be captured and stored against the customer's CIF for fraud monitoring and Security Center device-list features later._

## 2\. Authentication Module

**Category:** Foundation **Priority: P0 - Launch Critical**

**Purpose**

Provide secure, RBI-compliant, multi-mode login so customers can access the app quickly while keeping the account protected.

**Key Features**

- Traditional login: Customer ID + Password, Username + Password, Mobile Number + OTP
- Biometric login: Fingerprint, Face ID
- MPIN login: 4-digit and 6-digit MPIN support
- OTP verification and Two-Factor Authentication (2FA) on sensitive actions
- Device binding (one trusted device class per session policy)
- Root/Jailbreak detection with restricted-mode fallback
- Auto logout on inactivity (configurable timeout)
- Login attempt restrictions with progressive lockout

**User Flow**

**Enter Customer ID/Mobile →**

**Select Login Method →**

**OTP/Password/Biometric/MPIN Check →**

**2FA (if high-risk) →**

**Home Dashboard**

**_Note:_** _Rooted/jailbroken device detection should trigger a degraded mode (view-only) rather than a full block, with an option to contact support, to avoid false positives blocking legitimate users._

## 3\. Home Dashboard

**Category:** Foundation **Priority: P0 - Launch Critical**

**Purpose**

Give the customer a single-glance summary of their financial position and the fastest path to the most common actions.

**Key Features**

- Account summary cards: Savings balance, Current account balance, FD summary, Loan summary
- Quick actions: Send Money, Scan QR, UPI, Recharge, Pay Bills, Open FD
- Recent transactions: last 5 transactions, pending transactions
- Insights widgets: monthly spending, savings trends

**_Note:_** _Dashboard should be modular/card-based so cards can be reordered per customer segment (see Digital Banking Profile, Section 30) without a release._

## 4\. Accounts Module

**Category:** Foundation **Priority: P0 - Launch Critical**

**Purpose**

Let customers view detailed account information and retrieve statements without visiting a branch.

**Key Features**

- View all linked accounts with available balance and ledger balance
- Mini statement and detailed statement
- Statement download as PDF
- Email statement to registered email
- Digital passbook with transaction search and filter by date

# Money Movement

## 5\. Fund Transfer Module

**Category:** Money Movement **Priority: P0 - Launch Critical**

**Purpose**

Enable customers to move money within their own accounts and to third parties via all standard rails.

**Key Features**

- Internal transfer: self-account transfer, same-bank transfer
- External transfer: NEFT, RTGS, IMPS
- Beneficiary management: add, edit, delete beneficiary (with cooling period per RBI norms)
- Scheduled transfer and recurring transfer
- Favorite beneficiaries for one-tap repeat transfers

**User Flow**

**Select Transfer Type →**

**Select/Add Beneficiary →**

**Enter Amount & Remarks →**

**Review →**

**MPIN/OTP Authorization →**

**Success/Failure**

**_Note:_** _New beneficiary additions should enforce the regulatory cooling-off period (typically 30 minutes to 24 hours, confirm with compliance) before first transfer above a threshold._

## 6\. UPI Module

**Category:** Money Movement **Priority: P0 - Launch Critical**

**Purpose**

Provide full UPI functionality so customers can pay and collect using UPI ID or QR without leaving the app.

**Key Features**

- UPI profile: create UPI ID, link account, change UPI PIN
- Payments: scan & pay, pay to mobile number, pay to UPI ID, self transfer
- QR features: generate personal QR, share QR, download QR
- UPI transaction history with Success / Pending / Failed states

**_Note:_** _Must integrate with NPCI UPI switch via a certified PSP/sponsor bank since Swabhiman Pawan Nidhi is an NBFC, not a bank - UPI handle issuance requires a partner bank tie-up._

## 7\. QR Scanner Module

**Category:** Money Movement **Priority: P0 - Launch Critical**

**Purpose**

Provide a fast, camera-based entry point for all QR-based payments across merchant and personal use cases.

**Key Features**

- Scan merchant QR, personal QR, and dynamic QR
- In-app camera with auto-focus and torch toggle

**User Flow**

**Open Camera →**

**Scan QR →**

**Enter Amount →**

**UPI PIN →**

**Success**

# Cards

## 8\. Debit Card Module

**Category:** Cards **Priority: P1 - Phase 2**

**Purpose**

Give customers full self-service control over their physical debit card to reduce fraud and support-ticket volume.

**Key Features**

- View card (masked), block, unblock, hotlist card
- Security controls: ATM On/Off, POS On/Off, Online On/Off, International On/Off
- Set daily limits and per-transaction limits

**_Note:_** _Conditional on Swabhiman Pawan Nidhi issuing physical/virtual debit cards; confirm card-issuance partnership before committing to scope._

## 9\. Credit Card Module

**Category:** Cards **Priority: P2 - Phase 3**

**Purpose**

Allow credit card holders to manage their account and repay bills digitally.

**Key Features**

- View outstanding amount, available credit, bill due date, reward points
- Pay credit card bill
- Convert outstanding to EMI
- Request credit limit increase

**_Note:_** _Only applicable if/when Swabhiman Pawan Nidhi launches a co-branded credit card; flag as conditional scope pending business confirmation._

## 19\. Digital Card Features

**Category:** Cards **Priority: P2 - Phase 3**

**Purpose**

Provide safer card-based online payments through virtual and disposable card numbers.

**Key Features**

- Generate virtual card linked to the primary account
- Temporary card number for one-time use
- Disposable card number that self-expires after single transaction

# Deposits & Savings

## 10\. Fixed Deposit Module

**Category:** Deposits & Savings **Priority: P0 - Launch Critical**

**Purpose**

Let customers open and manage Fixed Deposits entirely in-app, a core NBFC product.

**Key Features**

- Open FD: select source account, enter amount, select tenure
- FD dashboard: active FDs, maturity amount, interest earned
- Premature closure
- Renewal instructions (auto-renew / payout on maturity)

**User Flow**

**Select Account →**

**Enter Amount →**

**Select Tenure →**

**View Projected Maturity →**

**Confirm & Authorize →**

**FD Created**

**_Note:_** _FD is a primary NBFC revenue product - interest-rate calculator should be visible before confirmation, pulling live rates from the core banking system (CBS)._

## 11\. Recurring Deposit Module

**Category:** Deposits & Savings **Priority: P1 - Phase 2**

**Purpose**

Allow disciplined, goal-oriented savings through recurring monthly deposits.

**Key Features**

- Open RD
- Modify RD (tenure/amount where policy allows)
- Close RD

## 14\. Goal-Based Savings

**Category:** Deposits & Savings **Priority: P1 - Phase 2**

**Purpose**

Help customers save toward specific life goals using behavioral nudges rather than generic deposits.

**Key Features**

- Predefined goals: Buy Car, Buy House, Vacation Fund, Emergency Fund (and custom goal creation)
- Auto-saving rules (round-up or fixed periodic transfer toward goal)
- Goal tracking with progress visualization

**_Note:_** _Should link to RD/FD products under the hood so goal savings are also yield-generating, not idle balances._

# Loans

## 12\. Loan Module

**Category:** Loans **Priority: P0 - Launch Critical**

**Purpose**

Provide loan visibility and self-service for existing borrowers, and a digital path to apply for new loans - central to an NBFC's business.

**Key Features**

- Loan dashboard: Home Loan, Personal Loan, Vehicle Loan
- EMI schedule, outstanding balance, foreclosure amount
- Eligibility check and apply online

**User Flow**

**Check Eligibility →**

**Select Loan Type & Amount →**

**Upload Documents →**

**Application Review →**

**Sanction/Reject →**

**Disbursal**

# Bills & Payments

## 13\. Bill Payment Module

**Category:** Bills & Payments **Priority: P0 - Launch Critical**

**Purpose**

Consolidate all recurring household bill payments into the app via BBPS rails.

**Key Features**

- BBPS integration
- Categories: Electricity, Water, Gas, Broadband, Credit Card Bills
- Save biller, Auto Pay, Scheduled payments

## 15\. Recharge Module

**Category:** Bills & Payments **Priority: P1 - Phase 2**

**Purpose**

Capture small-ticket, high-frequency recharge transactions to drive daily app engagement.

**Key Features**

- Mobile recharge
- DTH recharge
- FASTag recharge

**_Note:_** _FASTag recharge here is a quick-action shortcut; full FASTag management lives in its own module (Section 28)._

# Notifications & Service

## 16\. Notifications Center

**Category:** Notifications & Service **Priority: P0 - Launch Critical**

**Purpose**

Keep customers informed of account activity and important reminders in real time.

**Key Features**

- Alerts: debit alert, credit alert, failed transaction alert
- Push notifications: payment success, FD maturity reminder, EMI reminder

**_Note:_** _Consolidated further in the Advanced Notification Hub (Section 46), which adds categorization and promotional offers._

## 17\. Service Requests

**Category:** Notifications & Service **Priority: P1 - Phase 2**

**Purpose**

Digitize common branch service requests to reduce branch footfall.

**Key Features**

- Cheque book request, stop cheque
- Address update, mobile number update
- Track request status

**_Note:_** _Cheque-specific actions are expanded in the dedicated Cheque Management module (Section 25)._

## 18\. Customer Support

**Category:** Notifications & Service **Priority: P0 - Launch Critical**

**Purpose**

Provide multiple support channels matched to urgency and customer preference.

**Key Features**

- Raise ticket
- Live chat
- AI chatbot
- Call support

## 19b. Document Center

**Category:** Notifications & Service **Priority: P1 - Phase 2**

**Purpose**

Give customers a single place to download all official documents they need for tax, loan, or audit purposes.

**Key Features**

- Download: Account statement, FD receipt, Interest certificate, Loan statement

# Profile & Security

## 20\. Profile Management

**Category:** Profile & Security **Priority: P0 - Launch Critical**

**Purpose**

Let customers view and request updates to their core KYC and personal information.

**Key Features**

- Personal information: Name, PAN, Aadhaar, DOB
- Preferences: Language, Communication preferences

## 21\. Security Center (Foundational)

**Category:** Profile & Security **Priority: P0 - Launch Critical**

**Purpose**

Give customers visibility and control over how their account is being accessed.

**Key Features**

- Device management: view logged-in devices, logout other devices
- Security controls: change password, change MPIN, change transaction PIN
- Activity monitoring: login history, device history

**_Note:_** _Extended significantly by the Advanced Security Center (Section 40), which adds panic logout, freeze controls, and session monitoring._

## 23\. App Settings

**Category:** Profile & Security **Priority: P0 - Launch Critical**

**Purpose**

Allow customers to personalize the app experience.

**Key Features**

- Dark mode / Light mode
- Language selection
- Notification settings: SMS alerts, push notifications, email alerts

# Smart Banking

## 22\. Location-Based Features (Foundational)

**Category:** Smart Banking **Priority: P1 - Phase 2**

**Purpose**

Help customers find the nearest physical touchpoints using device GPS.

**Key Features**

- ATM locator
- Branch locator
- Cash deposit machine locator

**User Flow**

**Current Location →**

**Nearest ATM/Branch/CDM →**

**Directions**

**_Note:_** _Merged with expanded Location Services (Section 44), which adds Loan Center search._

## 21b. Smart Banking Features (AI Assistant - Foundational)

**Category:** Smart Banking **Priority: P1 - Phase 2**

**Purpose**

Introduce conversational, AI-assisted self-service for common account queries.

**Key Features**

- AI assistant: account queries, transfer assistance, spending analysis
- Personal finance management: expense tracking, budget planning, savings goals
- Financial insights: monthly spending categories, cash flow analysis

**_Note:_** _Superseded in detail by the dedicated AI Banking Assistant module (Section 43); kept here as the foundational dashboard-level entry point._

## 24\. Digital Onboarding (New User)

**Category:** Smart Banking **Priority: P0 - Launch Critical**

**Purpose**

Allow a prospective customer to open a new account fully digitally, without a branch visit, in compliance with RBI's Video KYC norms.

**Key Features**

- Mobile number entry and OTP verification
- PAN verification
- Aadhaar verification (Aadhaar-based e-KYC)
- Video KYC
- Account creation

**User Flow**

**Mobile Number →**

**OTP Verification →**

**PAN Verification →**

**Aadhaar Verification →**

**Video KYC →**

**Account Creation**

**_Note:_** _Video KYC must follow RBI's V-CIP guidelines: live agent-assisted or auto-mode with liveness check, geotagging, and an audit-trail recording stored per data-retention policy._

# Advanced Money Movement

## 25a. Personal QR Profile (Advanced)

**Category:** Advanced Money Movement **Priority: P1 - Phase 2**

**Purpose**

Extend the basic personal QR with sharing and offline-use options for everyday collection of payments.

**Key Features**

- Generate personal QR
- Share QR via WhatsApp
- Download QR
- Print QR

**_Note:_** _Builds on the QR generation already in the UPI Module (Section 6); this is the merchant/personal-collection-focused variant._

## 25b. UPI Autopay

**Category:** Advanced Money Movement **Priority: P1 - Phase 2**

**Purpose**

Let customers authorize recurring UPI debits for subscriptions and SIPs without manual approval each cycle.

**Key Features**

- Netflix Autopay
- SIP Autopay
- Insurance premium Autopay
- OTT subscription management

**_Note:_** _Built on the UPI Autopay (e-Mandate on UPI) framework via NPCI; requires PSP bank support for recurring mandates._

## 25c. Mandate Management

**Category:** Advanced Money Movement **Priority: P1 - Phase 2**

**Purpose**

Give customers a single screen to set up, view, and cancel all recurring-debit authorizations across UPI and NACH.

**Key Features**

- eNACH setup
- Recurring debit approval
- View active mandates
- Cancel mandates

**_Note:_** _Should present mandates from both UPI Autopay and eNACH in one unified list for customer clarity._

## 25d. Standing Instructions

**Category:** Advanced Money Movement **Priority: P1 - Phase 2**

**Purpose**

Automate routine, fixed-amount transfers the customer would otherwise do manually every month.

**Key Features**

- Monthly rent transfer
- Family transfer
- EMI auto transfer

## 27\. Cheque Management

**Category:** Advanced Money Movement **Priority: P1 - Phase 2**

**Purpose**

Digitize the full cheque lifecycle including fraud-prevention controls.

**Key Features**

- Cheque book request
- Stop cheque
- Positive Pay (cheque-detail confirmation before clearing, per RBI's CTS Positive Pay System)
- Cheque status tracking

**_Note:_** _Positive Pay confirmation should be mandatory above the RBI-specified threshold (₹50,000 currently for participating banks) to reduce cheque fraud._

## 31\. Merchant Payments

**Category:** Advanced Money Movement **Priority: P1 - Phase 2**

**Purpose**

Support merchant-side and business-side payment acceptance use cases.

**Key Features**

- Dynamic QR payment
- Store payments
- Business payments

## 32\. Scan Anything Module

**Category:** Advanced Money Movement **Priority: P2 - Phase 3**

**Purpose**

Make the scanner future-proof across all QR standards in the Indian payments ecosystem.

**Key Features**

- Static QR
- Dynamic QR
- Bharat QR

## 41\. Beneficiary Management (Advanced)

**Category:** Advanced Money Movement **Priority: P2 - Phase 3**

**Purpose**

Make repeat and bulk payments faster for power users (e.g., small businesses running payroll).

**Key Features**

- Favorites and nicknames for beneficiaries
- Group beneficiaries
- Bulk payments (e.g., payroll-style multi-payee transfers)

# Assets & Documents

## 26\. FASTag Management

**Category:** Assets & Documents **Priority: P2 - Phase 3**

**Purpose**

Let vehicle-owning customers manage FASTag entirely within the banking app.

**Key Features**

- View FASTag balance
- Recharge FASTag
- Vehicle management (multi-vehicle linking)
- Toll history

## 28\. Locker Management

**Category:** Assets & Documents **Priority: P2 - Phase 3**

**Purpose**

Give locker-renting customers visibility into their rental status without a branch visit.

**Key Features**

- View locker details
- Rent information
- Renewal request
- Nominee management for locker

**_Note:_** _Conditional on Swabhiman Pawan Nidhi offering locker facilities; confirm with business before build._

## 29\. Nominee Management

**Category:** Assets & Documents **Priority: P0 - Launch Critical**

**Purpose**

Allow customers to maintain accurate nominee records across all their accounts and deposits, a regulatory requirement.

**Key Features**

- Add nominee
- Modify nominee
- Remove nominee

## 30\. KYC Center

**Category:** Assets & Documents **Priority: P0 - Launch Critical**

**Purpose**

Provide self-service KYC maintenance so customers stay compliant without branch visits.

**Key Features**

- Aadhaar update
- PAN update
- Re-KYC
- Video KYC

**_Note:_** _Re-KYC flows should auto-trigger reminders based on risk-category-based periodicity (RBI mandates Re-KYC every 2/8/10 years depending on risk category)._

## 33\. Tax Center

**Category:** Assets & Documents **Priority: P1 - Phase 2**

**Purpose**

Help customers self-serve all tax-related documents at filing season, reducing branch/call-center load.

**Key Features**

- TDS certificate
- Interest certificate
- Form 15G
- Form 15H
- Tax statements

**_Note:_** _Form 15G/15H submission should be digitally signed/e-verified and timestamped for audit purposes._

# Rewards & Growth

## 34\. Rewards Module

**Category:** Rewards & Growth **Priority: P2 - Phase 3**

**Purpose**

Drive engagement and loyalty through a points/cashback program.

**Key Features**

- Reward points
- Cashback
- Gift voucher redemption

## 35\. Spending Analytics

**Category:** Rewards & Growth **Priority: P1 - Phase 2**

**Purpose**

Help customers understand and improve their spending habits using categorized transaction data.

**Key Features**

- Category tracking: Food, Travel, Fuel, Shopping, Entertainment
- Insights: monthly reports, savings suggestions

**_Note:_** _Requires merchant-category-code (MCC) based auto-categorization with manual override/recategorization by the customer._

# Investments & Protection

## 37\. Investment Dashboard

**Category:** Investments & Protection **Priority: P2 - Phase 3**

**Purpose**

Position the app as a broader wealth touchpoint, not just a transaction/deposit tool.

**Key Features**

- Mutual funds: SIP, Lumpsum
- Other investments: Bonds, Gold, NPS, Government securities

**_Note:_** _Requires tie-up with a SEBI-registered mutual fund distributor / AMC platform (e.g., via BSE StAR MF or an RIA partner) since this is outside standard NBFC licensing._

## 38\. Insurance Dashboard

**Category:** Investments & Protection **Priority: P2 - Phase 3**

**Purpose**

Let customers manage insurance policies bought through or linked to the bank, and never miss a renewal.

**Key Features**

- Manage policies: Life, Health, Motor insurance
- Renewal alerts
- Premium payments

**_Note:_** _Requires corporate agency/insurance-broking tie-up (IRDAI licensing) if Swabhiman Pawan Nidhi wants to sell, not just service, policies._

## 44b. Service Marketplace

**Category:** Investments & Protection **Priority: P2 - Phase 3**

**Purpose**

Turn the app into an acquisition channel for new lending and insurance products.

**Key Features**

- Apply for: Credit Card, Personal Loan, Home Loan, Insurance

# Advanced Security

## 40\. Security Center (Advanced)

**Category:** Advanced Security **Priority: P0 - Launch Critical**

**Purpose**

Give customers an emergency self-defense toolkit so they can lock down their entire banking relationship in seconds if they suspect fraud - the single most important trust-building feature for a digital-first NBFC.

**Key Features**

- Panic logout (kills all active sessions instantly)
- Freeze account
- Freeze card
- Disable UPI
- Disable internet banking
- Monitoring: device list, active sessions, login alerts

**User Flow**

**Customer Suspects Fraud →**

**Open Security Center →**

**Select Freeze/Disable Action →**

**Confirm via MPIN/Biometric →**

**Immediate Lock + SMS/Email Confirmation →**

**Guided Next Steps (Call Support/Raise Dispute)**

**_Note:_** _This module should be reachable within 2 taps from the home screen at all times (e.g., a persistent 'Emergency' icon), even when the user is mid-flow elsewhere in the app._

## 45\. Dispute Management

**Category:** Advanced Security **Priority: P0 - Launch Critical**

**Purpose**

Give customers a fast, self-service path to report and track suspected fraud or failed transactions.

**Key Features**

- Report failed transaction
- Raise chargeback
- Card dispute
- UPI dispute

**User Flow**

**Select Transaction →**

**Select Dispute Reason →**

**Upload Evidence (optional) →**

**Submit →**

**Track Resolution Status**

**_Note:_** _Should auto-link to RBI's Turn Around Time (TAT) commitments for UPI/card disputes and show the customer an expected resolution date._

# Family & AI

## 39\. Family Banking

**Category:** Family & AI **Priority: P2 - Phase 3**

**Purpose**

Extend the relationship to the whole household, increasing stickiness and cross-sell surface area.

**Key Features**

- Linked family accounts
- Child account monitoring
- Parent controls (spend limits, transaction visibility)

**_Note:_** _Must clearly define legal/consent model - linked-account visibility should require explicit consent from the linked account holder if they are an adult._

## 43\. AI Banking Assistant

**Category:** Family & AI **Priority: P1 - Phase 2**

**Purpose**

Provide a natural-language interface for routine queries and proactive financial nudges, reducing call-center load.

**Key Features**

- Queries: show balance, last transactions, FD rates, loan eligibility
- Smart insights: unusual spending alerts, budget recommendations

**_Note:_** _All balance/transaction disclosures via the assistant must pass through the same authentication context as the rest of the app - no bypassing auth via chat._

# Access & Location

## 44\. Location Services (Advanced)

**Category:** Access & Location **Priority: P1 - Phase 2**

**Purpose**

Extend the basic locator to cover loan-related physical touchpoints as well.

**Key Features**

- Find nearby: ATM, Branch, Cash Deposit Machine, Loan Center

## 46\. Notification Hub (Advanced)

**Category:** Access & Location **Priority: P1 - Phase 2**

**Purpose**

Give customers granular control over what they're notified about and how, reducing notification fatigue and opt-outs.

**Key Features**

- Categories: Transactions, Loans, FD Maturity, Security Alerts, Promotional Offers

**_Note:_** _Promotional offers must have an independent opt-out toggle, separate from transactional/security alerts which cannot be disabled, per RBI/TRAI guidelines._

## 47\. Offline Features

**Category:** Access & Location **Priority: P1 - Phase 2**

**Purpose**

Ensure customers in low-connectivity areas (common across NBFC semi-urban/rural reach) can still access critical information.

**Key Features**

- Last known balance (cached, clearly timestamped)
- Last statement (cached)
- Saved beneficiaries (read-only)
- Support contacts (always accessible)

**_Note:_** _All cached data must display a clear 'as of \[timestamp\]' label to prevent customers mistaking stale data for live balance._

## 48\. Accessibility Features

**Category:** Access & Location **Priority: P1 - Phase 2**

**Purpose**

Make the app usable for elderly, visually impaired, and regional-language-first customers - a critical inclusion requirement for an NBFC serving broad demographics.

**Key Features**

- Large fonts / adjustable text size
- Voice navigation
- Screen reader support (WCAG-aligned, TalkBack/VoiceOver compatible)
- Regional languages

## 49\. Digital Banking Profile

**Category:** Access & Location **Priority: P0 - Launch Critical**

**Purpose**

Surface core relationship metadata so customers (and support agents) have full context on the account relationship.

**Key Features**

- Customer ID
- CIF number
- Relationship Manager (name and contact, where assigned)
- Customer segment (e.g., Retail, Premium, Senior Citizen)

**_Note:_** _Customer segment should drive dashboard personalization (ref. Section 3 note) - e.g., Senior Citizen segment surfaces larger fonts and simplified navigation by default._

# 5\. Global Navigation

The following bottom navigation structure applies across the customer panel and should remain persistent and accessible from any screen depth:

- Home - Dashboard (Section 3)
- Payments - Fund Transfer, Bill Payment, Recharge (Sections 5, 13, 15)
- UPI Scan - QR Scanner / Scan Anything (Sections 7, 32)
- Accounts - Accounts Module (Section 4)
- Profile - Profile Management, Security Center, Settings (Sections 20, 21/40, 23)

_In addition, an always-accessible Emergency/Security shortcut (linked to Section 40 - Security Center Advanced) is strongly recommended as a persistent icon independent of the bottom navigation, given its role in fraud containment._

# 6\. Open Questions for Stakeholder Review

- Which banking/UPI partner will sponsor PSP services for the UPI Module and Autopay/Mandate features?
- Will Swabhiman Pawan Nidhi issue its own debit/credit cards, or partner with an existing card issuer?
- What is the confirmed list of supported regional languages for Phase 1 vs. later phases?
- What are the finalized transaction limits, beneficiary cooling-off periods, and Positive Pay thresholds per Compliance/Risk?
- Is Locker Management an active product offering, and if so, at how many branches?
- Will Investment Dashboard and Insurance Dashboard launch with real distribution licensing, or as a 'coming soon' / lead-capture experience in Phase 1?
- What is the customer segmentation model (Section 49) and how should it map to dashboard personalization rules?