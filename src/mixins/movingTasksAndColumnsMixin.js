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
    dropElement (transferData) {
      if (transferData.type === 'task') {
        this.moveTask(transferData)
      } else if (transferData.type === 'column') {
        this.moveColumn(transferData)
      }
    },
    moveTask ({ fromColumnIndex, fromTaskIndex }) {
      const fromTasks = this.board.columns[fromColumnIndex].tasks

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        fromTaskIndex,
        // Belowed are taken from the current component props
        toTasks: this.board.columns[this.columnIndex].tasks,
        toTaskIndex: this.taskIndex
      })
    },
    moveColumn ({ fromColumnIndex }) {
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex: this.columnIndex
      })
    }
  }
}
