import _ from "lodash";

class MustacheHelper {
  getCompiledText(rawText, valueMappings = {}) {
    const compiled = _.template(rawText, {
      interpolate: /{{([\s\S]+?)}}/g
    });
    const compiledText = compiled(valueMappings);
    return compiledText;
  }
}

export default new MustacheHelper();