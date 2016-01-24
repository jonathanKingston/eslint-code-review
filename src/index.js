import { linter } from 'eslint';

export default class CodeChecker {

  constructor(code, config) {
    this.config = config;
    this.code = this.unindent(code);
    this.codeErrors = this.checkCode();
  }

  get length() {
    return this.codeErrors.length;
  }

  ruleErrors(ruleId) {
    return this.codeErrors.filter((error) => {
      return ruleId === error.ruleId;
    })
  }

  ruleMatch(ruleId) {
    return this.ruleErrors(ruleId).length > 0;
  }

  unindent(code) {
    let outputCode = code.replace(/^\n/, '').replace(/\n$/, '');
    let matchInitialSpaces = outputCode.match(/^(\s+)/);
  
    if (matchInitialSpaces) {
      let spaceMatch = new RegExp('^' + matchInitialSpaces[1]);
      let lines = outputCode.split('\n');
      outputCode = lines.map((line, count) => {
        if (count === lines.length - 1) {
          return line.trim();
        }
        return line.replace(spaceMatch, '');
      });
    }
  
    return outputCode.join('\n');
  }

  checkCode() {
    return linter.verify(this.code, this.config);
  }

}
