import React, { useState, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import Tick from "@mui/icons-material/Done";

export const Subcriptions = () => {
  return (
    <>
      <Box sx={{ marginLeft: "3rem" }}>
        <Typography variant="h3" component="div">
          Subscription
        </Typography>
        <Box sx={{ marginTop: "3rem" }}>
          <Grid container spacing={8}>
            <Grid item={true} xs={5}>
              <Typography variant="h6">Basic</Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", margin: "2rem 0 1.5rem 0" }}
              >
                Free
              </Typography>
              <Typography sx={{ margin: "1rem 0", fontWeight: "lighter" }}>
                The perfect way to get started and get used to our tool.
              </Typography>
              <Button
                variant="outlined"
                sx={{ width: "100%", padding: "1rem", margin: "1rem 0" }}
              >
                Get started
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Tick color="success" />
                <Typography
                  sx={{ margin: "1rem 0 1rem 0.5rem", fontStyle: "italic" }}
                >
                  Create 20 events
                </Typography>
              </Box>
            </Grid>
            <Grid item={true} xs={5}>
              <Box
                sx={{
                  borderRadius: "10px",
                  border: "2px solid #000000",
                  boxShadow: "5px 5px 7px #B5ACCC",
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem",
                }}
              >
                <Typography variant="h6">Premium</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "end",
                    flexDirection: "row",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      margin: "2rem 0 1rem 0",
                    }}
                  >
                    $ 90/
                  </Typography>
                  <Typography variant="h5" sx={{ margin: "2rem 0 1rem 1rem" }}>
                    yearly
                  </Typography>
                </Box>
                <Typography sx={{ margin: "1rem 0", fontWeight: "lighter" }}>
                  Ideal for both individuals and organizations.
                </Typography>
                <Button
                  variant="contained"
                  sx={{ width: "100%", padding: "1rem", margin: "1rem 0" }}
                >
                  Get started
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Tick color="success" />
                  <Typography
                    sx={{ margin: "1rem 0 1rem 0.5rem", fontStyle: "italic" }}
                  >
                    Create unlimited events
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Tick color="success" />
                  <Typography
                    sx={{ margin: "1rem 0 1rem 0.5rem", fontStyle: "italic" }}
                  >
                    Create sessions
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
