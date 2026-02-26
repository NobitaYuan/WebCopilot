import type { SearchEngine, SearchConfig } from '@/types/search'
import { DEFAULT_CONFIG } from '@/common/constants/searchEngines'

/**
 * 构建搜索 URL
 * @param engine 搜索引擎配置
 * @param keyword 搜索关键词
 * @returns 完整的搜索 URL
 */
export function buildSearchUrl(engine: SearchEngine, keyword: string): string {
    const encodedKeyword = encodeURIComponent(keyword)
    return `${engine.urlTemplate}${encodedKeyword}`
}

/**
 * 打开搜索结果页
 * @param engine 搜索引擎配置
 * @param keyword 搜索关键词
 */
export function openSearch(engine: SearchEngine, keyword: string): void {
    const url = buildSearchUrl(engine, keyword)
    // 通过 background script 创建新标签页（content script 无法直接访问 chrome.tabs）
    chrome.runtime.sendMessage(
        {
            type: 'search',
            url: url,
        },
        (response) => {
            if (chrome.runtime.lastError) {
                console.error('Failed to send search message:', chrome.runtime.lastError)
            } else if (response && !response.success) {
                console.error('Failed to create tab:', response.error)
            }
        },
    )
}

/**
 * 从 chrome.storage 加载搜索配置
 * @returns 搜索配置对象
 */
export async function loadSearchConfig(): Promise<SearchConfig> {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['searchConfig'], (result) => {
            resolve(result.searchConfig || DEFAULT_CONFIG)
        })
    })
}

/**
 * 保存搜索配置到 chrome.storage
 * @param config 搜索配置对象
 */
export async function saveSearchConfig(config: SearchConfig): Promise<void> {
    return new Promise((resolve) => {
        chrome.storage.sync.set({ searchConfig: config }, () => {
            resolve()
        })
    })
}
