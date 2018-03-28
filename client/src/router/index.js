import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import Dashboard from '@/components/Dashboard'
import FormQuestion from '@/components/FormQuestion'
import TableQuestion from '@/components/TableQuestion'
import DetailQuestion from '@/components/DetailQuestion'
import ExploreQuestionTable from '@/components/ExploreQuestionTable'
import ExploreDetailQuestion from '@/components/ExploreDetailQuestion'
import store from '@/store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        if (store.state.activeUser.token !== ``) {
          next()
        } else {
          next({name: 'signin'})
        }
      },
      children: [{
        path: '',
        name: 'NewQuestion',
        component: FormQuestion
      }, {
        path: 'explore',
        name: 'ExploreQuestion',
        component: ExploreQuestionTable
      },
      {
        path: 'myquestion',
        component: TableQuestion,
        children: [{
          path: ':id',
          name: 'userdetailquestion',
          component: DetailQuestion,
          props: true
        }]
      }, {
        path: 'post/:id',
        name: 'exploredetailquestion',
        component: ExploreDetailQuestion,
        props: true
      }]
    }
  ]
})
