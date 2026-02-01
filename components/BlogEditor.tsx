
import React from 'react';
import ReactQuill from 'react-quill-new';
import { motion } from 'framer-motion';

interface BlogEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'code-block'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'code-block'
];

const BlogEditor: React.FC<BlogEditorProps> = ({ value, onChange, placeholder }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="quill-dark-container"
        >
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder || "Start writing your masterpiece..."}
                className="document-editor"
            />

            <style>{`
        .quill-dark-container {
          background: #0a0a0a;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .document-editor .ql-toolbar {
          background: #151515 !important;
          border: none !important;
          border-bottom: 1px solid rgba(255,255,255,0.05) !important;
          padding: 12px !important;
        }
        .document-editor .ql-container {
          border: none !important;
          font-family: 'Inter', sans-serif !important;
          font-size: 16px !important;
          min-height: 400px;
        }
        .document-editor .ql-editor {
          padding: 30px !important;
          color: #e5e7eb !important;
          line-height: 1.8 !important;
        }
        .document-editor .ql-editor.ql-blank::before {
          color: #4b5563 !important;
          font-style: normal !important;
        }
        .document-editor .ql-stroke {
          stroke: #9ca3af !important;
        }
        .document-editor .ql-fill {
          fill: #9ca3af !important;
        }
        .document-editor .ql-picker {
          color: #9ca3af !important;
        }
        .document-editor .ql-picker-options {
          background-color: #151515 !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
        }
        .document-editor .ql-snow .ql-picker.ql-header .ql-picker-label::before,
        .document-editor .ql-snow .ql-picker.ql-header .ql-picker-item::before {
            content: 'Text' !important;
        }
        .document-editor .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
        .document-editor .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
            content: 'H1' !important;
        }
        .document-editor .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
        .document-editor .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
            content: 'H2' !important;
        }
        .document-editor .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
        .document-editor .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
            content: 'H3' !important;
        }
        
        .document-editor .ql-editor code, 
        .document-editor .ql-editor .ql-code-block-container {
            background-color: #1a1a1a !important;
            color: #60a5fa !important;
            border-radius: 4px;
            padding: 2px 4px;
        }
        
        .document-editor .ql-editor .ql-code-block-container {
            padding: 15px !important;
            margin-bottom: 10px !important;
        }
        
        .document-editor .ql-editor h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; color: white; }
        .document-editor .ql-editor h2 { font-size: 2rem; font-weight: 700; margin-bottom: 0.8rem; color: white; }
        .document-editor .ql-editor h3 { font-size: 1.5rem; font-weight: 600; margin-bottom: 0.6rem; color: white; }
        
        .document-editor .ql-active .ql-stroke {
           stroke: #3b82f6 !important;
        }
        .document-editor .ql-active .ql-fill {
           fill: #3b82f6 !important;
        }
      `}</style>
        </motion.div>
    );
};

export default BlogEditor;
