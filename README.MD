# RentSure MVP 2

## Overview

RentSure MVP 2 is a validation prototype developed as part of the Principles of Software Engineering project. The prototype was designed to test the feasibility of a digital tenant–property matching system before the development of the full MVP 3 platform.

The primary goal of MVP 2 was to determine whether rental properties could be effectively matched with tenant requirements using a simple scoring algorithm and a lightweight web-based interface.

The prototype successfully demonstrated the core concept and provided valuable insights that informed the design of RentSure MVP 3.

---

## Problem Statement

Finding suitable rental accommodation remains a challenge for many tenants. Likewise, landlords and property agents often struggle to identify tenants whose requirements align with available properties.

Traditional approaches rely heavily on:

* Social media advertisements
* Word-of-mouth referrals
* Phone calls
* Physical property visits

These methods are often inefficient, time-consuming, and difficult to manage.

RentSure aims to improve this process through automated tenant–property matching.

---

## Objectives

The objectives of MVP 2 were:

* Validate the tenant–property matching concept.
* Develop a simple property management system.
* Develop a simple tenant requirement management system.
* Test a compatibility scoring mechanism.
* Evaluate usability and workflow effectiveness.
* Gather findings to guide MVP 3 development.

---

## Features

### Tenant Requirement Management

Users can:

* Add tenant requirements
* View requirements
* Edit requirements
* Delete requirements

### Property Management

Users can:

* Add properties
* View properties
* Edit properties
* Delete properties

### Matching Engine

The system evaluates compatibility between:

* Preferred location
* Property type
* Number of bedrooms
* Budget range

A match percentage is generated to indicate compatibility between a tenant requirement and a property listing.

### Local Storage Persistence

Data is stored directly in the browser using Local Storage.

Features include:

* Automatic saving
* Data persistence between sessions
* Backup support
* Restore support

### Dashboard Navigation

The application provides a simple user interface for:

* Managing properties
* Managing requirements
* Viewing match results

---

## Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla)

### Storage

* Browser Local Storage

### Development Tools

* Visual Studio Code
* Git
* GitHub

---

## System Workflow

### Step 1

Create a tenant requirement.

### Step 2

Create one or more property listings.

### Step 3

Run the matching engine.

### Step 4

The system calculates compatibility scores.

### Step 5

Suitable properties are recommended based on the calculated score.

---

## Matching Logic

The MVP 2 matching algorithm uses a simple weighted scoring approach.

Example:

| Criteria | Weight |
| -------- | ------ |
| Location | 40%    |
| Bedrooms | 30%    |
| Budget   | 30%    |

Final Match Score:

Match Percentage = Location Score + Bedroom Score + Budget Score

The resulting score is displayed to the user as a percentage.

---

## Validation Results

### What Worked Well

* Matching logic produced useful recommendations.
* Navigation was simple and intuitive.
* Data management was straightforward.
* Local Storage provided sufficient persistence for testing.
* The prototype successfully validated the project concept.

### Limitations Identified

* Single-user system.
* No authentication.
* No cloud database.
* No image uploads.
* No real-time communication.
* No role-based access control.
* Manual data entry required.

---

## Lessons Learned

The MVP 2 validation process provided several important insights:

1. Users value quick access to suitable matches.
2. The matching engine forms the core value proposition of RentSure.
3. Property images and richer listing details are necessary.
4. Authentication and user accounts are required for real-world deployment.
5. A cloud-hosted database is needed to support multiple users.

These findings directly influenced the development of RentSure MVP 3.

---

## Future Improvements (MVP 3)

RentSure MVP 3 extends the prototype by introducing:

### Tenant Features

* User registration
* User login
* Profile management
* Requirement creation
* Match recommendations

### Agent Features

* Property listing creation
* Property management
* Tenant matching

### System Features

* PostgreSQL database
* Supabase backend
* Authentication
* Image uploads
* Video uploads
* Real-time storage
* Multi-user support

---

## Sustainable Development Goal Alignment

### SDG 11 – Sustainable Cities and Communities

RentSure contributes to SDG 11 by:

* Improving housing accessibility.
* Reducing rental search time.
* Enhancing information transparency.
* Supporting digital transformation within housing markets.

---

## Repository Structure

```text
RentSure-MVP2/

├── index.html
├── styles.css
├── script.js
├── assets/
│
├── data/
│
├── backup/
│
└── README.md
```

## License

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to the conditions stated in the MIT License.

---

## Author

QuantumCodr

Principles of Software Engineering (PROG102)

RentSure MVP 2 Validation Prototype

2026
