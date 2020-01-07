import React, { Component } from "react";
import firebase from "./firebase";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }
  componentDidMount() {
    const itemsRef = firebase.database().ref("movies");
    console.log(itemsRef);
    itemsRef.on("value", snapshot => {
      let movies = snapshot.val();
      let newState = [];
      for (let movie in movies) {
        newState.push({
          id: movie,
          Movie: movies[movie].Movie,
          Year: movies[movie].Year,
          Journal: movies[movie].Journal,
          url: movies[movie].url
        });
      }
      this.setState({
        movies: newState
      });
    });
  }
  render() {
    return (
      <div>
        <div className="Title">
          <h1 className="title">Free HD Movies</h1>
        </div>
        <hr></hr>
        <div className="container">
          {this.state.movies.map(movie => {
            return (
              <div className="card" key={movie.id}>
                <div>
                  <img className="img" src={movie.url} alt="poster" />
                </div>
                <div className="name">{movie.Movie}</div>
                <div className="year">{movie.Year}</div>
                <div className="journal">{movie.Journal}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Home;
