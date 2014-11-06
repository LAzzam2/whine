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
    "by": {
      "id": "#by",
      "type": "string",
      "additionalProperties": false
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
    "by",
    "loc"
  ]
};
