<template>
  <div class="write" style="display:flex">
    <div class="editor" ref="editorDiv" style="width:300px;height:300px"></div>
    <textarea name="article" v-model="article"></textarea>
    <div class="show" v-html="showArticle"></div>
  </div>
</template>
<script type="ts" setup>
import { marked } from "marked";
import hljs from "highlight.js";
import * as monaco  from "monaco-editor";
import { ref, onMounted, watch } from "vue";

const article = ref('');
const showArticle = ref('');
const editor = ref('')
const editorDiv = ref(null)
console.log(editorDiv)
function initEditor(){
    editor = monaco.editor.create(editorDiv.value,{
      value:'',
      language:'sql',
      automaticLayout:true,
      theme:'vs-dark'
    })
}
function getValue(){
  editor.getValue()
}

onMounted(() => {
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: "hljs language-",
    pedantic: false,
    gfm: true, //允许使用github标准的markdown
    tables: true, //允许使用表格语法
    breaks: false, //允许回车换行
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  });
  initEditor()
});



watch(article, newVal => {
  showArticle.value = marked.parse(newVal);
});
</script>
<style>
textarea {
  width: 300px;
  height: 300px;
  /* ... */
  box-sizing: border-box;
  outline: none;
  resize: none;
}
.show {
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
}
</style>