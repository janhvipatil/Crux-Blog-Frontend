import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Post {
    _id: string,
    slug: any,
    title: string,
    body: any,
    mainImage: SanityImageSource,
    publishedAt: string,
    subText: string,
    pollID: string,
}