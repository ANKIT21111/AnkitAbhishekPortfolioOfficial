
import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Edit3,
    Eye,
    Save,
    Send,
    X,
    Camera,
    ImagePlus,
    Type,
    Clock,
    Terminal,
    Heading1,
    Heading2,
    Bold,
    Italic,
    Link as LinkIcon,
    Quote,
    List,
    Code,
    Image as ImageIcon,
    CheckCircle,
    Activity,
    Lock as LockIcon
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
    id: string;
    title: string;
    description: string;
    content?: string;
    coverImage?: string;
    date: string;
    time: string;
    timestamp: number;
}

interface ThoughtsStudioProps {
    isAdmin: boolean;
    isEditing: boolean;
    formData: BlogPost;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handlePublish: (e: React.FormEvent) => void;
    resetForm: () => void;
    previewMode: boolean;
    setPreviewMode: (mode: boolean) => void;
    notification: { type: 'success' | 'dev'; message: string } | null;
    openImageModal: (type: 'content' | 'cover') => void;
    insertFormat: (format: any) => void;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAdminLogout: () => void;
    initiateAdminLogin: () => void;
    editFlash: boolean;
    textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const ThoughtsStudio: React.FC<ThoughtsStudioProps> = ({
    isAdmin, isEditing, formData, handleInputChange, handlePublish, resetForm,
    previewMode, setPreviewMode, notification, openImageModal, insertFormat,
    handleFileUpload, handleAdminLogout, initiateAdminLogin, editFlash, textareaRef
}) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-[var(--bg-card)] rounded-[1.5rem] sm:rounded-[2.5rem] border shadow-premium relative overflow-hidden flex flex-col min-h-[600px] md:min-h-[850px] glass-morphism transition-all duration-700 ${editFlash ? 'border-blue-500/60 shadow-[0_0_60px_rgba(59,130,246,0.25)]' : 'border-[var(--border-color)]'}`}
        >
            {/* Editor Top Bar */}
            <div className="px-4 md:px-10 py-4 md:py-5 bg-[var(--bg-secondary)] backdrop-blur-md border-b border-[var(--border-color)] flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-6 min-w-0">
                    <div className="hidden xs:flex gap-1.5 shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
                    </div>
                    <div className="h-4 w-px bg-[var(--border-color)] hidden sm:block shrink-0" />
                    <div className="flex flex-col min-w-0 overflow-hidden">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] shrink-0" />
                            <span className="text-[9px] md:text-[10px] font-mono font-black text-[var(--text-primary)] tracking-[0.2em] md:tracking-[0.3em] uppercase truncate">
                                Studio_Core_v4.0
                            </span>
                        </div>
                        <span className="text-[7px] md:text-[8px] font-mono text-[var(--text-muted)] uppercase tracking-widest mt-0.5 truncate">
                            ACTIVE_NODE: ANKIT_ABHISHEK_DATA_CLOUD
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 md:gap-4 shrink-0">
                    <button
                        onClick={() => setPreviewMode(!previewMode)}
                        className={`flex items-center gap-1.5 md:gap-3 px-3 md:px-6 py-2 rounded-2xl text-[9px] md:text-[10px] font-mono font-bold transition-all border ${previewMode ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'bg-[var(--nav-hover)] border-[var(--border-color)] text-[var(--text-dim)] hover:text-[var(--text-primary)] hover:bg-[var(--border-color)]'}`}
                    >
                        {previewMode ? <Edit3 size={12} /> : <Eye size={12} />}
                        <span className="hidden xs:inline">{previewMode ? 'LIVE_EDITOR' : 'PREVIEW_STREAM'}</span>
                    </button>
                    {isAdmin && (
                        <button
                            onClick={handleAdminLogout}
                            className="p-2 sm:p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all active:scale-95"
                            title="Terminate Session"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* Notification Banner */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={`border-b ${notification.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}
                    >
                        <div className="px-6 md:px-8 py-2.5 flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase">
                            {notification.type === 'success' ? <CheckCircle size={14} /> : <Activity size={14} />}
                            {notification.message}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex-grow flex flex-col overflow-y-auto custom-scrollbar">
                {isAdmin ? (
                    <form onSubmit={handlePublish} className="flex flex-col flex-grow">
                        {/* Cover Image Area */}
                        <div
                            className="relative h-48 md:h-64 bg-[var(--nav-hover)] border-b border-[var(--border-color)] group cursor-pointer overflow-hidden"
                            onClick={() => openImageModal('cover')}
                        >
                            {formData.coverImage ? (
                                <>
                                    <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-primary)]/80 backdrop-blur-md rounded-full border border-[var(--border-color)] text-xs font-mono text-[var(--text-primary)]">
                                            <Camera size={14} /> CHANGE_COVER
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[var(--text-muted)] group-hover:text-blue-400 transition-colors">
                                    <div className="w-12 h-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center border border-[var(--border-color)] group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-all">
                                        <ImagePlus size={24} />
                                    </div>
                                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Add Cover Image</span>
                                </div>
                            )}
                        </div>

                        <div className="p-6 md:p-12 space-y-8 md:space-y-12 flex-grow">
                            {!previewMode ? (
                                <>
                                    {/* Title Group */}
                                    <div className="space-y-6">
                                        <textarea
                                            required
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Article Title..."
                                            rows={1}
                                            className="w-full bg-transparent border-none text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] focus:outline-none resize-none leading-tight tracking-tight"
                                            onInput={(e) => {
                                                const target = e.target as HTMLTextAreaElement;
                                                target.style.height = 'auto';
                                                target.style.height = target.scrollHeight + 'px';
                                            }}
                                        />
                                        <div className="flex items-center gap-4">
                                            <div className="w-1 h-8 bg-blue-500/30 rounded-full" />
                                            <input
                                                required
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                placeholder="Add a short subtitle or description..."
                                                className="w-full bg-transparent border-none text-lg md:text-xl text-[var(--text-dim)] placeholder:text-[var(--text-subtle)] focus:outline-none font-light italic"
                                            />
                                        </div>
                                    </div>

                                    {/* Toolbar */}
                                    <div className="sticky top-0 z-10 py-4 bg-[var(--bg-card)]/80 backdrop-blur-md -mx-2 px-2 flex items-center justify-between border-b border-[var(--border-color)]">
                                        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                                            {[
                                                { icon: Heading1, action: () => insertFormat('h1'), label: "H1" },
                                                { icon: Heading2, action: () => insertFormat('h2'), label: "H2" },
                                                { type: 'separator' },
                                                { icon: Bold, action: () => insertFormat('bold'), label: "Bold" },
                                                { icon: Italic, action: () => insertFormat('italic'), label: "Italic" },
                                                { icon: LinkIcon, action: () => insertFormat('link'), label: "Link" },
                                                { type: 'separator' },
                                                { icon: Quote, action: () => insertFormat('quote'), label: "Quote" },
                                                { icon: List, action: () => insertFormat('list'), label: "List" },
                                                { icon: Code, action: () => insertFormat('code'), label: "Code" },
                                                { type: 'separator' },
                                                { icon: ImageIcon, action: () => insertFormat('image'), label: "Add Media" },
                                            ].map((tool, i) => (
                                                (tool as any).type === 'separator' ? (
                                                    <div key={i} className="w-px h-4 bg-[var(--border-color)] mx-2" />
                                                ) : (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        onClick={(tool as any).action}
                                                        className="p-2.5 rounded-xl text-[var(--text-dim)] hover:text-blue-400 hover:bg-blue-500/10 transition-all outline-none group"
                                                        title={(tool as any).label}
                                                    >
                                                        {React.createElement((tool as any).icon, { size: 16, className: "group-hover:scale-110 transition-transform" })}
                                                    </button>
                                                )
                                            ))}
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="flex-grow flex flex-col bg-[var(--bg-secondary)] rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 md:p-10 border border-[var(--border-color)] shadow-inner mb-6">
                                        <textarea
                                            required
                                            ref={textareaRef}
                                            name="content"
                                            value={formData.content}
                                            onChange={handleInputChange}
                                            placeholder="Begin your story here..."
                                            className="w-full flex-grow bg-transparent border-none focus:outline-none text-[var(--text-primary)] text-base md:text-lg lg:text-xl font-light leading-relaxed min-h-[400px] md:min-h-[500px] resize-none placeholder:text-[var(--text-subtle)] custom-scrollbar"
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="prose dark:prose-invert prose-lg md:prose-xl max-w-none animate-in fade-in slide-in-from-bottom-4 duration-500 text-[var(--text-dim)]">
                                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">{formData.title || 'Untitled Article'}</h1>
                                    {formData.description && <p className="text-lg md:text-xl text-[var(--text-dim)] font-light mb-8 italic">{formData.description}</p>}
                                    <div className="h-px w-full bg-[var(--border-color)] mb-12" />
                                    <ReactMarkdown components={{
                                        img: ({ ...props }) => (
                                            <span className="block my-8 max-w-full overflow-hidden rounded-2xl border border-[var(--border-color)] shadow-2xl bg-[var(--bg-secondary)]">
                                                <img {...props} className="w-full h-auto object-contain" alt="" />
                                            </span>
                                        )
                                    }}>
                                        {formData.content || '_No content yet..._'}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </div>

                        {/* Editor Footer */}
                        <div className="px-6 md:px-8 py-6 bg-[var(--nav-hover)] border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center justify-center md:justify-start gap-8 text-[10px] font-mono text-[var(--text-muted)] w-full md:w-auto">
                                <div className="flex items-center gap-2.5">
                                    <div className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
                                    {isAdmin ? 'AUTH_LEVEL: ADMIN' : 'AUTH_LEVEL: GUEST'}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Type size={12} className="text-blue-500" />
                                    {(formData.content || '').trim().split(/\s+/).filter(x => x).length} WORDS
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={12} className="text-purple-500" />
                                    {Math.ceil((formData.content || '').trim().split(/\s+/).filter(x => x).length / 200)} MINS
                                </div>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto">
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-6 py-4 rounded-2xl bg-[var(--nav-hover)] text-[10px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-color)] border border-[var(--border-color)] transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                                    >
                                        <X size={16} /> ABORT_MISSION
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="px-6 sm:px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-mono font-black rounded-2xl hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all active:scale-95 uppercase tracking-[0.3em] flex items-center justify-center gap-3 group/btn flex-grow md:flex-grow-0"
                                >
                                    {isEditing ? <Save size={16} /> : <Send size={16} />}
                                    {isEditing ? 'SYNC_CORE_PACKET' : 'DEPLOY_VOYAGE'}
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center p-6 sm:p-12 text-center space-y-6 sm:space-y-8 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03),transparent)]">
                        <div className="w-24 h-24 rounded-full bg-blue-500/5 border border-blue-500/10 flex items-center justify-center shadow-inner relative group">
                            <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <LockIcon size={40} className="text-blue-500 relative z-10" />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight">Studio Access Restricted</h3>
                            <p className="text-[var(--text-muted)] text-sm font-light max-w-xs mx-auto leading-relaxed">
                                The Studio Core requires administrative authorization for system modification and content deployment.
                            </p>
                        </div>
                        <button
                            onClick={initiateAdminLogin}
                            className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] sm:text-[10px] font-mono font-black rounded-2xl hover:shadow-[0_10px_30px_rgba(37,99,235,0.4)] transition-all active:scale-95 uppercase tracking-[0.2em] sm:tracking-[0.3em] flex items-center justify-center gap-3 group"
                        >
                            <Terminal size={14} className="group-hover:translate-x-1 transition-transform" /> Initialize_Admin_Login
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ThoughtsStudio;
