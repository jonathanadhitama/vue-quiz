<template>
  <div>
    <b-jumbotron>
      <template slot="lead">{{ currentQuestion.question }}</template>

      <hr class="my-4" />

      <b-list-group>
        <b-list-group-item
          v-for="(answer, index) in shuffledAnswers"
          :key="index"
          @click="selectAnswer(index)"
          :class="answerClass(index)"
        >{{answer}}</b-list-group-item>
      </b-list-group>

      <b-button
        @click="submitAnswer"
        variant="primary"
        :disabled="selectedIndex === null || answered"
      >Submit</b-button>
      <b-button @click="next" variant="success">Next</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import { randomiseItems } from "../utils";
export default {
  props: {
    currentQuestion: Object,
    next: Function,
    increment: Function
  },
  data() {
    return {
      selectedIndex: null,
      shuffledAnswers: [],
      correctIndex: -1,
      answered: false
    };
  },
  watch: {
    currentQuestion: {
      immediate: true,
      handler() {
        this.selectedIndex = null;
        this.answered = false;
        this.shuffleAnswers();
      }
    }
  },
  methods: {
    selectAnswer(index) {
      this.selectedIndex = index;
    },
    shuffleAnswers() {
      this.shuffledAnswers = randomiseItems([
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer
      ]);
      this.correctIndex = this.shuffledAnswers.indexOf(
        this.currentQuestion.correct_answer
      );
    },
    submitAnswer() {
      this.increment(this.selectedIndex === this.correctIndex);
      this.answered = true;
    },
    answerClass(index) {
      if (this.answered) {
        if (this.correctIndex === index) {
          return "correct";
        } else if (this.selectedIndex === index) {
          return "incorrect";
        } else {
          return "";
        }
      } else if (this.selectedIndex === index) {
        return "selected";
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped>
.list-group {
  margin-bottom: 15px;
}
.list-group-item:hover {
  background-color: #eee;
  cursor: pointer;
}
.btn {
  margin: 0 5px;
}

.selected {
  background-color: lightblue;
}
.correct {
  background-color: lightgreen;
}
.incorrect {
  background-color: red;
}
</style>