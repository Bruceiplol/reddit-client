import React, {useEffect} from 'react'
import Post from '../Post/Post'
import { useDispatch, useSelector } from "react-redux";
import { fetchRedditData, selectFilteredPosts, setSearchTerm, setPostComments, toggleComments } from '../../store/redditSlice';
import { fetchComments } from '../../store/commentsSlice';
import { AnimatedList } from 'react-animated-list';
import PostLoading from '../Post/PostLoading';
import getRanNum from '../../util/getRandNum';

const Home = () => {
  const redditData = useSelector(state => state.reddit)
  const {status, error, searchTerm, selectedSubreddit} = redditData
  const posts = useSelector(selectFilteredPosts)
  const dispatch = useDispatch()
  
  const toggleComment = (index, permalink) => {
    dispatch(fetchComments({permalink, index}))
    .then(action => {
      const {comments, index} = action.payload
      dispatch(toggleComments({index}))
      dispatch(setPostComments({comments, index}))
    })
  }

  useEffect(()=> {
    dispatch(fetchRedditData(selectedSubreddit))
  },[dispatch, selectedSubreddit])

  if (posts.length === 0 && searchTerm !="") {
    return (
      <div className="error">
        <h2>No posts matching "{searchTerm}"</h2>
        <button type="button" onClick={() => dispatch(setSearchTerm(''))}>
          Go home
        </button>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <AnimatedList animation="zoom">
        {Array(getRanNum(3, 10)).fill(<PostLoading key={getRanNum(1,100)}/>)}
      </AnimatedList>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Failed to load posts.</h2>
        <button
          type="button"
          onClick={() => dispatch(fetchRedditData(selectedSubreddit))}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="home-container">
      {posts.map((post, index) => <Post key={post.id} post={post} toggleComment={() => toggleComment(index, post.permalink)}/>)}
    </div>
  )
}

export default Home