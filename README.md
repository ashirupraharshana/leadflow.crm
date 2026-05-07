# LeadFlow CRM – Full-Stack Lead Management System

LeadFlow CRM is a full-stack CRM Lead Management System developed for managing sales leads, tracking their progress through a sales pipeline, adding follow-up notes, and viewing key dashboard insights.

This project was built as a full-stack developer take-home assessment using React, Spring Boot, and MySQL.

---

## Project Overview

LeadFlow CRM helps a small sales team manage customer leads in one place. Users can register, log in, create leads, update lead statuses, add notes, search/filter leads, and view dashboard statistics.

The system covers the main CRM workflow:

- User authentication
- Lead management
- Sales pipeline tracking
- Lead notes
- Dashboard summary
- Search and filtering

---

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- React Router DOM
- Axios
- Bootstrap
- Lucide React Icons
- Custom CSS

### Backend
- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- BCrypt Password Hashing

### Database
- MySQL
- MySQL Workbench

### Tools
- IntelliJ IDEA
- VS Code
- Postman
- Git
- GitHub

---

## Features

### Authentication
- User registration
- User login
- Session-based authentication
- BCrypt password hashing
- Protected routes
- Logout
- Global API error handling
- Default admin account

### User Roles

Roles are stored as numeric values:

| Role | Meaning |
|---|---|
| 0 | USER |
| 1 | ADMIN |

Default registered users are saved with role `0`.

Default admin account:

```text
Email: admin@example.com
Password: password123
