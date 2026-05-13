# CayPay JSON Manager

Web application for generating and managing dynamic JSON test data for automated testing workflows.

Built to simplify the creation of complex payroll and employee-related test scenarios for QA automation.

---

## 🚀 Live Demo

🔗 https://json-manager-gamma.vercel.app/home

---

## 💡 Why I Built This

While working on automated testing for payroll SPA applications, creating and maintaining large JSON datasets manually became time-consuming and error-prone.

This tool was created to solve these challenges by:

- Automating complex test data generation
- Simplifying management of large employee datasets
- Speeding up creation of payroll-related testing scenarios
- Improving maintainability of automated test suites
- Reducing repetitive manual QA setup work

---

## ✨ Features

- Dynamic JSON test data generation
- Employee and payroll dataset management
- Import/export JSON files
- Editable data grid interface
- Reusable testing scenarios
- SPA-friendly architecture
- Automated End-to-End testing with Playwright
- Flexible and scalable test data structure

---

## 🛠 Tech Stack

### Frontend
- JavaScript
- React
- HTML5 / CSS3
- Material UI
- Vite

### Backend Utilities
- Node.js
- JSON-based data generation logic

### QA Automation
- Playwright (TypeScript)
- End-to-End Testing
- Regression Testing

### CI/CD & DevOps
- GitLab CI
- GitHub Actions
- Automated deployment scripts
- Vercel deployment

---

## 🏗 Architecture Overview

The project is organized as a modular full-stack application with separate frontend, backend utilities, and automated testing infrastructure.

Main modules include:

- Dynamic JSON generation
- Data import/export
- Employee dataset management
- Validation and editing layer
- Automated testing infrastructure
- CI/CD integration

---

## 📦 Project Structure

```text
/frontend               React client application
/backend                Node.js utilities and data generation logic
/playwright-report      Automated Playwright HTML reports
/.github/workflows      GitHub Actions pipelines
/.gitlab-ci.yml         GitLab CI configuration