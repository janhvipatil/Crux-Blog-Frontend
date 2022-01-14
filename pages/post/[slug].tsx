import { useState, useEffect, ReactText } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import SanityBlockContent from '@sanity/block-content-to-react';
import {
    Box,
    Heading,
    Image,
} from "@chakra-ui/react";

interface postProps {
    title: string,
}

export const Post = ({ title, body, image }: postProps) => {

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {

        const imgBuilder = imageUrlBuilder({
            projectId: '58fcccuo',
            dataset: 'production',
        });

        setImageUrl(imgBuilder.image(image));

    }, [image]);

    return (
        <>
            <Box>
                <Heading>{title}</Heading>
                {imageUrl &&
                    <Image
                        src={imageUrl}
                        alt="blog post cover image"
                        h={400}
                    />}
                <Box>
                    <SanityBlockContent blocks={body} />
                </Box>
            </Box>
        </>
    );
};

export const getServerSideProps = async pageContext => {

    const pageSlug = pageContext.query.slug;

    if (!pageSlug) {
        return {
            notFound: true
        }
    }

    const query = encodeURIComponent(`*[ _type == "post" && slug.current == "${pageSlug}"]`);
    const url = `https://58fcccuo.api.sanity.io/v1/data/query/production?query=${query}`;
    const result = await fetch(url).then(res => res.json());
    const post = result.result[0];

    if (!post) {
        return {
            notFound: true
        }
    } else {
        return {
            props: {
                body: post.body,
                title: post.title,
                image: post.mainImage,
            }
        }
    }

};

export default Post;