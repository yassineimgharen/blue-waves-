// Support standalone asset imports when rendering components in Node tests.
import { registerHooks } from 'node:module';
registerHooks({
  load(url, context, nextLoad) {
    if (url.endsWith('/next/image.js')) return { format: 'module', source: "import React from 'react'; export default function Image({ unoptimized, ...props }) { return React.createElement('img', props); }", shortCircuit: true };
    if (/\.(?:jpe?g|png|webp|svg)$/.test(url)) {
      return { format: 'module', source: `export default ${JSON.stringify(url)};`, shortCircuit: true };
    }
    return nextLoad(url, context);
  },
});
