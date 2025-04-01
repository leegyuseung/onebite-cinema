import fetchDetailMovie from "@/lib/fetch-detail-movie";
import style from "./[id].module.css";
import fetchMovies from "@/lib/fetch-movies";
import Head from "next/head";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

export const getStaticPaths = async () => {
  const movies = await fetchMovies();
  const path = [];
  for (let i = 0; i < movies.length; i++) {
    path.push({ params: { id: movies[i].id.toString() } });
  }
  return {
    paths: path,
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchDetailMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: { movie },
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입 씨네마</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입 씨네마" />
          <meta
            property="og:description"
            content="한입 씨네마에 등록된 영화들을 만나보세요 🎥"
          />
        </Head>
        <div>로딩중입니다.</div>
      </>
    );
  }
  if (!movie) return <div>영화를 찾을 수 없습니다.</div>;

  const {
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={posterImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${posterImgUrl})` }}
        >
          <img src={posterImgUrl} />
        </div>
        <div className={style.title_cover}>{title}</div>
        <div className={style.first_cover}>
          <div className={style.company_cover}>{company}</div>
          <div className={style.date_cover}>{`(${releaseDate})`}</div>
        </div>
        <div className={style.second_cover}>
          <div>{genres.map((genres) => `${genres} `)}</div>
          <div>{`/ ${runtime}분`}</div>
        </div>
        <div className={style.third_cover}>
          <div className={style.subtitle_cover}>{subTitle}</div>
          <div className={style.description_cover}>{description}</div>
        </div>
      </div>
    </>
  );
}
