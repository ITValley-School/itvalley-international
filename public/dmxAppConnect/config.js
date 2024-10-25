dmx.config({
  "destes2": {
    "repeat3": {
      "meta": [
        {
          "name": "$index",
          "type": "number"
        },
        {
          "name": "$key",
          "type": "text"
        },
        {
          "name": "$value",
          "type": "object"
        },
        {
          "name": "query",
          "type": "array",
          "sub": [
            {
              "type": "text",
              "name": "Nome"
            }
          ]
        }
      ],
      "outputType": "object"
    },
    "repeat1": {
      "meta": [
        {
          "name": "query",
          "type": "array",
          "sub": [
            {
              "type": "text",
              "name": "Nome"
            }
          ]
        }
      ],
      "outputType": "object"
    },
    "repeat4": {
      "meta": [
        {
          "type": "text",
          "name": "Nome"
        }
      ],
      "outputType": "array"
    },
    "repeat5": {
      "meta": [
        {
          "name": "$index",
          "type": "number"
        },
        {
          "name": "$key",
          "type": "text"
        },
        {
          "name": "$value",
          "type": "object"
        },
        {
          "name": "query",
          "type": "array",
          "sub": [
            {
              "type": "text",
              "name": "Nome"
            }
          ]
        }
      ],
      "outputType": "object"
    },
    "repeat_card": {
      "meta": [
        {
          "type": "text",
          "name": "Nome"
        }
      ],
      "outputType": "array"
    },
    "repeat2": {
      "meta": [
        {
          "type": "text",
          "name": "Nome"
        }
      ],
      "outputType": "array"
    }
  },
  "listusuario": {
    "repeat1": {
      "meta": null,
      "outputType": "text"
    },
    "repeatCard": {
      "meta": null,
      "outputType": "text"
    }
  }
});
