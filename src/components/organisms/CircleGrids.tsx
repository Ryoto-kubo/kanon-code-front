import { CustomIconButton } from "@/components/atoms/IconButton";
import { CircleGrid } from "@/components/molecules/CircleGrid";
import { Grid } from "@material-ui/core/";
import React from "react";
import CakePhpSvg from "../../assets/logo/cakephp.svg";
import JavaScriptSvg from "../../assets/logo/javascript.svg";
import LaravelSvg from "../../assets/logo/laravel.svg";
import NextSvg from "../../assets/logo/next.svg";
import NuxtSvg from "../../assets/logo/nuxt.svg";
import PhpSvg from "../../assets/logo/php.svg";
import ReactSvg from "../../assets/logo/react.svg";
import VueSvg from "../../assets/logo/vue.svg";

type Props = {
  func: React.MouseEventHandler;
};

export const CircleGrids: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={3}>
      <CircleGrid text="JavaScript">
        <CustomIconButton disableRipple={true} func={props.func}>
          <JavaScriptSvg width={40} height={40} />
        </CustomIconButton>
      </CircleGrid>
      <CircleGrid text="Vue.js">
        <CustomIconButton disableRipple={true} func={props.func}>
          <VueSvg width={40} height={40} />
        </CustomIconButton>
      </CircleGrid>
      <CircleGrid text="React.js">
        <CustomIconButton disableRipple={true} func={props.func}>
          <ReactSvg width={40} height={40} />
        </CustomIconButton>
      </CircleGrid>
      <CircleGrid text="Nuxt.js">
        <CustomIconButton disableRipple={true} func={props.func}>
          <NuxtSvg width={40} height={40} />
        </CustomIconButton>
      </CircleGrid>
      <CircleGrid text="Next.js">
        <CustomIconButton disableRipple={true} func={props.func}>
          <NextSvg width={40} height={40} />
        </CustomIconButton>
      </CircleGrid>
      <CircleGrid text="php">
        <CustomIconButton disableRipple={true} func={props.func}>
          <PhpSvg width={40} height={40} />
        </CustomIconButton>
      </CircleGrid>
      <CircleGrid text="Cakephp">
        <CustomIconButton disableRipple={true} func={props.func}>
          <CakePhpSvg width={40} height={40} />
        </CustomIconButton>
      </CircleGrid>
      <CircleGrid text="Laravel">
        <CustomIconButton disableRipple={true} func={props.func}>
          <LaravelSvg width={40} height={40} />
        </CustomIconButton>
      </CircleGrid>
    </Grid>
  );
};
