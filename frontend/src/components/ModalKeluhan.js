import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import { BsArrowRightSquare, BsTriangleFill, BsTriangle } from "react-icons/bs";

import "../index.css";

function ModalKeluhan({ keluhan, index }) {
  const [vote, setVote] = useState(keluhan.vote);

  const [hasVoted, setHasVoted] = useState(false);
  useEffect(() => {
    const hasVotedBefore = localStorage.getItem(`voted-${keluhan._id}`);
    if (hasVotedBefore) {
      setHasVoted(true);
    }
  }, [keluhan._id]);

  let statusClass = "";
  switch (keluhan.status) {
    case "Pending":
      return null;
    case "Diproses":
      statusClass = "status-diterima";
      break;
    case "Ditolak":
      statusClass = "status-ditolak";
      break;
    case "Selesai":
      statusClass = "status-selesai";
      break;
    default:
      break;
  }

  function handleVoteUp() {
    if (hasVoted) {
      return;
    }

    axios
      .put(`/api/keluhans/${keluhan._id}/voteup`)
      .then((response) => {
        console.log(response.data.message);
        setVote(vote + 1);
        setHasVoted(true);
        localStorage.setItem(`voted-${keluhan._id}`, true);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // useEffect(() => {
  //   axios
  //     .get(`/api/keluhans/${keluhan._id}`)
  //     .then((response) => {
  //       setVote(response.keluhan.vote);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [keluhan._id]);

  // function handleVoteDown() {
  //   axios
  //     .put(`/api/keluhans/${keluhan._id}/votedown`)
  //     .then((response) => {
  //       console.log(response.data.message);
  //       setVote(vote - 1);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  return (
    <div className="row">
      <div className="col">
        <Card className="cardmodal">
          <Card.Body>
            <Card.Title>
              {hasVoted ? (
                <button className="btnvoteup">
                  <BsTriangleFill className="sudahvote" size={30} />
                </button>
              ) : (
                <button className="btnvoteup" onClick={handleVoteUp}>
                  <BsTriangle size={30} />
                </button>
              )}
              {keluhan.judulpengaduan}
              {/* Pengaduan {urutan} */}
              <Link to={`/detailkeluhan/${keluhan._id}`}>
                <button className="btndetail">
                  <BsArrowRightSquare size={30} />
                </button>
              </Link>
            </Card.Title>
            <p
              style={{
                marginLeft: "15px",
                float: "left",
              }}
            >
              {vote}
            </p>
            <Card.Text
              style={{
                marginLeft: "40px",
              }}
            >
              {keluhan.namawarga} |{" "}
              <b className={statusClass}>{keluhan.status}</b>
            </Card.Text>
            {/* <div>
              <button className="btnvoteup" onClick={handleVoteUp}>
                <BiUpArrow />
              </button>
              <button className="btnvotedown" onClick={handleVoteDown}>
                <BiDownArrow />
              </button>

            </div> */}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ModalKeluhan;
