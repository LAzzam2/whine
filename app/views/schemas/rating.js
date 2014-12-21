module.exports = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "http://jsonschema.net#",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "rating": {
      "id": "#rating",
      "type": "string",
      "additionalProperties": false,
      "pattern": "^(up|down|none)$"
    }
  },
  "required": [
    "rating"
  ]
}
