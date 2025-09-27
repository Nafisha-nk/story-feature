<template>
    <div class="upload-modal" @click.self="$emit('close')">
        <div class="upload-content">
            <h2 class="upload-title">Add a Story</h2>
            <input 
            type="file" 
            ref="fileInput"
            class="file-input" 
            accept="image/*"
            @change="handleFileSelect"
            >
            <button 
            class="upload-btn" 
            :disabled="!selectedFile"
            @click="uploadStory"
            >
            Upload Story
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close', 'upload'])

const fileInput = ref(null)
const selectedFile = ref(null)

const handleFileSelect = (event) => {
    selectedFile.value = event.target.files[0]
}

const uploadStory = async () => {
    if (!selectedFile.value) return
    
    try {
        emit('upload', selectedFile.value)
        emit('close')
        reset()
    } catch (error) {
        alert(error.message)
    }
}

const reset = () => {
    selectedFile.value = null
    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

defineExpose({
    reset
})
</script>