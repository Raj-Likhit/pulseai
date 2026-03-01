import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './styles/index.css'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/utils/ScrollToTop'

// Dynamic imports for bundle splitting
const Landing = lazy(() => import('./pages/Landing'))
const Features = lazy(() => import('./pages/Features'))
const Pricing = lazy(() => import('./pages/Pricing'))
const About = lazy(() => import('./pages/About'))
const Signup = lazy(() => import('./pages/Signup'))
const Changelog = lazy(() => import('./pages/Changelog'))
const Roadmap = lazy(() => import('./pages/Roadmap'))
const Blog = lazy(() => import('./pages/Blog'))
const Careers = lazy(() => import('./pages/Careers'))
const Press = lazy(() => import('./pages/Press'))
const Documentation = lazy(() => import('./pages/Documentation'))
const ApiReference = lazy(() => import('./pages/ApiReference'))
const Status = lazy(() => import('./pages/Status'))
const Community = lazy(() => import('./pages/Community'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Security = lazy(() => import('./pages/Security'))
const DPA = lazy(() => import('./pages/DPA'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const DocArticle = lazy(() => import('./pages/DocArticle'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Clean full-screen loader
const PageLoader = () => (
    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
            width: '32px', height: '32px', border: '3px solid var(--border)',
            borderTopColor: 'var(--accent)', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
        }}>
            <style>
                {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
            </style>
        </div>
    </div>
)

function Layout() {
    const location = useLocation()
    const isSignup = location.pathname === '/signup'

    return (
        <>
            <ScrollToTop />
            <Navbar />
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/changelog" element={<Changelog />} />
                    <Route path="/roadmap" element={<Roadmap />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/press" element={<Press />} />
                    <Route path="/docs" element={<Documentation />} />
                    <Route path="/api" element={<ApiReference />} />
                    <Route path="/status" element={<Status />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/security" element={<Security />} />
                    <Route path="/dpa" element={<DPA />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/docs/:slug" element={<DocArticle />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
            {!isSignup && <Footer />}
        </>
    )
}

export default function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </ThemeProvider>
    )
}
