<script setup>
import "sandpack-lit/dist/presets/sandpack";
import "sandpack-lit/dist/themes/odyssey.css";
import { files } from "./options";

const dependencies = {
  lit: "2.6.1",
};

const options = {
  closableTabs: false,
  files,
  customSetup: {
    dependencies,
  },
};
</script>

<template>
  <h1>Vue</h1>
  <div style="width: 900px">
    <sandpack-preset v-bind:options=options />
  </div>
</template>
