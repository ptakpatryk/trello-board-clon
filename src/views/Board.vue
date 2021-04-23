<template>
  <div class="board">

    <div class="flex fex-row items-start">
      <div
        class="column"
        v-for="(column, $columnIndex) of board.columns"
        :key="column.name"
        draggable
        @dragstart.self="pickupColumn($event, $columnIndex)"
        @drop="dropElement($event, $columnIndex)"
        @dragover.prevent
        @dragenter.prevent
      >
        <h3 class=" mb-4 font-bold text-center py-2 uppercase">
          {{ column.name }}
        </h3>
        <div class="list-reset">
          <div
            class="task"
            v-for="(task, $taskIndex) of column.tasks"
            :data-id="task.id"
            :key="task.id"
            draggable
            @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
            @click="goToTask(task)"
            @dragover.prevent
            @dragenter.prevent
            @drop.stop="dropElement($event, $columnIndex, $taskIndex)"
          >
            <span class="w-full flex-no-shrink font-bold">
              {{ task.name }}
            </span>
            <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
              {{ task.description }}
            </p>
          </div>

          <input
            type="text"
            class="block p-2 w-full bg-transparent"
            placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)"
          >
        </div>
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

export default {
  computed: {
    ...mapState(['board']),
    isTaskOpen () {
      return this.$route.name === 'task'
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    closeTask () {
      this.$router.push({ name: 'board' })
    },
    createTask (e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })

      e.target.value = ''
    },
    pickupTask (e, taskIndex, fromColIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-tasks-index', fromColIndex)
      e.dataTransfer.setData('type', 'task')
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

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-3 p-3 rounded bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-4 mr-4 text-left shadow rounded-lg;
  min-width: 350px;
}

.board {
  @apply p-4 h-full overflow-auto;

  background: #4e54c8;  /* fallback for old browsers */
  background: linear-gradient(to right, #8f94fb, #4e54c8); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}
</style>
