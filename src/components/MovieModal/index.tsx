/* eslint-disable jsx-a11y/iframe-has-title */
import { useEffect, useState } from "react";
import {  Modal } from "react-bootstrap";
import { ApiGet } from "../../utils";

function MovieModal({ props }: any) {
  const { show = false, setShow, movie = null, setMovie } = props;
  const [key, setKey] = useState('')

  const handleClose = () => {
    setMovie(null)
    setShow(false)
  };

  const videos = ApiGet(`movie/${movie?.id}/videos`, {}, false);

  useEffect(() => {
    if (movie?.id) {
      videos.fetch()
    }
  }, [movie?.id]);

  useEffect(() => {
    if(videos.data){
      const _key = videos.data?.results.find((el: any) => el.site === "YouTube")?.key
      setKey(_key)
    }
  }, [videos.data]);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Body>
        <div className="text-end mb-1"><button className="p-0 bg-transparent border-0" onClick={()=> handleClose()}><i className="fa fa-times-circle fa-2x" ></i></button></div>
        <iframe
          className="rounded-4 bg-secondary"
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${key}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="mt-2">
          <h5>{movie?.title}</h5>
          <p>
            {movie?.overview}
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default MovieModal;
