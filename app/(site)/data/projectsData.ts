export type Project = {
  _id: string;
  title: string;
  slug: string;
  category: "se" | "devops" | "aiml";
  shortDescription: string;
  longDescription?: string;
  tags: string[];
  coverImage?: string;
  galleryImages: string[];
  techStack: string[];
  liveUrl?: string;
  demoUrl?: string;
  isFeatured: boolean;
  order: number;
};


export const projectsData: Project[] = [
  // Software Engineering Projects
  {
    _id: "1",
    title: "E-Commerce Platform",
    slug: "ecommerce-platform",
    category: "se",
    shortDescription: "Full-stack e-commerce platform with real-time inventory management and payment integration.",
    longDescription: `A comprehensive e-commerce solution built with modern web technologies. The platform features real-time inventory tracking, secure payment processing via Stripe, and an intuitive admin dashboard for managing products, orders, and customers.


Key Features:
• Real-time inventory updates using WebSockets
• Multi-vendor support with separate dashboards
• Advanced search and filtering capabilities
• Responsive design for mobile and desktop
• Secure authentication with JWT tokens
• Email notifications for order updates
• Analytics dashboard for sales insights`,
    tags: ["React", "Node.js", "MongoDB", "Stripe", "WebSocket"],
    coverImage: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
    ],
    techStack: ["React", "Next.js", "Node.js", "Express", "MongoDB", "Stripe API", "Socket.io", "Tailwind CSS"],
    liveUrl: "https://example-ecommerce.com",
    demoUrl: "https://demo-ecommerce.com",
    isFeatured: true,
    order: 1,
  },
  {
    _id: "2",
    title: "Task Management App",
    slug: "task-management-app",
    category: "se",
    shortDescription: "Collaborative task management tool with kanban boards, time tracking, and team analytics.",
    longDescription: `A powerful project management application designed for modern teams. Built with Spring Boot backend and React frontend, it provides intuitive task organization, real-time collaboration, and comprehensive reporting features.


Core Capabilities:
• Drag-and-drop kanban boards
• Sprint planning and backlog management
• Time tracking and effort estimation
• Team workload visualization
• Custom workflow automation
• Integration with Slack and email
• Export reports to PDF and Excel`,
    tags: ["Spring Boot", "React", "PostgreSQL", "Redis"],
    coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    ],
    techStack: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    liveUrl: "https://example-taskapp.com",
    isFeatured: true,
    order: 2,
  },
  {
    _id: "3",
    title: "Social Media Dashboard",
    slug: "social-media-dashboard",
    category: "se",
    shortDescription: "Analytics dashboard for tracking social media metrics across multiple platforms.",
    longDescription: `Unified social media analytics platform that aggregates data from Twitter, Instagram, Facebook, and LinkedIn. Provides real-time insights, sentiment analysis, and automated reporting.


Features:
• Multi-platform integration
• Real-time engagement tracking
• Sentiment analysis on comments
• Automated scheduled reports
• Competitor benchmarking
• Content performance insights
• AI-powered content suggestions`,
    tags: ["Node.js", "TypeScript", "GraphQL", "MongoDB"],
    coverImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    ],
    techStack: ["Node.js", "TypeScript", "GraphQL", "MongoDB", "React", "Chart.js", "Twitter API", "Instagram API"],
    demoUrl: "https://demo-socialdash.com",
    isFeatured: false,
    order: 3,
  },


  // DevOps Projects
  {
    _id: "4",
    title: "CI/CD Pipeline Automation",
    slug: "cicd-pipeline-automation",
    category: "devops",
    shortDescription: "Automated deployment pipeline with zero-downtime releases and comprehensive monitoring.",
    longDescription: `Enterprise-grade CI/CD pipeline built on Jenkins and GitHub Actions. Implements blue-green deployments, automated testing, security scanning, and infrastructure provisioning.


Pipeline Stages:
• Source code checkout and validation
• Unit and integration testing
• Security vulnerability scanning
• Docker image building and optimization
• Automated deployment to staging
• Smoke tests and health checks
• Production deployment with rollback capability
• Post-deployment monitoring and alerts


The pipeline reduced deployment time from 2 hours to 15 minutes while maintaining 99.9% uptime.`,
    tags: ["Jenkins", "Docker", "Kubernetes", "Terraform"],
    coverImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1667372335962-5fd503a8ae5b?w=600&h=400&fit=crop",
    ],
    techStack: ["Jenkins", "GitHub Actions", "Docker", "Kubernetes", "Terraform", "AWS", "Prometheus", "Grafana"],
    isFeatured: true,
    order: 1,
  },
  {
    _id: "5",
    title: "Infrastructure as Code",
    slug: "infrastructure-as-code",
    category: "devops",
    shortDescription: "Terraform modules for provisioning scalable AWS infrastructure with best practices.",
    longDescription: `Reusable Terraform modules for deploying production-ready AWS infrastructure. Includes VPC setup, EKS clusters, RDS databases, S3 storage, and CloudFront CDN configuration.


Infrastructure Components:
• Multi-AZ VPC with public and private subnets
• EKS cluster with auto-scaling node groups
• RDS PostgreSQL with automated backups
• ElastiCache for Redis caching
• Application Load Balancer with SSL/TLS
• CloudFront CDN for static assets
• Route53 DNS management
• IAM roles and security groups


All configurations follow AWS Well-Architected Framework principles with emphasis on security, reliability, and cost optimization.`,
    tags: ["Terraform", "AWS", "Infrastructure", "Cloud"],
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    ],
    techStack: ["Terraform", "AWS", "VPC", "EKS", "RDS", "CloudFront", "Route53"],
    demoUrl: "https://github.com/example/terraform-aws-modules",
    isFeatured: true,
    order: 2,
  },
  {
    _id: "6",
    title: "Monitoring Stack",
    slug: "monitoring-stack",
    category: "devops",
    shortDescription: "Comprehensive monitoring solution with Prometheus, Grafana, and custom alerting rules.",
    longDescription: `Complete observability stack for microservices architecture. Provides metrics collection, visualization, alerting, and distributed tracing capabilities.


Monitoring Features:
• Prometheus for metrics collection
• Grafana dashboards for visualization
• AlertManager for intelligent alerting
• Loki for log aggregation
• Jaeger for distributed tracing
• Custom exporters for application metrics
• SLA/SLO tracking and reporting
• On-call rotation management`,
    tags: ["Prometheus", "Grafana", "Kubernetes", "Monitoring"],
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop",
    ],
    techStack: ["Prometheus", "Grafana", "AlertManager", "Loki", "Jaeger", "Kubernetes", "Docker"],
    isFeatured: false,
    order: 3,
  },


  // AI/ML Projects
  {
    _id: "7",
    title: "Sentiment Analysis API",
    slug: "sentiment-analysis-api",
    category: "aiml",
    shortDescription: "RESTful API for real-time sentiment analysis of text using transformer models.",
    longDescription: `Production-ready sentiment analysis service built with Python and FastAPI. Uses fine-tuned BERT models to classify text sentiment with high accuracy across multiple languages.


Technical Implementation:
• Fine-tuned BERT model on custom dataset
• FastAPI for high-performance REST endpoints
• Redis caching for frequently analyzed texts
• Batch processing support for large volumes
• Multi-language support (English, Spanish, French)
• Confidence scores and emotion detection
• Rate limiting and authentication
• Deployed on AWS Lambda with auto-scaling


Model Performance:
• 94% accuracy on test dataset
• Sub-100ms response time for single predictions
• Processes 1000+ requests per second
• Support for texts up to 5000 characters`,
    tags: ["Python", "TensorFlow", "NLP", "FastAPI"],
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop",
    ],
    techStack: ["Python", "PyTorch", "FastAPI", "BERT", "Redis", "Docker", "AWS Lambda"],
    liveUrl: "https://api-sentiment.example.com",
    demoUrl: "https://demo-sentiment.example.com",
    isFeatured: true,
    order: 1,
  },
  {
    _id: "8",
    title: "Image Classification Model",
    slug: "image-classification-model",
    category: "aiml",
    shortDescription: "CNN-based image classifier for product categorization with 96% accuracy.",
    longDescription: `Deep learning model for automated product image classification. Built using transfer learning with ResNet50, achieving state-of-the-art accuracy on custom e-commerce dataset.


Model Architecture:
• Transfer learning from ResNet50
• Custom classification head with dropout
• Data augmentation pipeline
• Mixed precision training
• Learning rate scheduling
• Early stopping and model checkpointing


Dataset & Training:
• 100,000+ labeled product images
• 50 product categories
• Trained on NVIDIA A100 GPUs
• Training time: 8 hours
• 96.2% validation accuracy
• 95.8% test accuracy


Deployment:
• TensorFlow Serving for inference
• REST API with FastAPI
• Average inference time: 45ms
• Batch processing support
• Kubernetes deployment with auto-scaling`,
    tags: ["Python", "PyTorch", "CNN", "Computer Vision"],
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop",
    ],
    techStack: ["Python", "PyTorch", "ResNet", "OpenCV", "FastAPI", "TensorFlow Serving", "Docker"],
    demoUrl: "https://demo-imageclassify.example.com",
    isFeatured: true,
    order: 2,
  },
  {
    _id: "9",
    title: "Recommendation Engine",
    slug: "recommendation-engine",
    category: "aiml",
    shortDescription: "Collaborative filtering recommendation system for personalized content suggestions.",
    longDescription: `Advanced recommendation engine using collaborative filtering and content-based approaches. Powers personalized recommendations for e-commerce platform with 10M+ users.


Recommendation Strategies:
• User-based collaborative filtering
• Item-based collaborative filtering
• Matrix factorization (SVD)
• Content-based filtering
• Hybrid ensemble approach
• Real-time personalization
• Cold start handling


System Features:
• Real-time recommendation updates
• A/B testing framework
• Explainable recommendations
• Diversity and novelty optimization
• Scalable to millions of users
• Sub-second response times


Business Impact:
• 35% increase in click-through rate
• 28% boost in conversion rate
• 42% improvement in user engagement
• Personalized for each user session`,
    tags: ["Python", "scikit-learn", "Spark", "Collaborative Filtering"],
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    ],
    techStack: ["Python", "scikit-learn", "Apache Spark", "Redis", "PostgreSQL", "FastAPI"],
    isFeatured: false,
    order: 3,
  },
];
