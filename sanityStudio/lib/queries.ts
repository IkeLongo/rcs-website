// /sanityStudio/lib/queries.ts

import {defineQuery} from 'next-sanity'

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id, 
  title, 
  slug,
  "author": author->name,
  "authorAvatar": author->image.asset->url,
  mainImage,
  "description": body[0].children[0].text
}`)

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title, 
  slug,
  body[]{
    ...,
    _type == "video" => {
      ...,
      asset->
    }
  },
  mainImage,
  publishedAt,
  "author": author->name,
  "authorAvatar": author->image
}`)