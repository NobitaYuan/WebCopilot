<script lang="ts" setup>
import { onMounted, shallowRef } from 'vue'

interface IProps {
    icon: string
}
const Props = withDefaults(defineProps<IProps>(), {
    icon: '',
})

const dynamicIcon = shallowRef()
const loadSvgIcon = async (iconName: string) => {
    try {
        // 动态导入SVG文件
        const { default: icon } = await import(`@/common/icons/${iconName}.svg?component`)
        // 将导入的SVG文件设置为组件
        dynamicIcon.value = icon
    } catch (error) {
        console.error('Error loading SVG icon:', error)
    }
}
onMounted(() => {
    loadSvgIcon(Props.icon)
})
</script>

<template>
    <component :is="dynamicIcon" v-bind="$attrs" />
</template>
