<template>
    <div class="stories-container-wrapper">
        <div class="stories-container" ref="storiesContainer">
            <!-- Add Story Button -->
            <div class="add-story" @click="$emit('openUpload')">
            <div class="add-story-circle">+</div>
            <div class="add-story-text">Your Story</div>
            </div>
            
            <!-- User Stories -->
            <div 
            v-for="(story, index) in stories" 
            :key="story.id" 
            class="story"
            @click="$emit('openStory', index)"
            >
            <div class="story-avatar">
                <img :src="story.imageData" :alt="`Story ${index + 1}`">
            </div>
            <div class="story-username">Story {{ index + 1 }}</div>
            </div>
        </div>
        <!-- Scroll indicators for many stories -->
        <div v-if="canScrollLeft" class="scroll-indicator left-indicator">‹</div>
        <div v-if="canScrollRight" class="scroll-indicator right-indicator">›</div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
    stories: {
        type: Array,
        required: true
    }
})

defineEmits(['openUpload', 'openStory'])

const storiesContainer = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

const checkScroll = () => {
    if (storiesContainer.value) {
        const container = storiesContainer.value
        canScrollLeft.value = container.scrollLeft > 0
        canScrollRight.value = container.scrollLeft < (container.scrollWidth - container.clientWidth)
    }
    }

    onMounted(() => {
    if (storiesContainer.value) {
        storiesContainer.value.addEventListener('scroll', checkScroll)
        // Check initial state
        setTimeout(checkScroll, 100)
    }
    })

    onUnmounted(() => {
    if (storiesContainer.value) {
        storiesContainer.value.removeEventListener('scroll', checkScroll)
    }
})
</script>
