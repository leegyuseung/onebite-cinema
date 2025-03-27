import style from "./[id].module.css";
import movies from "@/mock/dummy.json";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  const movie = movies.find((movie) => movie.id === Number(id));

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
  );
}
