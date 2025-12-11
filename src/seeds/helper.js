 const users = [
  {
    firstName: "John",
    lastName: "Doe",
    about: "Full-stack developer with a passion for scalable systems.",
    email: "john.doe@example.com",
    password: "Password@123",
    age: 28,
    gender: "male",
    photoUrl: "https://i.pravatar.cc/150?img=1",
    skils: ["javascript", "react", "node"]
  },

  {
    firstName: "Sarah",
    lastName: "Lee",
    about: "Backend engineer experienced in Node.js and SQL.",
    email: "sarah.lee@example.com",
    password: "Password@123",
    age: 32,
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?img=5",
    skils: ["node", "express", "postgres"]
  },

  {
    firstName: "Arun",
    lastName: "Menon",
    about: "Developer from Kerala focusing on clean UI and UX.",
    email: "arun.menon@example.com",
    password: "Password@123",
    age: 24,
    gender: "male",
    photoUrl: "https://i.pravatar.cc/150?img=12",
    skils: ["angular", "typescript", "tailwind"]
  },

  {
    firstName: "Sneha",
    lastName: "Ravi",
    about: "Data analyst transitioning into full-stack development.",
    email: "sneha.ravi@example.com",
    password: "Password@123",
    age: 27,
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?img=32",
    skils: ["python", "sql", "ml"]
  },

  {
    firstName: "Alex",
    lastName: "King",
    about: "Cloud-native API developer.",
    email: "alex.king@example.com",
    password: "Password@123",
    age: 30,
    gender: "other",
    photoUrl: "https://i.pravatar.cc/150?img=67",
    skils: ["aws", "docker", "microservices"]
  }
];


const users2 = [
  {
    firstName: "John",
    lastName: "Doe",
    about: "Enthusiastic MERN stack developer.",
    email: "john.doe@example.com",
    password: "Password@123",
    age: 27,
    gender: "male",
    photoUrl: "https://i.pravatar.cc/150?img=1",
    skils: ["javascript", "node"]
  },
  {
    firstName: "Sarah",
    lastName: "Lee",
    about: "Backend engineer exploring distributed systems.",
    email: "sarah.lee@example.com",
    password: "Password@123",
    age: 31,
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?img=2",
    skils: ["node", "postgres"]
  },
  {
    firstName: "Arun",
    lastName: "Menon",
    about: "UI developer focused on clean design.",
    email: "arun.menon@example.com",
    password: "Password@123",
    age: 24,
    gender: "male",
    photoUrl: "https://i.pravatar.cc/150?img=3",
    skils: ["angular", "tailwind"]
  },
  {
    firstName: "Priya",
    lastName: "Nair",
    about: "Frontend developer specializing in modern JS.",
    email: "priya.nair@example.com",
    password: "Password@123",
    age: 29,
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?img=4",
    skils: ["react", "javascript"]
  },
  {
    firstName: "Alex",
    lastName: "King",
    about: "Cloud-native microservices developer.",
    email: "alex.king@example.com",
    password: "Password@123",
    age: 33,
    gender: "other",
    photoUrl: "https://i.pravatar.cc/150?img=5",
    skils: ["docker", "aws"]
  },
  {
    firstName: "David",
    lastName: "Young",
    about: "DevOps engineer with automation passion.",
    email: "david.young@example.com",
    password: "Password@123",
    age: 35,
    gender: "male",
    photoUrl: "https://i.pravatar.cc/150?img=6",
    skils: ["ci/cd", "kubernetes"]
  },
  {
    firstName: "Sneha",
    lastName: "Ravi",
    about: "Data analyst moving into full-stack work.",
    email: "sneha.ravi@example.com",
    password: "Password@123",
    age: 26,
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?img=7",
    skils: ["python", "sql"]
  },
  {
    firstName: "Rohan",
    lastName: "Das",
    about: "Node.js backend engineer.",
    email: "rohan.das@example.com",
    password: "Password@123",
    age: 28,
    gender: "male",
    photoUrl: "https://i.pravatar.cc/150?img=8",
    skils: ["node", "express"]
  },
  {
    firstName: "Meera",
    lastName: "Roy",
    about: "Passionate UI/UX designer turned frontend dev.",
    email: "meera.roy@example.com",
    password: "Password@123",
    age: 25,
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?img=9",
    skils: ["figma", "react"]
  },
  {
    firstName: "Kevin",
    lastName: "Paul",
    about: "API engineer focusing on performance.",
    email: "kevin.paul@example.com",
    password: "Password@123",
    age: 30,
    gender: "male",
    photoUrl: "https://i.pravatar.cc/150?img=10",
    skils: ["node", "redis"]
  },
  {
    firstName: "Anu",
    lastName: "Mathew",
    about: "Web developer specializing in accessibility.",
    email: "anu.mathew@example.com",
    password: "Password@123",
    age: 27,
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?img=11",
    skils: ["html", "css"]
  },
  {
    firstName: "Sam",
    lastName: "Wills",
    about: "Security-focused backend engineer.",
    email: "sam.wills@example.com",
    password: "Password@123",
    age: 34,
    gender: "male",
    photoUrl: "https://i.pravatar.cc/150?img=12",
    skils: ["security", "jwt"]
  },
  {
    firstName: "Linda",
    lastName: "George",
    about: "Frontend dev building scalable UI systems.",
    email: "linda.george@example.com",
    password: "Password@123",
    age: 28,
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?img=13",
    skils: ["react", "redux"]
  },
  {
    firstName: "Nikhil",
    lastName: "Singh",
    about: "Typescript lover and clean coder.",
    email: "nikhil.singh@example.com",
    password: "Password@123",
    age: 29,
    gender: "male",
    photoUrl: "https://i.pravatar.cc/150?img=14",
    skils: ["typescript", "node"]
  },
  {
    firstName: "Asha",
    lastName: "Varma",
    about: "Building modern dashboards and analytics tools.",
    email: "asha.varma@example.com",
    password: "Password@123",
    age: 26,
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?img=15",
    skils: ["react", "chartjs"]
  },
  {
    firstName: "Tom",
    lastName: "Hill",
    about: "Software engineer focusing on performance tuning.",
    email: "tom.hill@example.com",
    password: "Password@123",
    age: 36,
    gender: "male",
    photoUrl: "https://i.pravatar.cc/150?img=16",
    skils: ["node", "profiling"]
  },
  {
    firstName: "Rita",
    lastName: "Dev",
    about: "Creative frontend engineer.",
    email: "rita.dev@example.com",
    password: "Password@123",
    age: 23,
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?img=17",
    skils: ["vue", "css"]
  },
  {
    firstName: "Vishal",
    lastName: "Jain",
    about: "Full-stack generalist who loves learning.",
    email: "vishal.jain@example.com",
    password: "Password@123",
    age: 30,
    gender: "male",
    photoUrl: "https://i.pravatar.cc/150?img=18",
    skils: ["react", "node"]
  },
  {
    firstName: "Divya",
    lastName: "Shah",
    about: "Engineer focusing on microservice design.",
    email: "divya.shah@example.com",
    password: "Password@123",
    age: 32,
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?img=19",
    skils: ["microservices", "docker"]
  },
  {
    firstName: "Rex",
    lastName: "Jose",
    about: "Backend developer specializing in SQL systems.",
    email: "rex.jose@example.com",
    password: "Password@123",
    age: 28,
    gender: "male",
    photoUrl: "https://i.pravatar.cc/150?img=20",
    skils: ["sql", "node"]
  }
];

module.exports ={
users2,users
} 
