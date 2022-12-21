import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import MovieModal from "../../components/MovieModal";
import { ApiGet, ImgAPI, stringToDate } from "../../utils";

function SearchPage() {
  const [show, setShow] = useState(false);
  const [movie, setMovie] = useState<any>(null);

  const [searchParams] = useSearchParams();
  const searchKey = searchParams.get("title");

  const searchList = ApiGet(`search/movie`, { query: searchKey }, false);
  useEffect(() => {
    if (searchKey) {
      searchList.fetch();
    }
  }, [searchKey]);

  return (
    <>
      <MovieModal props={{ show, setShow, movie, setMovie }} />
      {searchList.isLoading ? (
        <div className="text-center mt-5">
          <i className="fa fa-spinner fa-spin text-primary fa-2x"></i>
        </div>
      ) : (
        <Container fluid="xl">
          <div className="mt-3">
            <div className="mb-2 ps-5 fw-bold">Search</div>
            <div
              className="px-5 d-grid gap-1"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              }}
            >
              {searchList.data?.results.map((el: any, i: number) => {
                return (
                  <button
                    className="text-decoration-none text-dark p-0 bg-transparent border-0 text-start"
                    onClick={() => {
                      setMovie(el);
                      setShow(true);
                    }}
                    key={i}
                  >
                    <Card className="" style={{ height: 337, width: 200 }}>
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
      )}
    </>
  );
}

export default SearchPage;
