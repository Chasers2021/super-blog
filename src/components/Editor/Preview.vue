<template>
  <div class="preview" v-html="markdown.render(editorContent)"></div>
</template>

<script setup lang="ts">
  import MarkdownIt from 'markdown-it';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/github-dark.css';

  defineProps({
    editorContent: {
      type: String,
      default: ''
    }
  });

  const markdown = new MarkdownIt({
    html: true,
    xhtmlOut: true, 
    highlight(str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (ex) {
          console.warn(ex);
        }
      }
      return '';
    }
  });
</script>

<style lang="less" scoped>
  .preview {
    width: 50%;
    height: 600px;
    padding: 18px;
    box-sizing: border-box;

    :deep(code) {
      background-color: #000c;
      padding: 14px;
      display: block;
    }
  }
</style>
