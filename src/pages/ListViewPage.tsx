import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMusicAlbum, Podcast } from "../infrastructure/redux/list";
import { RootState } from "../infrastructure/redux/root-reducer";
import ResultChip from "../components/ResultChip";
import { AppDispatch } from "../infrastructure/redux/store";

//añadido para el test
interface ListViewPageProps {
  onPodcastClick?: (podcast: Podcast) => void;
}

const ListViewPage: React.FC<ListViewPageProps> = ({ onPodcastClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [recordsPerPage] = useState(12); //registros por página
  const [estaCargado, setCargado] = useState(false);
  const podcasts = useSelector((state: RootState) => state.podcasts.list);

  useEffect(() => {
    dispatch(fetchMusicAlbum());
  }, [dispatch]);

  const filteredAlbums = podcasts.filter((podcast: Podcast) => {
    const searchStr = `${podcast.title} ${podcast.author}`.toLowerCase();
    return searchStr.includes(filterText.toLowerCase());
  });

  const indexOfLastRecord = paginaActual * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const registrosActuales = filteredAlbums.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredAlbums.length / recordsPerPage);

  useEffect(() => {
    setCargado(true);
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
    setPaginaActual(1); //Restablecemos la página al cambiar el filtro
  };

  const goToPreviousPage = () => {
    setPaginaActual((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCargado(false);
    setTimeout(() => {
      setPaginaActual((prevPage) => prevPage + 1);
      setCargado(true); //Activamos la animación
    }, 300); //Delay para permitir que la animación se complete
  };

  const goToPage = (pageNumber: number) => {
    setCargado(false);
    setTimeout(() => {
      setPaginaActual(pageNumber);
      setCargado(true);
    }, 300);
  };

  const handlePodcastClick = (podcast: Podcast) => {
    if (onPodcastClick) {
      onPodcastClick(podcast);
    }
    navigate(`/podcast/${podcast.id}`);
  };

  const truncateString = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    }
    return str;
  };

  return (
    <div>
      <div className="row mb-4">
        <div className="input-container">
          <ResultChip filterText={filterText} />
          <input
            className="form-control input-width-conditioned ms-2"
            type="search"
            value={filterText}
            onChange={handleFilterChange}
            placeholder="Filter podcasts"
          />
        </div>
      </div>
      <div className="row">
        {registrosActuales.map((podcast: Podcast) => {
          const { id, title, author, image } = podcast;
          return (
            <div
              key={id}
              className={`col-md-3 mb-4 ${estaCargado ? "fade-enter" : ""}`}
              style={{
                transition: "opacity 0.3s ease-in",
                opacity: estaCargado ? 1 : 0,
              }}
            >
              <div
                className="cursor-pointer"
                onClick={() => handlePodcastClick(podcast)}
              >
                <div className="card" style={{ height: 280 }}>
                  <div className="card-body">
                    <div
                      className="mt-3"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img
                        src={image}
                        alt={title}
                        style={{ width: 120, height: 120, borderRadius: "50%" }}
                      />
                    </div>
                    <h5 className="card-title mt-4 mb-2">
                      {truncateString(title.toUpperCase(), 40)}
                    </h5>
                    <p className="card-text">Author: {author}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination-container mb-5">
        <div className="pagination mb-5">
          <button
            className="btn btn-primary pagination-button"
            onClick={goToPreviousPage}
            disabled={paginaActual === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`btn btn-secondary pagination-button ${
                paginaActual === index + 1 ? "active" : ""
              }`}
              onClick={() => goToPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn btn-primary"
            onClick={goToNextPage}
            disabled={paginaActual === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListViewPage;
