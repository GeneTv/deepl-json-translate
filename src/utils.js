/**
 * This is a recursive function that accepts an object and translates all it's values using the deepl api.
 * @param {*} obj the json object.
 * @param {*} apiKey your deepl api key.
 * @param {*} lang the target language.
 * @returns the object with all it's values translated.
 */
function translateObject(obj, apiKey, lang) {
  return new Promise(async function (resolve, reject) {
    try {
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        if (typeof obj[keys[i]] === 'string') {
          const response = await fetch('https://api-free.deepl.com/v2/translate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'auth_key=' + apiKey + '&text=' + obj[keys[i]] + '&target_lang=' + lang,
          });
          const {
            translations: [translation],
          } = await response.json();
          obj[keys[i]] = translation.text;
        } else if (typeof obj[keys[i]] === 'object') {
          await translateObject(obj[keys[i]], apiKey, lang);
        }
      }
      resolve(obj);
    } catch {
      reject('Something went wrong while translating your object.');
    }
  });
}
exports.translateObject = translateObject;

/**
 * Source: https://andrewjprokop.wordpress.com/2022/04/18/writing-a-robocall-application-using-avaya-cpaas/
 */
exports.getArgs = function () {
  const args = {};
  process.argv.slice(2, process.argv.length).forEach((arg) => {
    if (arg.slice(0, 2) === '--') {
      const longArg = arg.split('=');
      const longArgFlag = longArg[0].slice(2, longArg[0].length);
      const longArgValue = longArg.length > 1 ? longArg[1] : true;
      args[longArgFlag] = longArgValue;
    } else if (arg[0] === '-') {
      const flags = arg.slice(1, arg.length).split('');
      flags.forEach((flag) => {
        args[flag] = true;
      });
    }
  });
  return args;
};
// End of snippet.
