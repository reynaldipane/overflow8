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
                            </tr>
                            <tr v-for="(question,i) in arrAllQuestion" :key='i'>
                                    <td>
                                        <router-link :to="{name: 'exploredetailquestion', params: {id: question._id}}">
                                            {{question.title}}
                                        </router-link>
                                    </td>
                            </tr>
                            </tbody>
                        </table>
                        <div> 
                            <router-view></router-view>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ExploreQuestionTable',
  computed: {
    ...mapGetters({
      arrAllQuestion: 'getArrAllQuestion'
    })
  },
  created: function () {
    this.$store.dispatch('getAllQuestion')
  },
  updated: function () {
    this.$store.dispatch('getAllQuestion')
  }
}
</script>

<style>

</style>
