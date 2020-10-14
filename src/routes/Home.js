import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component{
  state={
    isLoading: true,
    movies: [],
  }

  getMovies=async()=>{
    const{
      data:{
          data:{movies},
        },
      }=await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    this.setState({movies, isLoading: false});
  }

  // getMovies=async()=>{
  //   const id='x65WCYYLwScv1k6Xz1fT';
  //   const pw='YA5XlHKKRo';
  //   const{
  //     data:{
  //       items
  //     }
  //   }=await axios.get('/v1/search/movie.json',{
  //     params:{
  //       query: '아이언맨',
  //       dispaly: 20
  //     },
  //     headers:{
  //       'X-Naver-Client-Id': id,
  //       'X-Naver-Client-Secret': pw
  //     }
  //   })
  //   this.setState({movies: items, isLoading:false});
  //   console.log(items);
  // }

  componentDidMount(){
    // 영화 데이터 로딩이 완료되면
    this.getMovies();
  }

  render(){
    const{isLoading, movies}=this.state;
    return (
      <section className='container'>
        {isLoading?(
          <div className='loader'>
            <span className='loader__text'>Loading...</span>
          </div>) : (
          <div className='movies'>
            {movies.map((movie)=>{
              console.log(movie);
              return (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              );
            })}
          </div>
        )}
      </section>
    );
  }
}

export default Home;
