import test from 'ava';
import CodeChecker from '../lib/index.js';
import config from './eslint.json';

test('Check output', (t) => {
  const code = `
    let x = 'y';

    console.log(x);

  `;
  const messages = new CodeChecker(code, config);
  t.is(messages.length, 3);
  t.ok(messages.ruleMatch('prefer-const'));
  t.ok(messages.ruleMatch('no-console'));
  t.ok(messages.ruleMatch('no-undef'));
});
