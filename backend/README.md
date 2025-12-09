# Art Gallery Server

## Image Storage

This server stores images as **base64-encoded strings** directly in the `artworks.json` file. This approach:

✅ **Works after deployment** - No need for persistent file storage
✅ **Simple setup** - No cloud storage configuration required
✅ **Portable** - Everything is in one JSON file

⚠️ **Limitations:**
- Best for small galleries (under 50 images)
- Each image should be under 2MB for optimal performance
- JSON file size grows with each image

## How It Works

1. Frontend uploads image → Converts to base64
2. Server receives base64 string → Stores in `artworks.json`
3. Frontend displays image → Uses base64 string directly in `<img src="data:image/...">`

## Deployment

When deploying, make sure:
- `artworks.json` is included in your deployment
- Server has `express.json({ limit: '10mb' })` to handle large base64 strings
- Your hosting platform supports JSON file writes (most do)

## Alternative for Large Galleries

If you have 50+ artworks or large images, consider:
- Google Cloud Storage
- AWS S3
- Cloudinary
- Uploadcare
