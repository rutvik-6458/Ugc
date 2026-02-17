import { DollarSignIcon, FolderEditIcon, GalleryHorizontalEnd, MenuIcon, SparkleIcon, XIcon, Zap } from 'lucide-react';
import { GhostButton, PrimaryButton } from './Buttons';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isLoaded } = useUser();
    const { openSignIn, openSignUp } = useClerk();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Create', href: '/generate' },
        { name: 'My Creations', href: '/my-generations' },
        { name: 'Community', href: '/community' },
        { name: 'Plans', href: '/plans' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <motion.nav
            className='fixed top-5 left-0 right-0 z-50 px-4'
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 250, damping: 30 }}
        >
            <div className='max-w-6xl mx-auto flex items-center justify-between bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-2 pl-5 pr-2 shadow-2xl'>
                {/* Logo */}
                <Link to='/' onClick={() => window.scrollTo(0, 0)} className="hover:opacity-80 transition-opacity">
                    <img src={assets.logo} alt="logo" className="h-7" />
                </Link>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-1 text-sm font-medium'>
                    {navLinks.map((link) => (
                        <Link
                            to={link.href}
                            key={link.name}
                            className={`px-4 py-2 rounded-xl transition-all relative ${isActive(link.href) ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {link.name}
                            {isActive(link.href) && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute inset-0 bg-white/10 rounded-xl -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Desktop Auth/User Button */}
                <div className='hidden md:flex items-center gap-3'>
                    {isLoaded && (
                        !user ? (
                            <>
                                <button
                                    onClick={() => {setIsOpen(false);openSignIn()}}
                                    className='text-sm font-medium text-gray-400 hover:text-white transition px-4 py-2'
                                >
                                    Sign in
                                </button>
                                <PrimaryButton
                                    onClick={() => {setIsOpen(false);openSignUp()}}
                                    className='text-xs py-2 px-6'
                                >
                                    Get Started
                                </PrimaryButton>
                            </>
                        ) : (
                            <div className='flex items-center gap-3 pl-3 border-l border-white/10'>
                                <GhostButton
                                    onClick={() => navigate('/plans')}
                                    className='text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 border-none'
                                >
                                    <Zap className="size-3 fill-current" />
                                    <span>Credits : </span>
                                </GhostButton>
                                <UserButton>
                                    <UserButton.MenuItems>
                                        <UserButton.Action  label='Generate' labelIcon={<SparkleIcon size={14}/>} onClick={()=>navigate('/generate')}/>
                                        <UserButton.Action  label='My Generations' labelIcon={<FolderEditIcon size={14}/>} onClick={()=>navigate('/my-generations')}/>
                                        <UserButton.Action  label='Community' labelIcon={<GalleryHorizontalEnd size={14}/>} onClick={()=>navigate('/community')}/>
                                        <UserButton.Action  label='Plans' labelIcon={<DollarSignIcon size={14}/>} onClick={()=>navigate('/plans')}/>
                                    </UserButton.MenuItems>
                                </UserButton>
                                {/* <UserButton appearance={{ elements: { userButtonAvatarBox: 'size-9 border border-white/10' } }} /> */}
                            </div>
                        )
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className='md:hidden p-2 text-gray-400 hover:text-white transition-colors'
                >
                    <MenuIcon className='size-6' />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[280px] bg-zinc-950 border-l border-white/10 z-[70] md:hidden p-8 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <img src={assets.logo} alt="logo" className="h-6" />
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <XIcon className="size-5 text-gray-400" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`px-4 py-3 rounded-xl transition-all ${isActive(link.href)
                                                ? 'bg-violet-600/10 text-violet-400 font-bold'
                                                : 'text-gray-400 hover:bg-white/5'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
                                {!user ? (
                                    <>
                                        <button
                                            onClick={() => { setIsOpen(false); openSignIn(); }}
                                            className="w-full py-4 text-center font-bold uppercase tracking-widest text-[10px] text-gray-400 hover:text-white transition-colors"
                                        >
                                            Sign in
                                        </button>
                                        <PrimaryButton
                                            onClick={() => { setIsOpen(false); openSignUp(); }}
                                            className="w-full py-4 rounded-xl"
                                        >
                                            Get Started
                                        </PrimaryButton>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[10px] uppercase font-black text-gray-500 tracking-tighter">Account</p>
                                            <p className="text-xs font-bold text-white truncate max-w-[120px]">{user.fullName || user.username}</p>
                                        </div>
                                        <UserButton />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};