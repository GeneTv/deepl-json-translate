<div align="center">
  <h3 align="center">JSON Translate</h3>
  <p>Translate json objects using the deepl api.</p>
</div>

### Usage

**Arguments**
| Option | Description|
|---|---|
| --lang | Target language. |
| --key | The API key obtained from [deepl](https://www.deepl.com/account/summary). |
| --input | Input file with the json content. |
| --output | Optional output file. |

Example:

```bash
node ./src/translate.js --lang=IT --key=0a57d4d4-23e0-4d80-9fe0-c44e32160f92:fx --input=./input.json --output=./output-it.json
```
