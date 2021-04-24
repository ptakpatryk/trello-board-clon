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
  methods: {
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
