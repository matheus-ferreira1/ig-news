import { GetStaticProps } from "next"
import { getSession } from "next-auth/react"
import { prismicClient } from "../../../services/prismic"

import * as prismicH from "@prismicio/helpers";
import Head from "next/head";

import styles from '../post.module.scss'


interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function PostPreview({ post }: PostPreviewProps) {
    return (
        <>
            <Head>
                <title>{post.title} | Ignews</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{ __html: post.content }} 
                    />
                </article>
            </main>
        </>
    )   
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params

    const response = await prismicClient.getByUID("post", String(slug), {})

    const post = {
        slug,
        title: prismicH.asText(response.data.title),
        content: prismicH.asHTML(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
    }

    return {
        props: { post }
    }
}