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
export default {
  props: {
    board: {
      type: Object,
      requred: true
    },
    column: {
      type: Object,
      requred: true
    },
    columnIndex: {
      type: Number,
      requred: true
    }
  },
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
    },
    dropElement (e, toColumnIndex, toTaskIndex) {
      const droppedElType = e.dataTransfer.getData('type')

      if (droppedElType === 'task') {
        this.moveTask(e, toColumnIndex, toTaskIndex !== undefined ? toTaskIndex : null)
      } else if (droppedElType === 'column') {
        this.moveColumn(e, toColumnIndex)
      }
    },
    moveTask (e, toColumnIndex, toTaskIndex) {
      const fromTaskIndex = e.dataTransfer.getData('from-task-index')
      const fromTasksIndex = e.dataTransfer.getData('from-tasks-index')
      const fromTasks = this.board.columns[fromTasksIndex].tasks
      const toTasks = this.board.columns[toColumnIndex].tasks
      toTaskIndex = toTaskIndex !== null ? toTaskIndex : toTasks.length

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        toTasks,
        fromTaskIndex,
        toTaskIndex
      })
    },
    moveColumn (e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')

      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex
      })
    }
  }
}
</script>
