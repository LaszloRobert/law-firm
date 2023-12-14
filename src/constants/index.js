import { raluca, victor, avocat1, avocat2 } from "../assets"
export const languages = [
    {
        code: 'ro',
        country_code: "RO"
    },
    {
        code: "gb",
        country_code: "GB"
    }
]


//This file is to match the "title" with the id from languages. Is used to for enumeration purpouse.
//id-unique id assigned to list etc.
//title - id that must match with the id from languages folder.
export const navLinks = [
    {
        id: "home",
        languageID: "Navbar.Home",
    },
    {
        id: "about",
        languageID: "Navbar.About",
    },
    {
        id: "services",
        languageID: "Navbar.Services",
    },
    {
        id: "team",
        languageID: "Navbar.Team",
    },
    {
        id: "contact",
        languageID: "Navbar.Contact",
    }
];

export const team = [
    {
        id: "raluca",
        title: "Avocat Raluca Plesan",
        phone: "0736116983",
        email: "plesan.raluca27.yahoo.com",
        icon: raluca
    },
    {
        id: "victor",
        title: "Avocat Rusa Victor",
        phone: "0736116983",
        email: "plesan.raluca27.yahoo.com",
        icon: victor
    },
    {
        id: "robert",
        title: "Avocat Robert Laszlo",
        phone: "0736116983",
        email: "plesan.raluca27.yahoo.com",
        icon: avocat1
    },
    {
        id: "ion",
        title: "Avocat Ion Gabril",
        phone: "0736116983",
        email: "plesan.raluca27.yahoo.com",
        icon: avocat2
    }
]

