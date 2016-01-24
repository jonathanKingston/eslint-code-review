# ESLint code review

Just a tool for helping debugging ESLint rules.

## Example usage

```
import test from 'ava';
import ESLintCodeReview from 'eslint-code-review';
import config from '../index.js';

test('Check output', (t) => {
  const code = `
    let x = 'y';

    console.log(x);

  `;
  const messages = new ESLintCodeReview(code, config);
  t.is(messages.length, 3);
  t.ok(messages.ruleMatch('prefer-const'));
  t.ok(messages.ruleMatch('no-console'));
  t.ok(messages.ruleMatch('no-undef'));
});
```
