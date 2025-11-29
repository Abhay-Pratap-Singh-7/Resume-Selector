import React from 'react';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface BlogsProps {
  onRead: () => void;
}

const Blogs: React.FC<BlogsProps> = ({ onRead }) => {
    const posts = [
        {
            title: "The Future of AI in Recruitment",
            excerpt: "How Generative AI is reshaping the way companies identify top talent, reducing bias and improving efficiency in the hiring process.",
            date: "Oct 12, 2024",
            author: "Sarah Jenkins",
            category: "Industry Trends",
            image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Scaling Your Engineering Team",
            excerpt: "Best practices for high-growth startups looking to hire senior engineers without compromising on quality or culture fit.",
            date: "Sep 28, 2024",
            author: "David Chen",
            category: "Hiring Strategy",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Understanding ATS Parse Rates",
            excerpt: "Why some resumes get rejected by automated systems and how modern AI parsers are fixing the problem to surface hidden gems.",
            date: "Sep 15, 2024",
            author: "Alex Morgan",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Bias Reduction in Hiring",
            excerpt: "Exploring how blind resume screening and AI-driven objective scoring can help build more diverse and inclusive teams.",
            date: "Aug 30, 2024",
            author: "Emily Wong",
            category: "DE&I",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "The Rise of Skills-Based Hiring",
            excerpt: "Moving beyond degree requirements: Why leading tech companies are prioritizing practical skills and portfolio work.",
            date: "Aug 14, 2024",
            author: "Michael Ross",
            category: "Recruitment",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Optimizing Your Career Portal",
            excerpt: "Simple UX changes to your application flow that can increase candidate conversion rates by up to 40%.",
            date: "Jul 22, 2024",
            author: "Lisa Park",
            category: "UX / Design",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
        }
    ];

  return (
    <div className="pt-32 pb-24 px-6 min-h-[80vh] max-w-7xl mx-auto">
       {/* Header */}
       <ScrollReveal direction="down" className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Latest <span className="gold-gradient-text">Insights</span>
            </h1>
            <div className="w-24 h-1 bg-[#FFCB74] mx-auto rounded-full mb-8"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-light">
                Expert perspectives on recruitment technology, hiring strategies, and the evolving landscape of talent acquisition.
            </p>
       </ScrollReveal>

       {/* Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
                <ScrollReveal key={index} delay={index * 0.1} direction="up" className="h-full">
                    <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-3xl overflow-hidden hover:border-[#FFCB74]/50 transition-all duration-300 hover:-translate-y-2 group flex flex-col h-full shadow-lg hover:shadow-[0_0_30px_-10px_rgba(255,203,116,0.15)] cursor-pointer" onClick={onRead}>
                        {/* Image */}
                        <div className="h-48 overflow-hidden relative">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                            <div className="absolute top-4 left-4 bg-[#111]/80 backdrop-blur-sm px-3 py-1 rounded-full border border-[#ffffff]/10 flex items-center gap-1.5">
                                <Tag size={10} className="text-[#FFCB74]" />
                                <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">{post.category}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center gap-4 text-[11px] text-gray-500 mb-4">
                                <div className="flex items-center gap-1"><Calendar size={12} /> {post.date}</div>
                                <div className="flex items-center gap-1"><User size={12} /> {post.author}</div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FFCB74] transition-colors line-clamp-2">{post.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">{post.excerpt}</p>

                            <button className="flex items-center gap-2 text-[#F6F6F6] text-sm font-bold group/btn hover:text-[#FFCB74] transition-colors mt-auto">
                                Read Article <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </ScrollReveal>
            ))}
       </div>
    </div>
  );
};

export default Blogs;