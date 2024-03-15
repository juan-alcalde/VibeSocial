
import icon2 from '../img/post.png'
import icon3 from '../img/imagepost.png'
import icon4 from '../img/linkPost.png'
import icon5 from '../img/juan.png'
import icon6 from '../img/comment.png'
import icon7 from '../img/trash.png'
import icon8 from '../img/file-edit.png'
import IconEye from "../img/audio-waves.png"
import "./icon.css"

export const Icon = () => {
    return (
        <div className='icon'>
            <p className='icontwo'>
            <img src={IconEye} alt="Icon" style={{ width: '20px', height: 'auto' }} />
             Vibe Social</p>
         </div>
    )
}

export const IconPostText = () => {
    return (
        <div className='icon'>
            <label>
            <img src={icon2} alt="Icon" style={{ width: '16px', height: 'auto' }} /> Post</label>
            
         </div>
    )
}
export const IconPostImage = () => {
    return (
        <div className='icon'>
            <label>
            <img src={icon3} alt="Icon" style={{ width: '16px', height: 'auto' }} /> Image</label>
            
         </div>
    )
}
export const IconPostLink = () => {
    return (
        <div className='icon'>
            <label>
            <img src={icon4} alt="Icon" style={{ width: '16px', height: 'auto' }} /> URL</label>
            
         </div>
    )
}
export const IconTipsAside = () => {
    return (
        <div className='icon'>
            <label>
            <img src={icon5} alt="Icon" style={{ width: '35px', height: 'auto' }} /> Posting to JuanApp </label>
            
         </div>
    )
}
export const IconComment = () => {
    return (
        <div className='icon'>
            
            <img src={icon6} alt="Icon" style={{ width: '35px', height: 'auto' }} />  
            
         </div>
    )
}
export const IconDelete = () => {
    return (
        <div className='icon'>
            
            <img src={icon7} alt="Icon" style={{ width: '35px', height: 'auto' }} />  
            
         </div>
    )
}
export const IconEdit = () => {
    return (
        <div className='icon'>
            
            <img src={icon8} alt="Icon" style={{ width: '35px', height: 'auto' }} />  
            
         </div>
    )
}
