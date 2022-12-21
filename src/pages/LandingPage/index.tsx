import { useState } from "react";
import { Card, Carousel, Container } from "react-bootstrap";
import MovieModal from "../../components/MovieModal";
import { ApiGet, ImgAPI, stringToDate } from "../../utils";

function LandingPage() {
  const [show, setShow] = useState(false);
  const [movie, setMovie] = useState<any>(null);
  // get list genre
  // const listGenre = ApiGet("genre/movie/list");

  // get Latest Movies
  const latestMovie = ApiGet("movie/upcoming");

  const carouselMovie = ApiGet("movie/popular");

  // get Action Movies
  const actionMovie = ApiGet("discover/movie", {
    with_genres: "28",
    include_video: true,
  });
  return (
    <>
      <MovieModal props={{ show, setShow, movie, setMovie }} />
      {actionMovie.isLoading? 
      <div className="text-center mt-5">
        <i className="fa fa-spinner fa-spin text-primary fa-2x"></i>
      </div>
      :
      <Container fluid="xxl" style={{ padding: 0 }}>
        <Carousel variant="dark">
          {carouselMovie.data?.results.map((el: any, i: number) => {
            return (
              <Carousel.Item key={i}>
                <div className="row p-5" style={{ boxSizing: "border-box" }}>
                  <div className="col-2"></div>
                  <div
                    className="col-md-4 pointer"
                    onClick={() => {
                      setMovie(el);
                      setShow(true);
                    }}
                  >
                    <img
                      className="d-block rounded mx-auto"
                      src={ImgAPI + el.poster_path}
                      width={300}
                      height="150px"
                      alt={el.title}
                      style={{ objectFit: "cover", objectPosition: "50% 50%" }}
                    />
                  </div>
                  <div
                    className="col-md-4 pointer"
                    onClick={() => {
                      setMovie(el);
                      setShow(true);
                    }}
                  >
                    <span className="fs-5 fw-bold text-nowrap">{el.title}</span>
                    <p
                      className="text-ellipsis-4"
                      style={{ textAlign: "justify" }}
                    >
                      {el.overview}
                    </p>
                  </div>
                  <div className="col-2"></div>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>

        <div className="mt-3">
          <div className="mb-2 ps-5 fw-bold">Latest</div>
          <div className="d-flex gap-2 overflow-auto">
            <div className="ps-5"></div>
            {latestMovie.data?.results.map((el: any, i: number) => {
              return (
                <button
                  className="text-decoration-none text-dark p-0 bg-transparent border-0 text-start"
                  onClick={() => {
                    setMovie(el);
                    setShow(true);
                  }}
                  key={i}
                >
                  <Card className="col h-100" style={{ minWidth: 250 }}>
                    <Card.Body className="row">
                      <div className="col-6 d-flex align-items-end">
                        <Card.Title className="text-ellipsis-3">
                          {el.title}
                        </Card.Title>
                      </div>
                      <div className="col-6">
                        <img
                          className="rounded"
                          src={ImgAPI + el.poster_path}
                          placeholder={ImgAPI + el.backdrop_path}
                          alt={el.title}
                          loading="lazy"
                          width={100}
                          height={100}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-3">
          <div className="mb-2 ps-5 fw-bold">Action</div>
          <div className="d-flex gap-2 overflow-auto">
            <div className="ps-5"></div>
            {actionMovie.data?.results.map((el: any, i: number) => {
              return (
                <button
                  className="text-decoration-none text-dark p-0 bg-transparent border-0 text-start"
                  onClick={() => {
                    setMovie(el);
                    setShow(true);
                  }}
                  key={i}
                >
                  <Card className="col h-100" style={{ minWidth: 200 }}>
                    <Card.Img
                      variant="top"
                      src={ImgAPI + el.poster_path}
                      placeholder={ImgAPI + el.backdrop_path}
                      loading="lazy"
                      height={225}
                    />
                    <Card.Body>
                      <Card.Title className="text-ellipsis">
                        {el.title}
                      </Card.Title>
                      <Card.Text>{stringToDate(el.release_date)}</Card.Text>
                    </Card.Body>
                  </Card>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
      }
    </>
  );
}

export default LandingPage;
