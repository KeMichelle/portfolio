export type AccentTone = 'pink' | 'green' | 'lavender' | 'yellow';

export interface ShowcaseProject {
  title: string;
  type: string;
  blurb: string;
  tech: string[];
  tone: string;
  tilt: string;
  metric: string;
  status?: string;
  note?: string;
  highlights?: string[];
  href?: string;
  hrefLabel?: string;
  previewSrc?: string;
  previewTone?: string;
}

export interface StoryMoment {
  title: string;
  text: string;
}

export interface ServicePillar {
  title: string;
  text: string;
  accent: AccentTone;
}

export interface WorldNote {
  title: string;
  text: string;
  accent: AccentTone;
}

export interface ContactLink {
  label: string;
  href: string;
  caption: string;
}

export interface CodeProject {
  title: string;
  description: string;
  stack: string[];
  linkLabel: string;
  linkHref: string;
}

export interface FriendReview {
  name: string;
  role: string;
  quote: string;
  accent: AccentTone;
}

export const servicePillars: ServicePillar[] = [
  {
    title: 'Software engineering, softly held',
    text: '2+ years building front-end experiences across enterprise and fintech products, with calm structure, clean hierarchy, and a strong visual eye.',
    accent: 'pink',
  },
  {
    title: 'Creative developer + stylist',
    text: 'I move naturally between interfaces, references, silhouettes, and image direction, so the work stays technical without losing personality.',
    accent: 'green',
  },
  {
    title: 'An illustrated portfolio world',
    text: 'A softer system for showing real work, personal taste, and evolving visuals in one place, without flattening everything into a corporate grid.',
    accent: 'lavender',
  },
];

export const webProjects: ShowcaseProject[] = [
  {
    title: 'Edup Global Flex',
    type: 'Live client project',
    blurb:
      'A website I built for a wellness client, focused on keeping things simple, calm, and easy to understand.',
    tech: ['Nuxt', 'TypeScript', 'Responsive UI'],
    tone: 'bg-gradient-to-br from-white via-blush/50 to-peach/60',
    tilt: 'sm:-rotate-2',
    metric: 'Wellness client',
    note: 'The goal was to present the product in a way that feels natural and approachable, something that fits into people’s everyday life rather than feeling technical or overwhelming. I worked on the structure, layout, and front-end to make sure everything feels clear, responsive, and easy to navigate.',
    href: 'https://edupglobalflex.co.uk/',
    hrefLabel: 'View live site',
    previewSrc: '/edup_video.mp4',
    previewTone: 'from-blush/65 via-white/85 to-peach/55',
    highlights: [
      'Clear and simple content structure',
      'Calm, soft visual direction',
      'Fully responsive layout',
    ],
  },
  {
    title: 'Photographer portfolio',
    type: 'Next project',
    blurb:
      'I’m currently working on a website for a photographer. This one will be more visual and image-led, with a focus on layout, storytelling, and letting the work speak for itself.',
    tech: ['Image-led layout', 'Storytelling', 'Visual direction'],
    tone: 'bg-gradient-to-br from-white via-lavender/55 to-mint/50',
    tilt: 'sm:rotate-1',
    metric: 'In progress',
    status: 'In progress',
    note: 'Still building, more soon.',
    previewTone: 'from-lavender/60 via-white/85 to-mint/50',
    highlights: [
      'More visual and image-led',
      'A stronger focus on layout and rhythm',
      'Built to let the work speak for itself',
    ],
  },
  {
    title: 'To be defined',
    type: 'Upcoming project',
    blurb:
      'I’m leaving space here for the next project, something new I want to explore further, either more creative or more product-focused.',
    tech: ['New direction', 'Creative or product', 'More soon'],
    tone: 'bg-gradient-to-br from-white via-butter/55 to-blush/45',
    tilt: 'sm:-rotate-1',
    metric: 'Coming soon',
    status: 'Coming soon',
    note: 'A space I’m keeping open on purpose so the next project can arrive without feeling like filler.',
    previewTone: 'from-butter/55 via-white/85 to-blush/50',
    highlights: [
      'Intentional space for what comes next',
      'Open to something more creative',
      'Or something more product-focused',
    ],
  },
];

export const creativeProjects: ShowcaseProject[] = [
  {
    title: 'My wardrobe',
    type: 'Example',
    blurb:
      'A full styling breakdown using my own clothes, built around pastel colours, softer combinations, and a more elegant silhouette.',
    tech: ['Outfit combinations', 'Moodboard', 'Styling notes'],
    tone: 'bg-gradient-to-br from-white via-peach/50 to-butter/55',
    tilt: 'sm:rotate-2',
    metric: 'Wardrobe breakdown',
    note: 'I wanted this one to feel polished and light without losing personality, showing how much you can do just by changing combinations, proportions, and the overall balance of a look.',
    highlights: [
      'Pastel outfit combinations',
      'Soft moodboard',
      'Elegant styling notes',
    ],
  },
  {
    title: 'Chiara',
    type: 'Example',
    blurb:
      'A styling study based on my friend Chiara’s wardrobe. Her style leans more Ferrari and streetwear, so the goal was to refine it without losing that bold edge.',
    tech: ['Moodboard', 'Outfit ideas', 'Written feedback'],
    tone: 'bg-gradient-to-br from-white via-mint/50 to-lavender/55',
    tilt: 'sm:-rotate-1',
    metric: 'Streetwear study',
    note: 'I focused on cleaner outfit combinations, balancing oversized pieces, and keeping that fast, sporty energy while making it feel more intentional.',
    highlights: [
      'Cleaner outfit combinations',
      'Balancing oversized pieces',
      'Ferrari/street moodboard direction',
    ],
  },
  {
    title: 'Work with me',
    type: 'Personal styling',
    blurb:
      'If you want something similar, I offer personal styling sessions based on your wardrobe. No pressure to buy new things, just a different way of seeing what you already have.',
    tech: ['Wardrobe review', 'Outfit direction', 'Personal styling'],
    tone: 'bg-gradient-to-br from-white via-blush/45 to-lavender/45',
    tilt: 'sm:rotate-1',
    metric: 'Get in touch',
    note: 'The goal is to make your style feel more you, not more complicated.',
    highlights: [
      'Based on what you already own',
      'Simple styling direction',
      'No pressure to buy new things',
    ],
    href: '#contact',
    hrefLabel: 'Get in touch',
  },
];

export const storyMoments: StoryMoment[] = [
  {
    title: 'From Italy to London',
    text: 'I moved from Italy to London and now work as a Software Engineer at Sorint, building front-end experiences that need to feel clear, dependable, and calm at scale.',
  },
  {
    title: 'My day-to-day lives in products',
    text: 'Most of my professional work sits around Vue, Nuxt, Angular, React, TypeScript, and Cypress, especially across dashboards, enterprise flows, and fintech interfaces where usability really matters.',
  },
  {
    title: 'I still leave room for softness',
    text: 'Alongside the more structured product work, I keep growing into creative development and styling, which is why this portfolio feels both practical and a little dreamlike.',
  },
];

export const worldNotes: WorldNote[] = [
  {
    title: 'Professional, but personal',
    text: 'I want the site to feel recognisably mine while still making it easy to trust the work, the experience, and the way I think about products.',
    accent: 'pink',
  },
  {
    title: 'Engineering with a visual eye',
    text: 'Vue, Nuxt, React, Angular, TypeScript, Cypress, and Docker all belong here, but they should appear inside a visual language that still feels warm and human.',
    accent: 'green',
  },
  {
    title: 'Softness with standards',
    text: 'The atmosphere can stay playful, but the work still needs hierarchy, accessibility, testing awareness, and the kind of clarity teams and clients rely on.',
    accent: 'yellow',
  },
];

export const codeProjects: CodeProject[] = [
  {
    title: 'UI systems and component studies',
    description:
      'Reusable interface patterns, layout experiments, and front-end building blocks that reflect how I think about scalable product work.',
    stack: ['Vue', 'Nuxt', 'TypeScript'],
    linkLabel: 'View GitHub profile',
    linkHref: 'https://github.com/KeMichelle',
  },
  {
    title: 'Testing-first interaction notes',
    description:
      'Small prototypes and QA-minded flows shaped around edge cases, form states, and the kind of Cypress thinking that helps real products behave well.',
    stack: ['Cypress', 'Forms', 'State flows'],
    linkLabel: 'Open GitHub',
    linkHref: 'https://github.com/KeMichelle',
  },
  {
    title: 'Creative developer playground',
    description:
      'Personal experiments where motion, editorial layout, and softer styling details meet practical front-end structure.',
    stack: ['React', 'Angular patterns', 'Docker'],
    linkLabel: 'See more on GitHub',
    linkHref: 'https://github.com/KeMichelle',
  },
];

export const friendReviews: FriendReview[] = [
  {
    name: 'Collaborator note',
    role: 'Clear communication',
    quote:
      'Michelle is thoughtful with details, but also practical. She brings calm structure to ideas and makes the work feel easy to move through.',
    accent: 'pink',
  },
  {
    name: 'Team note',
    role: 'Front-end delivery',
    quote:
      'She balances the visual side with real product thinking, so the end result feels polished without becoming fragile or confusing.',
    accent: 'lavender',
  },
  {
    name: 'Creative note',
    role: 'Taste and direction',
    quote:
      'Her styling eye changes the atmosphere of a project. Even functional screens end up feeling considered, warm, and very intentional.',
    accent: 'green',
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/michelleaprile04/',
    caption: 'For roles, introductions, and a more direct professional hello.',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/KeMichelle',
    caption:
      'Public code, smaller experiments, and the technical layer behind the visuals.',
  },
  {
    label: 'Email',
    href: 'mailto:michelleaprile2004@gmail.com',
    caption:
      'For direct notes, freelance enquiries, and personal styling requests.',
  },
];
