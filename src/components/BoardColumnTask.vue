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
import movingMixin from '../mixins/movingTasksAndColumnsMixin'

export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  mixins: [movingMixin],
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
    }
  }
}
</script>

<style lang="css" scoped>
  .task {
    @apply flex items-center flex-wrap shadow mb-3 p-3 rounded bg-white text-grey-darkest no-underline;
  }
</style>
