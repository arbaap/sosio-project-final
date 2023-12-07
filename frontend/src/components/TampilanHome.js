import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ModalKeluhan from "./ModalKeluhan";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import scooter from "../assets/img/core-img/scooter1.svg";

function TampilanHome() {
  return (
    <div className="container">
      <h1 className="judul text-center">
        Selamat Datang di Sistem Layanan Antar Jemput ( UINJEK )
      </h1>

      <div className="tampilanhome">
        <HomeJek />
        <div className="row justify-content-center  fixed-bottom w-100 m-auto flex-nowrap">
          <div className="col-md-3 ">
            <Link to="" className="btn pengaduan btn-block">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TampilanHome;

export function HomeJek() {
  const redirectToWhatsApp = () => {
    const whatsappNumber = "6281223991511";
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="row justify-content-center">
      <div class="product-catagories-wrapper pt-3">
        <div class="container">
          <div class="section-heading">
            <h6 class="ml-3">Layanan UINJEK</h6>
          </div>
          <div class="product-catagory-wrap">
            <div class="container">
              <div class="card mb-3 catagory-card">
                <div class="card-body" onClick={redirectToWhatsApp}>
                  <img className="img-scooter" src={scooter} alt="" />
                  <h2 className="text-center">UINJEK</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
