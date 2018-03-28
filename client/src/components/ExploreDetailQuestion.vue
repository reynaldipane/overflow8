<template>
    <section class="content">
      <div class="row">
        <div class="col-md-10 col-md-offset-1 col-xs-8 col-xs-offset-2">
          <h2>{{activeQuestion.title}}</h2>
          <div class="panel panel-default">
            <div class="panel-heading" v-if="activeQuestion.userid">
              Asked by {{activeQuestion.userid.name}}
            </div>
            <div class="panel-body">{{activeQuestion.questionBody}}</div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <button class="btn btn-warning" @click="upvote(activeQuestion._id)">Upvote</button>
              <button class="btn btn-danger" @click="downvote(activeQuestion._id)">Downvote</button>
            </div>
            <div class="col-md-4" v-if="activeQuestion.upvote && activeQuestion.downvote">
              <h4>{{ activeQuestion.upvote.length - activeQuestion.downvote.length}} Votes This Question</h4>              
            </div>
          </div>
          <br>
          <div> 
            <button class="btn btn-primary" @click="showFormReply"> Reply </button>
            <br>
            <br>
            <div class="row" v-if="formReply">
              <div class="col-md-8 col-md-offset-2">
                <div class="box box-warning">
                  <div class="box-body">
                      <div class="form-group col-md-8 col-md-offset-2">
                        <label>Reply this question</label>
                        <textarea class="form-control" rows="10" placeholder="Your reply ..." v-model="objReply.answerBody"></textarea>
                      </div>
                      <div class="form-group col-md-8 col-md-offset-2">
                        <button type="submit" class="btn btn-warning" @click="submitAnswer">Submit Answer</button>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <answer-list></answer-list>
            </div>

          </div>
        </div>
      </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import AnswerList from '@/components/AnswerList'

export default {
  props: ['id'],
  name: 'ExploreDetailQuestion',
  components: {
    'answer-list': AnswerList
  },
  data: function () {
    return {
      formReply: ``,
      objReply: {
        answerBody: ``,
        questionid: this.id
      }
    }
  },
  methods: {
    showFormReply: function () {
      this.formReply = true
    },
    submitAnswer: function () {
      this.$store.dispatch('createNewAnswer', this.objReply)
        .then(() => {
          this.formReply = false
        })
    },
    upvote (id) {
      this.$store.dispatch('upvoteQuestion', id)
    },
    downvote (id) {
      this.$store.dispatch('downvoteQuestion', id)
    }
  },
  computed: {
    ...mapGetters({
      activeQuestion: 'getActiveQuestion'
    })
  },
  created: function () {
    this.$store.dispatch('getQuestionById', this.id)
    this.formReply = false
  },
  updated: function () {
    this.$store.dispatch('getQuestionById', this.id)
    this.formReply = false
  }
}
</script>

<style>

</style>
