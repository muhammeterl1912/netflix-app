import { getMovies } from "@/helpers/movieFunctions"

const Movies =async () => {
  const movies = await getMovies("now_playing")
  console.log(movies)
  return (
    <div>Movies</div>
  )
}

export default Movies