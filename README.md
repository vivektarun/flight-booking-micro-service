# ✈️ Advanced Microservices-based Airline Booking System

![Project Banner](./assets/banner.svg)

---

## 📖 Overview
The **Airline Booking System** is a **microservices-based, highly scalable, and distributed application** designed to handle airline reservations with **high availability** and **fault tolerance**.  

It is deployed on **AWS** with **auto-scaling** and **load balancing**, ensuring seamless performance under heavy traffic.

---

## 🏗️ System Architecture
- **Microservices Architecture & Scalability**  
  Architected using **independent services** for flights, bookings, notifications, and authentication.  
- **Flight Management Service**  
  Handles CRUD operations for flights with robust **SQL migrations** for database versioning.  
- **User Authentication Service**  
  Secured with **JWT tokens** and **bcrypt password encryption**.  
- **Booking Service with Concurrency Control**  
  Implements **seat selection** with **transactions and locks** to ensure data integrity.  
- **API Gateway & Rate Limiting**  
  Routes requests, acts as a **reverse proxy**, and manages traffic with **rate limiting**.  
- **Notification Service with RabbitMQ**  
  Manages **async notifications** with **message queues** for reliability.  

---

## 🗂️ Microservices Repositories
- ✈️ [Flight Service](https://github.com/vivektarun/flight-flights-micro-service)  
- 🧾 [Booking Service](https://github.com/vivektarun/flight-booking-micro-service)  
- 🔐 [API Gateway & Authentication Service](https://github.com/vivektarun/flight-Auth-micro-service)  
- 📩 [Notification Service](https://github.com/vivektarun/flight-notification-micro-service)  

---

## 🗄️ Database Design
📊 [View Database Diagram](https://dbdocs.io/vivektarun1234/Flight-project-database?view=relationships)

---

## 📚 Documentation
The project is fully documented with **MkDocs**.  
👉 [View Project Documentation](https://vivektarun.github.io/flight-project-docs/)

---

## 🚀 Features
- ✅ Scalable Microservices Architecture  
- ✅ Secure Authentication with JWT + bcrypt  
- ✅ Robust Booking with Concurrency Control  
- ✅ Distributed Messaging with RabbitMQ  
- ✅ API Gateway with Rate Limiting  
- ✅ AWS Deployment with Auto-Scaling & Load Balancing  

---

## ⚡ Tech Stack
- **Backend:** Node.js, Express  
- **Database:** MySQL / PostgreSQL  
- **Messaging Queue:** RabbitMQ  
- **Authentication:** JWT, bcrypt  
- **Deployment:** AWS (EC2, Load Balancer, Auto Scaling)  
- **Documentation:** MkDocs  

---

## 📌 Project Status
This project is under active development and continues to evolve with **new features and improvements**.  

---

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request for suggestions and improvements.

---

## 📜 License
This project is licensed under the **MIT License**.
