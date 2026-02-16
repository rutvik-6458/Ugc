import { UploadIcon, VideoIcon, ZapIcon } from 'lucide-react';

export const featuresData = [
    {
        icon: <UploadIcon className="w-6 h-6" />,
        title: 'Smart Upload',
        desc: 'Drag & drop your assets . we auto-optimize formats and sizes'
    },
    {
        icon: <ZapIcon className="w-6 h-6" />,
        title: 'instant Generation',
        desc: 'Optinized models deliver output in seconds with great fidelity.'
    },
    {
        icon: <VideoIcon className="w-6 h-6" />,
        title: 'Video Synthesis',
        desc: 'Bring product shots to life with short-form,social-ready videos.'
    }
];

export const plansData = [
    {
        id: 'starter',
        name: 'Starter',
        price: '$10',
        desc: 'Try the platfrom at no cost.',
        credits: 25,
        features: [
            '25 Credits',
            'Standard quality',
            'no watermark',
            'Slower generation speed ',
            'Email support'
        ]
    },
    {
        id: 'pro',
        name: 'Growth',
        price: '$29',
        desc: 'Creators & small teams.',
        credits: 80,
        features: [
            '80 Credits',
            'HD quality',
            'No watermark',
            'Video generation',
            'Priority support'
        ],
        popular: true
    },
    {
        id: 'ultra',
        name: 'Ultra',
        price: '$99',
        desc: 'Scale across teams and agencies.',
        credits: 300,
        features: [
            '300 Credits',
            'FHD quality',
            'No watermark',
            'Fast genration speed',
            'Chat + Email support'
        ]
    }
];

export const faqData = [
    {
        question: 'How does the AI generation work?',
        answer: 'we leverage state-of-the-art diffusion models trained on millions of procuts images to blens your product into realiatic scenes while preserving details, lighting and reflections.'
    },
    {
        question: 'Do you work with startups or only large companies?',
        answer: 'We work with startups, growing businesses and established brands. Our process is flexible and tailored to match your goals and scale.'
    },
    {
        question: 'Do i own the generated images?',
        answer: 'Yes- you recive full commerical rifhts to any images and videos generated on the platfrom.Use the for ads,ecommerce,social medaia and more.'
    },
      {
        question: 'Can i cancel anytime?',
        answer: 'Yes- you can cancel from your dashboard. you will reatain access through the end of you billing period.'
    },
    {
        question: 'What input formats do you support?',
        answer: 'We accept JPG,PNG, and WEBP. Outputs are high-resolution PNGs and MP4s optimized for social platforms.'
    }
];

export const footerLinks = [
    {
        title: "Quick Links",
        links: [
            { name: "Home", url: "#" },
            { name: "Features", url: "#" },
            { name: "Pricing", url: "#" },
            { name: "FAQ", url: "#" }
        ]
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", url: "#" },
            { name: "Terms of Service", url: "#" }
        ]
    },
    {
        title: "Connect",
        links: [
            { name: "Twitter", url: "#" },
            { name: "LinkedIn", url: "#" },
            { name: "GitHub", url: "#" }
        ]
    }
];