import React from 'react';
import './Post.css';
import './PostLoading.css';
import {
  TiArrowUpOutline,
  TiArrowDownOutline,
} from "react-icons/ti";
import { FaRegCommentAlt } from "react-icons/fa";
import getRanNum from '../../util/getRandNum';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


const PostLoading = () => {
  return (
    <article className="post-container">
      <div className="vote-container">
        <button
          type="button"
          aria-label="Up vote"
        >
          <TiArrowUpOutline />
        </button>
        <Skeleton className="voteNum voteNum-loading" height={20} />
        <button
          type="button"
          aria-label="Down vote"
        >
          <TiArrowDownOutline />
        </button>
      </div>
      <div className="content-container">
        <h3 className="post-title">
          <Skeleton width={getRanNum(100, 200)} />
        </h3>

        <div className="post-image-container">
          <Skeleton height={250} />
        </div>

        <div className="post-detail-container">
          <span>
            <Skeleton width={getRanNum(20, 50)} />
          </span>
          <span>
            <Skeleton width={getRanNum(50, 100)} />
          </span>
          <span className="comment">
            <button
              type="button"
              aria-label="Show comments"
            >
              <FaRegCommentAlt />
            </button>
            <Skeleton width={getRanNum(10, 50)} />
          </span>
        </div>
      </div>
    </article>
  );
};

export default PostLoading;
