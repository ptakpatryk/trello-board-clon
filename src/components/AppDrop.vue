<template>
  <div
    @drop.stop="onDrop"
    @dragover.prevent
    @dragenter.prevent
  >
   <slot />
  </div>
</template>

<script>
export default {
  methods: {
    onDrop (e) {
      const transferData = JSON.parse(e.dataTransfer.getData('payload'))
      console.log('transferData')
      console.log(transferData)

      this.$emit('drop', transferData)
    }
  }
}
</script>
