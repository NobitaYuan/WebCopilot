/**
 * 搜索引擎接口
 */
export interface SearchEngine {
    /** 唯一标识 */
    id: string
    /** 显示名称 */
    name: string
    /** 图标组件名 */
    icon: string
    /** URL 模板 */
    urlTemplate: string
}

/**
 * 搜索配置接口
 */
export interface SearchConfig {
    /** 默认搜索引擎 ID */
    defaultEngineId: string
}
