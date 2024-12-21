import React from 'react'
import {Link} from "react-router-dom"
import '../styles/BlogCard.css'
import placeholder from "../assets/userplaceHolder.jpg"
import BlogImage from "../assets/placeholder.jpg"

const BlogCard = () => {
  return (
    <div className='container'>
        <h2>Blogs </h2>
        <div className='card'>
            <div className='card-head'>
                <img src={placeholder} className='profileImage' />
                <Link to="">Profile Name</Link>
                <button className='FollowButton'>Follow</button>
            </div>
            <div className='card-middle'>
                <img src={BlogImage} className='BlogImage'/>
            </div>
            <div className='card-foot'>
                <button className='LikeButton'>❤︎</button>
                <span>Likes Count : 0</span>
            </div>
        </div>
    </div>
  )
}

export default BlogCard