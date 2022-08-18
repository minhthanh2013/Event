import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tick from "@mui/icons-material/Done";
import { useRouter } from "next/router";

interface ResponseData {
  status: boolean,
  data: string,
}

interface SubProps {
  host_type: string,
  exDate: Date,
  hostId: number,
}
export const Subcriptions: React.FC<SubProps> = ({ host_type, exDate, hostId }) => {

  const router = useRouter()

  async function navigate() {
    const result = await fetch("/api/payment/supcription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.STRIPE_TEST_KEY,
      },
      body: JSON.stringify(hostId),
    })
    const resDataJson = await result.json();
    if (resDataJson.status === true) {
      router.push(resDataJson.data);
    }
  }

  return (
    <>
      <Box>
        <Typography variant="h3" component="div" sx={{ fontWeight: "bold" }}>
          Subscription
        </Typography>
        {host_type === "free" ? (
          <Box sx={{ marginTop: "3rem", display: "flex", justifyContent: "space-between" }}>
            <Box
              sx={{
                borderRadius: "10px",
                border: "2px solid #E5E5E5",
                boxShadow: "5px 5px 7px #B5ACCC",
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                height: "35rem",
                width: "30rem",
                paddingLeft: "1.5rem",
                marginRight: "5vw"
              }}
            >
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
                variant="contained"
                sx={{ width: "100%", padding: "1rem", margin: "1rem 0" }}
                disabled
              >
                ACTIVATED
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
                  Create 10 Events
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                borderRadius: "10px",
                border: "2px solid #000000",
                boxShadow: "5px 5px 7px #B5ACCC",
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                height: "35rem",
                width: "30rem",
                paddingLeft: "1.5rem",
                marginRight: "20vw",
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
              <Typography sx={{ margin: "1.3rem 0", fontWeight: "lighter" }}>
                Ideal for both individuals and organizations.
              </Typography>
              <Button
                variant="contained"
                sx={{ width: "100%", padding: "1rem", margin: "1.2rem 0" }}
                onClick={navigate}
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
          </Box>
        ) : (
          <Box sx={{ marginTop: "3rem", display: "flex", justifyContent: "space-between" }}>
            <Box
              sx={{
                borderRadius: "10px",
                border: "2px solid #E5E5E5",
                boxShadow: "5px 5px 7px #B5ACCC",
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                height: "35rem",
                width: "30rem",
                paddingLeft: "1.5rem",
                marginRight: "5vw"
              }}
            >
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
                variant="contained"
                sx={{ width: "100%", padding: "1rem", margin: "1rem 0" }}
                disabled
              >
                ACTIVATED
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
                  Create 10 Events
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                borderRadius: "10px",
                border: "2px solid #000000",
                boxShadow: "5px 5px 7px #B5ACCC",
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                height: "35rem",
                width: "30rem",
                paddingLeft: "1.5rem",
                marginRight: "20vw",
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
              <Typography sx={{ margin: "1.3rem 0", fontWeight: "lighter" }}>
                Ideal for both individuals and organizations.
              </Typography>
              <Button
                variant="contained"
                sx={{ width: "100%", padding: "1rem", margin: "1.2rem 0" }}
                onClick={navigate}
                disabled
              >
                ACTIVATED
              </Button>
              <Typography variant="h5" sx={{ margin: "2rem 0 1rem 1rem" }}>
                Expiration date:
              </Typography>
              {exDate?.toString()}
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
          </Box>
        )}

      </Box>
    </>
  );
};

