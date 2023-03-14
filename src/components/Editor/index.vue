<template>
  <div class="container">
    <tool-box @use-preview="usePreview"/>

    <div class="editor-container">
      <div class="editor" ref="editorRef" :placeholder="placeholder"></div>
      <preview :editor-content="editorContent" v-show="previewVisible" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import * as monaco from 'monaco-editor';
  import ToolBox from './ToolBox.vue';
  import Preview from './Preview.vue';

  const props = defineProps({
    placeholder: {
      type: String,
      default: '请输入文章内容......'
    },
    editorContent: {
      type: String,
      default: ''
    }
  });

  const emit = defineEmits(['update:editorContent']);
  const editorRef = ref<HTMLElement | null>(null);
  let editor: monaco.editor.IStandaloneCodeEditor | null = null;
  const createEditor = () => {
    editor = monaco.editor.create(editorRef.value as HTMLElement, {
      value: props.editorContent,
      language: 'markdown',
      theme: 'vs-dark',
      tabSize: 2,
      fontSize: 14,
      lineHeight: 24,
      smoothScrolling: true,
      readOnly: false,
      minimap: {
        enabled: true
      },
      // 文件夹
      folding: true,
      // 禁用右键菜单
      contextmenu: false,
      // 选中区域直角
      roundedSelection: false,
      // 底部不留空
      scrollBeyondLastLine: false,
      // 根据已有单词自动提示
      wordBasedSuggestions: true,
      // 回车命中选中词
      acceptSuggestionOnEnter: 'on',
      scrollbar: {
        // MARK: updateOptions 对 scrollbar.alwaysConsumeMouseWheel 暂时是无效的
        // https://github.com/microsoft/vscode/pull/127788
        // 滚动事件可冒泡至外层
        alwaysConsumeMouseWheel: false,
      }
    });

    editor.onDidChangeModelContent(() => {
      const value = editor?.getValue();
      emit('update:editorContent', value);
    });
  };
  const previewVisible = ref(false);
  const usePreview = () => { 
    previewVisible.value = !previewVisible.value;
    handleResizeWidth();
  };

  const handleResizeWidth = () => {
    const widthRatio = previewVisible.value ? 0.5 : 2;
    const layoutInfo = editor?.getLayoutInfo();
  
    editor?.layout({
      width: (editorRef.value?.clientWidth as number) * widthRatio,
      height: layoutInfo?.height as number
    });
  };

  const setEditorValue = (content: string) => {
    editor?.setValue(content);
  };

  onMounted(() => {
    createEditor();
  });

  defineExpose({ setEditorValue });
</script>

<style lang="less" scoped>
  .container {
    width: 100%;

    .editor-container {
      display: flex;
      .editor {
        height: 600px;
        flex: 1;
      }
      // &::before {
      //   color: #ffffff4d;
      //   font-style: italic;
      //   z-index: 1;
      //   content: attr(placeholder);
      //   position: absolute;
      //   left: 110px;
      // }
    }
  }
</style>