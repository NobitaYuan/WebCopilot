type directionType = Ref<{ x: 'left' | 'right' | ''; y: 'top' | 'bottom' | '' }>
interface returnData {
    moveX: Ref<number>
    moveY: Ref<number>
    isDown: Ref<boolean>
    direction: directionType
    reset: () => void
}
/**
 * @description 用于鼠标拖拽移动元素
 * @param {Ref<HTMLElement | null> | HTMLElement} RefEl 需要拖动的元素(必选)，可以是ref的dom或者dom
 * @param {number} boundary 边界值(可选)，即距离窗口上下左右的边界值
 * @return {returnData} 返回响应式的： moveX,moveY移动的xy距离 | isDown是否按下  | direction移动的方向  | reset()以及重置xy距离
 */
export const useCursorMove = (RefEl: Ref<HTMLElement | null> | HTMLElement, boundary: number = 30): returnData => {
    const isDown = ref(false)
    let mouseX = 0
    let mouseY = 0
    const moveX = ref(0)
    const moveY = ref(0)
    const temp = { x: 0, y: 0 }
    const direction: directionType = ref({ x: '', y: '' })

    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault()
        document.addEventListener('mousemove', handleMouseMove, { passive: false })
        document.addEventListener('mouseup', handleMouseUp, { passive: false })
        // 拿到当前鼠标的位置
        mouseX = e.clientX
        mouseY = e.clientY
        isDown.value = true
    }
    const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault()
        if (isDown.value) {
            // 存储之前的值
            const oldX = moveX.value
            const oldY = moveY.value
            // 移动时，计算鼠标移动的距离
            moveX.value = temp.x + (e.clientX - mouseX)
            moveY.value = temp.y + (e.clientY - mouseY)
            judgeDirection(oldX, oldY)
            correctPosition(e, oldX, oldY)
        }
    }
    const handleMouseUp = () => {
        temp.x = moveX.value
        temp.y = moveY.value
        isDown.value = false
        removeEvent()
    }
    // 重置
    const reset = () => {
        mouseX = 0
        mouseY = 0
        moveX.value = 0
        moveY.value = 0
        temp.x = 0
        temp.y = 0
        direction.value = { x: '', y: '' }
    }
    // 判断方向
    const judgeDirection = (oldX: number, oldY: number) => {
        if (oldX > moveX.value) {
            direction.value.x = 'left'
        } else if (oldX < moveX.value) {
            direction.value.x = 'right'
        } else if (oldY > moveY.value) {
            direction.value.y = 'top'
        } else if (oldY < moveY.value) {
            direction.value.y = 'bottom'
        }
    }
    // 矫正位置
    const correctPosition = (e: MouseEvent, oldX: number, oldY: number) => {
        if ((e.clientX <= boundary && direction.value.x === 'left') || (window.innerWidth - e.clientX <= boundary && direction.value.x === 'right')) {
            moveX.value = oldX
        }
        if ((e.clientY <= boundary && direction.value.y === 'top') || (window.innerHeight - e.clientY <= boundary && direction.value.y === 'bottom')) {
            moveY.value = oldY
        }
    }
    // 添加事件
    const addEvent = (el: HTMLElement) => {
        if (!el) throw new Error('未找到HTMLElement,看看你是不是传错了？')
        if (!el.addEventListener) throw new Error('传入的不是Ref<HTMLElement>或者HTMLElement')
        el.addEventListener('mousedown', handleMouseDown, { passive: false })
    }
    // 移出事件
    const removeEvent = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    onMounted(() => {
        try {
            addEvent(toValue(RefEl)!)
        } catch (error) {
            console.error(error)
            void 0
        }
    })
    onScopeDispose(() => {
        removeEvent()
    })

    return {
        moveX,
        moveY,
        isDown,
        direction,
        reset,
    }
}
