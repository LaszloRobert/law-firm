import { raluca, victor, avocat1, avocat2 } from "../assets"
export const languages = [
    { code: 'ro', name: 'Romanian' },
    { code: 'gb', name: 'English' },
    { code: 'hu', name: 'Hungarian' },
]


//This file is to match the "title" with the id from languages. Is used to for enumeration purpouse.
//id-unique id assigned to list etc.
//title - id that must match with the id from languages folder.
// export const navLinks = [
//     {
//         id: "home",
//         languageID: "Navbar.Home",
//     },
//     {
//         id: "about",
//         languageID: "Navbar.About",
//     },
//     {
//         id: "services",
//         languageID: "Navbar.Services",
//     },
//     {
//         id: "team",
//         languageID: "Navbar.Team",
//     },
//     {
//         id: "contact",
//         languageID: "Navbar.Contact",
//     }
// ];

export const team = [
    {
        id: "victor",
        title: "Victor Rusa",
        phone: "0744851882",
        email: "victor_rusa@yahoo.com",
        description: "Avocat coordonator",
        icon: victor
    },
    {
        id: "anca",
        title: "Anca Rusa",
        phone: "0748282633",
        email: "ancarusa2016@gmail.com",
        description: "Avocat asociat",
        icon: raluca
    },
    {
        id: "raluca",
        title: "Raluca Pleșan",
        phone: "0728692179",
        email: "plesan.raluca27.yahoo.com",
        description: "Avocat asociat",
        icon: raluca
    },
    {
        id: "imola",
        title: "Imola Koncz",
        phone: "0746077154",
        email: "konczimola@yahoo.com",
        description: "Avocat colaborator",
        icon: raluca
    }
]


// export const services = [
//     {
//         languageID: "Services.Service1",
//         id: "service1",
//     },
//     {
//         languageID: "Services.Service2",
//         id: "service2",
//     }
// ]
