<template>
  <AppDrop
    @drop="dropElement"
  >
    <AppDrag
      class="column"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }"
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
    </AppDrag>
  </AppDrop>
</template>

<script>
import BoardColumnTask from './BoardColumnTask.vue'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'
import movingMixin from '../mixins/movingTasksAndColumnsMixin'

export default {
  mixins: [movingMixin],
  components: {
    BoardColumnTask,
    AppDrag,
    AppDrop
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
