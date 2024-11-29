import React, { useState } from "react";
import axios from "axios";

const MusicSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMusic = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:8080/api/music/search?query=${query}`
      );
      console.log("API Response:", response.data);
      setResults(response.data.data);
    } catch (err) {
      setError("Erreur de recherche, essayez à nouveau.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">
        Recherche de Musique
      </h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Chercher..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded p-2 mr-2"
        />
        <button
          onClick={searchMusic}
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Chargement..." : "Rechercher"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {results.map((track) => (
          <div
            key={track.id}
            className="max-w-sm rounded overflow-hidden shadow-lg hover:scale-105 duration-300"
          >
            <img
              className="w-full"
              src={track.album.cover_big}
              alt={track.title}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{track.title}</div>
              <p className="text-gray-700 text-base">
                Artist:{" "}
                <a
                  href={track.artist.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {track.artist.name}
                </a>
              </p>
              <p className="text-gray-700 text-base">
                Album: {track.album.title}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <a
                href={track.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                Écouter
              </a>
              <a
                href={track.preview}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
              >
                Preview
              </a>
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && !loading && (
        <p className="text-center text-gray-500">Aucun résultat trouvé pour le moment.</p>
      )}
    </div>
  );
};

export default MusicSearch;
