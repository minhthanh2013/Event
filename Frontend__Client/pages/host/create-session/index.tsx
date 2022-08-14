import React, { useState, ChangeEvent } from "react";
import HeaderHost from "../../../components/Header__Host";
import Box from "@mui/material/Box";
import Footer from "../../../components/Footer";
import Typography from "@mui/material/Typography";
import styles from "../../../styles/EventDashboard.module.scss";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import Image from "next/image";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { BasicInfo, Conferences } from "./CreateSessionForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Multer } from 'multer';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const outerTheme = createTheme({
  palette: {
    primary: {
      main: "rgba(106, 53, 242, 0.77)",
    },
  },
});

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CreateEvent = (props) => {
  const [data, setData] = useState({})
  const [image, setImage] = useState<string | ArrayBuffer | null>();
  const [imageFile, setImageFile] = useState<Multer.File | null>();

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e?.target?.result);
        setImageFile(event.target.files[0]);
        setData({ ...data, image: event.target.files[0] })
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const [value, setValue] = React.useState(0);

  const apiCall = async (data) => {
    const res = await fetch("/api/combo/create-new", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();
    if (res.status === 200) {
      let body = new FormData()
      body.append('file',imageFile)
      await fetch(`/api/cloudinary/update-image-session/${props?.tempDecode?.sub}`, {
        method: "POST",
        body,
      });
    }
  }
  //change tabs; value = tabs value
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          background: "#F1EFEF",
          width: "100%",
          marginBottom: "10rem",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box className={styles.dot__1}></Box>
        <Box className={styles.dot__2}></Box>
        <Box className={styles.dot__3}></Box>
        <HeaderHost {...props}/>

        <Typography variant="h3" component="div" className={styles.header}>
          Session Dashboard
        </Typography>
        <Grid container spacing={0} direction="column" alignItems="center">
          <Card className={styles.imageInput}>
            {image ? (
              <CardActionArea>
                <Image
                  width="100%"
                  src={image}
                  height="50rem"
                  layout="responsive"
                  alt=""
                />
              </CardActionArea>
            ) : (
              <CardContent
                style={{
                  backgroundColor: "rgba(151, 125, 219, 0.385)",
                  height: "100%",
                }}
              >
                <Box
                  m={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{ height: "100%" }}
                >
                  <Button
                    style={{
                      borderRadius: 45,
                      backgroundColor: "rgba(106, 53, 242, 0.77)",
                      padding: "8px 25px",
                      fontSize: "30px",
                      display: "block",
                      margin: "auto",
                    }}
                    variant="contained"
                    component="label"
                  >
                    <input type="file" hidden onChange={onImageChange} />+
                  </Button>
                </Box>
              </CardContent>
            )}
          </Card>
          <Box
            className={styles.tabBox}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <ThemeProvider theme={outerTheme}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
              >
                <Tab label="Basic Information" {...a11yProps(0)} />
                <Tab label="Conference" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <BasicInfo data={data} setData={setData} setValue={setValue} api={apiCall} prop={props} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Conferences data={data} setData={setData} setValue={setValue} api={apiCall} prop={props} />
              </TabPanel>
            </ThemeProvider>
          </Box>
        </Grid>
      </Box>

      <Footer />
    </>
  );
};

export async function getServerSideProps(ctx: any) {
  // Fetch data from external API
  // Pass data to the page via props
  let raw = null;
  try {
    raw = ctx.req.cookies;
  } catch (e) {
    return { props: {} }
  }
  try { 
    if (raw.OursiteJWT.toString()) {
      let token = "OursiteJWT"
      let value = raw.OursiteJWT.toString();
      let tempDecode = JSON.parse(Buffer.from(value.split('.')[1], 'base64').toString());
      return {
        props: {
          token, value,
          tempDecode
        }
      };
    } return { props: {} }
  } catch (error) {
    return { props: {} }
  }
}

export default CreateEvent;
