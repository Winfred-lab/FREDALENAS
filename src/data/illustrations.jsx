// ─────────────────────────────────────────────────────────────
// src/data/illustrations.jsx
//
// SVG food artwork for each product category.
// Keyed by the `category` string from products.js.
// Used inside ProductCard to show a food illustration.
// ─────────────────────────────────────────────────────────────
import chin from "../assets/chin.png";

import bread from "../assets/bread.png";


import platemeatpie from "../assets/platemeatpie.png";
import pie from "../assets/Ud-2.png";

import peanut from "../assets/peanut.png";


import cake from "../assets/cake4.png";
import redcake from "../assets/redcake.jpg";
import cupcake from "../assets/cupcak.jpg";
import cake2 from "../assets/menu2.jpg";

import bnd from "../assets/brd.png";

import stick from "../assets/stick.png";

import BackgroundImg from "../assets/BgImg.jpg";
import { img } from "framer-motion/client";

export const illustrations = {
  cakes: (
    <img src={cake} alt="" />
  ),
  cake1: (
    <img src={redcake} alt="" />
  ),
  cake2: (
    <img src={redcake} alt="" />
  ),
  cake3: (
    <img src={redcake} alt="" />
  ),
  cake4: (
    <img src={redcake} alt="" />
  ),


  "chin-chin": (
    <img src={bread} alt="" />
  ),

  "meat-pies": (
    <img src={bread} alt="" />
  ),

  peanuts: (
    <img src={bread} alt="" />
  ),

  burgers: (
    <img src={bread} alt="" />
  ),
};
