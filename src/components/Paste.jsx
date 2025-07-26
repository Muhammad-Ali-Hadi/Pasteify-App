import React, { useState } from 'react'
import './Paste.css'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router';

const Paste = () => {
    const pastes=useSelector((state)=>state.paste.pastes);
    const dispatch=useDispatch();
    const [searchTerm,setSearchTerm]=useState('');
    const navigate=useNavigate();

    const filterData=pastes.filter((paste)=>paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleDelete=(pasteId)=>dispatch(removeFromPastes(pasteId));

    function manageSharing(paste)
    {
        const shareURL=`${window.location.origin}/pastes/${paste.id}`;
        if(navigator.share)
        {
            navigator.share({
                title: paste.title,
                text: 'Check out this paste : ',
                URL: shareURL,
            }).then(()=>toast.success('Shared Successfully!'))
            .catch((error)=>toast.error('Error Sharing : '+error));
        }
        else
        {
            navigator.clipboard.writeText(shareURL);
            toast.success('Link Copied to Clipboard!');
        }
    }

    return (
    <div className='paste-container'>
        <input className='search-input' type='search' placeholder='Search Here' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
        <div className='paste-cards'>
            {filterData.length>0 && 
            filterData.map(
                (paste)=>{
                    return (
                    <div className='single-card' key={paste?.id}>
                        <div>
                            {paste.title}
                        </div>
                        <div className='button-group'>
                            <button onClick={()=>navigate(`/?pasteId=${paste?.id}`)}>Edit</button>
                            <button onClick={()=>navigate(`/pastes/${paste?.id}`)}>View</button>
                            <button onClick={()=>handleDelete(paste?.id)}>Delete</button>
                            <button onClick={()=>{navigator.clipboard.writeText(paste?.content); toast.success('Copied to Clipboard!');}}>Copy</button>
                            <button onClick={()=>manageSharing(paste)}>Share</button>
                        </div>
                        <div>
                            {paste.createdAt}
                        </div>
                    </div>
                )}
            )}
        </div>
    </div>
  )
}

export default Paste