"use strict";
exports.id = 102;
exports.ids = [102];
exports.modules = {

/***/ 5731:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ Footer)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
;// CONCATENATED MODULE: ./components/data/footerOne.js

const footerOne = {
    logo: "/assets/img/logo-9.png",
    title_1: "About Us",
    description: "Subscribe to out newsletter today to receive updates on the latest news, releases and special offers respect your privacy.",
    title_2: "Other Pages",
    widgetMenus: [
        {
            link: "/about",
            title: "About Us"
        },
        {
            link: "/blog-grid",
            title: "Blog"
        },
        {
            link: "/contact",
            title: "Contact Us"
        },
        {
            link: "/room-list",
            title: "Room List"
        }
    ],
    title_3: "Gallery",
    title_4: "Office Info",
    office_des: "1234 Lake Tahoe Blvd, South Lake Tahoe , California USA",
    officeInfos: [
        {
            link: "https://www.google.com/maps",
            info: "GXF4+8HQ Chippenham United Kingdom",
            icon: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                className: "fal fa-map-marked-alt"
            })
        },
        {
            link: "mailto:info.help@gmail.com",
            info: "info.help@gmail.com",
            icon: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                className: "fal fal fa-envelope-open-text"
            })
        },
        {
            link: "tel:+125(895)658568",
            info: "+125 (895) 658 568",
            icon: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                className: "fal fa-phone-alt"
            })
        }
    ]
};
/* harmony default export */ const data_footerOne = (footerOne);

// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(7495);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1518);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./app/socials/page.jsx
var page = __webpack_require__(1982);
;// CONCATENATED MODULE: ./app/footer/footer.jsx
// Import necessary components and icons





const { // eslint-disable-next-line @typescript-eslint/no-unused-vars
logo, // eslint-disable-next-line @typescript-eslint/no-unused-vars
title_1, // eslint-disable-next-line @typescript-eslint/no-unused-vars
description, // eslint-disable-next-line @typescript-eslint/no-unused-vars
title_2, // eslint-disable-next-line @typescript-eslint/no-unused-vars
widgetMenus, // eslint-disable-next-line @typescript-eslint/no-unused-vars
title_3, // eslint-disable-next-line @typescript-eslint/no-unused-vars
title_4, // eslint-disable-next-line @typescript-eslint/no-unused-vars
office_des, // eslint-disable-next-line @typescript-eslint/no-unused-vars
officeInfos } = data_footerOne;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const pageslink = (/* unused pure expression or super */ null && ([
    "Room Cleaning",
    "Car Parking",
    "Swimming pool",
    "Fitness Gym"
]));
// Define the Footer component
function Footer() {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "footer__area",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "container",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "row flex justify-between",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "col-xl-3 col-lg-3 col-md-6 col-sm-6 sm-mb-30",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "footer__area-widget",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "footer__area-widget-about",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "footer__area-widget-about-logo",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                href: "/",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                    layout: "responsive",
                                                    src: "/logo.png",
                                                    alt: "",
                                                    width: 200,
                                                    height: 50
                                                })
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            children: "Phasellus nisi sapien, rutrum placerat sapien eu, rhoncus tempus"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "footer__area-widget-about-social",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(page["default"], {})
                                        })
                                    ]
                                })
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "col-xl-3 col-lg-3 col-md-6 col-sm-6 lg-mb-30",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "footer__area-widget",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("h5", {
                                        children: "Information"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "footer__area-widget-contact",
                                        children: data_footerOne.officeInfos.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "footer__area-widget-contact-item",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "footer__area-widget-contact-item-icon",
                                                        children: item.icon
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "footer__area-widget-contact-item-content",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                                href: item.link,
                                                                children: item.info
                                                            })
                                                        })
                                                    })
                                                ]
                                            }, index))
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "col-xl-2 col-lg-2 col-md-5 col-sm-4 sm-mb-30",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "footer__area-widget",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("h5", {
                                        children: "Pages Links"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "footer__area-widget-menu",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                            children: data_footerOne.widgetMenus.map((item, index)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                                                        href: item.link,
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                                className: "fal fa-angle-double-right"
                                                            }),
                                                            item.title
                                                        ]
                                                    })
                                                }, index))
                                        })
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "col-xl-4 col-lg-4 col-md-7 col-sm-8",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "footer__area-widget",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("h5", {
                                        children: "Subscribe"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "footer__area-widget-subscribe",
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                                            action: "#",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                    type: "text",
                                                    name: "email",
                                                    placeholder: "Email Address"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                    type: "submit",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                        className: "fal fa-hand-pointer"
                                                    })
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "copyright__area",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "container",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "row align-items-center",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "col-xl-6 col-lg-6 col-md-7 md-mb-10",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "copyright__area-left md-t-center",
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        children: [
                                            "Copyright \xa9 2023",
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                href: "https://themeforest.net/user/themeori/portfolio",
                                                children: [
                                                    " ",
                                                    "ThemeOri"
                                                ]
                                            }),
                                            " ",
                                            "Website by",
                                            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                href: "/",
                                                children: " Hostily"
                                            })
                                        ]
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "col-xl-6 col-lg-6 col-md-5",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "copyright__area-right t-right md-t-center",
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                    href: "#",
                                                    children: "FAQ"
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                    href: "#",
                                                    children: "Terms of Use"
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                    href: "#",
                                                    children: "Privacy Policy"
                                                })
                                            })
                                        ]
                                    })
                                })
                            })
                        ]
                    })
                })
            })
        ]
    });
}


/***/ }),

/***/ 7592:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZP: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports __esModule, $$typeof */
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1913);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/Users/donghalee/Dev/k_nori/k_nori_pro/knori-front/app/header/HeaderOne.jsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ }),

/***/ 9474:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZP: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports __esModule, $$typeof */
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1913);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/Users/donghalee/Dev/k_nori/k_nori_pro/knori-front/components/seo.jsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ })

};
;