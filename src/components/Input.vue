<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ""
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="control">
    <input
      class="input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    >
  </div>
</template>
