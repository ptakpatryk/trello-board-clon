<template>
  <AppDrop
    @drop="dropElement"
  >
    <AppDrag
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex
      }"
    >
      <div
        class="task"
        @click="goToTask(task)"
      >
        <span class="w-full flex-no-shrink font-bold">
          {{ task.name }}
        </span>
        <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
          {{ task.description }}
        </p>
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import movingMixin from '../mixins/movingTasksAndColumnsMixin'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'

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
  components: {
    AppDrag,
    AppDrop
  },
  mixins: [movingMixin],
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    }
  }
}
</script>

<style lang="css" scoped>
  .task {
    @apply flex items-center flex-wrap shadow mb-3 p-3 rounded bg-white text-grey-darkest no-underline;
  }
</style>
