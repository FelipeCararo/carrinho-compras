import React from "react";
import { Layout } from "react-admin";
import MyAppBar from "./AppBar";

import { Sidebar } from "react-admin";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

const useSidebarStyles = makeStyles({
  drawerPaper: {
    marginTop: 57,
  },
});

const MySidebar = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const newClass = {};
  const classes = useSidebarStyles();

  if (isSmall) {
    newClass.marginTop = classes;
  } else {
    newClass.marginTop = "";
  }

  return <Sidebar classes={newClass.marginTop} {...props} />;
};

const MyLayout = (props) => (
  <Layout {...props} appBar={MyAppBar} sidebar={MySidebar} />
);

export default MyLayout;
