<template>
    <section class="content">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="box box-warning">
                    <div class="box-body">
                        <h1 class="col-md-8 col-md-offset-2">Update Question</h1>
                        <div class="form-group col-md-8 col-md-offset-2">
                            <label>Your Question Title</label>
                            <input type="text" class="form-control" placeholder="Question Title ..." v-model="objToUpdate.title">
                        </div>
                        <div class="form-group col-md-8 col-md-offset-2">
                            <label>Your Question Body</label>
                            <textarea class="form-control" rows="10" placeholder="Write Some Question ..." v-model="objToUpdate.questionBody"></textarea>
                        </div>
                        <div class="form-group col-md-8 col-md-offset-2">
                            <button type="submit" class="btn btn-warning" @click="updateQuestion">Update</button>
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
  props: ['id'],
  name: 'DetailQuestion',
  computed: {
    ...mapGetters({
      objToUpdate: 'getActiveQuestion'
    })
  },
  methods: {
    updateQuestion: function () {
      this.$store.dispatch('updateQuestionById', this.objToUpdate)
        .then(() => {
          this.$router.push({name: `userdetailquestion`})
        })
    }
  },
  created: function () {
    this.$store.dispatch('getQuestionById', this.id)
  },
  watch: {
    id () {
      this.$store.dispatch('getQuestionById', this.id)
    }
  }
}
</script>

<style>

</style>
