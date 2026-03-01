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
