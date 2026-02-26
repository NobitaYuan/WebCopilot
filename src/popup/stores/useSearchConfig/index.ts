import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SEARCH_ENGINES, DEFAULT_CONFIG } from '@/common/constants/searchEngines'
import type { SearchConfig, SearchEngine } from '@/types/search'

/**
 * 加载搜索配置
 */
async function loadSearchConfig(): Promise<SearchConfig> {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['searchConfig'], (result) => {
            resolve(result.searchConfig || DEFAULT_CONFIG)
        })
    })
}

/**
 * 保存搜索配置
 */
async function saveSearchConfig(config: SearchConfig): Promise<void> {
    return new Promise((resolve) => {
        chrome.storage.sync.set({ searchConfig: config }, () => {
            resolve()
        })
    })
}

export const useSearchConfigStore = defineStore('searchConfigStore', () => {
    /** 搜索引擎列表 */
    const searchEngines = ref<SearchEngine[]>(SEARCH_ENGINES)
    /** 搜索配置 */
    const searchConfig = ref<SearchConfig>(DEFAULT_CONFIG)

    /** 初始化搜索配置 */
    const initSearchConfig = async () => {
        const config = await loadSearchConfig()
        searchConfig.value = config
    }

    /** 设置默认搜索引擎 */
    const setDefaultEngine = async (engineId: string) => {
        searchConfig.value.defaultEngineId = engineId
        await saveSearchConfig(searchConfig.value)
    }

    return {
        searchEngines,
        searchConfig,
        initSearchConfig,
        setDefaultEngine,
    }
})
