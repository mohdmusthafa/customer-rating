import Head from "next/head";

export default function PageHead({ title="Customer Review" }) {
    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}