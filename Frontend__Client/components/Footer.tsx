
import { Typography } from '@mui/material';
import React from 'react'
import styles from '../styles/Footer.module.scss'
import Link from 'next/link'
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
interface FooterProps {}

const Footer = (props: FooterProps) => {
  return (
    <div className={styles.footerWrap}>
      <div className={styles.footerContainer}>
        <div className={styles.column}>
          <Typography className={styles.columnTitle}>Product</Typography>
          <ul className={styles.columnLink}>
            <li>
              <Link href="/">
                <a>Key Features</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Pricing</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Event Ticking</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Booking</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Developers</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <Typography className={styles.columnTitle}>Explore More</Typography>
          <ul className={styles.columnLink}>
            <li>
              <Link href="/">
                <a>About Us</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>How it Works</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Sell Tickets</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Event Organizers</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Nonprofits & Fundraisers</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <Typography className={styles.columnTitle}>
            Contact Us
          </Typography>
          <ul className={styles.columnLink}>
            <li>
              <Link href="/">
                <a>Customer Supports</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Events Promotor</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>
                  <FacebookIcon className={styles.icon}/>
                  Facebook
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>
                  <InstagramIcon/>
                  Instagram
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>
                  <TelegramIcon/>
                  Telegram
                  </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}


export default Footer