import "./Comment.css"
import React from 'react'
import {calculateTimeDifference} from '../../util/epochToDate'


const Comment = ({comment}) => {
  
  return (
    <div className="comment-container">
      <div className="comment-header">
        <p className="comment-author">{comment.author}</p>
        <p className="comment-upload-time">{calculateTimeDifference(comment.created_utc)}</p>
      </div>
      <div>
        <p className="comment-body">{comment.body}</p>
      </div>
    </div>
  )
}

export default Comment;