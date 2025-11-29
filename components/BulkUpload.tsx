import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, X, ArrowLeft, CheckCircle2, Loader2, Briefcase, AlertCircle, Play, Sparkles } from 'lucide-react';

interface BulkUploadProps {
  onBack: () => void;
}

// --- Types ---
type FileStatus = 'queued' | 'processing' | 'completed' | 'error';

// Updated interface to match your FastAPI backend response
interface AnalysisResult {
  name: string;                // <-- NEW
  pass_or_fail: string;
  score: number;
  explanation: string;
  strengths: string[];
  weaknesses: string[];
}

interface FileItem {
  id: string;
  file: File;
  status: FileStatus;
  result?: AnalysisResult;
  errorMessage?: string;
}

// --- Backend Integration Guide ---
// 1. Locate your FastAPI endpoint URL (e.g., http://localhost:8000/analyze).
// 2. Ensure your backend accepts 'multipart/form-data' with the key 'file'.
// 3. Replace the mock implementation below with the fetch code provided in comments.

const uploadFileToBackend = async (file: File, jobRole: string): Promise<AnalysisResult> => {
  console.log(`Uploading ${file.name} for role: ${jobRole}...`);

  const formData = new FormData();
  formData.append("job_role", jobRole);   // ✔ REQUIRED by your backend
  formData.append("resume", file);        // ✔ REQUIRED by your backend

  try {
    const response = await fetch("https://resume-48qd.onrender.com/evaluate", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Server Error: ${response.status} → ${text}`);
    }

    const data = await response.json();
    console.log("Backend result:", data);
    return data as AnalysisResult;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};


const BulkUpload: React.FC<BulkUploadProps> = ({ onBack }) => {
  const [jobRole, setJobRole] = useState('');
  const [fileItems, setFileItems] = useState<FileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // --- File Handling ---

  const addFiles = (newFiles: File[]) => {
    const newItems: FileItem[] = newFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      status: 'queued'
    }));
    setFileItems(prev => [...prev, ...newItems]);
  };

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
      const validFiles = Array.from(e.dataTransfer.files).filter(file => file.type === 'application/pdf');
      addFiles(validFiles);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const validFiles = Array.from(e.target.files).filter(file => file.type === 'application/pdf');
      addFiles(validFiles);
    }
  };

  const removeFile = (id: string) => {
    setFileItems(prev => prev.filter(item => item.id !== id));
  };

  // --- Processing Logic (One by One) ---

  const processQueue = async () => {
    if (!jobRole) return;
    setIsProcessing(true);

    // Get all queued IDs at the start
    const idsToProcess = fileItems
        .filter(item => item.status === 'queued' || item.status === 'error')
        .map(item => item.id);

    // Sequential Loop
    for (const id of idsToProcess) {
      // 1. Update status to PROCESSING
      setFileItems(prev => prev.map(item => 
        item.id === id ? { ...item, status: 'processing' } : item
      ));

      // Get the current file object (from state ref not strictly necessary as file obj is stable)
      const currentItem = fileItems.find(i => i.id === id);
      
      if (currentItem.file) {
          try {
            // 2. Call Backend (Waits for response)
            const result = await uploadFileToBackend(currentItem.file, jobRole);
            
            // 3. Update status to COMPLETED with result immediately
            setFileItems(prev => prev.map(item => 
                item.id === id ? { ...item, status: 'completed', result } : item
            ));
          } catch (error) {
            // 4. Handle Error
            setFileItems(prev => prev.map(item => 
                item.id === id ? { ...item, status: 'error', errorMessage: 'Analysis failed' } : item
            ));
          }
      }
      
      // Short delay for visual smoothness between items
      await new Promise(r => setTimeout(r, 200));
    }

    setIsProcessing(false);
  };

  const completedCount = fileItems.filter(i => i.status === 'completed').length;
  const totalCount = fileItems.length;

  return (
    <div className="min-h-screen bg-[#111111] text-[#F6F6F6] p-6 relative flex flex-col overflow-x-hidden">
       {/* Background */}
       <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
            <div className="absolute top-[-5%] left-[-10%] w-[50vw] h-[50vw] bg-[#FFCB74] opacity-[0.05] rounded-full blur-[100px]"></div>
       </div>

       <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col py-6">
           {/* Header */}
           <div className="flex items-center justify-between mb-8">
               <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                   <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
               </button>
               <div className="text-right">
                   <h1 className="text-2xl font-bold">Bulk Scanner</h1>
                   <p className="text-xs text-gray-500">Sequential Analysis • Instant Results</p>
               </div>
           </div>

           {/* TOP SECTION: Controls & Dropzone */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
               
               {/* 1. Job Configuration */}
               <div className="lg:col-span-1 space-y-6">
                   <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-2xl p-6">
                       <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                           <Briefcase size={18} className="text-[#FFCB74]" /> Job Context
                       </h3>
                       <div className="space-y-4">
                           <div>
                               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Target Job Role</label>
                               <input 
                                   type="text" 
                                   value={jobRole}
                                   onChange={(e) => setJobRole(e.target.value)}
                                   placeholder="e.g. Senior Frontend Engineer"
                                   className="w-full bg-[#111] border border-[#2F2F2F] rounded-lg py-3 px-4 text-white focus:border-[#FFCB74] focus:ring-1 focus:ring-[#FFCB74] outline-none transition-all"
                               />
                           </div>
                           <div className="p-3 bg-[#FFCB74]/5 border border-[#FFCB74]/20 rounded-lg">
                               <p className="text-xs text-[#FFCB74] leading-relaxed">
                                   <strong>Config:</strong> Enter the role title to help the AI contextualize the resume scoring.
                               </p>
                           </div>
                       </div>
                   </div>

                   {/* Stats / Start Button */}
                   {fileItems.length > 0 && (
                        <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-2xl p-6 animate-fade-in-up">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm text-gray-400">Queue Status</span>
                                <span className="text-xs font-mono bg-[#2F2F2F] px-2 py-1 rounded">{completedCount} / {totalCount} Processed</span>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="h-2 w-full bg-[#111] rounded-full overflow-hidden mb-6">
                                <div 
                                    className="h-full bg-[#FFCB74] transition-all duration-300 ease-linear"
                                    style={{ width: `${totalCount === 0 ? 0 : (completedCount / totalCount) * 100}%` }}
                                ></div>
                            </div>

                            <button 
                                onClick={processQueue}
                                disabled={isProcessing || !jobRole}
                                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all 
                                    ${isProcessing 
                                        ? 'bg-[#2F2F2F] text-gray-500 cursor-not-allowed' 
                                        : 'bg-[#FFCB74] hover:bg-[#eebb55] text-[#111111] shadow-lg hover:scale-[1.02]'
                                    }`}
                            >
                                {isProcessing ? (
                                    <><Loader2 size={18} className="animate-spin" /> Analyzing...</>
                                ) : (
                                    <><Play size={18} className="fill-current" /> Start Queue</>
                                )}
                            </button>
                        </div>
                   )}
               </div>

               {/* 2. Upload Area & Queue List */}
               <div className="lg:col-span-2 bg-[#1a1a1a] border border-[#2F2F2F] rounded-2xl p-6 flex flex-col h-[500px]">
                   
                   {/* Dropzone */}
                   {!isProcessing && (
                       <div 
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`flex-shrink-0 border-2 border-dashed rounded-xl p-6 mb-6 flex items-center justify-center gap-4 cursor-pointer transition-all
                                ${isDragging ? 'border-[#FFCB74] bg-[#FFCB74]/5' : 'border-[#2F2F2F] hover:border-gray-500 hover:bg-[#252525]'}
                            `}
                       >
                           <input type="file" ref={fileInputRef} className="hidden" multiple accept=".pdf" onChange={handleFileSelect} />
                           <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center text-gray-400">
                               <UploadCloud size={20} />
                           </div>
                           <div className="text-left">
                               <p className="font-medium text-white text-sm">Click or Drag Resumes (PDF)</p>
                               <p className="text-xs text-gray-500">Max 10 files recommended for demo</p>
                           </div>
                       </div>
                   )}

                   {/* File List */}
                   <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-2">
                       {fileItems.length === 0 ? (
                           <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-50">
                               <FileText size={48} className="mb-2" />
                               <p className="text-sm">Queue is empty</p>
                           </div>
                       ) : (
                           fileItems.map((item, idx) => (
                               <div 
                                    key={item.id} 
                                    className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300
                                        ${item.status === 'processing' ? 'bg-[#FFCB74]/5 border-[#FFCB74]/30' : 
                                          item.status === 'completed' ? 'bg-green-500/5 border-green-500/20' : 
                                          item.status === 'error' ? 'bg-red-500/5 border-red-500/20' :
                                          'bg-[#111] border-[#2F2F2F]'}
                                    `}
                               >
                                   <div className="flex items-center gap-3 overflow-hidden">
                                       <div className="w-8 h-8 rounded bg-[#1a1a1a] flex items-center justify-center text-gray-500 flex-shrink-0">
                                            {item.status === 'processing' ? <Loader2 size={14} className="animate-spin text-[#FFCB74]" /> :
                                             item.status === 'completed' ? <CheckCircle2 size={14} className="text-green-500" /> :
                                             item.status === 'error' ? <AlertCircle size={14} className="text-red-500" /> :
                                             <FileText size={14} />}
                                       </div>
                                       <div className="min-w-0">
                                           <p className="text-sm text-gray-200 truncate font-medium">{item.file.name}</p>
                                           <p className="text-[10px] text-gray-500 capitalize">
                                                {item.status === 'queued' ? 'Ready to scan' : item.status}
                                           </p>
                                       </div>
                                   </div>
                                   
                                   {item.status === 'queued' && (
                                       <button onClick={() => removeFile(item.id)} className="p-1.5 hover:bg-red-500/20 text-gray-600 hover:text-red-500 rounded-md">
                                           <X size={14} />
                                       </button>
                                   )}
                                   {item.status === 'completed' && item.result && (
                                       <span className={`text-xs font-bold px-2 py-1 rounded border ${
                                           item.result.pass_or_fail === 'pass' 
                                           ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                                           : 'bg-red-500/10 text-red-500 border-red-500/20'
                                       }`}>
                                           {item.result.pass_or_fail.toUpperCase()}
                                       </span>
                                   )}
                               </div>
                           ))
                       )}
                   </div>
               </div>
           </div>

           {/* RESULTS GRID - Appears as items complete */}
           {completedCount > 0 && (
               <div className="space-y-6 pb-20">
                   <div className="flex items-center gap-2 border-b border-[#2F2F2F] pb-4">
                       <Sparkles size={20} className="text-[#FFCB74]" />
                       <h2 className="text-xl font-bold">Analysis Results ({completedCount})</h2>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       {fileItems.filter(i => i.status === 'completed' && i.result).map((item) => (
                           <div key={item.id} className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-2xl overflow-hidden hover:border-[#FFCB74]/30 transition-all duration-300 animate-slide-up group flex flex-col h-full">
                               
                               {/* Card Header */}
                               <div className="p-5 border-b border-[#2F2F2F] bg-[#1f1f1f] flex justify-between items-start">
                                   <div className="max-w-[70%]">
                                    <h3 className="font-bold text-white text-sm truncate">{item.result?.name || item.file.name}</h3>
                                       <div className="flex items-center gap-2 mt-1">
                                           <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                               item.result?.pass_or_fail === 'pass' 
                                               ? 'bg-green-500/20 text-green-500' 
                                               : 'bg-red-500/20 text-red-500'
                                           }`}>
                                               {item.result?.pass_or_fail}
                                           </span>
                                       </div>
                                   </div>
                                   <div className={`flex flex-col items-center justify-center w-10 h-10 rounded-xl border font-bold
                                       ${(item.result?.score || 0) >= 70 ? 'bg-[#FFCB74] text-black border-[#FFCB74]' : 
                                         'bg-gray-800 text-gray-400 border-gray-700'}
                                   `}>
                                       <span className="text-sm">{item.result?.score}</span>
                                   </div>
                               </div>
                               
                               {/* Body */}
                               <div className="p-5 space-y-4 flex-1 flex flex-col">
                                   <div className="bg-[#111] p-3 rounded-lg border border-[#2F2F2F]">
                                       <p className="text-[10px] text-gray-400 leading-relaxed italic">
                                           "{item.result?.explanation}"
                                       </p>
                                   </div>

                                   <div className="grid grid-cols-1 gap-3 pt-2">
                                       <div>
                                           <span className="text-[9px] font-bold text-green-500 uppercase mb-1.5 flex items-center gap-1">
                                               <CheckCircle2 size={10} /> Strengths
                                           </span>
                                           <ul className="space-y-1.5">
                                               {item.result?.strengths.slice(0, 3).map((p, i) => (
                                                   <li key={i} className="text-[10px] text-gray-300 flex items-start gap-2 bg-green-500/5 p-1.5 rounded border border-green-500/10">
                                                        {p}
                                                   </li>
                                               ))}
                                           </ul>
                                       </div>
                                       <div>
                                           <span className="text-[9px] font-bold text-red-500 uppercase mb-1.5 flex items-center gap-1">
                                               <AlertCircle size={10} /> Weaknesses
                                           </span>
                                            <ul className="space-y-1.5">
                                               {item.result?.weaknesses.slice(0, 3).map((c, i) => (
                                                   <li key={i} className="text-[10px] text-gray-300 flex items-start gap-2 bg-red-500/5 p-1.5 rounded border border-red-500/10">
                                                        {c}
                                                   </li>
                                               ))}
                                           </ul>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       ))}
                   </div>
               </div>
           )}
       </div>
    </div>
  );
};

export default BulkUpload;