import { IconJavaScript } from "@/components/svg/programing/IconJavaScript";
import { IconNext } from "@/components/svg/programing/IconNext";
import { IconNuxt } from "@/components/svg/programing/IconNuxt";
import { IconReact } from "@/components/svg/programing/IconReact";
import { IconVue } from "@/components/svg/programing/IconVue";
import { v4 as uuidv4 } from "uuid";

export const programmingIcons = [
  {
    id: uuidv4(),
    text: "Vue.js",
    listIconComponent: <IconVue width={25} height={25} />,
    iconComponent: <IconVue width={50} height={50} />,
  },
  {
    id: uuidv4(),
    text: "React.js",
    listIconComponent: <IconReact width={25} height={25} />,
    iconComponent: <IconReact width={50} height={50} />,
  },
  {
    id: uuidv4(),
    text: "JavaScript",
    listIconComponent: <IconJavaScript width={25} height={25} />,
    iconComponent: <IconJavaScript width={50} height={50} />,
  },
  {
    id: uuidv4(),
    text: "Nuxt.js",
    listIconComponent: <IconNuxt width={25} height={25} />,
    iconComponent: <IconNuxt width={50} height={50} />,
  },
  {
    id: uuidv4(),
    text: "Next.js",
    listIconComponent: <IconNext width={25} height={25} />,
    iconComponent: <IconNext width={50} height={50} />,
  },
];
