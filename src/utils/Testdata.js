/**
 * Test Data
 * can be changed, but if a new element is added/removed then you have to change Database.js
 * **/

export const EStations = [
  {
    id: 1,
    name: "Toldbodvej",
    city: "Faxe Ladeplads",
    lat: 55.216944,
    long: 12.161667,
    country: "DK",
  },
  {
    id: 2,
    name: "Enghavevej",
    city: "København",
    lat: 55.66175,
    long: 12.540685,
    country: "DK",
  },
  {
    id: 3,
    name: "Jaegervej",
    city: "Dragoer",
    lat: 55.591917,
    long: 12.660587,
    country: "DK",
  },
  {
    id: 4,
    name: "Kloevervej",
    city: "Kongens Lyngby",
    lat: 55.763909,
    long: 12.493574,
    country: "DK",
  },
  {
    id: 5,
    name: "Hvidovrevej",
    city: "Hvidovre",
    lat: 55.640954,
    long: 12.477766,
    country: "DK",
  },
];

export const Items = [
  {
    id: 1,
    aval: 1,
    estId: 1,
    catId: 1,
    proId: 1,
    bndId: 1,
    modId: 1,
  },
  {
    id: 2,
    aval: 1,
    estId: 1,
    catId: 3,
    proId: 2,
    bndId: 5,
    modId: 2,
  },
  {
    id: 3,
    aval: 0,
    estId: 2,
    catId: 4,
    proId: 1,
    bndId: null,
    modId: null,
  },
];

export const Catagories = [
  {
    id: 1,
    name: "Hi-fi equipment",
  },
  {
    id: 2,
    name: "Kitchen machines",
  },
  {
    id: 3,
    name: "Household machines",
  },
  {
    id: 4,
    name: "Tablet, smartphones, computers + equipment",
  },
  {
    id: 5,
    name: "Tv and game consoles",
  },
];

export const products = [
  {
    id: 1,
    catId: 1,
    name: "Speakers",
    co2Footprint: 10,
  },
  {
    id: 2,
    catId: 1,
    name: "Bluetooth speakers",
    co2Footprint: 15,
  },
  {
    id: 3,
    catId: 1,
    name: "Headset and Headphones",
    co2Footprint: 20,
  },
  {
    id: 4,
    catId: 1,
    name: "Turntable",
    co2Footprint: 30,
  },
  {
    id: 5,
    catId: 1,
    name: "Radio",
    co2Footprint: 50,
  },
  {
    id: 6,
    catId: 1,
    name: "Amplifier",
    co2Footprint: 40,
  },
  {
    id: 7,
    catId: 1,
    name: "Stereo",
    co2Footprint: 80,
  },
  {
    id: 8,
    catId: 2,
    name: "Foodprocessor",
    co2Footprint: 40,
  },
  {
    id: 9,
    catId: 2,
    name: "Mixer",
    co2Footprint: 20,
  },
  {
    id: 10,
    catId: 2,
    name: "Blender",
    co2Footprint: 30,
  },
  {
    id: 11,
    catId: 2,
    name: "Juicer",
    co2Footprint: 40,
  },
  {
    id: 12,
    catId: 2,
    name: "Coffee maker",
    co2Footprint: 40,
  },
  {
    id: 13,
    catId: 2,
    name: "Electric kettle",
    co2Footprint: 20,
  },
  {
    id: 14,
    catId: 3,
    name: "Vacuum cleaner",
    co2Footprint: 50,
  },
  {
    id: 15,
    catId: 3,
    name: "Robot vacuums",
    co2Footprint: 100,
  },
  {
    id: 16,
    catId: 3,
    name: "Steam mop",
    co2Footprint: 10,
  },
  {
    id: 17,
    catId: 4,
    name: "Tablet",
    co2Footprint: 250,
  },
  {
    id: 18,
    catId: 4,
    name: "Smartphone",
    co2Footprint: 100,
  },
  {
    id: 19,
    catId: 4,
    name: "Laptop",
    co2Footprint: 300,
  },
  {
    id: 20,
    catId: 4,
    name: "Desktop computer",
    co2Footprint: 450,
  },
  {
    id: 21,
    catId: 4,
    name: "Computer screen",
    co2Footprint: 150,
  },
  {
    id: 22,
    catId: 4,
    name: "Keyboard",
    co2Footprint: 60,
  },
  {
    id: 23,
    catId: 4,
    name: "Computer mouse",
    co2Footprint: 20,
  },
  {
    id: 24,
    catId: 5,
    name: "Flatscreen tv (not smart)",
    co2Footprint: 200,
  },
  {
    id: 25,
    catId: 5,
    name: "Smart tv",
    co2Footprint: 300,
  },
  {
    id: 26,
    catId: 5,
    name: "Gaming console",
    co2Footprint: 250,
  },
];

export const Models = [
  {
    id: 1,
    bndId: 1,
    name: "Acton II",
  },
];

export const Brands = [
  {
    id: 1,
    proId: 1,
    name: "Marshall",
  },
  {
    id: 2,
    proId: 1,
    name: "Focal",
  },
  {
    id: 3,
    proId: 1,
    name: "JBL",
  },
  {
    id: 4,
    proId: 1,
    name: "Pioneer DJ",
  },
  {
    id: 5,
    proId: 2,
    name: "Sony",
  },
  {
    id: 6,
    proId: 2,
    name: "Yamaha",
  },
  {
    id: 7,
    proId: 2,
    name: "Logitech",
  },
  {
    id: 8,
    proId: 2,
    name: "Bose",
  },
  {
    id: 9,
    proId: 3,
    name: "Bose",
  },
  {
    id: 10,
    proId: 3,
    name: "Sony",
  },
  {
    id: 11,
    proId: 3,
    name: "Sennheiser",
  },
  {
    id: 12,
    proId: 3,
    name: "Audio-Technica",
  },
  {
    id: 13,
    proId: 4,
    name: "Acoustic Signature",
  },
  {
    id: 14,
    proId: 4,
    name: "American Audio",
  },
  {
    id: 15,
    proId: 4,
    name: "Argon TT-2",
  },
  {
    id: 16,
    proId: 4,
    name: "Audio Consulting",
  },
  {
    id: 17,
    proId: 5,
    name: "Cobra",
  },
  {
    id: 18,
    proId: 5,
    name: "Uniden",
  },
  {
    id: 19,
    proId: 5,
    name: "Galaxy",
  },
  {
    id: 20,
    proId: 5,
    name: "Midland",
  },
  {
    id: 21,
    proId: 6,
    name: "Crown Audio",
  },
  {
    id: 22,
    proId: 6,
    name: "Niles",
  },
  {
    id: 23,
    proId: 6,
    name: "McIntoch",
  },
  {
    id: 24,
    proId: 6,
    name: "NAD Electronics",
  },
  {
    id: 25,
    proId: 7,
    name: "Logitech",
  },
  {
    id: 26,
    proId: 7,
    name: "Bose",
  },
  {
    id: 27,
    proId: 7,
    name: "LG",
  },
  {
    id: 28,
    proId: 7,
    name: "Yamaha",
  },
  {
    id: 29,
    proId: 8,
    name: "Cuisinart",
  },
  {
    id: 30,
    proId: 8,
    name: "Hamilton Beach",
  },
  {
    id: 31,
    proId: 8,
    name: "Shark Ninja",
  },
  {
    id: 32,
    proId: 8,
    name: "Kitchen Aid",
  },
  {
    id: 33,
    proId: 9,
    name: "Kitchen Aid",
  },
  {
    id: 34,
    proId: 9,
    name: "Cuisinart",
  },
  {
    id: 35,
    proId: 9,
    name: "Hamilton Beach",
  },
  {
    id: 36,
    proId: 9,
    name: "Wolf Gourmet",
  },
  {
    id: 37,
    proId: 10,
    name: "Vitamix",
  },
  {
    id: 38,
    proId: 10,
    name: "Ninja",
  },
  {
    id: 39,
    proId: 10,
    name: "Oster",
  },
  {
    id: 40,
    proId: 10,
    name: "Magic Bullet",
  },
  {
    id: 41,
    proId: 11,
    name: "Black & Decker",
  },
  {
    id: 42,
    proId: 11,
    name: "Breville",
  },
  {
    id: 43,
    proId: 11,
    name: "Hamilton Beach",
  },
  {
    id: 44,
    proId: 11,
    name: "De'Longhi",
  },
  {
    id: 45,
    proId: 12,
    name: "Alessi",
  },
  {
    id: 46,
    proId: 12,
    name: "Ariete",
  },
  {
    id: 47,
    proId: 12,
    name: "Beem",
  },
  {
    id: 48,
    proId: 12,
    name: "Bialetti",
  },
  {
    id: 49,
    proId: 13,
    name: "Hamilton Beach",
  },
  {
    id: 50,
    proId: 13,
    name: "Cosori",
  },
  {
    id: 51,
    proId: 13,
    name: "Mueller",
  },
  {
    id: 52,
    proId: 13,
    name: "Bodum Bistro",
  },
  {
    id: 53,
    proId: 14,
    name: "Miele",
  },
  {
    id: 54,
    proId: 14,
    name: "Dyson",
  },
  {
    id: 55,
    proId: 14,
    name: "Bosch",
  },
  {
    id: 56,
    proId: 14,
    name: "Philips",
  },
  {
    id: 57,
    proId: 15,
    name: "Roborock",
  },
  {
    id: 58,
    proId: 15,
    name: "Blaupunkt",
  },
  {
    id: 59,
    proId: 15,
    name: "IRobot",
  },
  {
    id: 60,
    proId: 15,
    name: "Xiaomi",
  },
  {
    id: 61,
    proId: 16,
    name: "Bissell",
  },
  {
    id: 62,
    proId: 16,
    name: "Shark",
  },
  {
    id: 63,
    proId: 16,
    name: "Hoover",
  },
  {
    id: 64,
    proId: 16,
    name: "Vileda",
  },
  {
    id: 65,
    proId: 17,
    name: "Apple",
  },
  {
    id: 66,
    proId: 17,
    name: "Samsung",
  },
  {
    id: 67,
    proId: 17,
    name: "Amazon",
  },
  {
    id: 68,
    proId: 17,
    name: "Lenovo",
  },
  {
    id: 69,
    proId: 19,
    name: "Alienware",
  },
  {
    id: 70,
    proId: 19,
    name: "Dell",
  },
  {
    id: 71,
    proId: 19,
    name: "Acer",
  },
  {
    id: 72,
    proId: 19,
    name: "HP",
  },
  {
    id: 73,
    proId: 20,
    name: "Dell",
  },
  {
    id: 74,
    proId: 20,
    name: "Apple",
  },
  {
    id: 75,
    proId: 20,
    name: "Acer",
  },
  {
    id: 76,
    proId: 20,
    name: "Lenovo",
  },
  {
    id: 77,
    proId: 21,
    name: "Dell",
  },
  {
    id: 78,
    proId: 21,
    name: "LG",
  },
  {
    id: 79,
    proId: 21,
    name: "Samsung",
  },
  {
    id: 80,
    proId: 21,
    name: "Asus",
  },
  {
    id: 81,
    proId: 22,
    name: "Microsoft",
  },
  {
    id: 82,
    proId: 22,
    name: "SteelSeries",
  },
  {
    id: 83,
    proId: 22,
    name: "Razer",
  },
  {
    id: 84,
    proId: 22,
    name: "Logitech",
  },
  {
    id: 85,
    proId: 23,
    name: "Logitech",
  },
  {
    id: 86,
    proId: 23,
    name: "Razer",
  },
  {
    id: 87,
    proId: 23,
    name: "Zowie",
  },
  {
    id: 88,
    proId: 23,
    name: "Roccat",
  },
  {
    id: 89,
    proId: 24,
    name: "Sony",
  },
  {
    id: 90,
    proId: 24,
    name: "Samsung",
  },
  {
    id: 91,
    proId: 24,
    name: "TCL",
  },
  {
    id: 92,
    proId: 24,
    name: "Toshiba",
  },
  {
    id: 93,
    proId: 25,
    name: "Samsung",
  },
  {
    id: 94,
    proId: 25,
    name: "Sony",
  },
  {
    id: 95,
    proId: 25,
    name: "Vizio",
  },
  {
    id: 96,
    proId: 25,
    name: "LG",
  },
  {
    id: 97,
    proId: 26,
    name: "Sega",
  },
  {
    id: 98,
    proId: 26,
    name: "Nintendo",
  },
  {
    id: 99,
    proId: 26,
    name: "Xbox",
  },
  {
    id: 100,
    proId: 26,
    name: "PlayStation",
  },
];

   // Test Items
   export const items = [
    {
      itemTakenDate: "2023-12-10",
      itemTaken: true,
      itemUptainer: "-NbzQlf95xoexGIlcIpX",
      itemproduct: "-NbzQlfHewkweUD_k_Ym",
      itemUser: "lywlgHhkOcXEa53j9jPADYoWmrO2",
      itemTakenUser: "",
    },
    {
      itemTakenDate: "2023-12-10",
      itemTaken: true,
      itemUptainer: "-NbzQlf95xoexGIlcIpY",
      itemproduct: "-NbzQlfCJqUDW4jtThUc",
      itemUser: "lywlgHhkOcXEa53j9jPADYoWmrO2",
      itemTakenUser: "lywlgHhkOcXEa53j9jPADYoWmrO2",
    },
    {
      itemTakenDate: "2023-12-09",
      itemTaken: true,
      itemUptainer: "-NbzQlf95xoexGIlcIpY",
      itemproduct: "-NbzQlfCJqUDW4jtThUc",
      itemUser: "",
      itemTakenUser: "lywlgHhkOcXEa53j9jPADYoWmrO2",
    },
    {
      itemTakenDate: "2023-11-06",
      itemTaken: true,
      itemUptainer: "-NbzQlf95xoexGIlcIpY",
      itemproduct: "-NbzQlfCJqUDW4jtThUc",
      itemUser: "",
      itemTakenUser: "lywlgHhkOcXEa53j9jPADYoWmrO2",
    },
    {
      itemTakenDate: "2023-11-06",
      itemTaken: true,
      itemUptainer: "-NbzQlf95xoexGIlcIpX",
      itemproduct: "-NbzQlfHewkweUD_k_Ym",
    },
    {
      itemTakenDate: "2023-09-06",
      itemTaken: true,
      itemUptainer: "-NbzQlf95xoexGIlcIpX",
      itemproduct: "-NbzQlfHewkweUD_k_Ym",
    },
    {
      itemTakenDate: "2023-07-06",
      itemTaken: true,
      itemUptainer: "-NbzQlf95xoexGIlcIpX",
      itemproduct: "-NbzQlfHewkweUD_k_Ym",
    },
    {
      itemTakenDate: "2023-07-06",
      itemTaken: false,
      itemUptainer: "-NbzQlf95xoexGIlcIpY",
      itemproduct: "-NbzQlfCJqUDW4jtThUc",
    },
    {
      itemTakenDate: "2023-07-06",
      itemTaken: false,
      itemUptainer: "-NbzQlf95xoexGIlcIpY",
      itemproduct: "-NbzQlfCJqUDW4jtThUc",
    },
    {
      itemTakenDate: "2023-07-06",
      itemTaken: false,
      itemUptainer: "-NbzQlf95xoexGIlcIpY",
      itemproduct: "-NbzQlfCJqUDW4jtThUc",
    },
  ];

  