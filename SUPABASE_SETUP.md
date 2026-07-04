# Supabase Storage Setup

Your admin panel image upload is failing because the required Storage buckets aren't created yet.

## Required Storage Buckets

You need to create these buckets in your Supabase project:

### 1. Go to Supabase Dashboard
- Visit https://supabase.com/dashboard
- Open your project: `zqdwvbzlrpdkvmzztwjd`

### 2. Create Storage Buckets
Go to **Storage** in the left sidebar, then create these buckets:

#### Bucket: `project-covers`
- **Name**: `project-covers`
- **Public**: ✅ Yes (make it public)
- **File size limit**: 50MB
- **Allowed MIME types**: `image/jpeg,image/png,image/webp,image/gif`

#### Bucket: `resumes` 
- **Name**: `resumes`
- **Public**: ✅ Yes (make it public)
- **File size limit**: 10MB
- **Allowed MIME types**: `application/pdf`

### 3. Set Bucket Policies
For each bucket, go to **Policies** tab and create:

**Policy Name**: `Public Upload and Read`
**Policy**: 
```sql
-- For project-covers bucket
(bucket_id = 'project-covers')

-- For resumes bucket  
(bucket_id = 'resumes')
```

**Operations**: SELECT, INSERT
**Target roles**: `anon`, `authenticated`

### 4. Test Upload
After creating the buckets, try uploading a project cover image in the admin panel.

---

## Alternative: Manual URL Entry

If you prefer not to set up storage right now, you can still add projects by:
1. Upload your image to any image hosting service (Imgur, CloudFlare, etc.)
2. Copy the direct image URL
3. Paste it in the "Cover Image" URL field instead of using the Upload button

The URL field works regardless of whether storage buckets are configured.