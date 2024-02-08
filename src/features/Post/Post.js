import "./Post.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
} from "react-icons/ti";
import { FaRegCommentAlt } from "react-icons/fa";
import {calculateTimeDifference} from '../../util/epochToDate'
import { formatNumber } from "../../util/formatNumber";
import Comment from "../Comment/Comment";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const Post = ({post, toggleComment}) => {
  const [vote, setVote] = useState(0);
  const [voteResult, setVoteResult] = useState(null);
  const comments = useSelector(state => state.comments)
  const {status, error} = comments

  const renderUpVote = () => {
    if (voteResult === 1) {
      return <TiArrowUpThick className="up upThick" />;
    }
    return <TiArrowUpOutline className="up" />;
  };

  const renderDownVote = () => {
    if (voteResult === -1) {
      return <TiArrowDownThick className="down downThick" />;
    }
    return <TiArrowDownOutline className="down" />;
  };

  const handleVote = (direction) => {
    if (voteResult === null) {
      setVoteResult(direction);
      setVote(vote + direction);
    } else if (voteResult === direction) {
      setVoteResult(null);
      setVote(vote - direction);
    } else {
      setVoteResult(direction);
      setVote(vote + 2 * direction);
    }
  };

  const voteScore = () => {
    if (voteResult === null) {
      return post.ups
    } else if (voteResult === 1) {
      return post.ups +1
    } else {
      return post.ups -1
    }
  }

  const renderComments = () => {
    if (error) {
      return (
        <div>
          <h3>Error loading comments</h3>
        </div>
      );
    }
    
    if (status === 'loading') {
      return (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )
    }
    
    
    if (post.toggleComments) {
      return (
        <div className="comment-list">
          {post.comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
        </div>
      )
    }
  }

  return (
    <div className="post-container">
        <div className="vote-container">
          <button type="button" onClick={() => handleVote(1)}>
            {renderUpVote()}
          </button>
          <p
            className={`voteNum ${voteResult===1? "upThick":""} ${voteResult===-1?"downThick": ""}`}
          >
            {formatNumber(voteScore())}
          </p>
          <button type="button" onClick={() => handleVote(-1)}>
            {renderDownVote()}
          </button>
        </div>
        <div className="content-container">
          <h3 className="post-title">{post.title}</h3>
          <div className="post-image-container">
            {post.url && <img src= {post.url} alt="" />}
          </div>
          <div className="post-detail-container">
            <div className="poster-profile">
              <p>{post.author}</p>
            </div>
            <div className="upload-time">
              {calculateTimeDifference(post.created)}
            </div>
            <div className="comment">
              <button onClick={() => toggleComment(post.permalink)}>
                <FaRegCommentAlt />
              </button>
              <p>{formatNumber(post.num_comments)}</p>
            </div>
          </div>
          {renderComments()}
        </div>
      </div>
  )
}

export default Post