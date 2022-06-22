import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const initialCommentsList = []

// Write your code here

class Comments extends Component {
  state = {
    count: 0,
    inputName: '',
    inputComment: '',
    commentsList: initialCommentsList,
  }

  onSubmitComment = event => {
    event.preventDefault()

    const {inputName, inputComment} = this.state
    const profileColor =
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]
    const newComment = {
      id: uuidv4(),
      name: inputName,
      comment: inputComment,
      isLiked: false,
      date: new Date(),
      profileColor,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      count: prevState.count + 1,
      inputName: '',
      inputComment: '',
      //   ikkada name,comment ni reset chesina kaani ,comment add chesina tarvatha input lo value
      //   normal ga blank ki raledhu.reason enti ante input tag lo value ga vetini ivvali.ala ivvakapothe state update
      //   avutunnatu kaani manam aa state value a input lo ravali ani teliyadaniki value={inputname } ala ivvali
      //
    }))
  }

  onChangeName = event => {
    this.setState({
      inputName: event.target.value,
    })
  }

  onChangeComment = event => {
    this.setState({
      inputComment: event.target.value,
    })
  }

  deletingComment = id => {
    const {commentsList} = this.state
    const commentsListAfterDelete = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState(prevState => ({
      commentsList: commentsListAfterDelete,
      count: prevState.count - 1,
    }))
  }

  hittingLike = id => {
    const {commentsList} = this.state
    //   this.setState(prevState => ({
    //     commentsList: prevState.commentsList.map(eachComment => {
    //       if (eachComment.id === id) {
    //         return {...eachComment, isLiked: !eachComment.isLiked}
    //       }
    //       return eachComment
    //     }),
    //   }))
    const commentsListAfterLiked = commentsList.map(eachComment => {
      if (id === eachComment.id) {
        return {...eachComment, isLiked: !eachComment.isLiked}
      }
      return eachComment
    })

    this.setState({commentsList: commentsListAfterLiked})
  }

  render() {
    const {inputName, inputComment, count, commentsList} = this.state
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="heading">Comments</h1>
          <div className="top-section">
            <form className="form-style" onSubmit={this.onSubmitComment}>
              <p className="form-heading">
                Say something about 4.0 Technologies
              </p>
              <input
                className="input"
                placeholder="Your Name"
                onChange={this.onChangeName}
                value={inputName}
              />
              <textarea
                className="input"
                placeholder="Your Comment"
                rows="8"
                onChange={this.onChangeComment}
                value={inputComment}
              />
              <button className="button" type="submit">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image"
            />
          </div>
          <hr className="line" />
          <p className="no-of-comments">
            <span>{count}</span>Comments
          </p>
          <ul>
            {commentsList.map(eachComment => (
              <CommentItem
                eachComment={eachComment}
                key={eachComment.id}
                hittingLike={this.hittingLike}
                deletingComment={this.deletingComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
