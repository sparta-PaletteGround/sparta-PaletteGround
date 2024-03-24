'use client';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('./Editor'));

export default Editor;
