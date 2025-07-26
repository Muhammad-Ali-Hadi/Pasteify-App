import { useParams } from 'react-router-dom';
import './viewPaste.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard,faCode } from '@fortawesome/free-solid-svg-icons'

const ViewPaste = () => {
    const [isCode,setIsCode]=useState(false);
    const {id}=useParams();
    const allPastes=useSelector((state)=>state.paste.pastes);
    const paste=allPastes.filter((p)=>p.id===id)[0];

    const codePattern=/(;|\{|\}|\bfunction\b|\bclass\b|\bif\b|\belse\b|\bfor\b|\bwhile\b|\breturn\b|=>|#include\s*<|int\s+main|def\s+\w+|public\s+class|System\.out\.print|printf\s*\(|cin\s*>>|cout\s*<<|using\s+namespace)/i;

    useEffect(()=>{
        if(codePattern.test(paste.content))
        setIsCode(true);
    },[paste])

  return (
    <div className='view-container'>
        <div>
            <input className='inputs' type='text' value={paste.title} disabled/>
        </div>
        <div className='text-div'>
            <FontAwesomeIcon icon={faClipboard} style={{cursor: 'pointer'}} onClick={()=>{navigator.clipboard.writeText(paste.content),toast.success('Copied to Clipboard!')}}/>
            <textarea value={paste.content} placeholder='Enter Context Here' className={`text-area ${isCode ? 'code-area' : ''}`} disabled/>
            {isCode && <p className='font-format'><FontAwesomeIcon icon={faCode}/> Code</p>}
        </div>
    </div>
  )
}

export default ViewPaste