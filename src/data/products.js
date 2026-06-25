import cakee from '../assets/cake4.png';
import cupcak from '../assets/cupcak.jpg';
import redcake from '../assets/redcake.jpg';
import cake from '../assets/menu2.jpg';

import Beefpie from '../assets/Beefpie.jpg';
import meatpie from '../assets/menu3.jpg';

import chinCtn from '../assets/menu4.jpg';
import Saka from '../assets/Sakarpala.jpg';

import eggroll from '../assets/eggrolll.jpg';
import eggrol from '../assets/eggroll.jpg';

import Burger from '../assets/menu1.jpg';
import coatedpeanut from '../assets/coated peanut.jpg';

export const products = [
  {
    id: 1,
    category: "cakes",
    badge: "Sale",          // "Sale" | "Hot" | "New" | null
    tag: "Signature Bake",
    name: "Celebration Cakes",
    desc: "Rich, moist, and beautifully decorated. Baked fresh to order for every occasion.",
    weights: ["1 kg", "2 kg", "Custom"],
    oldPrice: "₦18,000",
    newPrice: "₦14,500",
    rating: "4.9",
    stars: 5,
    image: cakee,
  },

  {
    id: 3,
    category: "chin-chin",
    badge: "Sale",
    tag: "Street Favourite",
    name: "Crispy Chin-Chin",
    desc: "Golden, crunchy and perfectly sweetened. Made the old-school way, fried to perfection.",
    weights: ["100g", "200g", "300g", "Custom"],
    oldPrice: "₦2,500",
    newPrice: "₦1,800",
    rating: "4.8",
    stars: 5,
    image: chinCtn,
  },
  {
    id: 4,
    category: "meat-pies",
    badge: "New",
    tag: "Classic Snack",
    name: "Flaky Meat Pies",
    desc: "Buttery shortcrust pastry, well-seasoned minced meat, potatoes and carrots. Baked fresh.",
    weights: ["1 piece", "6 pack", "12 pack"],
    oldPrice: "₦2,500",
    newPrice: "₦1,800",
    rating: "4.9",
    stars: 5,
    image: meatpie,
  },
  {
    id: 5,
    category: "peanuts",
    badge: "Hot",
    tag: "Natural Snack",
    name: "Coated Peanuts",
    desc: "Hand-selected groundnuts slow-roasted to perfection. Lightly salted or spiced.",
    weights: ["100g", "250g", "1kg"],
    oldPrice: "₦3,000",
    newPrice: "₦2,200",
    rating: "4.8",
    stars: 5,
    image:coatedpeanut,
  },

  {
    id: 7,
    category: "cakes",
    badge: "Sale",
    tag: "Custom Order",
    name: "Birthday Cakes",
    desc: "Custom-designed birthday cakes baked to your taste and theme. Pre-order required.",
    weights: ["1 kg", "2 kg", "Custom"],
    oldPrice: "₦20,000",
    newPrice: "₦16,000",
    rating: "5.0",
    stars: 5,
    image: redcake,
  },
  {
    id: 8,
    category: "chin-chin",
    badge: "Hot",
    tag: "Street Favourite",
    name: "Spiced Chin-Chin",
    desc: "A bold peppery twist on the classic chin-chin. Crunchy, golden, and addictively spiced.",
    weights: ["50g", "150g", "300g"],
    oldPrice: "₦2,000",
    newPrice: "₦1,500",
    rating: "4.9",
    stars: 5,
    image: Saka,
  },
  {
    id: 9,
    category: "peanuts",
    badge: "New",
    tag: "Natural Snack",
    name: "Burger Peanuts",
    desc: "Premium groundnuts perfectly salted and slow-roasted for maximum flavour and crunch.",
    weights: ["500g"],
    oldPrice: "₦18,500",
    newPrice: "₦15,000",
    rating: "4.7",
    stars: 5,
    image: Burger,
  },
  {
    id: 10,
    category: "cakes",
    badge: "Sale",          // "Sale" | "Hot" | "New" | null
    tag: "Signature Bake",
    name: "Celebration Cakes",
    desc: "Rich, moist, and beautifully decorated. Baked fresh to order for every occasion.",
    weights: ["1 kg", "2 kg", "Custom"],
    oldPrice: "₦18,000",
    newPrice: "₦14,500",
    rating: "4.9",
    stars: 5,
    image: cake,
  },
  {
    id: 11,
    category: "cakes",
    badge: "Sale",          // "Sale" | "Hot" | "New" | null
    tag: "Signature Bake",
    name: "Celebration Cakes",
    desc: "Rich, moist, and beautifully decorated. Baked fresh to order for every occasion.",
    weights: ["1 kg", "2 kg", "Custom"],
    oldPrice: "₦18,000",
    newPrice: "₦14,500",
    rating: "4.9",
    stars: 5,
    image: cupcak,
  },
  
];

// Filter tab buttons — `value` must match `category` in products above
export const filterTabs = [
  { label: "All Products", value: "all" },
  { label: "Cakes",        value: "cakes" },
  { label: "Chin-Chin",    value: "chin-chin" },
  { label: "Meat Pies",    value: "meat-pies" },
  { label: "Peanuts",      value: "peanuts" },
  // { label: "Burgers",      value: "burgers" },
];

// Sidebar categories (Rating + Price Range removed)
export const sidebarCategories = [
  { label: "All",        value: "all",        },
  { label: "Cakes",      value: "cakes",     count: 2 },
  { label: "Chin-Chin",  value: "chin-chin", count: 2 },
  { label: "Meat Pies",  value: "meat-pies", count: 2 },
  { label: "Peanuts",    value: "peanuts",   count: 2 },
  // { label: "Burgers",    value: "burgers",   count: 1 },
];
