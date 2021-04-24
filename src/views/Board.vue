<template>
  <div class="board">

    <div class="flex fex-row items-start">
      <BoardColumn
        v-for="(column, $columnIndex) of board.columns"
        :key="column.name"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
      />
      <div class="column">
        <input
          class="p-2 mr-2 flex-grow bg-transparent w-full"
          type="text"
          v-model="newColumnName"
          placeholder="+ Create New Column"
          @keydown.enter="createColumn"
        >
        <p
          v-if="newColumnName"
          class="text-sm opacity-75 mt-2"
        >
          Click <strong>enter</strong> to add new column.
        </p>
      </div>

    </div>

    <div
      class="task-bg"
      v-if="isTaskOpen"
      @click.self="closeTask"
      @keydown.esc="closeTask"
    >
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '../components/BoardColumn.vue'

export default {
  data () {
    return {
      newColumnName: ''
    }
  },
  components: {
    BoardColumn
  },
  computed: {
    ...mapState(['board']),
    isTaskOpen () {
      return this.$route.name === 'task'
    }
  },
  methods: {
    closeTask () {
      this.$router.push({ name: 'board' })
    },
    createColumn () {
      this.$store.commit('CREATE_COLUMN', {
        columnName: this.newColumnName
      })

      this.newColumnName = ''
    }
  }
}
</script>

<style lang="css">
.board {
  @apply p-4 h-full overflow-auto;

  background: #4e54c8;  /* fallback for old browsers */
  background: linear-gradient(to right, #8f94fb, #4e54c8); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.column {
  @apply bg-grey-light p-4 mr-4 text-left shadow rounded-lg;
  min-width: 350px;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}
</style>
