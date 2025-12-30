export type Skill = {
  _id: string;
  name: string;
  category: "se" | "devops" | "aiml" | "other";
  iconUrl: string;
  order: number;
};


export const skillsData: Skill[] = [
  // Software Engineering
  {
    _id: "1",
    name: "Java",
    category: "se",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    order: 1,
  },
  {
    _id: "2",
    name: "Spring Boot",
    category: "se",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    order: 2,
  },
  {
    _id: "3",
    name: "Node.js",
    category: "se",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    order: 3,
  },
  {
    _id: "4",
    name: "React",
    category: "se",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    order: 4,
  },
  {
    _id: "5",
    name: "TypeScript",
    category: "se",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    order: 5,
  },
  {
    _id: "6",
    name: "Next.js",
    category: "se",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    order: 6,
  },


  // DevOps
  {
    _id: "7",
    name: "AWS",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    order: 1,
  },
  {
    _id: "8",
    name: "Docker",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    order: 2,
  },
  {
    _id: "9",
    name: "Kubernetes",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    order: 3,
  },
  {
    _id: "10",
    name: "Jenkins",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
    order: 4,
  },
  {
    _id: "11",
    name: "Terraform",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
    order: 5,
  },
  {
    _id: "12",
    name: "GitHub Actions",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    order: 6,
  },


  // AI/ML
  {
    _id: "13",
    name: "Python",
    category: "aiml",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    order: 1,
  },
  {
    _id: "14",
    name: "TensorFlow",
    category: "aiml",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    order: 2,
  },
  {
    _id: "15",
    name: "PyTorch",
    category: "aiml",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    order: 3,
  },
  {
    _id: "16",
    name: "Pandas",
    category: "aiml",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    order: 4,
  },
  {
    _id: "17",
    name: "scikit-learn",
    category: "aiml",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
    order: 5,
  },
  {
    _id: "18",
    name: "Jupyter",
    category: "aiml",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
    order: 6,
  },


  // Other
  {
    _id: "19",
    name: "Git",
    category: "other",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    order: 1,
  },
  {
    _id: "20",
    name: "PostgreSQL",
    category: "other",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    order: 2,
  },
  {
    _id: "21",
    name: "MongoDB",
    category: "other",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    order: 3,
  },
  {
    _id: "22",
    name: "Redis",
    category: "other",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    order: 4,
  },
  {
    _id: "23",
    name: "GraphQL",
    category: "other",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    order: 5,
  },
  {
    _id: "24",
    name: "Postman",
    category: "other",
    iconUrl: "https://www.svgrepo.com/show/354202/postman-icon.svg",
    order: 6,
  },
];
