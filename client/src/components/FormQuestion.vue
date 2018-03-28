<template>
    <section class="content">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="box box-warning">
                    <div class="box-body">
                        <h1 class="col-md-8 col-md-offset-2">Add new question</h1>
                        <div class="form-group col-md-8 col-md-offset-2">
                            <label>Your Question Title</label>
                            <input type="text" class="form-control" placeholder="Question Title ..." v-model="objNewQuestion.title">
                        </div>
                        <div class="form-group col-md-8 col-md-offset-2">
                            <label>Your Question</label>
                            <textarea class="form-control" rows="5" placeholder="Write Some Question ..." v-model="objNewQuestion.questionBody"></textarea>
                        </div>
                        <div class="form-group col-md-8 col-md-offset-2">
                            <button type="submit" class="btn btn-warning" @click="createQuestion">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>

    </section>
</template>

<script>
export default {
  name: 'FormQuestion',
  data: function () {
    return {
      objNewQuestion: {
        title: ``,
        questionBody: ``
      }
    }
  },
  methods: {
    createQuestion: function () {
      this.$store.dispatch('createNewQuestion', this.objNewQuestion)
        .then(this.$router.push({path: '/dashboard/myquestion'}))
    }
  }
}
</script>

<style>

</style>
