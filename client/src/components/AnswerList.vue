<template>
  <div>
    <h3>All Replies</h3>
    <div class="panel panel-default" v-if="arrAnswers.length" v-for="(answer, i) in arrAnswers" :key='i'>
      <div class="panel-heading" v-if="answer.userid">
        Replied By {{ answer.userid.name}}
      </div>
      <div class="panel-body" v-if="answer.answerBody">{{answer.answerBody}}</div>
      <div class="panel-footer">
          <button class="btn btn-warning" @click="upvote(answer._id)">Upvote</button>
          <button class="btn btn-danger" @click="downvote(answer._id)">Downvote</button> 
        <div v-if="answer.upvote && answer.downvote">
          <h3>{{answer.upvote.length - answer.downvote.length}} Votes This Answer</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: `AnswerList`,
  computed: {
    ...mapGetters({
      arrAnswers: 'getArrAllActiveAnswer'
    })
  },
  created: function () {
    this.$store.dispatch('getAllAnswer')
  },
  updated: function () {
    this.$store.dispatch('getAllAnswer')
  },
  methods: {
    upvote (id) {
      this.$store.dispatch('upvoteAnswer', id)
    },
    downvote (id) {
      this.$store.dispatch('downvoteAnswer', id)
    }
  }
}
</script>

<style>

</style>
