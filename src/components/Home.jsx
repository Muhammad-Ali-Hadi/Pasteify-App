import { useSearchParams } from 'react-router-dom';
import './Home.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const [title,setTitle]=useState('');
    const [value,setValue]=useState('');
    const [isCode,setIsCode]=useState(false);
    const [searchParams,setSearchParams]=useSearchParams();
    const pasteId=searchParams.get('pasteId');
    const dispatch=useDispatch();
    const allPastes=useSelector((state)=>state.paste.pastes);
    
    const codePattern=/(;|\{|\}|\bfunction\b|\bclass\b|\bif\b|\belse\b|\bfor\b|\bwhile\b|\breturn\b|=>|#include\s*<|int\s+main|def\s+\w+|public\s+class|System\.out\.print|printf\s*\(|cin\s*>>|cout\s*<<|using\s+namespace)/i;

    useEffect(()=>{
        if(pasteId)
        {
            const paste=allPastes.find((p)=>p.id===pasteId);
            if(paste)
            {
                setTitle(paste.title);
                setValue(paste.content);
                setIsCode(codePattern.test(paste.content));
            }
        }
        else
        {
            setTitle('');
            setValue('');
            setIsCode(false);
        }
    },[pasteId]);

    const handleChange=(e)=>{
        setValue(e.target.value);
        setIsCode(codePattern.test(e.target.value));
    };

    function createPaste()
    {
        const paste={
            title: title,
            content: value,
            id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        if(!paste.title && !paste.content)
        {
            toast.error('Title and Content Fields are Empty!');
            return;
        }
        else if(!paste.title)
        {
            toast.error('Title Field is Empty!');
            return;
        }
        else if(!paste.content)
        {
            toast.error('Content Field is Empty!');
            return;   
        }
        
        dispatch(pasteId ? updateToPastes(paste) : addToPastes(paste));

        setTitle('');
        setValue('');
        setIsCode(false);
        setSearchParams();
    }

  return (
    <div className='home-container'>
        <div>
            <input className='inputs' type='text' value={title} placeholder='Enter Title Here' onChange={(e)=>setTitle(e.target.value)}/>
            <button onClick={createPaste}>{pasteId ? 'Update Paste' : 'Create My Paste'}</button>
        </div>
        <div className='text-div'>
            <textarea value={value} placeholder='Enter Context Here' onChange={(e)=>handleChange(e)} className={`text-area ${isCode ? 'code-area' : ''}`}/>
                {isCode && <p className='font-format'><FontAwesomeIcon icon={faCode}/> Code Detected</p>}
        </div>
    </div>
  )
}

export default Home