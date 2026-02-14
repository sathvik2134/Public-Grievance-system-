# Public Grievance Management System

![AWS](https://img.shields.io/badge/Cloud-AWS-orange?logo=amazon-aws)
![Backend](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Frontend](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![AI](https://img.shields.io/badge/AI-BERT%20%7C%20DistilBERT-purple)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue?logo=postgresql)
![CI/CD](https://img.shields.io/badge/CI%2FCD-CodePipeline-red?logo=amazon-aws)


Cloud-Native | AI-Powered | Event-Driven | Scalable | Production-Ready

---

## Overview

The **Public Grievance Management System** is an AI-enabled, cloud-native platform designed to intelligently process, classify, and prioritize citizen complaints.

Unlike traditional grievance portals that only store requests, this system:

- Classifies complaints using NLP models  
- Dynamically prioritizes grievances  
- Uses event-driven microservices architecture  
- Runs on scalable AWS infrastructure  
- Implements user credibility modeling  



---

## System Architecture

### High-Level Workflow

```
User → Frontend → API Gateway → Backend Service → 
Amazon SQS → AI Processor (Lambda + SageMaker) → 
Priority Engine → PostgreSQL (RDS) → Admin Dashboard
```

---

### Architecture (Conceptual Diagram)

```
               ┌──────────────┐
               │   Frontend   │
               │ React / Next │
               └───────┬──────┘
                       │
                API Gateway
                       │
                Load Balancer
                       │
         ┌─────────────┴─────────────┐
         │        ECS Services       │
         │  Auth | Grievance | etc   │
         └─────────────┬─────────────┘
                       │
                   Amazon SQS
                       │
                 AWS Lambda
                       │
                 SageMaker AI
                       │
                Priority Engine
                       │
                Amazon RDS
                       │
                Admin Dashboard
```

---

## Tech Stack

### Frontend
- React / Next.js  
- JWT Authentication  
- Role-Based Access Control  
- Real-time status updates  
- Admin analytics dashboard  

### Backend
- Node.js / Express  
- Microservices architecture  
- REST APIs  
- JWT security  

### AI Layer
- Fine-tuned BERT / DistilBERT  
- Urgency & severity detection  
- Duplicate complaint detection  
- SageMaker hosted inference (<300ms latency)  

---

## AWS Infrastructure

| Component | Service |
|-----------|----------|
| API Management | API Gateway |
| Compute | ECS / EKS |
| Messaging | Amazon SQS |
| AI Inference | AWS Lambda |
| Model Hosting | SageMaker |
| Database | Amazon RDS (PostgreSQL) |
| Storage | Amazon S3 |
| Monitoring | CloudWatch |
| CI/CD | CodePipeline + CodeBuild |
| Container Registry | Amazon ECR |

---

## Intelligent Prioritization Engine

The system dynamically ranks grievances using AI and credibility modeling.

### User Credibility Score Based On:
- Valid complaint history  
- Resolution success rate  
- Spam detection history  
- Verification ratio  

### Priority Formula

```
Priority Score =
(Severity Weight × AI Urgency Score)
+ (User Credibility Score × 0.3)
+ (Number of Similar Complaints × 0.2)
```

Higher score → Higher queue position.

---

## Event-Driven Processing Flow

1. User submits grievance  
2. Backend pushes event to Amazon SQS  
3. Lambda triggers AI classification  
4. Model scores urgency & severity  
5. Priority engine computes ranking  
6. Database updated  
7. Dashboard reflects updated priority  

This decoupled design ensures horizontal scalability and fault tolerance.

---

## Database Design

**Primary Database:** Amazon RDS (PostgreSQL)

### Core Tables
- Users  
- Grievances  
- AI_Predictions  
- Priority_Scores  
- Resolution_History  

### Why PostgreSQL?

- Relational integrity  
- ACID compliance  
- Analytical queries  
- Audit logging  
- Reporting capabilities  

---

## Security Architecture

- JWT-based authentication  
- Role-based access control  
- HTTPS (TLS encryption)  
- AWS IAM policies  
- Encrypted database storage  
- S3 access policies  
- API rate limiting  

---

## CI/CD Pipeline

### Deployment Flow

1. Code pushed to GitHub  
2. GitHub webhook triggers CodePipeline  
3. CodeBuild runs:
   - Unit tests  
   - Linting  
   - Security scans  
   - Docker build  
4. Image pushed to ECR  
5. ECS updated  
6. Zero-downtime deployment  

---

## Scalability & Reliability

- Stateless microservices  
- Auto Scaling Groups  
- SQS-based asynchronous processing  
- Lambda auto-scaling inference  
- Application Load Balancer  
- CloudWatch monitoring & alerts  

---

## Project Structure

```
public-grievance-system/
│
├── frontend/
├── backend/
│   ├── auth-service/
│   ├── grievance-service/
│   ├── ai-service/
│   ├── priority-engine/
│
├── infrastructure/
│   ├── terraform/
│   ├── cloudformation/
│
├── model/
│   ├── training/
│   ├── inference/
│
└── ci-cd/
```



## Impact

This system ensures:

- Genuine grievances are prioritized  
- Spam is deprioritized  
- Departments receive structured, ranked complaints  
- Faster resolution cycles  
- Data-driven governance  




