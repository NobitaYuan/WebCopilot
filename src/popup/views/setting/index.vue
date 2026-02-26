<script lang="ts" setup>
import { onMounted } from 'vue'
import { useSearchConfigStore } from '@/popup/stores'
import { ElMessage } from 'element-plus'

const searchConfigStore = useSearchConfigStore()

/** 处理默认搜索引擎变更 */
const handleDefaultEngineChange = async (engineId: string) => {
    await searchConfigStore.setDefaultEngine(engineId)
    ElMessage.success('默认搜索引擎已更新')
}

onMounted(async () => {
    // 初始化搜索配置
    await searchConfigStore.initSearchConfig()
})
</script>

<template>
    <div class="settings_page">
        <div class="page_header">
            <h2>设置</h2>
            <p>配置您的 WebCopilot 体验</p>
        </div>

        <div class="settings_content">
            <div class="setting_section">
                <h3>搜索引擎</h3>
                <div class="setting_item">
                    <label class="setting_label">默认搜索引擎</label>
                    <div class="engine_options">
                        <div
                            v-for="engine in searchConfigStore.searchEngines"
                            :key="engine.id"
                            class="engine_option"
                            :class="{ active: searchConfigStore.searchConfig.defaultEngineId === engine.id }"
                            @click="handleDefaultEngineChange(engine.id)"
                        >
                            <span class="engine_name">{{ engine.name }}</span>
                            <div v-if="searchConfigStore.searchConfig.defaultEngineId === engine.id" class="check_icon">
                                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M384 690.768l-166.4-166.4-60.352 60.352 226.752 226.752 496.896-496.896-60.352-60.352z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.settings_page {
    min-width: 350px;
    max-width: 450px;
    padding: 20px;
    .page_header {
        margin-bottom: 24px;

        h2 {
            margin: 0 0 8px;
            font-size: 24px;
            font-weight: 600;
            color: #1a1a1a;
        }

        p {
            margin: 0;
            font-size: 14px;
            color: #666;
        }
    }

    .settings_content {
        .setting_section {
            margin-bottom: 24px;

            &:last-child {
                margin-bottom: 0;
            }

            h3 {
                margin: 0 0 16px;
                font-size: 16px;
                font-weight: 600;
                color: #333;
            }

            .setting_item {
                .setting_label {
                    display: block;
                    margin-bottom: 12px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #555;
                }

                .engine_options {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;

                    .engine_option {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 12px 16px;
                        border: 2px solid #e5e7eb;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all 0.2s;

                        &:hover {
                            border-color: #3b82f6;
                            background-color: #f0f7ff;
                        }

                        &.active {
                            border-color: #3b82f6;
                            background-color: #eff6ff;

                            .engine_name {
                                color: #3b82f6;
                                font-weight: 500;
                            }
                        }

                        .engine_name {
                            font-size: 14px;
                            color: #333;
                        }

                        .check_icon {
                            width: 20px;
                            height: 20px;
                            color: #3b82f6;

                            svg {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
