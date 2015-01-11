module.exports = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "http://jsonschema.net#",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "text": {
      "id": "#text",
      "type": "string",
      "additionalProperties": false,
      "minLength": 4,
      "maxLength": 500
    },
    "author": {
      "id": "#author",
      "type": ["string", "null"],
      "additionalProperties": false,
      "minLength": 1,
    },
    "loc": {
      "id": "#loc",
      "type": "array",
      "additionalProperties": false,
      "items": {
        "id": "#1",
        "type": "number",
        "additionalProperties": false
      },
      "required": [
        "0",
        "1"
      ]
    }
  },
  "required": [
    "text",
    "author",
  ]
};
