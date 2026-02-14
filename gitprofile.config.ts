// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'crimznexus', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/arifszn/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/arifszn/portfolio, then set base to '/portfolio/'.
   */
  base: '/portfolio/',
  projects: {
    github: {
      display: true, // Display GitHub projects?
      header: 'Github Projects',
      mode: 'automatic', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 8, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: [], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: [], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      },
    },
    external: {
      header: 'My Projects',
      // To hide the `External Projects` section, keep it empty.
      projects: [
        {
          title: 'SkillPath AI',
          description:
            'Master in-demand skills with AI Tutors that teach in real-time, anytime. Personalized learning powered by intelligent tutors.',
          imageUrl:
            '/Screenshot 2026-02-14 164925.png',
          link: 'https://skillpath-ai.com/',
        },
      ],
    },
  },
  seo: { title: 'Portfolio of Muhammad Faizan-e-Mustafa', description: '', imageURL: '' },
  social: {
    linkedin: 'muhammad-faizan-mustafa',
    x: '',
    mastodon: '',
    researchGate: '',
    facebook: '',
    instagram: '',
    reddit: '',
    threads: '',
    youtube: '', // example: 'pewdiepie'
    udemy: '',
    dribbble: '',
    behance: '',
    medium: '',
    dev: '',
    stackoverflow: '', // example: '1/jeff-atwood'
    discord: '',
    telegram: '',
    website: 'https://crimznexus.github.io',
    phone: '',
    email: '',
  },
  resume: {
    fileUrl:
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'PHP',
    'Laravel',
    'JavaScript',
    'React.js',
    'Node.js',
    'Nest.js',
    'MySQL',
    'PostgreSQL',
    'Git',
    'Docker',
    'PHPUnit',
    'CSS',
    'Antd',
    'Tailwind',
  ],
  experiences: [
    {
      company: 'AE Fashion',
      position: 'AI Developer',
      from: 'April 2024',
      to: 'August 2025',
      companyLink: '',
      description: [
        'Built virtual try-on system using generative AI models, increasing customer engagement by 35% and reducing return rates by 28%',
        'Developed automated data captioning system with computer vision and NLP, improving dataset quality by 40% and reducing annotation time by 65%',
      ],
    },
    {
      company: 'Upwork',
      position: 'Research Assistant',
      from: 'September 2024',
      to: 'September 2024',
      companyLink: '',
      description: [
        'Integrated MILP optimization solvers with LLMs, improving solution accuracy by 42% for complex modeling challenges',
        'Built training pipelines for domain-specific LLMs, reducing computational overhead by 30% and increasing performance by 25%',
      ],
    },
    {
      company: 'MapleMart Retail Systems',
      position: 'Database Administrator',
      from: 'August 2023',
      to: 'August 2023',
      companyLink: '',
      description: [
        'Optimized database performance with indexing and normalization, reducing query response time by 75%',
        'Implemented backup and migration protocols ensuring zero data loss and maintaining 99.9% system uptime',
      ],
    },
  ],
  certifications: [
    {
      name: 'CS50AI: Introduction to Artificial Intelligence with Python',
      body: 'HarvardX',
      year: 'September 2025',
      link: '',
    },
    {
      name: 'IBM Data Science Professional Certificate',
      body: 'IBM, Cognitiveclass.ai',
      year: 'April 2024',
      link: '',
    },
    {
      name: 'Databases and SQL for Data Science with Python',
      body: 'IBM, Coursera',
      year: 'September 2023',
      link: '',
    },
    {
      name: 'IBM Data Science 101',
      body: 'IBM, Cognitiveclass.ai',
      year: 'August 2023',
      link: '',
    },
  ],
  educations: [
    {
      institution: 'The Islamia University of Bahawalpur',
      degree: 'B.Sc. in Computer Systems Engineering; Data Science Specialization',
      from: 'September 2021',
      to: 'June 2025',
    },
  ],
  publications: [
    {
      title: 'Comparative Analysis of Transformer-Based Models for Sentiment Analysis: Performance, Efficiency, and Generalizability',
      conferenceName: '🏆 IEEE Engineering Exhibition Award 2025 - Best Project',
      journalName: '',
      authors: '',
      link: '',
      description: 'Built and deployed end-to-end ML pipeline using Python, TensorFlow, and PyTorch to compare BERT, RoBERTa, and DistilBERT models across multiple domains, achieving 94% classification accuracy on benchmark datasets. Implemented comprehensive data preprocessing workflows using Pandas and NumPy, with fine-tuning strategies and domain adaptation techniques that significantly outperformed traditional Scikit-learn ML approaches. Developed model evaluation framework with detailed performance metrics and visualizations using Matplotlib and Seaborn, providing clear explanations of model behavior and trade-offs for optimal production deployment.',
    },
  ],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // medium | dev
    username: '', // to hide blog section, keep it empty
    limit: 2, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: { id: '', snippetVersion: 6 },
  themeConfig: {
    defaultTheme: 'lofi',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
      'caramellatte',
      'abyss',
      'silk',
      'procyon',
    ],
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `Made with <a 
      class="text-primary" href="https://github.com/arifszn/gitprofile"
      target="_blank"
      rel="noreferrer"
    >GitProfile</a> and ❤️`,

  enablePWA: true,
};

export default CONFIG;
