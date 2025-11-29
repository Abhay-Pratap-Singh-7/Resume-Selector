import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, X, ArrowLeft, CheckCircle2, Loader2, Briefcase } from 'lucide-react';

interface BulkUploadProps {
  onBack: () => void;
}

const BulkUpload: React.FC<BulkUploadProps> = ({ onBack }) => {
  const [jobRole, setJobRole] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
        const newFiles = Array.from(e.dataTransfer.files).filter(file => file.type === 'application/pdf');
        setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const newFiles = Array.from(e.target.files).filter(file => file.type === 'application/pdf');
        setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
        setIsUploading(false);
        setUploadComplete(true);
    }, 2000);
  };

  if (uploadComplete) {
      return (
          <div className="min-h-screen bg-[#111111] text-[#F6F6F6] flex flex-col items-center justify-center p-6 relative overflow-hidden">
               {/* Background effects */}
               <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                  <div 
                      className="absolute inset-0 opacity-[0.02]" 
                      style={{ 
                          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
                          backgroundSize: '25px 25px' 
                      }}
                  ></div>
                   {/* Top Left - Golden Grid Patch */}
                  <div 
                       className="absolute top-0 left-0 w-full h-[40%] opacity-[0.1]"
                       style={{
                          backgroundImage: 'linear-gradient(#FFCB74 1px, transparent 1px), linear-gradient(90deg, #FFCB74 1px, transparent 1px)',
                          backgroundSize: '50px 50px',
                          maskImage: 'radial-gradient(circle at 20% 20%, black, transparent 70%)',
                          WebkitMaskImage: 'radial-gradient(circle at 20% 20%, black, transparent 70%)'
                       }}
                  ></div>
                  <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#FFCB74] opacity-[0.05] rounded-full blur-[150px] animate-pulse-glow"></div>
                  <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFCB74] opacity-[0.05] rounded-full blur-[150px]"></div>
               </div>
               
               <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-3xl p-10 max-w-lg w-full text-center relative z-10 shadow-2xl animate-fade-in-up">
                   <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                       <CheckCircle2 size={40} className="text-green-500" />
                   </div>
                   <h2 className="text-3xl font-bold mb-4 text-white">Upload Complete</h2>
                   <p className="text-gray-400 mb-8 leading-relaxed">
                       Successfully processed <span className="text-[#FFCB74] font-bold">{files.length} resumes</span> for the role of <span className="text-white font-semibold">{jobRole}</span>.
                   </p>
                   <button onClick={onBack} className="w-full bg-[#FFCB74] hover:bg-[#eebb55] text-[#111111] font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,203,116,0.3)]">
                       Return to Dashboard
                   </button>
               </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-[#111111] text-[#F6F6F6] p-6 relative flex flex-col overflow-hidden">
       {/* Background */}
       <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {/* 1. Base Grid */}
            <div 
                className="absolute inset-0 opacity-[0.03]" 
                style={{ 
                    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
                    backgroundSize: '50px 50px' 
                }}
            ></div>

            {/* 2. Highlight Grid Patches */}
            {/* Top Left - Golden Grid Patch */}
            

            {/* 3. Glow Orbs */}
          <div className="absolute top-[-5%] left-[-10%] w-[50vw] h-[50vw] bg-[#FFCB74] opacity-[0.09] rounded-full blur-[100px]" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-[5%] right-[-10%] w-[40vw] h-[40vw] bg-[#FFCB74] opacity-[0.08] rounded-full blur-[100px]" style={{animationDelay: '2s'}}></div>
       </div>

       <div className="relative z-10 max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center py-10">
           <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 self-start group">
               <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
           </button>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
               
               {/* Left: Info & Form */}
               <div className="space-y-8 animate-slide-up" style={{animationDelay: '0.1s'}}>
                   <div>
                       <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Upload Resumes</h1>
                       <p className="text-gray-400 text-lg leading-relaxed">Select the job role and upload candidate CVs to start the AI screening process.</p>
                   </div>
                   
                   <div className="space-y-4">
                       <label className="block text-sm font-medium text-gray-300 ml-1">Target Job Role</label>
                       <div className="relative group">
                           <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FFCB74] transition-colors" size={18} />
                           <input 
                               type="text" 
                               value={jobRole}
                               onChange={(e) => setJobRole(e.target.value)}
                               placeholder="e.g. Senior Product Designer"
                               className="w-full bg-[#1a1a1a] border border-[#2F2F2F] rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:border-[#FFCB74] focus:ring-1 focus:ring-[#FFCB74] focus:outline-none transition-all"
                           />
                       </div>
                   </div>

                   <div className="bg-[#1a1a1a]/50 border border-[#2F2F2F] rounded-xl p-6 backdrop-blur-sm">
                       <h3 className="font-bold mb-3 text-white flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#FFCB74]"></div> Upload Guidelines
                       </h3>
                       <ul className="space-y-3 text-sm text-gray-400">
                           <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-[#2F2F2F] fill-[#FFCB74]" /> Supported format: PDF only</li>
                           <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-[#2F2F2F] fill-[#FFCB74]" /> Max file size: 10MB per file</li>
                           <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-[#2F2F2F] fill-[#FFCB74]" /> Multiple file upload supported</li>
                       </ul>
                   </div>
               </div>

               {/* Right: Upload Area */}
               <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-2xl p-6 shadow-2xl animate-slide-up flex flex-col h-full min-h-[500px]" style={{animationDelay: '0.2s'}}>
                   
                   {/* Dropzone */}
                   <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 flex-shrink-0
                            ${isDragging 
                                ? 'border-[#FFCB74] bg-[#FFCB74]/5 scale-[1.02]' 
                                : 'border-[#2F2F2F] hover:border-gray-500 hover:bg-[#252525]'
                            }
                        `}
                   >
                       <input 
                           type="file" 
                           ref={fileInputRef} 
                           className="hidden" 
                           multiple 
                           accept=".pdf" 
                           onChange={handleFileSelect} 
                       />
                       <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border transition-colors ${isDragging ? 'bg-[#FFCB74]/20 border-[#FFCB74] text-[#FFCB74]' : 'bg-[#111] border-[#2F2F2F] text-gray-400'}`}>
                           <UploadCloud size={32} />
                       </div>
                       <p className="font-medium text-white mb-1">Click or drag PDF files here</p>
                       <p className="text-xs text-gray-500">Maximum file size 10MB</p>
                   </div>

                   {/* File List */}
                   <div className="mt-6 flex-1 flex flex-col min-h-0">
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                           <span>Selected Files</span>
                           <span className="bg-[#2F2F2F] px-2 py-0.5 rounded text-white">{files.length}</span>
                       </p>
                       
                       <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar min-h-[120px]">
                           {files.length === 0 ? (
                               <div className="h-full flex flex-col items-center justify-center text-gray-600 italic text-sm border border-[#2F2F2F] border-dashed rounded-lg bg-[#111]/50">
                                   No files selected yet
                               </div>
                           ) : (
                               files.map((file, index) => (
                                   <div key={index} className="flex items-center justify-between bg-[#111] border border-[#2F2F2F] p-3 rounded-lg group hover:border-gray-600 transition-colors animate-fade-in-up" style={{animationDelay: `${index * 0.05}s`}}>
                                       <div className="flex items-center gap-3 overflow-hidden">
                                           <div className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center text-red-500 flex-shrink-0 border border-red-500/20">
                                               <FileText size={16} />
                                           </div>
                                           <div className="min-w-0">
                                               <p className="text-sm text-gray-200 truncate font-medium">{file.name}</p>
                                               <p className="text-[10px] text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                           </div>
                                       </div>
                                       <button 
                                           onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                                           className="p-1.5 hover:bg-red-500/20 text-gray-500 hover:text-red-500 rounded-md transition-colors"
                                       >
                                           <X size={16} />
                                       </button>
                                   </div>
                               ))
                           )}
                       </div>
                   </div>

                   {/* Action Button */}
                   <button 
                       onClick={handleUpload}
                       disabled={files.length === 0 || !jobRole || isUploading}
                       className={`w-full mt-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]
                           ${files.length > 0 && jobRole && !isUploading
                               ? 'bg-[#FFCB74] hover:bg-[#eebb55] text-[#111111] shadow-[0_0_20px_rgba(255,203,116,0.2)] hover:shadow-[0_0_30px_rgba(255,203,116,0.4)]'
                               : 'bg-[#2F2F2F] text-gray-500 cursor-not-allowed'
                           }
                       `}
                   >
                       {isUploading ? (
                           <>
                               <Loader2 size={20} className="animate-spin" /> Processing...
                           </>
                       ) : (
                           'Analyze Candidates'
                       )}
                   </button>

               </div>
           </div>
       </div>
    </div>
  );
};

export default BulkUpload;