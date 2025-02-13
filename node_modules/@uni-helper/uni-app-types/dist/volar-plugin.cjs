'use strict';

const nativeTags = ["block", "component", "template", "slot"];
const volarPlugin = () => ({
  version: 2,
  resolveTemplateCompilerOptions(options) {
    options.isNativeTag = (tag) => nativeTags.includes(tag);
    return options;
  }
});

module.exports = volarPlugin;
