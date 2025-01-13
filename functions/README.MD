# Testing

## GET
```bash
curl -X GET /getAllTechniques
```

## POST
```bash
curl -X POST /addTechnique \
-H "Content-Type: application/json" \
-d '{
  "category": "Foo",
  "name": "Bar",
  "japaneseName": "腰技",
  "referenceVideos": ["https://www.youtube.com/watch?v=example"],
  "referenceImages": ["https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Morote-seoi-nage.jpg/190px-Morote-seoi-nage.jpg"],
  "description": "A hip throw technique.",
  "keyPrinciples": ["Kuzushi", "Tsukuri", "Kake"],
  "commonMistakes": ["Incorrect grip", "Poor balance"],
  "variations": ["O Goshi", "Harai Goshi"],
  "level": "Beginner",
  "history": {
    "origin": "Japan",
    "importantFigures": ["Jigoro Kano"]
  },
  "applications": {
    "selfDefense": "Effective in close combat",
    "competition": "Commonly used in judo matches"
  }
}'
```
## DELETE
```bash
curl -X GET /deleteTechnique?id=wg6UHSNFzSsEQzOssClp
```
<!-- xg7KoLSZieRBhRzd1CDp -->