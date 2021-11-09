import * as nodemailer from 'nodemailer';

const env = 'local';
// const env = 'heroku';

let Transporter;
let LinkedinConfig = {redirect_uri: '', client_id: '', client_secret: ''};
let BaseMwUrl;
let BaseFrontenUrl;
let BaseSocketUrl;
let ZoomClientID;
let ZoomClientSecret;
let ZoomRedirectURL;
// @ts-ignore
if (env === 'local' || !env) {
  Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: 'jugaad123it@gmail.com',
      pass: '1234jugaad2',
    },
  });

  LinkedinConfig = {
    redirect_uri: 'http://localhost:3000/linkedin',
    client_id: '78nqdhwy582n42',
    client_secret: 'J51jVXkIqrbYOMmq',
  };

  BaseMwUrl = 'http://localhost:3001';
  BaseFrontenUrl = 'http://localhost:3000';
  BaseSocketUrl = 'http://localhost:4001';

  ZoomClientID = 'LpCdCU3oT1erdSmq1A19_w';
  ZoomClientSecret = 'YkUl6dx7tdq8ZebQDd4A0pAVh9KNemvl';
  ZoomRedirectURL = 'https://jugaad-mw.herokuapp.com/zooms';
} else if (env === 'heroku') {
  Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: 'jugaad123it@gmail.com',
      pass: '1234jugaad2',
    },
  });

  LinkedinConfig = {
    redirect_uri: 'https://jugaad-fronten.herokuapp.com/linkedin',
    client_id: '78nqdhwy582n42',
    client_secret: 'J51jVXkIqrbYOMmq',
  };

  BaseMwUrl = 'https://jugaad-mw.herokuapp.com';
  BaseFrontenUrl = 'https://jugaad-fronten.herokuapp.com';
  BaseSocketUrl = 'https://jugaad-socket.herokuapp.com';

  ZoomClientID = 'LpCdCU3oT1erdSmq1A19_w';
  ZoomClientSecret = 'YkUl6dx7tdq8ZebQDd4A0pAVh9KNemvl';
  ZoomRedirectURL = 'https://jugaad-mw.herokuapp.com/zooms';
} else if (env === 'prod') {
  Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: 'jugaad123it@gmail.com',
      pass: '1234jugaad2',
    },
  });

  LinkedinConfig = {
    redirect_uri: 'https://jugaad-fronten.herokuapp.com/linkedin',
    client_id: '78nqdhwy582n42',
    client_secret: 'J51jVXkIqrbYOMmq',
  };

  BaseMwUrl = 'https://jugaad-mw.herokuapp.com';
  BaseFrontenUrl = 'https://jugaad-fronten.herokuapp.com';
  BaseSocketUrl = 'https://jugaad-socket.herokuapp.com';

  ZoomClientID = 'LpCdCU3oT1erdSmq1A19_w';
  ZoomClientSecret = 'YkUl6dx7tdq8ZebQDd4A0pAVh9KNemvl';
  ZoomRedirectURL = 'https://jugaad-mw.herokuapp.com/zooms';
}

export const transporter = Transporter;
export const linkedinConfig = LinkedinConfig;
export const baseMwUrl = BaseMwUrl;
export const baseFrontenUrl = BaseFrontenUrl;
export const baseSocketUrl = BaseSocketUrl;
export const zoomClientID = ZoomClientID;
export const zoomClientSecret = ZoomClientSecret;
export const zoomRedirectURL = ZoomRedirectURL;
