import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeUser: {
      userId: localStorage.getItem('userid') || ``,
      token: localStorage.getItem('token') || ``,
      email: localStorage.getItem('email') || ``,
      name: localStorage.getItem('name') || ``
    },
    arrUserQuestion: [],
    activeQuestion: {},
    arrAllQuestion: [],
    arrAllActiveAnswer: []
  },
  getters: {
    getActiveUser: state => {
      return state.activeUser
    },
    getArrUserQuestion: state => {
      return state.arrUserQuestion
    },
    getActiveQuestion: state => {
      return state.activeQuestion
    },
    getArrAllQuestion: state => {
      return state.arrAllQuestion
    },
    getArrAllActiveAnswer: state => {
      return state.arrAllActiveAnswer
    }
  },
  mutations: {
    setActiveUser (state, payload) {
      state.activeUser = payload
    },
    setArrUserQuestion (state, payload) {
      state.arrUserQuestion = payload
    },
    setActiveQuestion (state, payload) {
      state.activeQuestion = payload
    },
    setArrAllQuestion (state, payload) {
      state.arrAllQuestion = payload
    },
    setArrAllActiveAnswer (state, payload) {
      state.arrAllActiveAnswer = payload
    }
  },
  actions: {
    signIn (context, payload) {
      return axios.post('http://localhost:3000/api/users/signin', {
        username_email: payload.username_email,
        password: payload.password
      })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem('userid', response.data.data.id)
            localStorage.setItem('token', response.data.data.token)
            localStorage.setItem('email', response.data.data.email)
            localStorage.setItem('name', response.data.data.name)
            const objNewLoginUser = {
              userId: localStorage.getItem('userid'),
              token: localStorage.getItem('token'),
              email: localStorage.getItem('email'),
              name: localStorage.getItem('name')
            }
            context.commit('setActiveUser', objNewLoginUser)
            alert('Login Success')
          } else {
            alert('Login Failed, please check your username or password')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    signOut (context) {
      localStorage.removeItem('userid')
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      context.state.activeUser.userid = ``
      context.state.activeUser.token = ``
      context.state.activeUser.email = ``
    },
    signUp (context, payload) {
      return axios.post('http://localhost:3000/api/users/signup', {
        username: payload.username,
        password: payload.password,
        name: payload.name,
        email: payload.email,
        gender: payload.gender
      })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem('userid', response.data.data.id)
            localStorage.setItem('token', response.data.data.token)
            localStorage.setItem('email', response.data.data.email)
            localStorage.setItem('name', response.data.data.name)
            const objNewLoginUser = {
              userId: localStorage.getItem('userid'),
              token: localStorage.getItem('token'),
              email: localStorage.getItem('email'),
              name: localStorage.getItem('name')
            }
            context.commit('setActiveUser', objNewLoginUser)
            alert('Sign Up Success, Happy Writing !')
          } else {
            alert('sign up error')
          }
        })
        .catch(err => {
          alert(`sign up error ${err}`)
        })
    },
    createNewQuestion (context, payload) {
      return axios.post('http://localhost:3000/api/questions', {
        title: payload.title,
        questionBody: payload.questionBody,
        userid: context.state.activeUser.userId
      })
        .then((response) => {
          if (response.status === 200) {
            alert('New Question Created !')
          } else {
            alert('Error creating question !')
          }
        })
        .catch((err) => {
          alert(`An error occured ! ${err}`)
        })
    },
    getUserQuestion (context) {
      axios.get(`http://localhost:3000/api/questions/userquestion/${context.state.activeUser.userId}`, {})
        .then((question) => {
          context.commit('setArrUserQuestion', question.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getQuestionById (context, payload) {
      axios.get(`http://localhost:3000/api/questions/${payload}`, {})
        .then((question) => {
          context.commit('setActiveQuestion', question.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateQuestionById (context, payload) {
      return axios.put(`http://localhost:3000/api/questions/${payload._id}`, {
        title: payload.title,
        questionBody: payload.questionBody
      })
        .then((question) => {
          alert('Your Question Has Been Updated !')
        })
        .catch((err) => {
          alert(`An error occured ! ${err}`)
        })
    },
    deleteQuestionById (context, payload) {
      return axios.delete(`http://localhost:3000/api/questions/${payload}`)
        .then(() => {
          alert(`Questions Has Been Deleted !`)
        })
        .catch((err) => {
          alert(`An error occured ! ${err}`)
        })
    },
    getAllQuestion (context) {
      axios.get(`http://localhost:3000/api/questions`, {})
        .then((question) => {
          context.commit('setArrAllQuestion', question.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    createNewAnswer (context, payload) {
      return axios.post('http://localhost:3000/api/answers', {
        answerBody: payload.answerBody,
        userid: context.state.activeUser.userId,
        questionid: payload.questionid
      })
        .then((response) => {
          if (response.status === 200) {
            alert('Submit answer success !')
          } else {
            alert('Error submitting your answer !')
          }
        })
        .catch((err) => {
          alert(`An error occured ! ${err}`)
        })
    },
    getAllAnswer (context) {
      axios.get(`http://localhost:3000/api/answers/questionid/${context.state.activeQuestion._id}`, {})
        .then((answer) => {
          context.commit('setArrAllActiveAnswer', answer.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    upvoteQuestion (context, payload) {
      axios.post(`http://localhost:3000/api/questions/upvote`, {
        userId: context.state.activeUser.userId,
        questionId: payload
      })
        .then(() => {
          alert('You Upvote this question !')
        })
        .catch((err) => {
          alert(`An error occured ${err}`)
        })
    },
    downvoteQuestion (context, payload) {
      axios.post(`http://localhost:3000/api/questions/downvote`, {
        userId: context.state.activeUser.userId,
        questionId: payload
      })
        .then(() => {
          alert('You Downvote this question !')
        })
        .catch((err) => {
          alert(`An error occured ${err}`)
        })
    },
    upvoteAnswer (context, payload) {
      axios.post(`http://localhost:3000/api/answers/upvote`, {
        userId: context.state.activeUser.userId,
        answerId: payload
      })
        .then(() => {
          alert('You Upvote this answer !')
        })
        .catch((err) => {
          alert(`An error occured ${err}`)
        })
    },
    downvoteAnswer (context, payload) {
      axios.post(`http://localhost:3000/api/answers/downvote`, {
        userId: context.state.activeUser.userId,
        answerId: payload
      })
        .then(() => {
          alert('You Downvote this answer !')
        })
        .catch((err) => {
          alert(`An error occured ${err}`)
        })
    }
  }
})

export default store
