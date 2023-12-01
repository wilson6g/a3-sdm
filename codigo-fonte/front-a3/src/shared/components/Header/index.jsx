import { ChevronLeft, ExpandLess, ExpandMore, Menu } from "@mui/icons-material";
import { Collapse, Icon, ListItemButton, Toolbar } from "@mui/material";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../img/logo.svg";
import "./header.css";

const drawerWidth = 280;
const DrawerHeader = styled("div")(({ theme }) => ({
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export function Header() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [openAdministratorMenu, setOpenAdministratorMenu] = useState(false);
  const navigateTo = useNavigate();

  const DYNAMIC_MENU = [
    {
      name: "Gerenciar",
      icon: `store`,
      role: [],
      href: "#",
      isExpanded: true,
      menu: openAdministratorMenu,
      show: false,
      activeMenu: () => setOpenAdministratorMenu(!openAdministratorMenu),
      children: [
        {
          name: "Gerenciar Cliente",
          icon: `person`,
          role: "",
          show: false,
          href: "/client-management",
        },
        {
          name: "Gerenciar Estoque",
          icon: `inventory`,
          role: "",
          show: false,
          href: "/stock-management",
        },
        // {
        //   name: "Gerenciar Produto",
        //   icon: `shopping_cart`,
        //   role: "",
        //   show: false,
        //   href: "/product-management",
        // },
        {
          name: "Gerenciar Vendas",
          icon: `shopping_cart_checkout`,
          role: "",
          show: false,
          href: "/sell-management",
        },
      ],
    },
  ];

  const renderChildren = (children) => (
    <List component="div" disablePadding>
      {children.map((child) => (
        <ListItem
          disabled={child.show}
          button
          key={child.name}
          onClick={() => handleMenuItemClick(child.href)}
          style={{ paddingLeft: 32 }}
        >
          <Icon sx={{ color: "#707070", marginRight: "2rem" }}>
            {child.icon}
          </Icon>
          <ListItemText primary={child.name} />
        </ListItem>
      ))}
    </List>
  );

  const handleMenuItemClick = (href) => {
    setShowDrawer(false);
    if (href === undefined || href === null) {
      toast.warn("Módulo em desenvolvimento", {
        toastId: "system_error",
      });
    } else {
      navigateTo(href);
    }
  };

  const handleClick = (item) => {
    if (item.activeMenu) {
      item.activeMenu();
    } else {
      handleMenuItemClick(item.href);
    }
  };

  // async function logout() {
  // authService.logoutUser();
  // instance?.logoutRedirect({
  //   onRedirectNavigate(url) {
  //     return false;
  //   },
  // });
  // }

  return (
    <>
      <AppBar className="header" position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            className="d-flex h-100 align-items-center justify-content-center"
            sx={{ mr: 2 }}
            onClick={() => setShowDrawer(!showDrawer)}
          >
            <Menu />
          </IconButton>
          <Typography
            className="w-100 d-flex align-items-center justify-content-center"
            variant="h6"
            component="div"
          >
            <IconButton
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              size="small"
              edge="start"
              color="inherit"
              aria-label="iBlue Logo"
            >
              <img className="w-75" src={Logo} alt="iBlue Logo" />
            </IconButton>
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex" }} id="sidebar">
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          className="header-drawer"
          variant="persistent"
          anchor="left"
          open={showDrawer}
        >
          <DrawerHeader>
            <IconButton onClick={() => setShowDrawer(false)}>
              <ChevronLeft />
            </IconButton>
          </DrawerHeader>
          <List>
            {DYNAMIC_MENU.map((item, index) => (
              <div className="font-bold" key={index}>
                <ListItemButton
                  disabled={item.show}
                  key={item.name}
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  <Icon sx={{ color: "#707070", marginRight: "2rem" }}>
                    {item.icon}
                  </Icon>
                  <ListItemText
                    className="font-bold"
                    primary={item.name}
                    disableTypography={true}
                  />
                  {item.isExpanded ? (
                    item.menu ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : (
                    ""
                  )}
                </ListItemButton>
                <Collapse in={item.menu} timeout="auto" unmountOnExit>
                  {item.children.length > 0
                    ? renderChildren(item.children)
                    : null}
                </Collapse>
              </div>
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
}
