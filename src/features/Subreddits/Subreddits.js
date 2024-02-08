import React from "react";
import "./Subreddits.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubredditData } from "../../store/subredditSlice";
import { setSelectedSubreddit } from "../../store/redditSlice";

const Subreddits = () => {
  const subreddits = useSelector((state) => state.subreddit.data);
  const selectedSubreddit = useSelector((state) => state.reddit.selectedSubreddit)
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchSubredditData());
  }, [dispatch]);

  return (
    <div className="subreddits-container">
      <h2 className="title">Subreddits</h2>
      <div className="subreddits">
        {subreddits.map((subreddit) => (
          <div key={subreddit.id} className={`subreddit-topic ${selectedSubreddit === subreddit.url && `selected`}`} onClick={()=> dispatch(setSelectedSubreddit(subreddit.url))}>
            <img
              src={
                subreddit.icon_image
                  ? subreddit.icon_image
                  : "https://toppng.com/uploads/preview/reddit-logo-reddit-icon-115628658968pe8utyxjt.png"
              }
              alt="icon"
              />
            <h5>{subreddit.display_name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subreddits;
