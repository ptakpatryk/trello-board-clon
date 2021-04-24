<template>
  <div
    class="column"
    draggable
    @dragstart.self="pickupColumn($event, columnIndex)"
    @drop="dropElement($event, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
  >
    <h3 class=" mb-4 font-bold text-center py-2 uppercase">
      {{ column.name }}
    </h3>
    <div class="list-reset">
      <BoardColumnTask
        v-for="(task, $taskIndex) of column.tasks"
        :key="task.id"
        :task="task"
        :taskIndex="$taskIndex"
        :columnIndex="columnIndex"
        :board="board"
      />

      <input
        type="text"
        class="block p-2 w-full bg-transparent"
        placeholder="+ Enter new task"
        @keyup.enter="createTask($event, column.tasks)"
      >
    </div>
  </div>
</template>

<script>
import BoardColumnTask from './BoardColumnTask.vue'
import movingMixin from '../mixins/movingTasksAndColumnsMixin'

export default {
  mixins: [movingMixin],
  components: {
    BoardColumnTask
  },
  methods: {
    createTask (e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })

      e.target.value = ''
    },
    pickupColumn (e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    }
  }
}
</script>
