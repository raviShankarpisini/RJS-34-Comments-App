// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {eachComment, hittingLike, deletingComment} = props

  const {id, name, comment, isLiked, profileColor, date} = eachComment

  const time = formatDistanceToNow(date)

  const likeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeStyle = isLiked ? 'like-style' : ''
  const onClickLike = () => {
    hittingLike(id)
  }
  const onClickDelete = () => {
    deletingComment(id)
  }

  return (
    <li>
      <div className="comment-top-section">
        <p className={`profile-logo ${profileColor}`}>{name[0]}</p>
        <p className="user-name">{name}</p>
        <p className="comment-time">{time}</p>
      </div>
      <p className="comment">{comment}</p>
      <div className="like-and-delete-container">
        <div className="like">
          <button
            type="button"
            onClick={onClickLike}
            className="comment-button"
          >
            <img src={likeImage} alt="like" />
          </button>

          <p className={`like-text ${likeStyle}`}>Like</p>
        </div>
        <button
          className="comment-button"
          type="button"
          onClick={onClickDelete}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="line" />
    </li>
  )
}

export default CommentItem
