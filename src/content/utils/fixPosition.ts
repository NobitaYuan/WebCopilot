export interface fixPositionOption {
    /** 起始x */
    x: number
    /** 起始y */
    y: number
    /** 元素宽度 */
    domWidth: number
    /** 元素高度 */
    domHeight: number
    /** x偏移 */
    xOffset?: number
    /** y偏移 */
    yOffset?: number
    /** 元素与浏览器边界的内边距 */
    padding?: number
}
/**
 * @name 位置修正方法
 * @description 传入起始位置，和对应元素宽高，返回对应浏览器宽高修正后的位置
 * @return 返回修正后的位置
 */
export function fixPosition(option: fixPositionOption) {
    const { x, y, domWidth, domHeight, xOffset = 0, yOffset = 0, padding = 0 } = option

    // 初始位置
    let left = x + xOffset
    let top = y - yOffset

    // 窗口宽高
    const { innerWidth, innerHeight } = window
    // 最大位置
    const maxLeft = innerWidth - domWidth - padding
    const maxTop = innerHeight - domHeight - padding

    // 位置矫正
    if (left < 0) {
        left = padding
    }
    if (top < 0) {
        top = padding
    }
    if (left > maxLeft) {
        left = maxLeft
    }
    if (top > maxTop) {
        top = maxTop
    }
    return { left, top }
}
