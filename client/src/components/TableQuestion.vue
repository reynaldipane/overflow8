<template>
    <section class="content">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="box box-warning">
                    <div class="box-body">
                        <table class="table table-bordered">
                            <tbody>
                            <tr>
                                <th style="text-align:center;">Question Title</th>
                                <th style="text-align:center;">Action</th>
                            </tr>
                            <tr v-for="(question,i) in arrUserQuestion" :key='i'>
                                    <td>
                                          {{question.title}}
                                    </td>
                                    <td>
                                        <router-link :to="{name: 'userdetailquestion', params: {id: question._id}}">
                                          <button class="btn btn-warning">
                                            <i class="glyphicon glyphicon-pencil"></i>
                                          </button>
                                        </router-link>
                                        <button class="btn btn-danger" @click="deleteData(question._id)">
                                          <i class="glyphicon glyphicon-trash"></i>
                                        </button>
                                    </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                  <router-view></router-view>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TableQuestion',
  data: function () {
    return {
      questions: [],
      singleQuestion: ``
    }
  },
  methods: {
    deleteData (id) {
      this.$store.dispatch('deleteQuestionById', id)
        .then(() => {
          this.$router.push({path: '/dashboard/myquestion'})
        })
    }
  },
  computed: {
    ...mapGetters({
      arrUserQuestion: 'getArrUserQuestion'
    })
  },
  created: function () {
    this.$store.dispatch('getUserQuestion')
  },
  updated: function () {
    this.$store.dispatch('getUserQuestion')
  }
}
</script>

<style>

</style>
