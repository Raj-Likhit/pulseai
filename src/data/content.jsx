import React from 'react';
import {
    Zap, Brain, Shield, GitBranch, Sparkles, Users, TrendingUp
} from 'lucide-react';

export const LANDING_BENTO_CARDS = [
    {
        title: 'Smart Routing',
        description: 'Automatically selects the best model for each request based on cost, speed, and accuracy.',
        label: 'Intelligence',
        icon: <Brain size={16} />,
        style: { gridColumn: 'span 2' },
    },
    {
        title: 'Real-time Streaming',
        description: 'Sub-120ms response initiation across all connected AI providers.',
        label: 'Speed',
        icon: <Zap size={16} />,
    },
    {
        title: 'Enterprise Security',
        description: 'SOC 2 Type II. Your data never trains our models.',
        label: 'Protection',
        icon: <Shield size={16} />,
    },
    {
        title: 'Visual Workflows',
        description: 'Build node-based AI pipelines with drag-and-drop simplicity.',
        label: 'Builder',
        icon: <GitBranch size={16} />,
    },
    {
        title: 'Team Collaboration',
        description: 'Share workflows, prompts, and results across your whole team in real time.',
        label: 'Teams',
        icon: <Users size={16} />,
        style: { gridColumn: 'span 2' },
    },
    {
        title: 'Auto-Optimization',
        description: 'Continuous A/B testing and prompt tuning built in. Costs cut by up to 60%.',
        label: 'Efficiency',
        icon: <TrendingUp size={16} />,
    },
];

export const LANDING_TESTIMONIALS = [
    { quote: 'Pulse cut our AI infrastructure costs by 58% while doubling output quality. Nothing else compares.', name: 'Sarah Chen', role: 'CTO at Vertex Labs', stars: 5 },
    { quote: 'The visual workflow builder is insane. We shipped an AI feature in 3 hours that would have taken 3 weeks.', name: 'Marcus Wright', role: 'Head of Eng at Nexus', stars: 5 },
    { quote: 'Finally, one API that does it all. Routing, fallback, streaming — all handled automatically.', name: 'Priya Sharma', role: 'ML Lead at DataCore', stars: 5 },
];

export const LANDING_FAQS = [
    { q: 'Which AI models does Pulse support?', a: 'GPT-4o, GPT-4 Turbo, Claude 3.5 Sonnet, Gemini 1.5 Pro, LLaMA 3, Mistral, Qwen 2.5, Phi-4, Stable Diffusion, and 40+ more. New models added automatically as they launch.' },
    { q: 'How does smart routing work?', a: 'Pulse analyzes your prompt, context window, latency requirements, and budget to pick the optimal model automatically. You can add custom routing rules per workflow.' },
    { q: 'Is my data secure?', a: 'Yes. We are SOC 2 Type II certified. All data is encrypted in transit and at rest. Your data never trains our models and is never shared with third parties.' },
    { q: 'Can I switch from another platform?', a: 'Most teams migrate in under a day. We provide migration scripts and our team will personally assist your transition at no extra cost.' },
    { q: 'What is the pricing model?', a: 'We charge a flat platform fee based on your plan tier plus pass-through model costs with zero markup. No hidden fees, no per-seat pricing.' },
];

export const FEATURES_DATA = [
    {
        id: '01',
        title: 'Smart Orchestration',
        subtitle: 'Route every task to the right model, automatically.',
        desc: 'Pulse\'s orchestration layer learns from your workflows. It monitors latency, cost, and quality — and routes each task to the optimal model without any manual intervention.',
        benefits: ['Automatic model selection', 'Latency & cost monitoring', 'Fallback routing', 'A/B model testing'],
        accent: 'var(--lime)',
    },
    {
        id: '02',
        title: 'Node-Based Canvas',
        subtitle: 'Visual logic that your whole team understands.',
        desc: 'Build complex AI workflows by connecting nodes on a canvas. No code required. Each node is a step: a prompt, a model call, a tool, a branch condition. Chain them infinitely.',
        benefits: ['Drag-and-drop builder', 'Conditional branching', 'Infinite nesting', 'Version history'],
        accent: 'var(--accent)',
    },
    {
        id: '03',
        title: 'Predictive Context',
        subtitle: 'AI memory that spans your entire workspace.',
        desc: 'Pulse maintains a persistent knowledge graph of every workflow, output, and decision. Your AI never forgets project context — it builds on it.',
        benefits: ['Cross-session memory', 'Semantic search', 'Entity extraction', 'Linked contexts'],
        accent: 'var(--accent2)',
    },
    {
        id: '04',
        title: 'Team Collaboration',
        subtitle: 'Real-time multiplayer on every workflow.',
        desc: 'Multiple people can edit, run, and comment on the same workflow simultaneously. Live cursors, inline comments, and conflict-free syncing — like Figma, but for AI.',
        benefits: ['Live presence', 'Inline comments', 'Role-based access', 'Activity feed'],
        accent: 'var(--accent)',
    },
    {
        id: '05',
        title: 'Enterprise Security',
        subtitle: 'SOC 2 certified. Zero data training.',
        desc: 'Your data never trains our models. We never share it. Pulse is SOC 2 Type II certified with end-to-end encryption, SSO, SCIM, and a full audit log.',
        benefits: ['SOC 2 Type II', 'SSO & SCIM', 'Audit logs', 'Custom data residency'],
        accent: 'var(--lime)',
    },
    {
        id: '06',
        title: 'Analytics & Insights',
        subtitle: 'Full observability into every AI interaction.',
        desc: 'Real-time dashboards track token usage, latency by node, cost per run, and team output metrics. Spot bottlenecks and optimise in seconds.',
        benefits: ['Token usage tracking', 'Cost attribution', 'Latency heatmaps', 'Export to Datadog / Grafana'],
        accent: 'var(--accent2)',
    },
];

export const ABOUT_VALUES = [
    {
        title: 'Craft',
        desc: 'We believe great tools should feel great to use. Every interaction is deliberate. Every pixel earns its place.',
        icon: '◈',
    },
    {
        title: 'Transparency',
        desc: 'No model training on your data. No hidden costs. No vendor lock-in. We say what we do and do what we say.',
        icon: '◉',
    },
    {
        title: 'Velocity',
        desc: 'We ship weekly. We listen obsessively. If you tell us something is broken, we fix it before Thursday.',
        icon: '◐',
    },
];

export const ABOUT_TEAM = [
    { name: 'Aria Chen', role: 'CEO & Co-founder', initials: 'AC', bg: 'linear-gradient(135deg, #F4A623, #FF6348)' },
    { name: 'Marcus Webb', role: 'CTO & Co-founder', initials: 'MW', bg: 'linear-gradient(135deg, #D1FF4D, #F4A623)' },
    { name: 'Priya Nair', role: 'Head of Design', initials: 'PN', bg: 'linear-gradient(135deg, #FF6348, #F4A623)' },
    { name: 'Leo Bauer', role: 'Head of Engineering', initials: 'LB', bg: 'linear-gradient(135deg, #F97316, #D1FF4D)' },
    { name: 'Sofia Reyes', role: 'Head of Product', initials: 'SR', bg: 'linear-gradient(135deg, #FF6348, #D1FF4D)' },
    { name: 'Jin Park', role: 'Head of Growth', initials: 'JP', bg: 'linear-gradient(135deg, #F97316, #FF6348)' },
];

export const ABOUT_MILESTONES = [
    { year: '2022', event: 'Founded in San Francisco with a €2M seed round.' },
    { year: '2023', event: 'Launched private beta. 10,000 signups in 48 hours.' },
    { year: '2024', event: 'Series A: $18M. Launched Pulse Pro with node canvas.' },
    { year: '2025', event: 'Reached 50,000 active teams. SOC 2 Type II certified.' },
    { year: '2026', event: 'Pulse 2.0 — AI Workspace. Available now.' },
];


export const PRICING_PLANS = [
    {
        name: 'Starter',
        price: { monthly: 0, annual: 0 },
        desc: 'For individuals exploring AI workflows.',
        features: [
            { text: '5 active workflows', included: true },
            { text: '50K tokens / month', included: true },
            { text: '3 AI models', included: true },
            { text: 'Community support', included: true },
            { text: 'Team collaboration', included: false },
            { text: 'Advanced analytics', included: false },
            { text: 'SSO & SCIM', included: false },
            { text: 'SLA guarantee', included: false },
        ],
        cta: 'Get Started Free',
        ctaLink: '/signup',
    },
    {
        name: 'Pro',
        price: { monthly: 49, annual: 39 },
        desc: 'For power users and fast-moving teams.',
        features: [
            { text: 'Unlimited workflows', included: true },
            { text: '5M tokens / month', included: true },
            { text: 'All 14+ AI models', included: true },
            { text: 'Priority support', included: true },
            { text: 'Team collaboration', included: true },
            { text: 'Advanced analytics', included: true },
            { text: 'SSO & SCIM', included: false },
            { text: 'SLA guarantee', included: false },
        ],
        cta: 'Start Free Trial',
        ctaLink: '/signup',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: { monthly: null, annual: null },
        desc: 'Dedicated infra, custom contracts, white-glove onboarding.',
        features: [
            { text: 'Everything in Pro', included: true },
            { text: 'Custom token volumes', included: true },
            { text: 'Fine-tuned models', included: true },
            { text: 'Dedicated CSM', included: true },
            { text: 'Team collaboration', included: true },
            { text: 'Advanced analytics', included: true },
            { text: 'SSO & SCIM', included: true },
            { text: 'SLA 99.99%', included: true },
        ],
        cta: 'Contact Sales',
        ctaLink: '/about',
    },
];

export const PRICING_FAQS = [
    { q: 'Can I change plans later?', a: 'Yes. You can upgrade or downgrade at any time. Upgrades are prorated; downgrades take effect at the next billing cycle.' },
    { q: 'What counts as a token?', a: 'A token is roughly 4 characters of text. Input and output tokens both count towards your monthly usage.' },
    { q: 'Is there a free trial for Pro?', a: 'Yes — 14 days, all Pro features, no credit card required. If you don\'t upgrade, you\'re automatically moved to the Starter plan.' },
    { q: 'How does team billing work?', a: 'The Pro plan is per-workspace, not per-seat. Invite unlimited collaborators.' },
    { q: 'What payment methods do you accept?', a: 'Visa, Mastercard, Amex, and wire transfer for annual Enterprise plans.' },
];
