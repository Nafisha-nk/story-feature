import { ref, computed } from 'vue'

const STORAGE_KEY = 'stories'
const MAX_STORIES_SIZE = 4 * 1024 * 1024

export function useStories() {
    const stories = ref([])
    
    // Load stories from localStorage
    const loadStories = () => {
        try {
        const storedStories = localStorage.getItem(STORAGE_KEY)
        if (storedStories) {
        const parsedStories = JSON.parse(storedStories)
        const now = new Date().getTime()
        
        // Filter out expired stories (older than 24 hours)
        stories.value = parsedStories.filter(story => 
            now - story.timestamp < 24 * 60 * 60 * 1000
        )
        
        // Update localStorage with filtered stories
        saveStories()
        }
    }  catch (error) {
        console.error('Error loading stories:', error)
        clearStorage()
    }
    }
    
    // Save stories to localStorage
    const saveStories = () => {
        try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stories.value))
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            removeOldStories()
        clearStorage()
        }
    }
    }
    
    // Add a new story
    const addStory = (imageData) => {

        if(imageData.length > 2 * 1024 *1024) {
            throw new Error('Image is too large. Please choose a smaller image.')
        }


        const newStory = {
        id: Date.now(),
        imageData,
        timestamp: new Date().getTime()
        }
        
        stories.value.push(newStory)
        saveStories()
    }
    
    // Remove a story by ID
    const removeStory = (id) => {
        stories.value = stories.value.filter(story => story.id !== id)
        saveStories()
    }
    
    // Check if image dimensions are valid
    // const validateImageDimensions = (file) => {
    //     return new Promise((resolve, reject) => {
    //     const img = new Image()
    //     img.onload = function() {
    //         if (this.width > 1080 || this.height > 1920) {
    //         reject(new Error('Image dimensions should not exceed 1080x1920 pixels.'))
    //         } else {
    //         resolve()
    //         }
    //     }
    //     img.onerror = () => reject(new Error('Failed to load image'))
    //     img.src = URL.createObjectURL(file)
    //     })
    // }
    

    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()
        
        img.onload = function() {
            // Calculate new dimensions (max 800px width/height)
            let width = img.width
            let height = img.height
            const maxDimension = 800
            
            if (width > height && width > maxDimension) {
            height = (height * maxDimension) / width
            width = maxDimension
            } else if (height > maxDimension) {
            width = (width * maxDimension) / height
            height = maxDimension
            }
            
            canvas.width = width
            canvas.height = height
            
            // Draw and compress image
            ctx.drawImage(img, 0, 0, width, height)
            canvas.toBlob((blob) => {
            resolve(blob)
            }, 'image/jpeg', 0.7) // 70% quality
        }
        
        img.onerror = () => reject(new Error('Failed to load image'))
        img.src = URL.createObjectURL(file)
        })
    }

    // Convert file to base64
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            try {
                //Compress image first
                const compressedFile = compressImage(file)
                const reader = new FileReader()

                reader.onload = e => resolve(e.target.result)
                reader.onerror = error => reject(error)
                reader.readAsDataURL(file)
        }
        catch (error) {
            reject(error)
        }
        })
    }

    const clearStorage = () => {
        try {
        localStorage.removeItem(STORAGE_KEY)
        stories.value = []
        } catch (error) {
        console.error('Error clearing storage:', error)
        }
    }
    
    const getStorageUsage = () => {
        try {
        const data = localStorage.getItem(STORAGE_KEY)
        return data ? new Blob([data]).size : 0
        } catch (error) {
        return 0
        }
    }
    
    const hasStories = computed(() => stories.value.length > 0)
    const storageUsage = computed(() => getStorageUsage())
    
    return {
        stories,
        hasStories,
        storageUsage,
        loadStories,
        addStory,
        removeStory,
        // validateImageDimensions,
        fileToBase64,
        clearStorage
    }
}