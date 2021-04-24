<template>
  <div
    class="task"
    :data-id="task.id"
    draggable
    @dragstart="pickupTask($event, taskIndex, columnIndex)"
    @click="goToTask(task)"
    @dragover.prevent
    @dragenter.prevent
    @drop.stop="dropElement($event, columnIndex, taskIndex)"
  >
    <span class="w-full flex-no-shrink font-bold">
      {{ task.name }}
    </span>
    <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
      {{ task.description }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    board: {
      type: Object,
      required: true
    },
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    pickupTask (e, taskIndex, fromColIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-tasks-index', fromColIndex)
      e.dataTransfer.setData('type', 'task')
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
    dropElement (e, toColumnIndex, toTaskIndex) {
      const droppedElType = e.dataTransfer.getData('type')

      if (droppedElType === 'task') {
        this.moveTask(e, toColumnIndex, toTaskIndex !== undefined ? toTaskIndex : null)
      } else if (droppedElType === 'column') {
        this.moveColumn(e, toColumnIndex)
      }
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

<style lang="css" scoped>
  .task {
    @apply flex items-center flex-wrap shadow mb-3 p-3 rounded bg-white text-grey-darkest no-underline;
  }
</style>
