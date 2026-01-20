# Employee Evaluation System

A web-based application for managing employee evaluations and tracking project hours, deployed on AWS EC2 using GitHub Actions CI/CD pipeline.

## 🚀 Live Demo

**Website:** `http://YOUR_EC2_PUBLIC_IP`

> Replace `YOUR_EC2_PUBLIC_IP` with your actual EC2 public IP address

## 📋 Features

- ✅ Employee Management (Add, Edit, Delete)
- ✅ Project Hours Tracking
- ✅ Manager Evaluations
- ✅ Automatic Performance Scoring
- ✅ Responsive Design

## 🛠️ Technologies

- **Frontend:** HTML, CSS, JavaScript
- **Containerization:** Docker (Nginx)
- **CI/CD:** GitHub Actions
- **Cloud:** AWS EC2

## 🔄 CI/CD Pipeline

This project uses GitHub Actions for automated deployment to AWS EC2.

### Deployment Workflow

```
Developer Push → GitHub → GitHub Actions → EC2 → Docker Container → Live Application
```

**Workflow File:** `.github/workflows/main.yml`

### Deployment Steps

1. **Checkout Code** - Pulls latest code from repository
2. **Copy Files to EC2** - Transfers files via SCP
3. **Deploy on EC2** - Builds Docker image and runs container

### Trigger

- Automatically deploys on every push to `master` branch

## 🐳 Docker

The application runs in a Docker container using Nginx as the web server.

**Build Image:**
```bash
docker build -t emp-app .
```

**Run Container:**
```bash
docker run -d --name emp-app -p 80:80 emp-app
```

## 📦 Repository Structure

```
.
├── .github/
│   └── workflows/
│       └── main.yml          # GitHub Actions deployment workflow
├── index.html                # Main HTML file
├── style.css                 # Styling
├── script.js                 # JavaScript logic
├── Dockerfile                # Docker configuration
├── .dockerignore             # Docker ignore rules
└── README.md                 # This file
```

## 🚀 Deployment

### Prerequisites

- AWS EC2 instance with Docker installed
- GitHub repository with Actions enabled
- GitHub Secrets configured:
  - `EC2_HOST` - EC2 public IP
  - `EC2_USER` - SSH username (ubuntu)
  - `EC2_SSH_KEY` - Private SSH key

### Deploy

Simply push to the `master` branch:

```bash
git add .
git commit -m "Your commit message"
git push origin master
```

GitHub Actions will automatically deploy to EC2.

## 📊 Deployment Status

Check deployment status in the [Actions](https://github.com/ADAMALMAQOUSI/Ltuc-employee---Shortcut/actions) tab.

## 👨‍💻 Author

**ADAMALMAQOUSI**
- GitHub: [@ADAMALMAQOUSI](https://github.com/ADAMALMAQOUSI)
- Email: adamalmaqousi8@gmail.com

## 📄 License

This project was created for educational purposes as part of a DevOps assignment.

## 🎓 Assignment

**Course:** DevOps  
**Assignment:** Moodle Final Exam - 20 marks  
**Topic:** DevOps pipeline using GitHub Actions

### Deliverables

1. ✅ Website URL deployed on AWS EC2
2. ✅ GitHub Repository
3. ✅ Deployment script (GitHub Actions YML)
