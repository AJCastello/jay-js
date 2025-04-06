import { setLanguage } from "@jay-js/system";
import { Img, Box, Dropdown, Fragment, Divider, Typography, DropdownLabel, DropdownContent } from "@jay-js/ui";

import BrazilFlag from "/assets/images/br.svg";
import USFlag from "/assets/images/us.svg";

import { intl } from "../../locales";

interface Locale {
  name: string;
  code: string;
  flag: string;
}

export const locales: Array<Locale> = [
  {
    name: "Português",
    code: "pt-BR",
    flag: BrazilFlag
  },
  {
    code: "en-US",
    name: "Inglês",
    flag: USFlag
  }
];

function LocaleButton(locale: Locale) {
  return Box({
    className: "btn btn-ghost p-3 flex flex-row gap-2 justify-start items-center text-left cursor-pointer rounded-md",
    children: [
      Box({
        dataset: {
          locale: `${locale.code}-light`
        },
        className: "w-6 h-6 bg-transparent rounded-full overflow-hidden flex",
        children: Img({
          className: "h-6 w-6 rounded-full object-cover",
          src: locale.flag,
          alt: "flag icon"
        })
      }),
      Typography({
        className: "flex-grow text-sm font-bold",
        children: locale.name
      })
    ],
    onclick: () => {
      setLanguage(locale.code);
    }
  });
}

export function LocaleSelector() {
  return Fragment({
    children: [
      Dropdown({
        children: [
          DropdownLabel({
            className: "btn btn-ghost btn-circle btn-sm",
            children: Img({
              className: "h-8 w-8 rounded-full object-cover",
              src: "", //locales.find((lang) => lang.code === intl("locale"), // FIX: 
              alt: "flag icon"
            }),
            // className: "bg-base-200 w-12 h-12 rounded-full flex items-center justify-center text-lg cursor-pointer hover:ring-1 ring-primary/40 ring-offset-1 ring-offset-base-100"
          }),
          DropdownContent({
            className: "menu p-4 gap-2 bg-base-100 rounded-box w-52 shadow-lg border border-solid border-base-200 z-10",
            children: [
              Divider({
                children: intl("Language"),
                className: "text-sm my-1"
              }),
              ...locales.map(LocaleButton)
            ]
          })
        ],
        position: "dropdown-bottom",
        toEnd: true,
        openOnHover: true
      })
    ]
  });
}