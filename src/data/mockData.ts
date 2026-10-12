import type {
  StudentProfile,
  SkillItem,
  Company,
  PlannerTask,
  TechnicalTopic,
  BehavioralQuestion
} from '../types';

export const initialStudentProfile: StudentProfile = {
  fullName: 'Arjun Sharma',
  email: 'arjun.sharma@peak.edu',
  branch: 'Computer Science & Engineering',
  currentYear: '3rd Year',
  cgpa: 8.35,
  dailyStudyHours: 4,
  targetPackage: '15 LPA',
  completedTasksCount: 22,
  currentStreakDays: 14,
  currentElevationMeters: 5420, // High Ridge elevation towards 8,848m Summit
};

export const initialSkills: SkillItem[] = [
  {
    id: 'cpp',
    name: 'C++',
    category: 'Languages',
    level: 'Advanced',
    requiredFor: {
      '10 LPA': 'Intermediate',
      '15 LPA': 'Intermediate',
      '20 LPA': 'Advanced',
    },
    description: 'Modern C++20, STL algorithms, move semantics, memory management, and cache-friendly data structures.',
    practiceCount: 168,
    recommendedHours: 15,
    altitudeGainMeters: 650,
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Languages',
    level: 'Intermediate',
    requiredFor: {
      '10 LPA': 'Intermediate',
      '15 LPA': 'Intermediate',
      '20 LPA': 'Advanced',
    },
    description: 'OOP architectural patterns, Collections internals, JVM garbage collection, concurrency utilities.',
    practiceCount: 94,
    recommendedHours: 20,
    altitudeGainMeters: 520,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Languages',
    level: 'Beginner',
    requiredFor: {
      '10 LPA': 'Beginner',
      '15 LPA': 'Intermediate',
      '20 LPA': 'Intermediate',
    },
    description: 'Generators, decorators, algorithmic scripting, dynamic typing pitfalls, and memory profiling.',
    practiceCount: 52,
    recommendedHours: 25,
    altitudeGainMeters: 400,
  },
  {
    id: 'sql',
    name: 'SQL & Database Architecture',
    category: 'Core CS',
    level: 'Intermediate',
    requiredFor: {
      '10 LPA': 'Intermediate',
      '15 LPA': 'Intermediate',
      '20 LPA': 'Advanced',
    },
    description: 'Complex multi-table joins, indexing strategies (B-Tree/Hash), transaction isolation (ACID), and query explain plans.',
    practiceCount: 78,
    recommendedHours: 18,
    altitudeGainMeters: 610,
  },
  {
    id: 'dsa',
    name: 'DSA: Trees, Graphs & Dynamic Programming',
    category: 'Problem Solving',
    level: 'Intermediate',
    requiredFor: {
      '10 LPA': 'Intermediate',
      '15 LPA': 'Advanced',
      '20 LPA': 'Advanced',
    },
    description: 'Segment Trees, Dijkstra/Bellman-Ford, Tree LCA, Knapsack & LCS DP patterns, Disjoint Set Union.',
    practiceCount: 245,
    recommendedHours: 45,
    altitudeGainMeters: 980,
  },
  {
    id: 'webdev',
    name: 'Fullstack & Scalable Web Services',
    category: 'Development',
    level: 'Intermediate',
    requiredFor: {
      '10 LPA': 'Beginner',
      '15 LPA': 'Intermediate',
      '20 LPA': 'Advanced',
    },
    description: 'React, Node/TypeScript microservices, event-driven pub/sub, REST APIs, idempotency keys, and JWT authentication.',
    practiceCount: 16,
    recommendedHours: 35,
    altitudeGainMeters: 740,
  },
  {
    id: 'system_design',
    name: 'System Design (HLD & Scalability)',
    category: 'Development',
    level: 'Beginner',
    requiredFor: {
      '10 LPA': 'Unexplored',
      '15 LPA': 'Beginner',
      '20 LPA': 'Advanced',
    },
    description: 'Distributed caching (Redis), CDN edge caching, DB horizontal sharding, load balancers, rate limiting, and CAP theorem.',
    practiceCount: 10,
    recommendedHours: 40,
    altitudeGainMeters: 850,
  },
  {
    id: 'os',
    name: 'Operating Systems & Concurrency',
    category: 'Core CS',
    level: 'Intermediate',
    requiredFor: {
      '10 LPA': 'Intermediate',
      '15 LPA': 'Intermediate',
      '20 LPA': 'Advanced',
    },
    description: 'Multi-threading, mutexes vs semaphores, paging & virtual memory, deadlock avoidance algorithms, and CPU scheduling.',
    practiceCount: 65,
    recommendedHours: 16,
    altitudeGainMeters: 560,
  },
  {
    id: 'networks',
    name: 'Computer Networks & Protocols',
    category: 'Core CS',
    level: 'Beginner',
    requiredFor: {
      '10 LPA': 'Intermediate',
      '15 LPA': 'Intermediate',
      '20 LPA': 'Advanced',
    },
    description: 'TCP/IP socket architecture, 3-way handshake, DNS recursion, TLS 1.3 handshake, and HTTP/2 vs HTTP/3 multiplexing.',
    practiceCount: 42,
    recommendedHours: 20,
    altitudeGainMeters: 480,
  },
];

export const mockCompanies: Company[] = [
  {
    id: 'phonepe',
    name: 'PhonePe',
    industry: 'High-Volume Fintech',
    role: 'Software Development Engineer - I',
    ctcBracket: '₹22 - 28 LPA',
    minCgpa: 7.5,
    location: 'Bengaluru / Pune',
    hiringType: 'On-Campus',
    deadlineDate: '2026-10-18',
    daysRemaining: 4,
    logoInitial: 'PP',
    accentColor: '#6366f1',
    ascentMatchPercent: 94,
    interviewStages: [
      { stage: 1, title: 'Online Coding Sprint', description: '3 algorithmic challenges on Graphs & Dynamic Programming + 10 CS core MCQs (90 mins)' },
      { stage: 2, title: 'Technical Ascent Round 1', description: 'Live coding on complex data structures, edge cases, and runtime complexity proofs' },
      { stage: 3, title: 'Technical Ascent Round 2', description: 'Low Level Design (LLD), concurrency handling, and clean modular code' },
      { stage: 4, title: 'Engineering Leadership', description: 'Architectural trade-offs, engineering integrity, and ownership culture' }
    ],
    keySkills: ['DSA', 'Java', 'SQL', 'System Design'],
    resources: [
      { title: 'PhonePe Previous OA Algorithmic Archive', url: '#', type: 'Questions' },
      { title: 'Concurrency & Locking Architecture Guide', url: '#', type: 'Guide' },
      { title: 'High-Scale OA Mock Environment', url: '#', type: 'Mock Test' }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon India',
    industry: 'Big Tech / Hyperscale',
    role: 'Software Development Engineer - 1',
    ctcBracket: '₹28 - 36 LPA',
    minCgpa: 7.0,
    location: 'Hyderabad / Bengaluru',
    hiringType: 'Pool Drive',
    deadlineDate: '2026-10-24',
    daysRemaining: 10,
    logoInitial: 'AM',
    accentColor: '#f59e0b',
    ascentMatchPercent: 88,
    interviewStages: [
      { stage: 1, title: 'Online Assessment (OA)', description: '2 LeetCode Medium/Hard challenges + Work Simulation assessment' },
      { stage: 2, title: 'Technical Round 1', description: 'Trees, Graphs, and binary search on solution space' },
      { stage: 3, title: 'Technical Round 2', description: 'Object-Oriented Design, data structure selection, and fault tolerance' },
      { stage: 4, title: 'Bar Raiser Round', description: '16 Leadership Principles evaluated via rigorous STAR behavioral probe' }
    ],
    keySkills: ['DSA', 'C++', 'Java', 'System Design'],
    resources: [
      { title: 'Amazon Top 50 LeetCode Frequency Sheet', url: '#', type: 'Questions' },
      { title: '16 Leadership Principles STAR Handbook', url: '#', type: 'Guide' },
      { title: 'Real-Time OA Simulator (90 mins)', url: '#', type: 'Mock Test' }
    ]
  },
  {
    id: 'atlassian',
    name: 'Atlassian',
    industry: 'Enterprise SaaS',
    role: 'Associate Software Engineer',
    ctcBracket: '₹26 - 32 LPA',
    minCgpa: 8.0,
    location: 'Bengaluru (Remote-First)',
    hiringType: 'On-Campus',
    deadlineDate: '2026-10-21',
    daysRemaining: 7,
    logoInitial: 'AT',
    accentColor: '#06b6d4',
    ascentMatchPercent: 91,
    interviewStages: [
      { stage: 1, title: 'Karat Technical Screen', description: '60-minute live coding session focused on algorithmic speed & clarity' },
      { stage: 2, title: 'Code Crafting & Refactoring', description: 'Writing extensible, test-driven production code under time constraints' },
      { stage: 3, title: 'System Scalability', description: 'Designing rate limiters, notification systems, and distributed caches' },
      { stage: 4, title: 'Values & Team Ascent', description: 'Open Company No Bullshit, Be the Change You Seek' }
    ],
    keySkills: ['DSA', 'Web Dev', 'System Design', 'Java'],
    resources: [
      { title: 'Atlassian Karat Round Pattern Guide', url: '#', type: 'Guide' },
      { title: 'Clean Architecture Practice Problems', url: '#', type: 'Questions' }
    ]
  },
  {
    id: 'oracle',
    name: 'Oracle Cloud Infrastructure (OCI)',
    industry: 'Enterprise Cloud Platforms',
    role: 'Member Technical Staff',
    ctcBracket: '₹18 - 24 LPA',
    minCgpa: 8.0,
    location: 'Bengaluru / Hyderabad',
    hiringType: 'On-Campus',
    deadlineDate: '2026-10-28',
    daysRemaining: 14,
    logoInitial: 'OR',
    accentColor: '#10b981',
    ascentMatchPercent: 95,
    interviewStages: [
      { stage: 1, title: 'Written Screening', description: 'Core CS fundamentals (OS, Networks, DBMS) + 2 coding problems' },
      { stage: 2, title: 'Systems & OS Round', description: 'Virtual memory internals, POSIX threads, socket programming, and locks' },
      { stage: 3, title: 'Database & Data Structures', description: 'B-Tree leaf balancing, SQL indexing mechanics, and cache locality' },
      { stage: 4, title: 'Technical Director Chat', description: 'System trade-offs, engineering passion, and architectural vision' }
    ],
    keySkills: ['C++', 'SQL', 'OS', 'DSA'],
    resources: [
      { title: 'Oracle OCI Systems Fundamentals Deck', url: '#', type: 'Guide' },
      { title: 'Top 35 Database Engine Questions', url: '#', type: 'Questions' }
    ]
  },
  {
    id: 'goldman',
    name: 'Goldman Sachs',
    industry: 'Global Investment Banking',
    role: 'Analyst - Engineering',
    ctcBracket: '₹24 - 30 LPA',
    minCgpa: 8.2,
    location: 'Bengaluru',
    hiringType: 'Pool Drive',
    deadlineDate: '2026-11-02',
    daysRemaining: 19,
    logoInitial: 'GS',
    accentColor: '#f59e0b',
    ascentMatchPercent: 86,
    interviewStages: [
      { stage: 1, title: 'Aptitude & Math Screen', description: 'Probability, discrete mathematics, quant reasoning, and logic' },
      { stage: 2, title: 'Technical Coding Round', description: 'Advanced string algorithms, Dynamic Programming, and coordinate math' },
      { stage: 3, title: 'Systems Architecture', description: 'Cache-conscious code, memory footprint optimization, and low latency' },
      { stage: 4, title: 'Managing Director Behavioral', description: 'Decision making under pressure and teamwork' }
    ],
    keySkills: ['C++', 'Java', 'DSA', 'SQL'],
    resources: [
      { title: 'Goldman Sachs Quant & Logic Pack', url: '#', type: 'Questions' },
      { title: 'Low-Latency Algorithmic Cheatsheet', url: '#', type: 'Guide' }
    ]
  },
  {
    id: 'cisco',
    name: 'Cisco Systems',
    industry: 'Networking & Security',
    role: 'Software Development Engineer',
    ctcBracket: '₹14 - 18 LPA',
    minCgpa: 7.5,
    location: 'Bengaluru / Chennai',
    hiringType: 'On-Campus',
    deadlineDate: '2026-11-06',
    daysRemaining: 23,
    logoInitial: 'CS',
    accentColor: '#06b6d4',
    ascentMatchPercent: 92,
    interviewStages: [
      { stage: 1, title: 'Online Assessment', description: 'Networking protocol MCQs, OS concepts, and 2 algorithmic questions' },
      { stage: 2, title: 'Technical Round 1', description: 'Socket programming, OSI model, packet routing, and linked data structures' },
      { stage: 3, title: 'Managerial & Cultural', description: 'Project architecture discussion and problem solving agility' }
    ],
    keySkills: ['Computer Networks', 'Python', 'C++', 'OS'],
    resources: [
      { title: 'Cisco Packet & Socket Mastery Guide', url: '#', type: 'Guide' },
      { title: 'Network Programming Interview Problems', url: '#', type: 'Questions' }
    ]
  },
  {
    id: 'tcs_digital',
    name: 'TCS Digital / Prime',
    industry: 'Global Digital Engineering',
    role: 'Digital Software Engineer',
    ctcBracket: '₹9 - 12 LPA',
    minCgpa: 6.5,
    location: 'Pan India',
    hiringType: 'Off-Campus',
    deadlineDate: '2026-11-15',
    daysRemaining: 32,
    logoInitial: 'TC',
    accentColor: '#10b981',
    ascentMatchPercent: 99,
    interviewStages: [
      { stage: 1, title: 'NQT Advanced Coding', description: 'Advanced quantitative analysis, verbal logic, and 2 DSA coding challenges' },
      { stage: 2, title: 'Technical Interview', description: 'Core programming constructs, DBMS concepts, and capstone project walkthrough' },
      { stage: 3, title: 'HR & Operations', description: 'Location preference, adaptability, and leadership potential' }
    ],
    keySkills: ['Java', 'SQL', 'Web Dev'],
    resources: [
      { title: 'TCS Digital Previous Year Problem Set', url: '#', type: 'Questions' },
      { title: 'Aptitude Speed Formulas Handbook', url: '#', type: 'Guide' }
    ]
  }
];

export const initialDailyTasks: PlannerTask[] = [
  {
    id: 'task-1',
    domain: 'DSA',
    title: 'Solve 2 LeetCode Mediums on Binary Tree Traversals & LCA',
    durationMinutes: 75,
    completed: true,
    priority: 'High',
    dueTime: '10:30 AM',
    timeBlock: 'Morning',
  },
  {
    id: 'task-2',
    domain: 'DSA',
    title: 'Review Dynamic Programming Memoization vs Tabulation on Knapsack',
    durationMinutes: 45,
    completed: true,
    priority: 'High',
    dueTime: '12:00 PM',
    timeBlock: 'Morning',
  },
  {
    id: 'task-3',
    domain: 'Aptitude',
    title: 'Practice 15 Speed Math & Probability problems for OA tests',
    durationMinutes: 40,
    completed: false,
    priority: 'Medium',
    dueTime: '03:15 PM',
    timeBlock: 'Afternoon',
  },
  {
    id: 'task-4',
    domain: 'Projects',
    title: 'Refactor REST API endpoints in portfolio project to use JWT & caching',
    durationMinutes: 60,
    completed: false,
    priority: 'High',
    dueTime: '05:30 PM',
    timeBlock: 'Afternoon',
  },
  {
    id: 'task-5',
    domain: 'Communication',
    title: 'Draft STAR response for "Tell me about a time you handled conflict"',
    durationMinutes: 20,
    completed: false,
    priority: 'Medium',
    dueTime: '08:00 PM',
    timeBlock: 'Evening',
  },
];

export const mockTechnicalTopics: TechnicalTopic[] = [
  {
    id: 'tech-dsa-trees',
    category: 'DSA',
    title: 'Hierarchical Structures: Trees & BST',
    difficulty: 'Medium',
    description: 'The backbone of 85%+ of Tier-1 and Tier-2 engineering interviews.',
    coreConcepts: [
      'Inorder, Preorder, Postorder & Level Order traversal patterns',
      'Lowest Common Ancestor (LCA) in Binary Tree & BST',
      'Diameter of Binary Tree & Maximum Path Sum',
      'Serialization & Deserialization of Binary Trees'
    ],
    codeSnippet: `// Lowest Common Ancestor in Binary Tree
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    if (left && right) return root;
    return left ? left : right;
}`,
    sampleQuestions: [
      { question: 'Construct Binary Tree from Preorder and Inorder Traversal', hint: 'Map Inorder elements to their indices for O(1) partition lookups.', frequency: 'Very High' },
      { question: 'Lowest Common Ancestor of a Binary Tree', hint: 'Recurse subtrees; if both left and right return non-null, root is the LCA.', frequency: 'Very High' },
      { question: 'Serialize and Deserialize Binary Tree', hint: 'Preorder traversal with null token markers ("#") or BFS queue.', frequency: 'High' }
    ]
  },
  {
    id: 'tech-dsa-dp',
    category: 'DSA',
    title: 'Dynamic Programming Patterns: Grid & Knapsack',
    difficulty: 'Hard',
    description: 'Mandatory for clearing High Ridge (15 LPA) and Apex Summit (20+ LPA) technical bars.',
    coreConcepts: [
      'Overlapping subproblems & Optimal substructure properties',
      '0/1 Knapsack, Unbounded Knapsack, and Subset Sum',
      'Longest Common Subsequence (LCS) & Longest Increasing Subsequence (LIS)',
      'State-space reduction from 2D matrices to 1D sliding rows'
    ],
    codeSnippet: `// 0/1 Knapsack Space-Optimized
int knapSack(int W, vector<int>& wt, vector<int>& val) {
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < wt.size(); i++) {
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}`,
    sampleQuestions: [
      { question: 'Coin Change I (Minimum Coins to form target sum)', hint: 'Bottom-up DP table where dp[i] = min(dp[i], dp[i - coin] + 1).', frequency: 'Very High' },
      { question: 'Longest Increasing Subsequence in O(N log N)', hint: 'Patience sorting with binary search using std::lower_bound.', frequency: 'Very High' },
      { question: 'Partition Equal Subset Sum', hint: 'Transform into a subset sum with target = totalSum / 2.', frequency: 'High' }
    ]
  },
  {
    id: 'tech-sys-cache',
    category: 'System Design',
    title: 'Distributed Caching Strategies & Redis',
    difficulty: 'Medium',
    description: 'Crucial for system scalability and low latency architecture discussions.',
    coreConcepts: [
      'Cache-aside, Write-through, Write-behind patterns',
      'Eviction mechanics: LRU, LFU, TTL expiration policies',
      'Cache Stampede & Cache Penetration mitigation with Bloom Filters',
      'Redis cluster clustering and master-replica persistence'
    ],
    codeSnippet: `// LRU Cache Node Structure
struct Node {
    int key, value;
    Node* prev;
    Node* next;
    Node(int k, int v) : key(k), value(v), prev(nullptr), next(nullptr) {}
};`,
    sampleQuestions: [
      { question: 'Design an LRU Cache with O(1) get and put operations', hint: 'Pair a Doubly Linked List with a Hash Map of node pointers.', frequency: 'Very High' },
      { question: 'How would you mitigate Cache Penetration and Stampede?', hint: 'Employ Bloom filters for nonexistent keys and distributed mutexes on missing keys.', frequency: 'High' }
    ]
  },
  {
    id: 'tech-sys-rate',
    category: 'System Design',
    title: 'API Rate Limiting & Scalability',
    difficulty: 'Hard',
    description: 'Tier-1 product design staple for shielding microservices from surge traffic.',
    coreConcepts: [
      'Token Bucket vs Leaky Bucket algorithms',
      'Sliding Window Log vs Sliding Window Counter',
      'Distributed rate limiting using Redis Sorted Sets and Lua scripts',
      'Graceful backoff & HTTP 429 Retry-After header standards'
    ],
    codeSnippet: `// Token Bucket Atomic Refresh logic
bool allowRequest(int tokensPerSecond, int capacity) {
    long now = currentTimeMillis();
    long newTokens = (now - lastRefillTime) * tokensPerSecond / 1000;
    currentTokens = min(capacity, currentTokens + newTokens);
    lastRefillTime = now;
    if (currentTokens >= 1) { currentTokens--; return true; }
    return false;
}`,
    sampleQuestions: [
      { question: 'Implement a Sliding Window Log rate limiter', hint: 'Store timestamps in Redis Sorted Set; prune items older than (now - window).', frequency: 'Very High' },
      { question: 'Compare Token Bucket and Leaky Bucket in burst handling', hint: 'Token bucket permits controlled bursts up to bucket capacity.', frequency: 'Medium' }
    ]
  },
  {
    id: 'tech-cs-dbms',
    category: 'Core CS',
    title: 'Database Transactions & ACID Guarantees',
    difficulty: 'Medium',
    description: 'Foundational database theory frequently probed in fintech and database vendor interviews.',
    coreConcepts: [
      'ACID properties: Atomicity, Consistency, Isolation, Durability',
      'Transaction Isolation Levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable',
      'Dirty Reads, Non-repeatable Reads, and Phantom Reads',
      'B-Tree vs B+ Tree internal storage layout'
    ],
    codeSnippet: `// Transaction Isolation in SQL
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
SELECT balance FROM accounts WHERE user_id = 101 FOR UPDATE;
UPDATE accounts SET balance = balance - 500 WHERE user_id = 101;
COMMIT;`,
    sampleQuestions: [
      { question: 'Explain how B+ Trees optimize range query lookups', hint: 'Leaf nodes are arranged sequentially as a doubly linked list.', frequency: 'Very High' },
      { question: 'What is a Phantom Read and how is it resolved?', hint: 'Serializable isolation level or Range/Next-Key locks.', frequency: 'High' }
    ]
  },
  {
    id: 'tech-cs-os',
    category: 'Core CS',
    title: 'Process Synchronization & Concurrency',
    difficulty: 'Medium',
    description: 'Evaluates your low-level systems programming discipline and memory safety.',
    coreConcepts: [
      'Mutex locks vs Counting Semaphores vs Spinlocks',
      'Coffman Conditions for Deadlock: Mutual exclusion, Hold & wait, No preemption, Circular wait',
      'Virtual memory paging, TLB caching, and page fault resolution',
      'Context switching overhead and thread-local storage'
    ],
    codeSnippet: `// Producer-Consumer Semaphore Pattern
std::mutex mtx;
std::condition_variable cv;
std::queue<int> buffer;
const unsigned int MAX_BUFFER = 10;`,
    sampleQuestions: [
      { question: 'What causes priority inversion and how is it resolved?', hint: 'Priority inheritance elevates lower-priority task holding the shared resource.', frequency: 'High' },
      { question: 'Explain the 4 necessary conditions for Deadlock', hint: 'Coffman conditions; breaking circular wait prevents deadlock completely.', frequency: 'Very High' }
    ]
  }
];

export const mockBehavioralQuestions: BehavioralQuestion[] = [
  {
    id: 'beh-conflict',
    question: 'Tell me about a time you experienced conflict with a teammate and how you resolved it.',
    competency: 'Team Collaboration & Empathy',
    starFramework: {
      situation: 'During our 3rd-year capstone project, our backend team wanted to use MongoDB while the data analytics partner insisted on PostgreSQL for structured reporting.',
      task: 'As the technical coordinator, I had to prevent delivery delays and maintain healthy team morale while making the best architectural decision.',
      action: 'I organized a 1-hour structured benchmarking meeting. Instead of subjective arguing, we listed specific schema requirements, query frequencies, and foreign key constraints. We realized 80% of our queries were relational, but one module needed flexible telemetry. I proposed a hybrid solution using PostgreSQL with JSONB columns.',
      result: 'Both teammates felt heard and bought in. We completed the sprint 3 days ahead of schedule, and the project scored top marks during departmental evaluation.'
    },
    sampleAnswer: 'In my capstone project, when our team clashed over database choices, I shifted the discussion from opinions to data-driven benchmarks. By identifying the actual query patterns, we chose PostgreSQL with JSONB, satisfying both relational needs and document flexibility, and delivered ahead of schedule.',
    userNotes: 'Emphasize listening first, separating facts from emotions, and focusing on the shared project goal.'
  },
  {
    id: 'beh-bug',
    question: 'Describe a complex technical bug you encountered close to a deadline. How did you triage and fix it?',
    competency: 'Problem Solving & Resilience Under Pressure',
    starFramework: {
      situation: 'During a 24-hour national hackathon, 2 hours before the final submission, our authentication service started throwing intermittent 504 Gateway Timeouts.',
      task: 'I had to quickly identify the bottleneck without corrupting our live demo deployment.',
      action: 'I immediately checked server logs and discovered database connection pool exhaustion. Each auth verification was initiating a new unclosed DB pool connection instead of reusing the singleton instance. I patched the connection manager to use connection pooling and added a graceful error handler.',
      result: 'The error rate dropped to 0%, the app handled 500 concurrent demo requests smoothly, and our team secured 2nd place in the track.'
    },
    sampleAnswer: 'When our service hit 504 timeouts hours before a hackathon demo, I isolated connection logs, identified an unclosed database connection leak, implemented a singleton pool manager, and verified zero dropouts under concurrent load test.',
    userNotes: 'Show systematic debugging approach: logs -> root cause -> surgical patch -> load verification.'
  },
  {
    id: 'beh-failure',
    question: 'Tell me about a time you made a mistake or experienced failure. What did you learn?',
    competency: 'Self-Awareness & Continuous Learning',
    starFramework: {
      situation: 'In my first semester internship assignment, I pushed a script that accidentally overwrote a staging dataset because I had hardcoded the environment URL.',
      task: 'I needed to take full accountability, restore the environment, and implement safeguards so it could never happen again.',
      action: 'I immediately notified the lead engineer without concealing the incident, pulled the latest backup to restore the staging data within 30 minutes, and then wrote a pre-commit validation hook and centralized environment variable configuration.',
      result: 'The lead praised the prompt communication and remediation. The pre-commit hook was later adopted across all intern repositories as standard practice.'
    },
    sampleAnswer: 'I once accidentally wiped staging data due to a hardcoded URL. I owned the mistake instantly, restored it from backup within 30 minutes, and engineered a pre-commit environment validation hook that became team standard.',
    userNotes: 'Never blame others or tooling. Own it immediately, resolve it rapidly, and put preventive guardrails in place.'
  },
  {
    id: 'beh-why-us',
    question: 'Why do you want to join our engineering team over other companies?',
    competency: 'Company Alignment & Intrinsic Motivation',
    starFramework: {
      situation: 'Preparing for interviews with high-scale product companies whose architecture handles millions of daily transactions.',
      task: 'Communicate genuine curiosity about their engineering culture rather than generic praise.',
      action: 'I read their public engineering blogs regarding how they handled peak event traffic (e.g., flash sales, real-time UPI settlements) and studied their open-source contributions.',
      result: 'I was able to link my personal interest in distributed caching and idempotency directly to the problems their team is solving right now.'
    },
    sampleAnswer: 'I am drawn to your team because of your high-concurrency infrastructure. Reading your engineering blog on how you handle idempotent transaction retries aligned directly with the distributed systems problems I enjoy solving.',
    userNotes: 'Reference specific tech blogs, tech talks, or architectures the company is famous for.'
  }
];
